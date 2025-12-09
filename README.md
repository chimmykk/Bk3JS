# fast-blake3

A high-performance BLAKE3 cryptographic hash implementation for JavaScript and TypeScript, leveraging WebAssembly SIMD for optimized parallel processing.
## Overview

BLAKE3.js provides a fast, reliable implementation of the BLAKE3 hash function with the following characteristics:

- Dual module support (ESM and CommonJS)
- Complete TypeScript type definitions
- Cross-platform compatibility (Node.js and browser environments)

## Installation

```bash
npm install fast-blake3
```

## Usage

### ESM / TypeScript

```typescript
import { hash, Blake3 } from 'fast-blake3';

// Basic usage - returns hex-encoded string
const hexHash = hash('Hello, World!');

// Class-based API with explicit encoding
const hex = Blake3.hash('Hello, World!', { encoding: 'hex' });
const buffer = Blake3.hash('Hello, World!', { encoding: 'buffer' });
const base64 = Blake3.hash('Hello, World!', { encoding: 'base64' });
```

### CommonJS

```javascript
// Dynamic import required due to top-level await in the module
(async () => {
  const { hash, Blake3 } = await import('blake3js');
  const hexHash = hash('Hello, World!');
  console.log(hexHash);
})();
```

### Browser

```html
<script type="module">
  import { hash } from './dist/esm/index.js';
  console.log(hash('Hello, World!'));
</script>
```

## API Reference

### hash(data, options?)

Computes the BLAKE3 hash of the provided input.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `Uint8Array \| string \| Buffer` | Input data to hash |
| `options.encoding` | `'hex' \| 'base64' \| 'buffer'` | Output format (default: `'hex'`) |

**Returns:** `string | Uint8Array`

```typescript
import { hash } from 'fast-blake3';

const hex = hash('Hello, World!');
const binary = hash(new Uint8Array([1, 2, 3, 4, 5]), { encoding: 'buffer' });
```

### hashString(text, encoding?)

Convenience function for hashing UTF-8 encoded strings.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `text` | `string` | Input string |
| `encoding` | `'hex' \| 'base64' \| 'buffer'` | Output format (default: `'hex'`) |

**Returns:** `string | Uint8Array`

```typescript
import { hashString } from 'fast-blake3';

const hex = hashString('Hello, World!');
const base64 = hashString('Hello, World!', 'base64');
```

### rawHash(data)

Low-level function that operates directly on `Uint8Array` and returns the raw 32-byte hash.

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `data` | `Uint8Array` | Input data |

**Returns:** `Uint8Array` (32 bytes)

```typescript
import { rawHash } from 'fast-blake3';

const input = new Uint8Array([1, 2, 3]);
const output = rawHash(input);
```

### Blake3 Class

Static class providing an object-oriented interface.

| Method | Description |
|--------|-------------|
| `Blake3.hash(data, options?)` | Hash data with optional encoding |
| `Blake3.hashString(text, encoding?)` | Hash a string with optional encoding |

```typescript
import { Blake3 } from 'fast-blake3';

const hash1 = Blake3.hash('test');
const hash2 = Blake3.hashString('test', 'base64');
```

## Examples

### File Hashing (Node.js)

```typescript
import fs from 'fs';
import { hash } from 'fast-blake3';

const fileBuffer = fs.readFileSync('file.txt');
const fileHash = hash(fileBuffer);
console.log(`Hash: ${fileHash}`);
```

### Streaming Data

```typescript
import { rawHash } from 'fast-blake3';

const chunks: Uint8Array[] = [];

stream.on('data', chunk => chunks.push(chunk));
stream.on('end', () => {
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }
  console.log(rawHash(combined));
});
```

### Hash Comparison

```typescript
import { hash } from 'fast-blake3';

const a = hash('password123');
const b = hash('password123');
const c = hash('different');

console.log(a === b); // true
console.log(a === c); // false
```

## TypeScript

Type definitions are included in the package:

```typescript
import { Blake3, Blake3Options, hash } from 'fast-blake3';

const options: Blake3Options = { encoding: 'hex' };
const result: string = hash('test', options) as string;
```


