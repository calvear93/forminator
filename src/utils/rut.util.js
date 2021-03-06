/**
 * Chilean RUT/RUN handling utility.
 *
 * @summary Chilean RUT/RUN utility.
 * @author Alvear Candia, Cristopher Alejandro <caalvearc@achs.cl>
 *
 * Created at     : 2020-05-16 16:40:56
 * Last modified  : 2021-04-11 19:28:32
 */

/**
 * Calculates the check digit of a rut/ci.
 *
 * @param {string} id RUT (Rol Único Tributario), RUN (Rol Único Nacional).
 *
 * @returns {string} check digit.
 */
export function checkDigit(id)
{
    let sum = 0;
    let mul = 2;

    for (let i = id.length - 1; i >= 0; i--)
    {
        sum = sum + Number(id.charAt(i)) * mul;
        mul = (mul + 1) % 8 || 2;
    }

    switch (sum % 11)
    {
        case 1:
            return 'K';

        case 0:
            return '0';

        default:
            return (11 - (sum % 11)).toString();
    }
}

/**
 * Removes all dots and the hyphen.
 *
 * @param {string | undefined} rut chilean id.
 *
 * @returns {string} cleaned id.
 */
export function clean(rut)
{
    if (!rut)
        return '';

    return rut.replace(/[.-]/g, '');
}

/**
 * Validates chilean Id.
 *
 * @param {string | undefined} id RUT (Rol Único Tributario), RUN (Rol Único Nacional).
 *
 * @returns {boolean} whether id is valid.
 */
export function isValid(id)
{
    id = clean(id);

    if (id.length < 7)
        return false;

    let dv = id.charAt(id.length - 1);
    dv = dv === 'k' ? 'K' : dv;

    const dvC = checkDigit(id.substring(0, id.length - 1));

    return dv === dvC.toString();
}
