import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {z, ZodError, ZodNumber, ZodObject, ZodReadonly, ZodString} from 'zod';

export async function validate(
  schema: ZodReadonly<
    | ZodObject<Record<string, ZodString>>
    | ZodObject<Record<number, ZodNumber>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  > | ZodObject<any>,
  data: Record<string, unknown>,
): Promise<z.infer<typeof schema>> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (!(error instanceof ZodError)) {
      throw error;
    }

    throw new UnprocessablePayload(error.issues.reduce((accumulator, issue) => ({
      ...accumulator,
      [issue.path.join('.')]: issue.message,
    }), {}));
  }
}

export function nullablePreprocessor(value: unknown): unknown | null {
  return value === '' ? null : value;
}
