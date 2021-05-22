import { useRef } from 'react';

/**
 * Initializes a counter.
 * Doesn't triggers component rendering.
 *
 * @export
 * @param {number} [def] default counter value
 *
 * @returns {any} counter handler
 *  {increment(), decrement(), set(value), get(), reset()}
 */
export function useCounterRef(def = 0)
{
    const counter = useRef(def);

    return {
        increment: () => ++counter.current,
        decrement: () => counter.current > 0 && --counter.current,
        set: (value) => counter.current = value,
        count: () => counter.current,
        reset: () => counter.current = def,
        fromBool: (value) => value ? ++counter.current : counter.current > 0 && --counter.current,
        isDefault: () => counter.current === def,
        isZero: () => counter.current === 0
    };
}
