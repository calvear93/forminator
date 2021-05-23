import { Field } from '../classes/field';
import { Dictionary, FieldMutator, FormOnChangeInterceptor, FormReturn } from '../interfaces';

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
export declare function useForm(
    schema: Dictionary<Field>,
    mutators: Dictionary<FieldMutator>,
    interceptor: FormOnChangeInterceptor
): FormReturn;
