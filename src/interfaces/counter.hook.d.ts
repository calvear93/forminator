/**
 * Counter hook handler.
 *
 * @export
 * @interface CounterRefHandler
 */
export interface CounterRefHandler {

     /**
      * Increments counter.
      */
     increment(): any;

     /**
      * Decrements counter.
      */
     decrement (): any;

     /**
      * Sets counter value.
      *
      * @param {number} value
      *
      * @returns {any}
      */
     set (value: number): any;

     /**
      * Returns current counter value.
      *
      * @returns {number}
      */
     count (): number;

     /**
      * REsets counter.
      *
      * @returns {any}
      */
     reset (): any;

     /**
      * Increments or decrement counter from boolean.
      * If true increments, in otherwise decrements.
      *
      * @param {boolean} value
      *
      * @returns {any}
      */
     fromBool (value: boolean): any;

     /**
      * If counter value is the default.
      *
      * @returns {boolean}
      */
     isDefault (): boolean;

     /**
      * If counter value is zero.
      *
      * @returns {boolean}
      */
     isZero (): boolean;
}
