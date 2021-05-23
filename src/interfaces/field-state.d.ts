/**
 * Field state.
 *
 * @export
 * @interface FieldState
 */
export interface FieldState {

    /**
     * Current field state name.
     *
     * @type {string}
     */
    phase: string;

    /**
     * Current field value.
     *
     * @type {any}
     */
    value: any;

    /**
     * Whether field was changed least once.
     *
     * @type {boolean}
     */
    touched: boolean;

    /**
     * Whether field is different from default.
     *
     * @type {boolean}
     */
    changed: boolean;

    /**
     * Whether field is valid.
     *
     * @type {boolean}
     */
    valid: boolean;

    /**
     * Errors container.
     *
     * @type {any}
     */
    errors: any;

    /**
     * Loading flags
     *
     * @type {LoadingFieldState}
     */
    loading: LoadingFieldState;

    /**
     * Last validated value.
     *
     * @type {any}
     */
    lastValidated: any;
}

/**
 * Indicates what member is loading asynchronously.
 *
 * @export
 * @interface LoadingFieldState
 */
export interface LoadingFieldState {

    /**
     * Whether field is validating the value.
     *
     * @type {boolean}
     */
    validate: boolean;

    /**
     * Whether field is loading props.
     *
     * @type {boolean}
     */
    props: boolean;
}
