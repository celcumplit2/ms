import {Collection} from '@/core/dto/collection';
import {UnprocessablePayload} from '@/core/errors/unprocessable-payload';
import {validate} from '@/core/validators';
import {database} from '@/database';
import {
  EquipmentPolicy,
  JobDurationType,
  JobEmploymentType,
  JobManagementMethodology,
  JobMode,
  JobSeniority,
  JobWorkload,
  SelectJob,
} from '@/modules/job/job.model';
import {slugify} from '@/helpers';
import {JobRepository} from '@/modules/job/job.repository';
import {jobSchema} from '@/modules/job/jobs.dto';
import {ImportJob} from '@/types/import';
import {z} from 'zod';

let jobRepository: JobRepository | undefined;

function getJobRepository(): JobRepository {
  if (!jobRepository) {
    jobRepository = new JobRepository(database);
  }

  return jobRepository;
}

export async function countJobs() {
  return await getJobRepository().count({});
}

export async function browseJobs({offset, limit, search, relations = []}: {
  offset: number,
  limit: number,
  search?: string,
  relations?: string[]
}): Promise<Collection<SelectJob>> {
  const repository = getJobRepository();
  const total = await repository.count({search});
  const items = await repository.search({offset, limit, relations, search});

  return new Collection({items, total});
}

export async function browsePublishedJobs({offset, limit, relations = []}: {
  offset: number,
  limit: number,
  relations?: string[]
}): Promise<Collection<SelectJob>> {
  const repository = getJobRepository();
  const total = await repository.countPublished();
  const items = await repository.allPublished({offset, limit, relations});

  return new Collection({items, total});
}

export async function readJob({id}: { id: number }): Promise<SelectJob | undefined> {
  return await getJobRepository().one({id});
}

export async function readJobByAlias({alias}: { alias: string }): Promise<SelectJob | undefined> {
  return await getJobRepository().oneByAlias({alias});
}

export async function addJob({data}: { data: Record<string, unknown> }): Promise<SelectJob> {
  const repository = getJobRepository();
  const schema = await jobSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;

  if (await repository.existsByAlias({alias: payload.alias})) {
    throw new UnprocessablePayload({alias: 'A job with such alias already exists.'});
  }

  const id = await repository.save({
    entity: payload,
  });

  return await repository.one({id}) as SelectJob;
}

export async function editJob({id, data}: { id: number, data: Record<string, unknown> }): Promise<number> {
  const repository = getJobRepository();
  const schema = await jobSchema();
  const payload = await validate(schema, data) as z.infer<typeof schema>;
  const category = await repository.one({id});

  if (category?.alias !== payload.alias && await repository.existsByAlias({alias: payload.alias})) {
    throw new UnprocessablePayload({link: 'A job with such alias already exists.'});
  }

  return await repository.save({
    id,
    entity: payload,
  });
}

export async function deleteJob({id}: { id: number }): Promise<void> {
  await getJobRepository().remove({id});
}

export async function importJob({payload}: { payload: ImportJob }): Promise<{ title: string, message: string } | void> {
  if (!payload.alias) {
    return;
  }

  const job = payload.alias
    ? await readJobByAlias({alias: payload.alias})
    : null;

  if (job) {
    return {
      title: payload.title,
      message: `The job with alias: ${payload.alias} already exists.`,
    };
  }

  await addJob({
    data: {
      alias: slugify(payload.alias),
      title: payload.title,
      category: payload.category,
      intro: payload.intro,
      seniority: payload.seniority === 'Mid-Level' ? [JobSeniority.middle] : [JobSeniority.senior],
      workload: [JobWorkload.fullTime],
      mode: [JobMode.remote],
      description: payload.description,
      hardSkillRequirements: [payload.hardSkills__001, payload.hardSkills__002, payload.hardSkills__003, payload.hardSkills__004, payload.hardSkills__005, payload.hardSkills__006, payload.hardSkills__007].filter((value) => value.length > 0),
      softSkillRequirements: [payload.softSkills__001, payload.softSkills__002, payload.softSkills__003, payload.softSkills__004].filter((value) => value.length > 0),
      utcOffsetsRestrictions: ['+00:00', '+01:00', '+02:00', '+03:00'],
      startDate: null,
      endDate: null,
      workingHoursStart: '10:00',
      workingHoursEnd: '18:00',
      workingHoursUTCOffset: '+03:00',
      managementMethodology: JobManagementMethodology.agile,
      teamSize: '78',
      recruitmentSteps: [{
        name: `${payload.recruitmentSteps__description} minutes call`,
        duration: Number(payload.recruitmentSteps__duration),
        description: payload.recruitmentSteps__description,
      }],
      employmentType: [JobEmploymentType.contractor, JobEmploymentType.employee],
      duration: {type: JobDurationType.indeterminate},
      hardSkillsNiceToHave: [],
      softSkillsNiceToHave: [],
      allowedRegions: [],
      restrictedRegions: [],
      preferredRegions: [],
      officeLocations: [],
      responsibilities: [],
      technologies: [],
      equipmentPolicies: [EquipmentPolicy.equipment, EquipmentPolicy.employees, EquipmentPolicy.reimbursement],
      guidelines: [],
      tags: [],
    },
  });
}
