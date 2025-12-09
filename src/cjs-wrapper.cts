/**
 * CommonJS wrapper for BLAKE3
 * Uses dynamic import to load ESM blake3.js
 */

export interface Blake3Options {
  encoding?: 'hex' | 'base64' | 'buffer';
}

interface Blake3Module {
  hash: (input: Uint8Array) => Uint8Array;
}

let blake3Module: Blake3Module | null = null;
let initPromise: Promise<void> | null = null;

async function ensureInitialized() {
  if (blake3Module) return;
  if (!initPromise) {
    // @ts-ignore - blake3.js is a JS file without type definitions
    initPromise = import('../blake3.js').then((mod: any) => {
      blake3Module = mod as Blake3Module;
    });
  }
  await initPromise;
}

function toUint8Array(data: Uint8Array | string | Buffer): Uint8Array {
  if (typeof data === 'string') {
    return new TextEncoder().encode(data);
  }
  if (Buffer.isBuffer(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  return data;
}

function encode(
  buffer: Uint8Array,
  encoding: 'hex' | 'base64' | 'buffer'
): string | Uint8Array {
  switch (encoding) {
    case 'hex':
      return Array.from(buffer)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    
    case 'base64':
      return Buffer.from(buffer).toString('base64');
    
    case 'buffer':
      return buffer;
    
    default:
      throw new Error(`Unsupported encoding: ${encoding}`);
  }
}

export class Blake3 {
  static async hash(
    data: Uint8Array | string | Buffer,
    options: Blake3Options = {}
  ): Promise<string | Uint8Array> {
    await ensureInitialized();
    if (!blake3Module) throw new Error('Failed to initialize BLAKE3 module');
    const { encoding = 'hex' } = options;
    const input = toUint8Array(data);
    const hashBuffer = blake3Module.hash(input);
    return encode(hashBuffer, encoding);
  }

  static async hashString(
    text: string,
    encoding: 'hex' | 'base64' | 'buffer' = 'hex'
  ): Promise<string | Uint8Array> {
    return this.hash(text, { encoding });
  }
}

export async function hash(
  data: Uint8Array | string | Buffer,
  options?: Blake3Options
): Promise<string | Uint8Array> {
  return Blake3.hash(data, options);
}

export async function hashString(
  text: string,
  encoding?: 'hex' | 'base64' | 'buffer'
): Promise<string | Uint8Array> {
  return Blake3.hashString(text, encoding);
}

export async function rawHash(input: Uint8Array): Promise<Uint8Array> {
  await ensureInitialized();
  if (!blake3Module) throw new Error('Failed to initialize BLAKE3 module');
  return blake3Module.hash(input);
}

export default Blake3;
