import {HashManager} from '@/core/crypto/hash-manager';
import bcrypt from 'bcrypt';

export class BcryptHashManager implements HashManager {
  async generate(length: number): Promise<string> {
    return bcrypt.genSaltSync(length);
  };

  async create(secret: string): Promise<string> {
    return bcrypt.hashSync(secret, await this.generate(10));
  };

  async verify(secret: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(secret, hash);
  };
}
