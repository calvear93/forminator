/**
 * Datetime mask definition for IMask.
 *
 * @summary Datetime mask for IMask.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-24 10:50:51
 * Last modified  : 2021-04-04 15:33:22
 */

import IMask from 'imask';

// formatter rules.
const definitions = {
    date: {
        d: {
            mask: IMask.MaskedRange,
            placeholderChar: 'd',
            from: 1,
            to: 31,
            maxLength: 2
        },
        m: {
            mask: IMask.MaskedRange,
            placeholderChar: 'm',
            from: 1,
            to: 12,
            maxLength: 2
        },
        Y: {
            mask: IMask.MaskedRange,
            placeholderChar: 'Y',
            from: 1000,
            to: 2999,
            maxLength: 4
        }
    },
    time: {
        s: {
            mask: IMask.MaskedRange,
            placeholderChar: 's',
            from: 0,
            to: 59,
            maxLength: 2
        },
        m: {
            mask: IMask.MaskedRange,
            placeholderChar: 'm',
            from: 0,
            to: 59,
            maxLength: 2
        },
        H: {
            mask: IMask.MaskedRange,
            placeholderChar: 'H',
            from: 0,
            to: 23,
            maxLength: 2
        }
    }
};

// mask.
const mask = {
    date: {
        mask: 'Y-m-d',
        overwrite: true,
        autofix: true,
        blocks: definitions.date
    },
    time: {
        mask: 'H:m',
        overwrite: true,
        autofix: true,
        blocks: definitions.time
    },
    datetime: {
        mask: 'Y-m-d{ }H:m',
        overwrite: true,
        autofix: true,
        blocks: {
            ...definitions.date,
            ...definitions.time
        }
    }
};

export default {
    date: IMask.createPipe(mask.date),
    time: IMask.createPipe(mask.time),
    datetime: IMask.createPipe(mask.datetime)
};
