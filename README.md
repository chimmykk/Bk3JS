# Bk3JS 

 BLAKE3 on js

**~850 MB/s** on 1MB+ inputs. Zero dependencies.

## Quick Start

```javascript
import { hash } from './blake3.js';

const data = new Uint8Array([1, 2, 3, 4, 5]);
const digest = hash(data);
console.log(digest); // 32-byte Uint8Array
```

## Run

```bash
npm test        # Verify correctness (3119 test vectors)
npm run example # Hash an image file  
npm run benchmark  # Performance test
```

## Performance

```
| Input Size | Throughput    | Ops/sec      |
|------------|---------------|--------------|
| 1 KB       |   305 MB/s    |   312,516    |
| 32 KB      |   720 MB/s    |    23,046    |
| 1 MB       |   845 MB/s    |       845    |
```

**Benchmarked on:** MacBook Pro, Intel Core i7 2.2 GHz 6-Core, 32 GB DDR4 2400 MHz



## Files

| File | Purpose |
|------|---------|
| `blake3.js` | Main library |
| `test.js` | 3119 official test vectors |
| `benchmark.js` | Throughput benchmarks |
| `example.js` | Hash an image demo |


