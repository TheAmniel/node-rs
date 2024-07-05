/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/**
 * Encrypt a given text using the provided secret key and initialization vector (IV).
 *
 * @param {string} text
 * @param {Buffer} secret
 * @param {Buffer} iv
 * @returns {string} Data encrypted in hash
*/
export declare function encrypt(text: string, secret: Buffer, iv: Buffer): string
/**
 * Decrypt a given ciphertext using the provided secret key and initialization vector (IV).
 *
 * @param {string} ciphertext
 * @param {Buffer} secret
 * @param {Buffer} iv
 * @returns {string} Data decrypted into a String
*/
export declare function decrypt(ciphertext: string, secret: Buffer, iv: Buffer): string
/**
 * Cycle a given Number within a specified range, optionally in reverse.
 *
 * @param {number} num
 * @param {number} count
 * @param {boolean} [negative=false]
 * @returns {number} reverse Number
*/
export declare function cycle(num: number, count: number, negative?: boolean | undefined | null): number
