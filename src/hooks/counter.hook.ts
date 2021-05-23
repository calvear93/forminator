import { useRef } from 'react';
import { CounterRefHandler } from '../interfaces';

/**
 * Initializes a counter.
 * Doesn't triggers component rendering.
 *
 * @export
 * @param {number} [def] default counter value
 *
 * @returns {CounterRefHandler} counter handler
 *  {increment(), decrement(), set(value), get(), reset()}
 */
export function useCounterRef(def: number = 0): CounterRefHandler
{
    const counter = useRef(def);

    return {
        increment: (): any => ++counter.current,
        decrement: (): any => counter.current > 0 && --counter.current,
        set: (value: number): any => counter.current = value,
        count: (): number => counter.current,
        reset: (): any => counter.current = def,
        fromBool: (value: boolean): any => value ? ++counter.current : counter.current > 0 && --counter.current,
        isDefault: (): boolean => counter.current === def,
        isZero: (): boolean => counter.current === 0
    };
}
