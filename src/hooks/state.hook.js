import { useState } from 'react';

/**
 * Allows to force component re-render.
 *
 * @returns {Function} forceUpdate
 */
export function useForceUpdate()
{
    const [ , forceUpdate ] = useState();

    return () => forceUpdate({});
}
