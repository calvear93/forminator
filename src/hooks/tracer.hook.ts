import { useRef } from 'react';
import { TraceRefHandler } from '../interfaces';

/**
 * Creates a trace handler for
 * creates tracestamps and validates.
 *
 * Used for mark and discard old async process.
 *
 * @export
 * @param {any} [def]
 *
 * @returns {TraceRefHandler} trace handler
 *  {set(key), get(key), is(key, value)}
 */
export function useTraceRef(def: any = {}): TraceRefHandler
{
    const tracer = useRef(def);

    return {
        set: (key: string): void =>
        {
            tracer.current[key] = {};

            return tracer.current[key];
        },
        value: (key: any): any => tracer.current[key],
        is: (key: string, value: any): boolean => tracer.current[key] === value,
        dispose: (): any => tracer.current = {}
    };
}
