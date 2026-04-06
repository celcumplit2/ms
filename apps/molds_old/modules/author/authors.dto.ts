import {nullablePreprocessor} from '@/core/validators';
import {z} from 'zod';

export async function authorSchema() {
  return z.object({
    alias: z.string().min(1).max(255),
    fullName: z.string().min(1).max(255),
    position: z.string().min(1).max(255),
    photo: z.preprocess(nullablePreprocessor, z.string().min(1).max(255).nullable()),
    bio: z.string().min(1).max(5000),
    expertise: z.array(z.string().min(1).max(1000)),
    education: z.object({
      institution: z.string().min(1).max(255),
      field: z.preprocess(nullablePreprocessor, z.string().min(1).max(255).nullable()),
      degree: z.preprocess(nullablePreprocessor, z.enum(['Master Degree']).nullable()),
    }),
    // 'education[institution]': z.string().min(1).max(255),
    // 'education[field]': z.preprocess(nullablePreprocessor, z.string().min(1).max(255).nullable()),
    // 'education[degree]': z.preprocess(nullablePreprocessor, z.enum(['Master Degree']).nullable()),
    meta: z.object({
      title: z.string().min(1).max(70),
      description: z.string().min(1).max(300),
    }),
    // 'meta[title]': z.string().min(1).max(70),
    // 'meta[description]': z.string().min(1).max(300),
    socials: z.array(z.object({
      type: z.enum(['instagram', 'facebook', 'linkedin', 'x', 'github']),
      url: z.url().min(1).max(2080),
    })),
  })
    .readonly();
}
