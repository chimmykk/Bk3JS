import fs from 'fs';
import { hash, hashString, rawHash, Blake3 } from 'fast-blake3';

// Basic usage - returns hex-encoded string
const hexHash: string = hash('Hello, World!') as string;
console.log('Basic hash:', hexHash);

// Class-based API with explicit encoding
const hex: string = Blake3.hash('Hello, World!', { encoding: 'hex' }) as string;
const buffer: Uint8Array = Blake3.hash('Hello, World!', { encoding: 'buffer' }) as Uint8Array;
const base64: string = Blake3.hash('Hello, World!', { encoding: 'base64' }) as string;
console.log('Hex:', hex);
console.log('Buffer:', buffer);
console.log('Base64:', base64);

// Typed options
const options: { encoding: 'hex' | 'base64' | 'buffer' } = { encoding: 'hex' };
const result: string = hash('test', options) as string;
console.log('Typed result:', result);

// hashString convenience function
const hashStr: string = hashString('Hello, World!') as string;
const hashStrBase64: string = hashString('Hello, World!', 'base64') as string;
console.log('hashString hex:', hashStr);
console.log('hashString base64:', hashStrBase64);

// rawHash - returns raw 32-byte Uint8Array
const rawResult: Uint8Array = rawHash(new Uint8Array([1, 2, 3, 4, 5]));
console.log('rawHash:', rawResult);

// Hash comparison
const a: string = hash('password123') as string;
const b: string = hash('password123') as string;
const c: string = hash('different') as string;
console.log('a === b:', a === b); // true
console.log('a === c:', a === c); // false

// File hashing
// const fileBuffer: Buffer = fs.readFileSync('file.txt');
// const fileHash: string = hash(fileBuffer) as string;
// console.log('File hash:', fileHash);
