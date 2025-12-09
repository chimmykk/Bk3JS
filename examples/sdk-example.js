/**
 * JavaScript SDK Example (ESM)
 */

import { hash, hashString, Blake3 } from '../dist/esm/index.js';

console.log('BLAKE3 SDK Examples (JavaScript ESM)\n' + '='.repeat(50) + '\n');

// Example 1: Simple usage
console.log('1. Simple hash:');
const result = hash('Hello, BLAKE3!');
console.log(`   ${result}\n`);

// Example 2: Hash with different encodings
console.log('2. Different encodings:');
console.log(`   Hex:    ${hash('test', { encoding: 'hex' })}`);
console.log(`   Base64: ${hash('test', { encoding: 'base64' })}`);
console.log(`   Buffer: ${hash('test', { encoding: 'buffer' }).constructor.name}\n`);

// Example 3: Using the class API
console.log('3. Class API:');
const classResult = Blake3.hash('Class-based API');
console.log(`   ${classResult}\n`);

// Example 4: Hash binary data
console.log('4. Binary data:');
const data = new Uint8Array([1, 2, 3, 4, 5]);
const dataHash = hash(data);
console.log(`   Input: [${data.join(', ')}]`);
console.log(`   Hash:  ${dataHash}\n`);

// Example 5: Convenience method
console.log('5. String hashing:');
const strHash = hashString('Quick and easy!');
console.log(`   ${strHash}\n`);
