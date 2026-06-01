declare module 'node:sqlite' {
  export class DatabaseSync {
    constructor(path: string);

    prepare(sql: string): {
      all(...params: unknown[]): unknown[];
    };
  }
}
