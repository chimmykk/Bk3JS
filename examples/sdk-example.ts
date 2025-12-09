/**
 * TypeScript SDK Example
 */

import { hash, hashString, Blake3 } from '../src/index.js';

console.log('BLAKE3 SDK Examples (TypeScript)\n' + '='.repeat(50) + '\n');

// Example 1: Simple hash function
console.log('1. Simple hash function:');
const simpleHash = hash('Hello, World!');
console.log(`   hash('Hello, World!') = ${simpleHash}\n`);

// Example 2: Different encodings
console.log('2. Different encodings:');
const hexHash = hash('test', { encoding: 'hex' });
const base64Hash = hash('test', { encoding: 'base64' });
const bufferHash = hash('test', { encoding: 'buffer' });
console.log(`   Hex:    ${hexHash}`);
console.log(`   Base64: ${base64Hash}`);
console.log(`   Buffer: Uint8Array(${(bufferHash as Uint8Array).length})\n`);

// Example 3: Hash binary data
console.log('3. Hash binary data:');
const binaryData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
const binaryHash = hash(binaryData);
console.log(`   Input:  [${Array.from(binaryData).map(b => '0x' + b.toString(16)).join(', ')}]`);
console.log(`   Hash:   ${binaryHash}\n`);

// Example 4: Using Blake3 class
console.log('4. Using Blake3 class:');
const classHash = Blake3.hash('BLAKE3 is fast!');
console.log(`   Blake3.hash('BLAKE3 is fast!') = ${classHash}\n`);

// Example 5: hashString convenience method
console.log('5. hashString convenience method:');
const stringHash = hashString('Convenience!', 'hex');
console.log(`   hashString('Convenience!') = ${stringHash}\n`);

// Example 6: Verify deterministic behavior
console.log('6. Deterministic hashing:');
const hash1 = hash('deterministic');
const hash2 = hash('deterministic');
const hash3 = hash('different');
console.log(`   hash('deterministic') === hash('deterministic'): ${hash1 === hash2}`);
console.log(`   hash('deterministic') === hash('different'):     ${hash1 === hash3}\n`);

// Example 7: Empty input
console.log('7. Empty input:');
const emptyHash = hash('');
console.log(`   hash('') = ${emptyHash}\n`);
