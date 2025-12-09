import { hash } from '../blake3.js';

function toHex(buffer) {
    return [...buffer].map(x => x.toString(16).padStart(2, '0')).join('');
}

console.log('BLAKE3 Hash Examples\n' + '='.repeat(50) + '\n');

// Example 1: Hash a small byte array
console.log('1. Small byte array:');
const smallData = new Uint8Array([1, 2, 3, 4, 5]);
const smallHash = hash(smallData);
console.log(`   Input: [${smallData.join(', ')}]`);
console.log(`   Hash:  ${toHex(smallHash)}\n`);

// Example 2: Hash a string (UTF-8 encoded)
console.log('2. String data:');
const text = 'Hello, BLAKE3!';
const textData = new TextEncoder().encode(text);
const textHash = hash(textData);
console.log(`   Input: "${text}"`);
console.log(`   Hash:  ${toHex(textHash)}\n`);

// Example 3: Hash empty data
console.log('3. Empty data:');
const emptyData = new Uint8Array(0);
const emptyHash = hash(emptyData);
console.log(`   Input: [] (empty)`);
console.log(`   Hash:  ${toHex(emptyHash)}\n`);

// Example 4: Hash larger data (1KB)
console.log('4. Larger data (1KB):');
const largeData = new Uint8Array(1024).fill(0x42);
const largeHash = hash(largeData);
console.log(`   Input: 1024 bytes (all 0x42)`);
console.log(`   Hash:  ${toHex(largeHash)}\n`);

// Example 5: Demonstrate deterministic hashing
console.log('5. Deterministic hashing:');
const data1 = new TextEncoder().encode('test');
const data2 = new TextEncoder().encode('test');
const hash1 = toHex(hash(data1));
const hash2 = toHex(hash(data2));
console.log(`   Same input produces same hash: ${hash1 === hash2}`);
console.log(`   Hash: ${hash1}\n`); 
