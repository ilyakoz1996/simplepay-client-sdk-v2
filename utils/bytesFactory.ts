import { addHyphens, removeHyphens } from "./hyphensActions.js";
import uuidCheck from "./uuidCheck.js";

/**
 * Converts a bytes32 formatted string back to its original string format.
 * If the original string was a UUID v4, adds hyphens back to it.
 *
 * @param {string} bytes32 - The bytes32 formatted string to convert back.
 * @returns {string} - The original string, with hyphens added back if it was a UUID v4.
 */
export const bytes32ToString = (bytes32: string): string => {
    let buf = Buffer.from(bytes32.replace(/^0x/, ""), "hex");
    const str = buf.toString("utf8").replace(/\0+$/, "");
    if (uuidCheck(str)) {
      return addHyphens(str);
    } else return str;
};

/**
 * Attempts to convert a given string to a bytes32 format.
 * If the string is a valid UUID v4, it removes hyphens before conversion.
 *
 * @param {string} text - The text to convert.
 * @returns {string | null} - The converted string in bytes32 format, or null if conversion is not possible.
 */
export const stringToBytes32 = (text: string): string | null => {
    if (utf8ByteLength(text) > 32 && !uuidCheck(text)) {
      return null;
    }
    let string = text;
    let buf = Buffer.alloc(32);
    if (uuidCheck(string)) {
      string = removeHyphens(string);
    }
    buf.write(string, "utf8");
    return "0x" + buf.toString("hex");
};

/**
 * Converts a string to its byte representation.
 *
 * @param {string} str The string to convert.
 * @returns {Buffer} The byte representation of the string.
 */
export const stringToBytes = (str: string): Buffer => {
    return Buffer.from(str, "utf8");
  };
  
  /**
   * Converts a hex string back to its original string form.
   *
   * @param {string} hexStr The hex string to convert.
   * @returns {string} The original string.
   */
  export const bytesToString = (hexStr: string): string => {
    const hex = hexStr.startsWith("0x") ? hexStr.slice(2) : hexStr;
    return Buffer.from(hex, "hex").toString("utf8");
  };


/**
 * Calculates and returns the UTF-8 byte length of a given string.
 *
 * @param {string} text - The string whose byte length is to be calculated.
 * @returns {number} - The byte length of the input string.
 */
export const utf8ByteLength = (text: string): number => {
    const blob = new Blob([text]);
    return blob.size;
  };

