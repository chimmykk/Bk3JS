import { hash } from './blake3.js';
import { VECTOR } from './testvec.js';

function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}

console.log("BLAKE3 Test - Full Verification");
console.log("================================\n");

// Create test input buffer with pattern: input[i] = i & 0xff
const maxSize = 256 * 1024;
const inputBuffer = new Uint8Array(maxSize);
for (let i = 0; i < maxSize; i++) {
    inputBuffer[i] = i & 0xff;
}

console.log(`Loaded ${VECTOR.length} test vectors.`);
console.log("Starting verification...\n");

let passed = 0;
let failed = 0;

const start = performance.now();

for (const [size, expected] of VECTOR) {
    const input = new Uint8Array(inputBuffer.buffer, 0, size);
    const result = buf2hex(hash(input));

    if (result === expected) {
        passed++;
    } else {
        failed++;
        console.log(`✗ Size ${size}: FAIL`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Got:      ${result}`);
        // Stop on first failure
        break;
    }
}

const end = performance.now();

console.log(`---------------------------------`);
console.log(`Time: ${(end - start).toFixed(2)}ms`);
console.log(`Passed: ${passed}/${VECTOR.length}`);
console.log(`Failed: ${failed}/${VECTOR.length}`);

if (failed === 0) {
    console.log("\nAll tests passed!");
} else {
    console.log("\n Some tests failed!");
    process.exit(1);
}
