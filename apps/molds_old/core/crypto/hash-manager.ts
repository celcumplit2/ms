export interface HashManager {
  generate(length: number): Promise<string>;

  create(secret: string): Promise<string>;

  verify(secret: string, hash: string): Promise<boolean>;
}
