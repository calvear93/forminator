import { useEffect } from 'react';

/**
 * Executes on component unmounting.
 *
 * @param {Function} fn
 */
export function useComponentWillUnmount(fn: ()=> void): void
{
    useEffect(() => fn, []);
}
