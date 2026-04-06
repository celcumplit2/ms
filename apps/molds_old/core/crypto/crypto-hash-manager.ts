import {HashManager} from '@/core/crypto/hash-manager';

interface Options {
  iterations: number;
  length: number;
  digest: 'SHA-512';
  salt: string;
}

export class CryptoHashManager implements HashManager {
  async generate(length: number): Promise<string> {
    const array = new Uint8Array(length);

    crypto.getRandomValues(array);

    return this.bufferToHex(array.buffer);
  }

  async create(secret: string): Promise<string> {
    return this.generateHash(secret.normalize(), {
      iterations: 1000,
      length: 64,
      digest: 'SHA-512',
      // 128-bit salt with prefix as recommended in "Appendix: A.2.1":
      // https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
      salt: `${ Date.now() }${ await this.generate(16) }`,
    });
  }

  async verify(secret: string, hash: string): Promise<boolean> {
    const input = hash.split('$');
    const options: Options = {
      iterations: input[0] ? Number(input[0]) : 0,
      length: input[1] ? Number(input[1]) : 0,
      digest: input[2] && input[2] === 'SHA-512' ? input[2] : 'SHA-512',
      salt: input[3] ?? '',
    };
    if (
      options.iterations !== 1000 ||
      options.length !== 64 ||
      options.digest !== 'SHA-512' ||
      !options.salt
    ) {
      return false;
    }

    const generatedHash = await this.generateHash(secret, options);

    return generatedHash === hash;
  }

  private async generateHash(secret: string, options: Options): Promise<string> {
    const { iterations, length, digest, salt } = options;
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret.normalize()),
      { name: 'PBKDF2' },
      false,
      ['deriveBits'],
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: encoder.encode(salt),
        iterations,
        hash: digest,
      },
      keyMaterial,
      length * 8, // length in bits
    );

    const hash = this.bufferToHex(derivedBits);

    // Order of keys MUST be always kept the same.
    return Object.values({ iterations, length, digest, salt, hash }).join('$');
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map((n) => n.toString(16).padStart(2, '0'))
      .join('');
  }
}
