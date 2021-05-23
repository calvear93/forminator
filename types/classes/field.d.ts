import { Dictionary, FieldState, FieldMutator, FormStateHandler } from '../interfaces';

/**
 * Handle field state, props, validation, mask, etc.
 *
 * @export
 * @class Field
 */
export declare class Field
{
    /**
     * Field name.
     *
     * @public
     * @type {string}
     */
    public key: string;

    /**
     * DOM ELement reference.
     *
     * @public
     * @type {HTMLElement}
     */
    public ref?: HTMLElement;

    /**
     * Field props.
     *
     * @public
     * @type {Dictionary<any>}
     */
    public props: Dictionary<any>;

    /**
     * Field default value.
     *
     * @public
     * @type {string}
     */
    public defaultValue?: string;

    /**
     * Previous field state.
     *
     * @public
     * @type {FieldState}
     */
    public prevState?: FieldState;

    /**
     * Current field state.
     *
     * @public
     * @type {FieldState}
     */
    public state: FieldState;

    /**
     * Fields state handler.
     *
     * @private
     * @type {Dictionary<Field>}
     */
    private fields: React.MutableRefObject<Dictionary<Field>>;

    /**
     * Form state handler.
     *
     * @private
     * @type {any}
     */
    private formStateHandler: FormStateHandler;

    /**
     * Field default value.
     *
     * @private
     * @type {Function}
     */
    private equal: (a: any, b: any) => boolean;

    /**
     * Field mutators as validator and mask.
     *
     * @public
     * @type {any}
     */
    public mutators: FieldMutator;

    /**
     * Indicates if schema was initialized once.
     *
     * @private
     * @type {boolean}
     */
    private _initialized?: boolean;

    /**
     * Timer for validation debouncing.
     *
     * @private
     * @type {NodeJS.Timeout}
     */
    private _validateTimer?: NodeJS.Timeout;

    /**
     * Initializes field state.
     *
     * @param {string} key field name
     * @param {Partial<Field>} fieldSchema field initial config and state
     * @param {FieldMutator} fieldMutators field mutators as validate, mask or props mutator
     * @param {FormStateHandler} formStateHandler handles form tracers, counters and redering
     * @param {React.MutableRefObject<Dictionary<Field>} fields fields states and values
     */
    constructor (
        key: string,
        fieldSchema: Partial<Field>,
        fieldMutators: FieldMutator,
        formStateHandler: FormStateHandler,
        fields: React.MutableRefObject<Dictionary<Field>>
    )

    /**
     * Triggers component re-redering and interceptor.
     */
    render(): void


    /**
     * Sets input DOM reference.
     *
     * @param {HTMLElement} target field DOM reference
     */
    setRef(target: HTMLElement): void


    /**
     * Sets a field value.
     *
     * @param {any} value field value
     */
    set(value: any): void


    /**
     * Resets to default a field value.
     */
    reset(): void


    /**
     * Sets field props.
     *
     * @param {Function | Promise<any> | any} newProps new props, Promise or function.
     *  In a function, current props are passed as params, and not render
     *  is triggered if function returns sames props.
     */
    setProps(newProps: Function | Promise<any> | any): void


    /**
     * Sets validation schema.
     *
     * @param {any} validate new validation schema
     */
    setValidate(validate: any): void


    /**
     * Sets masking schema.
     *
     * @param {any} mask new masking schema
     */
    setMask(mask: any): void

    /**
     * Sets equality comparer.
     *
     * @param {Function} equal new equality comparer
     */
    setEqual(equal: (a: any, b: any) => boolean): void


    /**
     * Sets field validation errors.
     *
     * @param {any} newErrors fields validation errors
     */
    setErrors(newErrors?: any): void


    /**
     * Validates field value.
     *
     * [!] Take care of mutate a member
     * without a stop propagation condition.
     *
     * @param {boolean} force whether force validation
     */
    validate(force?: boolean): void


    /**
     * Debounced validation of field value.
     * May be not debounced if debounce is falsy.
     */
    validateDebounced(): void


    /**
     * Applies mask function to state value.
     */
    mask(): void
}
