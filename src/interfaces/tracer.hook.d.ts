/**
 * Tracer hook handler.
 *
 * @export
 * @interface TraceRefHandler
 */
export interface TraceRefHandler {

    /**
     * Sets new value.
     *
     * @param {string} key
     */
    set(key: string): void;

    /**
     * Gets the value.
     *
     * @param {string} key
     *
     * @returns {any}
     */
    value(key: string): any;

    /**
     * Validates if input is equal to value.
     *
     * @param {string} key
     * @param {any} value
     *
     * @returns {boolean} whether param is equal to value
     */
    is(key: string, value: any): boolean;

    /**
     * Clears container.
     *
     * @returns {any}
     */
    dispose(): any;
}
