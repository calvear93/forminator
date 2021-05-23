/**
 * Chilean Id (RUT/RUN) definition for IMask.
 *
 * @summary RUT/RUN mask for IMask.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-24 10:58:32
 * Last modified  : 2021-05-22 11:36:32
 */

import IMask from 'imask';

// mask.
export default {
    default: IMask.createPipe({
        mask: [
            {
                mask: '0{.}000{.}000{-}[&]',
                definitions: {
                    '&': /[0-9kK]/
                }
            },
            {
                mask: '00{.}000{.}000{-}[&]',
                definitions: {
                    '&': /[0-9kK]/
                }
            },
            {
                mask: '000{.}000{.}000{-}[&]',
                definitions: {
                    '&': /[0-9kK]/
                }
            }
        ],
        dispatch(appended, dynamicMasked)
        {
            const length = dynamicMasked.value?.length + appended?.length;

            if (length < 12)
                return dynamicMasked.compiledMasks[0];

            if (length === 12)
                return dynamicMasked.compiledMasks[1];

            return dynamicMasked.compiledMasks[2];
        }
    })
};
