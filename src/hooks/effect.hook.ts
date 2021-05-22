import { useEffect } from 'react';

/**
 * Executes on component unmounting.
 *
 * @param {Function} fn
 */
export function useComponentWillUnmount(fn)
{
    useEffect(() => fn, []);
}
