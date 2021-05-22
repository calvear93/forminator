/**
 * Chilean phone number mask definition for IMask.
 *
 * @summary Phone number mask for IMask.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-24 10:56:49
 * Last modified  : 2021-04-04 15:35:30
 */

import IMask from 'imask';

// mask.
const mask = {
    default: {
        overwrite: true,
        autofix: true,
        mask: '+{56}{ }000000000'
    },
    chilean: {
        mask: [
            {
                name: 'landline metropolitan',
                mask: '{+56}{ }{2}{ }0000{ }0000'
            },
            {
                name: 'mobile',
                mask: '{+56}{ }{9}{ }0000{ }0000'
            },
            {
                name: 'landline',
                mask: '{+56}{ }{00}{ }000{ }0000'
            }
        ],
        dispatch(appended, dynamicMasked)
        {
            if (dynamicMasked.value.length > 4)
                return dynamicMasked.currentMask;

            switch (appended)
            {
                case '2':
                    return dynamicMasked.compiledMasks[0];

                case '9':
                    return dynamicMasked.compiledMasks[1];

                default:
                    return dynamicMasked.compiledMasks[2];
            }
        }
    }
};

export default {
    default: IMask.createPipe(mask.default),
    chilean: IMask.createPipe(mask.chilean)
};
