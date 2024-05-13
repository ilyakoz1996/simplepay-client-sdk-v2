/**
 * Removes all hyphens from a given UUID string.
 *
 * @param {string} uuid - The UUID string from which hyphens are to be removed.
 * @returns {string} - The UUID string without any hyphens.
 */
export const removeHyphens = (string) => {
    return string.replace(/-/g, "");
};
/**
 * Adds hyphens to a given string to format it as a UUID.
 *
 * @param {string} str - The string to be formatted as a UUID.
 * @returns {string} - The formatted string as a UUID.
 */
export const addHyphens = (str) => {
    const parts = [
        str.substring(0, 8),
        str.substring(8, 12),
        str.substring(12, 16),
        str.substring(16, 20),
        str.substring(20),
    ];
    return parts.join("-");
};
//# sourceMappingURL=hyphensActions.js.map