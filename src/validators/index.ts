import * as schema from 'yup';
import { isValid as rutIsValid } from '../utils/rut.util';

/**
 * Checks if field is equals to arg.
 *
 * @param {string} str string for compare
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.string, 'equals', function(str: string, errorMessage: string)
{
    return this.test('string-equals-to', errorMessage, function(value: string | any)
    {
        const { path, createError } = this;

        if (value === str)
            return true;

        return createError({ path, message: errorMessage ?? '${path} must be equals to ' + str + ', but the final value was: ${value}' });
    });
});

/**
 * Checks if field is not equals to arg.
 *
 * @param {string} str string for compare
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.string, 'notEquals', function(str: string, errorMessage: string)
{
    return this.test('string-equals-to', errorMessage, function(value: string | any)
    {
        const { path, createError } = this;

        if (value !== str)
            return true;

        return createError({ path, message: errorMessage ?? '${path} must be different to ' + str });
    });
});

/**
 * Checks if field is a valid chilean phone.
 *
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.string, 'phone', function(errorMessage: string = '${path} must be a valid phone, but the final value was: ${value}')
{
    return this.test('string-is-valid-phone', errorMessage, function(value: string | any)
    {
        const { path, createError } = this;

        if (!value)
            return true;

        const isValid = /^\+?56\d{9}$/
            .test(value.replace(/\s/g, ''));

        return isValid || createError({ path, message: errorMessage });
    });
});

/**
 * Checks if field is a valid chilean RUT.
 *
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.string, 'rut', function(errorMessage: string = '${path} must be a valid R.U.T., but the final value was: ${value}')
{
    return this.test('string-is-valid-rut', errorMessage, function(value: string | any)
    {
        const { path, createError } = this;

        if (!value)
            return true;

        return rutIsValid(value) || createError({ path, message: errorMessage });
    });
});

/**
 * Checks if object has property.
 *
 * @param {string} propName property name
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.object, 'has', function(propName: string, errorMessage: string)
{
    return this.test('object-has', errorMessage, function(value: any)
    {
        const { path, createError } = this;

        if (propName in value)
            return true;

        return createError({ path, message: errorMessage ?? '${path} must has ' + propName + ' property' });
    });
});

/**
 * Checks if field is an empty.
 *
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.array, 'empty', function(errorMessage: string = '${path} must be an empty array')
{
    return this.test('array-is-empty', errorMessage, function(value: Array<any> | any)
    {
        const { path, createError } = this;

        if (value && value.length === 0)
            return true;

        return createError({ path, message: errorMessage });
    });
});

/**
 * Checks if field is an array and includes elements.
 *
 * @param {Array<any> | any} elements or array of elements must be included
 * @param {string} [errorMessage] error message
 */
schema.addMethod(schema.array, 'includes', function(elements: Array<any> | any, errorMessage: string = '${path} does not includes required elements')
{
    return this.test('array-includes', errorMessage, function(value: Array<any> | any)
    {
        const { path, createError } = this;

        const isArray: boolean = Array.isArray(elements);

        if (isArray && elements.some((el: any) => value.includes(el)))
            return true;

        if (!isArray && value.includes(elements))
            return true;

        return createError({ path, message: errorMessage });
    });
});

export default schema;

const { mixed, bool, boolean, string, number, date, object, array, ref, lazy } = schema;
export { mixed, bool, boolean, string, number, date, object, array, ref, lazy };
