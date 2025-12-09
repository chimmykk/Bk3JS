/**
 * JavaScript SDK Example (CommonJS)
 * Note: Since blake3.js uses ESM with top-level await, we use dynamic import
 */

(async () => {
  const { hash, hashString, Blake3 } = await import('../dist/esm/index.js');
  
  console.log('BLAKE3 SDK Examples (JavaScript CommonJS)\n' + '='.repeat(50) + '\n');

  // Example 1: Simple hash
  console.log('1. Simple hash:');
  const result = hash('Hello from CommonJS!');
  console.log(`   ${result}\n`);

  // Example 2: Different encodings
  console.log('2. Different encodings:');
  console.log(`   Hex:    ${hash('test', { encoding: 'hex' })}`);
  console.log(`   Base64: ${hash('test', { encoding: 'base64' })}`);
  const buf = hash('test', { encoding: 'buffer' });
  console.log(`   Buffer: ${buf.constructor.name}\n`);

  // Example 3: Class API
  console.log('3. Class API:');
  const classResult = Blake3.hash('CommonJS works!');
  console.log(`   ${classResult}\n`);

  // Example 4: Hash string convenience
  console.log('4. String hashing:');
  const strHash = hashString('Easy peasy!', 'hex');
  console.log(`   ${strHash}\n`);

  // Example 5: Binary data
  console.log('5. Binary data:');
  const buffer = Buffer.from([72, 101, 108, 108, 111]); // "Hello"
  const bufferHash = hash(buffer);
  console.log(`   Input: Buffer [${buffer.join(', ')}]`);
  console.log(`   Hash:  ${bufferHash}\n`);
})();
