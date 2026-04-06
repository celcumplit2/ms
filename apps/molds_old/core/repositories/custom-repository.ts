import {Database} from '@/database';

export class CustomRepository {
  constructor(protected readonly database: Database) {
  }

  protected convertRelations(relations: string[]): Record<string, unknown> | undefined {
    if (relations.length === 0) {
      return undefined;
    }

    return relations.reduce((accumulator, relation) => {
      const parts = relation.split('.');

      if (parts.length === 1) {
        if (!accumulator[parts[0]]) {
          accumulator[parts[0]] = true;
        }

        return accumulator;
      }

      return {
        ...accumulator,
        ...this.convertNestedRelation(parts),
      };
    }, {} as Record<string, unknown>);
  }

  private convertNestedRelation(parts: string[]): Record<string, unknown> {
    if (parts.length > 1) {
      const part = parts.shift();

      return {[part!]: {with: this.convertNestedRelation(parts)}};
    }

    return {[parts[0]]: true};
  }
}
