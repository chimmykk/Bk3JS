import { hash } from './blake3.js';

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${bytes / 1024} KB`;
    return `${bytes / (1024 * 1024)} MB`;
}

const CASES = [
    64,
    256,
    1024,           // 1 KB
    4 * 1024,       // 4 KB
    16 * 1024,      // 16 KB
    64 * 1024,      // 64 KB
    256 * 1024,     // 256 KB
    1024 * 1024,    // 1 MB
];

console.log("BLAKE3 Throughput Benchmark");
console.log("===========================\n");
console.log("------------------------------------------------------------------");
console.log("| Input Size | Throughput    | Time (avg)    | Ops/sec         |");
console.log("|------------|---------------|---------------|-----------------|");

for (const size of CASES) {
    const buffer = new Uint8Array(size);
    // Fill with pattern data
    for (let i = 0; i < size; i++) {
        buffer[i] = i & 0xff;
    }

    // Warmup
    for (let i = 0; i < 10; i++) {
        hash(buffer);
    }

    const ITERATIONS = Math.max(10, Math.floor(100 * 1024 * 1024 / size));

    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        hash(buffer);
    }
    const end = performance.now();

    const totalTimeMs = end - start;
    const avgTimeMs = totalTimeMs / ITERATIONS;
    const totalBytes = size * ITERATIONS;
    const mbPerSec = (totalBytes / (1024 * 1024)) / (totalTimeMs / 1000);
    const opsPerSec = Math.floor(ITERATIONS / (totalTimeMs / 1000));

    console.log(
        `| ${formatSize(size).padEnd(10)} | ${mbPerSec.toFixed(2).padStart(8)} MB/s | ${avgTimeMs.toFixed(4).padStart(8)} ms | ${opsPerSec.toString().padStart(12)} ops/s |`
    );
}
console.log("------------------------------------------------------------------");

