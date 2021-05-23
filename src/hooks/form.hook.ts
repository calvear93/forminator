import { useEffect, useRef } from 'react';
import { Field } from '../classes/field';
import { useCounterRef, useComponentWillUnmount, useForceUpdate, useTraceRef } from '.';
import { Dictionary, FieldMutator, FormOnChangeInterceptor, FormReturn, FormStateHandler } from '../interfaces';

/**
 * Initializes form fields handler.
 *
 * @export
 * @param {Dictionary<Field>} schema form fields schemas
 * @param {Dictionary<FieldMutator>} mutators field mutators
 * @param {FormOnChangeInterceptor} interceptor global mutator function
 *
 * @returns {FormReturn} fields and forms state
 */
export function useForm(
        schema: Dictionary<Field>,
        mutators: Dictionary<FieldMutator>,
        interceptor: FormOnChangeInterceptor
): FormReturn
{
    // form state handler
    const state: FormStateHandler = useFormState(interceptor);
    // dictionary of fields
    const fields: Dictionary<Field> = useFields(schema, mutators, state);

    // validates initial values
    useEffect(() =>
    {
        for (const field of Object.values(fields))
        {
            const { enabled, onInit } = field.mutators.validate;

            if (enabled && onInit)
                field.validate();
        }
    }, []);

    return {
        fields,
        state: {
            valid: state.counters.errors.isZero(),
            touched: !state.counters.touched.isZero(),
            changed: !state.counters.changed.isZero()
        }
    };
}

/**
 * Initializes fields schema.
 *
 * @param {Dictionary<Field>} initialSchema field schema
 * @param {Dictionary<FieldMutator>} mutators field mutators
 * @param {FormStateHandler} formState form state handler
 *
 * @returns {Dictionary<Field>} fields state
 */
function useFields(
        initialSchema: Dictionary<Field>,
        mutators: Dictionary<FieldMutator>,
        formState: FormStateHandler
): Dictionary<Field>
{
    const schema: React.MutableRefObject<Dictionary<Field> | null> = useRef(null);
    const fields: React.MutableRefObject<Dictionary<Field> | null> = useRef(null);

    if (schema.current !== initialSchema)
    {
        schema.current = initialSchema;
        fields.current = {};

        for (const key in initialSchema)
            fields.current[key] = new Field(key, initialSchema[key], mutators[key], formState, fields);
    }

    return fields.current ?? {};
}

/**
 * Handles form state.
 * Tracer, counters and rendering trigger.
 *
 * @param {FormOnChangeInterceptor} interceptor allows to intercept form
 *  change and modify field states.
 *
 * @returns {FormOnChangeInterceptor} form state handler.
 */
function useFormState(interceptor: FormOnChangeInterceptor): FormStateHandler
{
    // handles manually component render
    const render = useForceUpdate();
    // handles asynchronous tracestamps
    const tracer = useTraceRef();
    // counts touched fields
    const touched = useCounterRef();
    // counts fields with changes
    const changed = useCounterRef();
    // counts fields with errors
    const errors = useCounterRef();
    // whether component shouldn't render on any change
    const preventRender = useRef(false);

    // clears counters and async tracer
    useComponentWillUnmount(() =>
    {
        touched.reset();
        changed.reset();
        errors.reset();
        tracer.dispose();
    });

    return {
        render,
        tracer,
        interceptor,
        preventRender,
        counters: {
            touched,
            changed,
            errors
        }
    };
}
