import { useRef } from 'react';

/**
 * Creates a trace handler for
 * creates tracestamps and validates.
 *
 * Used for mark and discard old async process.
 *
 * @export
 * @param {any} [def]
 *
 * @returns {any} trace handler
 *  {set(key), get(key), is(key, value)}
 */
export function useTraceRef(def = {})
{
    const tracer = useRef(def);

    return {
        set: (key) =>
        {
            tracer.current[key] = {};

            return tracer.current[key];
        },
        value: (key) => tracer.current[key],
        is: (key, value) => tracer.current[key] === value,
        dispose: () => tracer.current = {}
    };
}
