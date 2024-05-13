/// <reference types="node" />
/**
 * Converts a bytes32 formatted string back to its original string format.
 * If the original string was a UUID v4, adds hyphens back to it.
 *
 * @param {string} bytes32 - The bytes32 formatted string to convert back.
 * @returns {string} - The original string, with hyphens added back if it was a UUID v4.
 */
export declare const bytes32ToString: (bytes32: string) => string;
/**
 * Attempts to convert a given string to a bytes32 format.
 * If the string is a valid UUID v4, it removes hyphens before conversion.
 *
 * @param {string} text - The text to convert.
 * @returns {string | null} - The converted string in bytes32 format, or null if conversion is not possible.
 */
export declare const stringToBytes32: (text: string) => string | null;
/**
 * Converts a string to its byte representation.
 *
 * @param {string} str The string to convert.
 * @returns {Buffer} The byte representation of the string.
 */
export declare const stringToBytes: (str: string) => Buffer;
/**
 * Converts a hex string back to its original string form.
 *
 * @param {string} hexStr The hex string to convert.
 * @returns {string} The original string.
 */
export declare const bytesToString: (hexStr: string) => string;
/**
 * Calculates and returns the UTF-8 byte length of a given string.
 *
 * @param {string} text - The string whose byte length is to be calculated.
 * @returns {number} - The byte length of the input string.
 */
export declare const utf8ByteLength: (text: string) => number;
