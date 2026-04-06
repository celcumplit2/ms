import {nullablePreprocessor} from '@/core/validators';
import {z} from 'zod';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['application/pdf'];

async function reCaptcha(token: string, action: string) {
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, {
    method: 'POST',
  });

  const json = await response.json();

  if (!json.success) {
    return false;
  }

  return Number(json.score) > 0.7 && json.action === action;
}

const reCaptchaMessage = {
  message: 'We\'ve detected unusual activity that suggests you\'re not a human. Please verify that you\'re not a bot and refresh the page and try to send the form again.',
};

export async function hireUsFormSchema() {
  return z.object({
    name: z.string().min(1).max(255),
    email: z.email().max(254),
    service: z.string().min(1).max(255),
    budget: z.coerce.number().positive().max(999999999999),
    message: z.string().trim().min(1).max(5000),
    acceptPolicy: z.coerce.boolean().refine((value) => value, {
      error: 'Please read and accept the privacy policy',
    }),
    token: z.string().min(1).refine(async (token) => {
      return await reCaptcha(token, 'hireUsForm');
    }, reCaptchaMessage),
  })
    .readonly();
}

export async function contactsFormSchema() {
  return z.object({
    name: z.string().min(1).max(255),
    email: z.email().max(254),
    subject: z.string().min(1).max(255),
    message: z.string().trim().min(1).max(5000),
    acceptPolicy: z.coerce.boolean().refine((value) => value, {
      error: 'Please read and accept the privacy policy',
    }),
    token: z.string().min(1).refine(async (token) => {
      return await reCaptcha(token, 'contactsForm');
    }, reCaptchaMessage),
  })
    .readonly();
}

export async function applyFormSchema() {
  return z.object({
    jobId: z.string().min(1).max(255),
    jobTitle: z.string().min(1).max(255),
    jobUrl: z.string().min(1).max(1000),
    name: z.string().min(1).max(255),
    surname: z.string().min(1).max(255),
    email: z.email().max(254),
    resume: z.instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {error: 'The PDF file size must not exceed 3 MB'})
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {error: 'Only PDF files are allowed for upload'}),
    coverLetter: z.instanceof(File)
      .transform((file, ctx) => {
        if (file.size === 0 && file.type === 'application/octet-stream' && file.name === 'undefined') {
          return null;
        }

        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: 'custom',
            message: 'The PDF file size must not exceed 3 MB',
          });
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Only PDF files are allowed for upload',
          });
        }

        return file;
      })
      .optional(),
    acceptPolicy: z.coerce.boolean().refine((value) => value, {
      error: 'Please read and accept the privacy policy',
    }),
  })
    .readonly();
}

export async function applyForJobFormSchema() {
  return z.object({
    name: z.string().min(1).max(255),
    surname: z.string().min(1).max(255),
    email: z.email().max(254),
    phone: z.preprocess(
      nullablePreprocessor,
      z.string().min(7).max(15)
        .refine((value: string) => value.length === 0 || value.startsWith('+'), {error: 'Phone number should be in international format and start with "+"'})
        .nullable(),
    ),
    telegram: z.preprocess(
      nullablePreprocessor,
      z.string().max(255).nullable(),
    ),
    linkedin: z.preprocess(
      nullablePreprocessor,
      z.url().max(255).or(z.literal('')).nullable(),
    ),
    resume: z.instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {error: 'The PDF file size must not exceed 3 MB'})
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {error: 'Only PDF files are allowed for upload'}),
    coverLetter: z.instanceof(File)
      .transform((file, ctx) => {
        if (file.size === 0 && file.type === 'application/octet-stream' && file.name === 'undefined') {
          return null;
        }

        if (file.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: 'custom',
            message: 'The PDF file size must not exceed 3 MB',
          });
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Only PDF files are allowed for upload',
          });
        }

        return file;
      })
      .optional(),
    acceptPolicy: z.coerce.boolean().refine((value) => value, {
      error: 'Please read and accept the privacy policy',
    }),
  })
    .readonly();
}

export async function scheduleConsultationFormSchema() {
  return z.object({
    name: z.string().min(1).max(255),
    surname: z.string().min(1).max(255),
    title: z.preprocess(
      nullablePreprocessor,
      z.string().min(1).max(255).nullable(),
    ),
    company: z.preprocess(
      nullablePreprocessor,
      z.string().min(1).max(255).nullable(),
    ),
    website: z.preprocess(
      nullablePreprocessor,
      z.url().min(1).max(255).nullable(),
    ),
    email: z.email().max(254),
    phone: z.preprocess(
      nullablePreprocessor,
      z.string().min(7).max(15)
        .refine((value: string) => value.length === 0 || value.startsWith('+'), {error: 'Phone number should be in international format and start with "+"'})
        .nullable(),
    ),
    budget: z.coerce.number().positive().max(999999999999),
    message: z.string().trim().min(1).max(5000),
    acceptPolicy: z.coerce.boolean().refine((value) => value, {
      error: 'Please read and accept the privacy policy',
    }),
  })
    .readonly();
}
