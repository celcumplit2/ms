export class Collection<T extends object = object> {
  readonly items: T[];
  readonly total: number;

  constructor({ items = [], total }: { items?: T[]; total?: number }) {
    this.items = items;
    this.total = total ?? items.length;
  }
}
