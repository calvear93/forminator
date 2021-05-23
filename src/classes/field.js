/**
 * Handle field state, props, validation, mask, etc.
 *
 * @export
 * @class Field
 */
export class Field
{
    /**
     * Field name.
     *
     * @public
     * @type {string}
     */
    key;

    /**
     * DOM ELement reference.
     *
     * @public
     * @type {HTMLElement}
     */
    ref;

    /**
     * Field props.
     *
     * @public
     * @type {any}
     */
    props;

    /**
     * Field default value.
     *
     * @public
     * @type {string}
     */
    defaultValue;

    /**
     * Previous field state.
     *
     * @public
     * @type {any}
     */
    prevState;

    /**
     * Current field state.
     *
     * @public
     * @type {any}
     */
    state;

    /**
     * Fields state handler.
     *
     * @private
     * @type {any}
     */
    fields;

    /**
     * Form state handler.
     *
     * @public
     * @type {any}
     */
    formStateHandler;

    /**
     * Field default value.
     *
     * @private
     * @type {Function}
     */
    equal;

    /**
     * Field mutators as validator and mask.
     *
     * @public
     * @type {any}
     */
    mutators;

    /**
     * Indicates if schema was initialized once.
     *
     * @private
     * @type {boolean}
     */
    _initialized = true;

    /**
     * Timer for validation debouncing.
     *
     * @private
     * @type {NodeJS.Timeout}
     */
    _validateTimer;

    /**
     * Initializes field state.
     *
     * @param {string} key field name
     * @param {any} fieldSchema field initial config and state
     * @param {any} fieldMutators field mutators as validate, mask or props mutator
     * @param {any} formStateHandler handles form tracers, counters and redering
     * @param {any} fields fields states and values
     */
    constructor(key, fieldSchema, fieldMutators, formStateHandler, fields)
    {
        // field name
        this.key = key;
        // field component props
        this.props = fieldSchema.props ?? {};
        this.defaultValue = fieldSchema.defaultValue;
        // stores previous state
        this.prevState = fieldSchema.prevState ?? {};
        // field current value and state
        this.state = {
            // current field state name
            phase: 'ready',
            // current field value
            value: fieldSchema.defaultValue,
            // whether field was changed least once
            touched: false,
            // whether field is different from default
            changed: false,
            // whether field is valid
            valid: true,
            // restores previous state
            ...fieldSchema.state,
            // loading flags
            loading: {
                validate: false,
                props: false
            }
        };

        this.fields = fields;
        this.formStateHandler = formStateHandler;

        const { validate, mask, equal } = fieldMutators ?? {};

        // equality comparer function
        this.equal = equal ?? Object.is;

        // field mutators. May be sync or async operations
        this.mutators = {
            validate: {
                enabled: !!(validate?.apply || validate?.schema),
                ...validate,
                onInit: this._initialized ? false : validate?.onInit
            },
            mask: {
                enabled: !!mask,
                ...mask
            },
            // preserve previous mutators
            ...fieldSchema.mutators
        };

        // flag indicating schema is loaded one time at least
        this._initialized = true;

        this.mask();
    }

    /**
     * Triggers component re-redering and interceptor.
     */
     render = () =>
     {
         const { render, interceptor, preventRender } = this.formStateHandler;

         if (preventRender.current)
             return;

         // executes change interceptor function if exists
         if (interceptor)
         {
             preventRender.current = true; // avoids re-rendring
             interceptor(this, this.fields.current);
             preventRender.current = false;
         }

         render();
     }

    /**
     * Sets input DOM reference.
     *
     * @param {DOMElement} target field DOM reference
     */
    setRef = (target) =>
    {
        this.ref = target;
    }

    /**
     * Sets a field value.
     *
     * @param {any} value field value
     */
    set = (value) =>
    {
        if (this.equal(this.state.value, value))
            return;

        // saves current state as prevState
        this.prevState = { ...this.state };

        const { counters } = this.formStateHandler;

        if (!this.state.touched)
        {
            // increments touched counter on first touch
            counters.touched.increment();
            this.state.touched = true;
        }

        // whether field value ws changed from default
        const changed = !this.equal(this.defaultValue, value);

        if (this.state.changed !== changed)
        {
            // increments counter if changes exists,
            // if not and it's greather than zero, decreases it
            counters.changed.fromBool(changed);
            this.state.changed = changed;
        }

        // updates field value
        this.state.value = value;

        const { onChange } = this.mutators.validate;
        // executes validations
        onChange && this.validateDebounced();

        this.mask();
        this.render();
    }

    /**
     * Resets to default a field value.
     */
    reset = () =>
    {
        if (this.equal(this.defaultValue, this.state.value))
            return;

        // saves current state as prevState
        this.prevState = { ...this.state };

        const { counters } = this.formStateHandler;

        this.state.touched && counters.touched.decrement();
        this.state.changed && counters.changed.decrement();

        this.state.value = this.defaultValue;

        const { onChange } = this.mutators.validate;
        // executes validations
        onChange && this.validateDebounced();

        this.mask();
        this.render();
    }

