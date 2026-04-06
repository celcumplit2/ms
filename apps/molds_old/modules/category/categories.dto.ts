import {nullablePreprocessor} from '@/core/validators';
import {database} from '@/database';
import {CategoryRepository} from '@/modules/category/category.repository';
import {z} from 'zod';

export async function categorySchema() {
  const categoryRepository = new CategoryRepository(database);

  return z.object({
    name: z.string().min(1).max(255),
    alias: z.string().min(1).max(500),
    parentId: z.preprocess(
      nullablePreprocessor,
      z.coerce.number()
        .min(1)
        .nullable()
        .refine(
          (parentId: number | null) => !parentId ? true : categoryRepository.exists({id: parentId})
        )
    ),
    description: z.string().max(65535),
  })
    .readonly();
}
