import {nullablePreprocessor} from '@/core/validators';
import {
  EquipmentPolicy,
  JobCategory,
  JobDurationType,
  JobEmploymentType,
  JobManagementMethodology,
  JobMode,
  JobSeniority,
  JobWorkload,
  UTC_OFFSETS,
} from '@/modules/job/job.model';
import {getCountryData, TCountryCode} from 'countries-list';
import {z} from 'zod';

export async function jobSchema() {
  return z.object({
    alias: z.string().min(1).max(255),
    title: z.string().min(1).max(255),
    intro: z.string().min(1).max(255),
    description: z.string().min(1).max(16_777_215),
    category: z.enum(JobCategory),
    seniority: z.array(z.enum(JobSeniority)).default([JobSeniority.middle, JobSeniority.senior]),
    workload: z.array(z.enum(JobWorkload)).default([JobWorkload.fullTime]),
    mode: z.array(z.enum(JobMode)).default([JobMode.remote]),
    employmentType: z.array(z.enum(JobEmploymentType)).default([JobEmploymentType.contractor, JobEmploymentType.employee]),
    duration: z.union([
      z.object({type: z.literal(JobDurationType.indeterminate)}),
      z.object({type: z.literal(JobDurationType.fixed), days: z.coerce.number().min(0).max(999999)}),
      z.object({
        type: z.literal(JobDurationType.range),
        minDays: z.coerce.number().min(0).max(999999),
        maxDays: z.coerce.number().min(0).max(999999),
      }).superRefine((duration, ctx) => {
        if (!duration.minDays && !duration.maxDays) {
          ctx.addIssue({
            code: 'custom',
            path: ['minDays'],
            message: 'You should specify at least the minimum range',
          });
        }
      }),
    ]).default({type: JobDurationType.indeterminate}),
    urgentStart: z.coerce.boolean().default(false).optional(),
    startDate: z.preprocess(nullablePreprocessor, z.string().pipe(z.coerce.date()).nullable().optional()),
    endDate: z.preprocess(nullablePreprocessor, z.string().pipe(z.coerce.date()).nullable().optional()),
    workingHoursStart: z.preprocess((time) => `${time}:00`, z.iso.time()).optional().default('09:00'),
    workingHoursEnd: z.preprocess((time) => `${time}:00`, z.iso.time()).optional().default('18:00'),
    workingHoursUTCOffset: z.string().refine((utc) => UTC_OFFSETS.includes(utc)).optional().default('+03:00'),
    utcOffsetsRestrictions: z.array(z.string().refine((utc) => UTC_OFFSETS.includes(utc))).optional().default(['+00:00', '+01:00', '+02:00', '+03:00', '+04:00']),
    hardSkillRequirements: z.array(z.string().min(1)).optional().default([]),
    softSkillRequirements: z.array(z.string().min(1)).optional().default([]),
    hardSkillsNiceToHave: z.array(z.string().min(1)).optional().default([]),
    softSkillsNiceToHave: z.array(z.string().min(1)).optional().default([]),
    responsibilities: z.array(z.string().min(1)).optional().default([]),
    officeLocations: z.array(z.string().refine((isoAlpha2) => {
      const country = getCountryData(isoAlpha2 as TCountryCode);

      return country.name !== undefined;
    })).optional().default([]),
    allowedRegions: z.array(z.string().refine((isoAlpha2) => {
      const country = getCountryData(isoAlpha2 as TCountryCode);

      return country.name !== undefined;
    })).optional().default([]),
    restrictedRegions: z.array(z.string().refine((isoAlpha2) => {
      const country = getCountryData(isoAlpha2 as TCountryCode);

      return country.name !== undefined;
    })).optional().default([]),
    preferredRegions: z.array(z.string().refine((isoAlpha2) => {
      const country = getCountryData(isoAlpha2 as TCountryCode);

      return country.name !== undefined;
    })).optional().default([]),
    recruitmentSteps: z.array(z.object({
      name: z.string().min(1).max(500),
      duration: z.coerce.number(),
      description: z.string().min(1).max(1000),
      optional: z.string().pipe(z.coerce.boolean()).optional(),
    })).optional().default([]),
    aboutEmployer: z.string().max(65_535).optional(),
    managementMethodology: z.enum(JobManagementMethodology).optional().default(JobManagementMethodology.agile),
    teamSize: z.string().pipe(z.coerce.number()).optional().default(75),
    teamOverview: z.string().max(65_535).optional(),
    teamCulture: z.string().max(65_535).optional(),
    technicalStack: z.string().max(65_535).optional(),
    workflow: z.string().max(65_535).optional(),
    technologies: z.array(z.string().min(1)).optional().default([]),
    equipmentPolicies: z.array(z.enum(EquipmentPolicy)).optional().default([EquipmentPolicy.equipment, EquipmentPolicy.employees]),
    guidelines: z.array(z.string().min(1)).optional().default([]),
    legalPolicy: z.string().max(65_535).optional(),
    financialPolicy: z.string().max(65_535).optional(),
    tags: z.array(z.string().min(1)).optional().default([]),
    metaTitle: z.string().max(255),
    metaDescription: z.string().max(255),
    publishedAt: z.coerce.date().optional().default(new Date()),
  })
    .readonly();
}