    /**
     * Sets field props.
     *
     * @param {Function | Promise<any> | any} newProps new props, Promise or function.
     *  In a function, current props are passed as params, and not render
     *  is triggered if function returns sames props.
     */
    setProps = (newProps) =>
    {
        const { tracer } = this.formStateHandler;

        let props = newProps;

        if (typeof newProps === 'function')
            props = newProps(this.state.props);

        // if props and new props are equal, update is cancelled
        if (this.props === props)
            return;

        if (props instanceof Promise)
        {
            // when field isn't loading, updates it's state
            if (!this.state.loading.props)
            {
                this.state.phase = 'loading';
                this.state.loading.props = true;
                this.render();
            }

            // async operations tracer for trigger
            // render at lastest finished only
            const traceKey = `${this.key}:props`;
            const mark = tracer.set(traceKey);

            (async () =>
            {
                const result = await props;

                // updates state only if is the latest async
                // operation finishes and mark exists
                // (in otherwise component is unmounted)
                // also, validates if props are different
                if (this.props === result || !tracer.is(traceKey, mark))
                    return;

                this.props = result;
                this.state.phase = 'ready';
                this.state.loading.props = false;

                this.render();
            })();
        }
        else
        {
            this.props = props;

            this.render();
        }
    }

    /**
     * Sets validation schema.
     *
     * @param {any} validate new validation schema
     */
    setValidate = (validate) =>
    {
        this.mutators = {
            ...this.mutators,
            validate: {
                enabled: !!(validate?.apply || validate?.schema),
                ...validate,
                onInit: this._initialized ? false : validate?.onInit
            }
        };

        validate?.onInit && this.validate(true);
    }

    /**
     * Sets masking schema.
     *
     * @param {any} mask new masking schema
     */
    setMask = (mask) =>
    {
        this.mutators = {
            ...this.mutators,
            mask: {
                enabled: !!mask,
                ...mask
            }
        };

        this.mask();
    }

    /**
     * Sets equality comparer.
     *
     * @param {Function} equal new equality comparer
     */
    setEqual = (equal) =>
    {
        // equality comparer function
        this.equal = equal ?? Object.is;
    }

    /**
     * Sets field validation errors.
     *
     * @param {any} newErrors fields validation errors
     */
    setErrors = (newErrors) =>
    {
        if (!newErrors && this.state.valid && !this.state.loading.validate)
            return;

        const prevValid = this.state.valid;

        const { counters } = this.formStateHandler;

        this.state.errors = newErrors;
        this.state.valid = !newErrors;
        this.state.lastValidated = this.state.value;
        this.state.phase = 'ready';
        this.state.loading.validate = false;

        // if validity has changed, calcs new error counting
        if (prevValid !== this.state.valid)
            counters.errors.fromBool(!this.state.valid);

        this.render();
    }

    /**
     * Validates field value.
     *
     * [!] Take care of mutate a member
     * without a stop propagation condition.
     *
     * @param {boolean} force whether force validation
     */
    validate = (force) =>
    {
        const { validate: { enabled, apply, schema } } = this.mutators;

        if (!force && (!enabled || this.state.lastValidated === this.state.value))
            return;

        const { render, tracer, preventRender } = this.formStateHandler;

        // YUP schema validation
        if (schema)
        {
            try
            {
                schema.validateSync(this.state.value);
                this.setErrors();
            }
            catch (errors)
            {
                this.setErrors(errors);
            }

            return;
        }

        preventRender.current = true; // avoids re-rendring
        // custom value validation
        let validations = apply(this, this.fields.current);
        preventRender.current = false;

        if (validations instanceof Promise)
        {
            // when field isn't loading, updates it's state
            if (!this.state.loading.validate)
            {
                this.state.phase = 'loading';
                this.state.loading.validate = true;
                render();
            }

            // async operations tracer for trigger
            // render at lastest finished only
            const traceKey = `${this.key}:validate`;
            const mark = tracer.set(traceKey);

            (async () =>
            {
                const result = await validations;

                // updates state only if is the latest async
                // operation finishes and mark exists
                // (in otherwise component is unmounted)
                // also, validates if props are different
                if (!tracer.is(traceKey, mark))
                    return;

                this.setErrors(result);
            })();
        }
        else
        {
            this.setErrors(validations);
        }
    }

    /**
     * Debounced validation of field value.
     * May be not debounced if debounce is falsy.
     */
    validateDebounced = () =>
    {
        const { validate: { debounce, debounceLoading } } = this.mutators;

        if (!debounce)
        {
            this.validate();

            return;
        }

        if (debounceLoading && !this.state.loading.validate)
        {
            this.state.phase = 'loading';
            this.state.loading.validate = true;

            this.render();
        }

        this._validateTimer && clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(() => this.validate(), debounce);
    }

    /**
     * Applies mask function to state value.
     */
     mask = () =>
     {
         const { mask: { enabled, apply } } = this.mutators;

         if (!enabled)
             return;

         this.state.value = apply(this.state.value);
     }
}
