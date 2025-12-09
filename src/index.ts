/**
 * BLAKE3 Hash SDK
 * High-performance cryptographic hash function with SIMD optimization
 */

import { hash as blake3Hash } from './blake3.js';

/**
 * Options for BLAKE3 hashing operations
 */
export interface Blake3Options {
  /** Output encoding format */
  encoding?: 'hex' | 'base64' | 'buffer';
}

/**
 * BLAKE3 hasher class for convenient hashing operations
 */
export class Blake3 {
  /**
   * Hash data and return result in specified format
   * @param data - Input data as Uint8Array, string, or Buffer
   * @param options - Hashing options
   * @returns Hash result in specified encoding (default: hex)
   */
  static hash(
    data: Uint8Array | string | Buffer,
    options: Blake3Options = {}
  ): string | Uint8Array {
    const { encoding = 'hex' } = options;
    
    // Convert input to Uint8Array
    const input = this.toUint8Array(data);
    
    // Compute hash
    const hashBuffer = blake3Hash(input);
    
    // Return in requested format
    return this.encode(hashBuffer, encoding);
  }

  /**
   * Hash a string (UTF-8 encoded)
   * @param text - Input string
   * @param encoding - Output encoding (default: hex)
   * @returns Hash result
   */
  static hashString(
    text: string,
    encoding: 'hex' | 'base64' | 'buffer' = 'hex'
  ): string | Uint8Array {
    return this.hash(text, { encoding });
  }

  /**
   * Convert various input types to Uint8Array
   */
  private static toUint8Array(data: Uint8Array | string | Buffer): Uint8Array {
    if (typeof data === 'string') {
      return new TextEncoder().encode(data);
    }
    if (data instanceof Buffer) {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
    return data;
  }

  /**
   * Encode hash buffer to specified format
   */
  private static encode(
    buffer: Uint8Array,
    encoding: 'hex' | 'base64' | 'buffer'
  ): string | Uint8Array {
    switch (encoding) {
      case 'hex':
        return Array.from(buffer)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      
      case 'base64':
        if (typeof Buffer !== 'undefined') {
          return Buffer.from(buffer).toString('base64');
        }
        // Browser fallback
        return btoa(String.fromCharCode(...buffer));
      
      case 'buffer':
        return buffer;
      
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }
}

/**
 * Hash data using BLAKE3
 * @param data - Input data
 * @param options - Hashing options
 * @returns Hash result (default: hex string)
 */
export function hash(
  data: Uint8Array | string | Buffer,
  options?: Blake3Options
): string | Uint8Array {
  return Blake3.hash(data, options);
}

/**
 * Hash a string using BLAKE3
 * @param text - Input string
 * @param encoding - Output encoding (default: hex)
 * @returns Hash result
 */
export function hashString(
  text: string,
  encoding?: 'hex' | 'base64' | 'buffer'
): string | Uint8Array {
  return Blake3.hashString(text, encoding);
}

// Re-export the raw hash function for advanced users
export { hash as rawHash } from './blake3.js';

// Default export
export default Blake3;
