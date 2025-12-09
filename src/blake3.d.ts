/**
 * Type definitions for blake3.js
 */

/**
 * Compute BLAKE3 hash of input data
 * @param input - Input data as Uint8Array
 * @returns 32-byte hash as Uint8Array
 */
export function hash(input: Uint8Array): Uint8Array;
