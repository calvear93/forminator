/**
 * A generic object or dictionary.
 *
 * @export
 * @interface Dictionary
 * @template T
 */
export interface Dictionary<T> {
    [Key: string]: T;
}
