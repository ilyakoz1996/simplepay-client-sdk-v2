import { removeHyphens } from "./hyphensActions.js";
/**
 * Checks if a string has the potential format of a UUID v4 without hyphens.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string could potentially be a UUID v4, false otherwise.
 */
export default function uuidCheck(str) {
    let plainStr = removeHyphens(str);
    if (plainStr.length !== 32) {
        return false;
    }
    if (plainStr.charAt(12) !== "4") {
        return false;
    }
    const seventeenthChar = plainStr.charAt(16).toLowerCase();
    if (!["8", "9", "a", "b"].includes(seventeenthChar)) {
        return false;
    }
    if (!plainStr.match(/^[0-9a-fA-F]+$/)) {
        return false;
    }
    return true;
}
;
//# sourceMappingURL=uuidCheck.js.map