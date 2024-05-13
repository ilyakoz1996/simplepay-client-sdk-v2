/**
 * Removes all hyphens from a given UUID string.
 *
 * @param {string} uuid - The UUID string from which hyphens are to be removed.
 * @returns {string} - The UUID string without any hyphens.
 */
export declare const removeHyphens: (string: string) => string;
/**
 * Adds hyphens to a given string to format it as a UUID.
 *
 * @param {string} str - The string to be formatted as a UUID.
 * @returns {string} - The formatted string as a UUID.
 */
export declare const addHyphens: (str: string) => string;
