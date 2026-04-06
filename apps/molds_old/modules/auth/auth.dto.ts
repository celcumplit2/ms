import {z} from 'zod';

export async function singInSchema() {
  return z.object({
    email: z.email().min(1),
    password: z.string().min(1),
  })
    .readonly();
}
