import fs from 'fs';
import { hash, hashString, rawHash, Blake3 } from 'fast-blake3';

// Basic usage - returns hex-encoded string
const hexHash = hash('Hello, World!');
console.log('Basic hash:', hexHash);

// Class-based API with explicit encoding
const hex = Blake3.hash('Hello, World!', { encoding: 'hex' });
const buffer = Blake3.hash('Hello, World!', { encoding: 'buffer' });
const base64 = Blake3.hash('Hello, World!', { encoding: 'base64' });
console.log('Hex:', hex);
console.log('Buffer:', buffer);
console.log('Base64:', base64);

// hashString convenience function
const hashStr = hashString('Hello, World!');
const hashStrBase64 = hashString('Hello, World!', 'base64');
console.log('hashString hex:', hashStr);
console.log('hashString base64:', hashStrBase64);

// rawHash - returns raw 32-byte Uint8Array
const rawResult = rawHash(new Uint8Array([1, 2, 3, 4, 5]));
console.log('rawHash:', rawResult);

// Hash comparison
const a = hash('password123');
const b = hash('password123');
const c = hash('different');
console.log('a === b:', a === b); // true
console.log('a === c:', a === c); // false

// File hashing
// const fileBuffer = fs.readFileSync('file.txt');
// const fileHash = hash(fileBuffer);
// console.log('File hash:', fileHash);
