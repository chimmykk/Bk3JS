/**
 * Example: Hash an image file using BLAKE3
 */

import fs from 'fs';
import { hash } from '../blake3.js';

function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}


const imagePath = './image/test.jpg';

// Check if file exists
if (!fs.existsSync(imagePath)) {
    console.error(`Error: File not found: ${imagePath}`);
    console.log('Please place a test.jpg file in the image/ directory');
    process.exit(1);
}

// Read the image file
const imageBuffer = fs.readFileSync(imagePath);
const imageData = new Uint8Array(imageBuffer);

console.log('BLAKE3 Image Hashing Example');
console.log('============================\n');
console.log(`File: ${imagePath}`);
console.log(`Size: ${imageData.length} bytes (${(imageData.length / 1024).toFixed(2)} KB)`);

// Warmup runs (JIT compilation)
console.log('\nWarming up...');
for (let i = 0; i < 5; i++) {
    hash(imageData);
}

// Benchmark with multiple iterations
const ITERATIONS = 10;
const start = performance.now();
let hashResult;
for (let i = 0; i < ITERATIONS; i++) {
    hashResult = hash(imageData);
}
const end = performance.now();

const hexHash = buf2hex(hashResult);
const avgTimeMs = (end - start) / ITERATIONS;
const throughputMBs = (imageData.length / (1024 * 1024)) / (avgTimeMs / 1000);

console.log(`\nBLAKE3 Hash: ${hexHash}`);
console.log(`Iterations: ${ITERATIONS}`);
console.log(`Avg Time: ${avgTimeMs.toFixed(4)} ms`);
console.log(`Throughput: ${throughputMBs.toFixed(2)} MB/s`);
