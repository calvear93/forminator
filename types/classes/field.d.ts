import { RefObject } from 'react';

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
     * @type {RefObject<HTMLElement>}
     */
    public ref?: RefObject<HTMLElement>;

    /**
     * Field props.
     *
     * @public
     * @type {any}
     */
    public props: any;

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
     * @type {any}
     */
    public prevState: any;

    /**
    * Current field state.
    *
    * @public
    * @type {any}
    */
    public state: any;

    /**
     * Fields state handler.
     *
     * @private
     * @type {any}
     */
    private fields: any;

    /**
    * Form state handler.
    *
    * @public
    * @type {any}
    */
    private formStateHandler: any;

    /**
     * Field default value.
     *
     * @private
     * @type {Function}
     */
    private equal: Function;

    /**
    * Field mutators as validator and mask.
    *
    * @private
    * @type {any}
    */
    private mutators: any;

    /**
    * Indicates if schema was initialized once.
    *
    * @private
    * @type {boolean}
    */
    private _initialized?: boolean;

    /**
     * Initializes field state.
     *
     * @param {string} key field name
     * @param {any} fieldSchema field initial config and state
     * @param {any} fieldMutators field mutators as validate, mask or props mutator
     * @param {any} formStateHandler handles form tracers, counters and redering
     * @param {any} fields fields states and values
     */
    constructor (key: string, fieldSchema: any, fieldMutators: any, formStateHandler: any, fields: any);

    /**
     * Retrieves secret name for current project group.
     *
     * @param {string} key secret key
     * @returns {string} secret name
     */
    // public secretName(key: string): string;
}
