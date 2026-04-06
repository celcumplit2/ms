import type {InferInsertModel, InferSelectModel} from 'drizzle-orm';
import {
  customType,
  date,
  index,
  int,
  json,
  mediumtext,
  mysqlTable,
  text,
  time,
  timestamp,
  tinyint,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';
import {invert} from 'lodash';

export enum JobCategory {
  backend = 'backend',
  frontend = 'frontend',
  mobile = 'mobile',
  design = 'design',
  devops = 'devOps',
  qa = 'qa',
  management = 'management',
  androidDeveloper = 'androidDeveloper',
  iosDeveloper = 'iosDeveloper',
  aiEngineer = 'aiEngineer',
  backendEngineer = 'backendEngineer',
  bigDataEngineer = 'bigDataEngineer',
  blockchainDeveloper = 'blockchainDeveloper',
  blockchainEngineer = 'blockchainEngineer',
  biAnalyst = 'biAnalyst',
  biEngineer = 'biEngineer',
  cloudArchitect = 'cloudArchitect',
  cloudEngineer = 'cloudEngineer',
  crossPlatformMobileDeveloper = 'crossPlatformMobileDeveloper',
  cybersecurityEngineer = 'cybersecurityEngineer',
  dataAnalyst = 'dataAnalyst',
  dataEngineer = 'dataEngineer',
  dataScientist = 'dataScientist',
  dataArchitect = 'dataArchitect',
  databaseAdministrator = 'databaseAdministrator',
  databaseEngineer = 'databaseEngineer',
  devOpsEngineer = 'devOpsEngineer',
  frontendEngineer = 'frontendEngineer',
  fullStackEngineer = 'fullStackEngineer',
  gameDeveloper = 'gameDeveloper',
  gameEngineer = 'gameEngineer',
  infrastructureEngineer = 'infrastructureEngineer',
  mlEngineer = 'mlEngineer',
  mlOpsEngineer = 'mlOpsEngineer',
  networkEngineer = 'networkEngineer',
  platformEngineer = 'platformEngineer',
  promptEngineer = 'promptEngineer',
  siteReliabilityEngineer = 'siteReliabilityEngineer',
  softwareEngineer = 'softwareEngineer',
  softwareArchitect = 'softwareArchitect',
  solutionsEngineer = 'solutionsEngineer',
  systemEngineer = 'systemEngineer',
  systemAdministrator = 'systemAdministrator',
  technicalLead = 'technicalLead',
  web3Developer = 'web3Developer',
}

const CATEGORY_MAP: Record<number, JobCategory> = {
  0: JobCategory.backend,
  1: JobCategory.frontend,
  2: JobCategory.mobile,
  3: JobCategory.design,
  4: JobCategory.devops,
  5: JobCategory.qa,
  6: JobCategory.management,
  7: JobCategory.androidDeveloper,
  8: JobCategory.iosDeveloper,
  9: JobCategory.aiEngineer,
  10: JobCategory.backendEngineer,
  11: JobCategory.bigDataEngineer,
  12: JobCategory.blockchainDeveloper,
  13: JobCategory.blockchainEngineer,
  14: JobCategory.biAnalyst,
  15: JobCategory.biEngineer,
  16: JobCategory.cloudArchitect,
  17: JobCategory.cloudEngineer,
  18: JobCategory.crossPlatformMobileDeveloper,
  19: JobCategory.cybersecurityEngineer,
  20: JobCategory.dataAnalyst,
  21: JobCategory.dataEngineer,
  22: JobCategory.dataScientist,
  23: JobCategory.dataArchitect,
  24: JobCategory.databaseAdministrator,
  25: JobCategory.databaseEngineer,
  26: JobCategory.devOpsEngineer,
  27: JobCategory.frontendEngineer,
  28: JobCategory.fullStackEngineer,
  29: JobCategory.gameDeveloper,
  30: JobCategory.gameEngineer,
  31: JobCategory.infrastructureEngineer,
  32: JobCategory.mlEngineer,
  33: JobCategory.mlOpsEngineer,
  34: JobCategory.networkEngineer,
  35: JobCategory.platformEngineer,
  36: JobCategory.promptEngineer,
  37: JobCategory.siteReliabilityEngineer,
  38: JobCategory.softwareEngineer,
  39: JobCategory.softwareArchitect,
  40: JobCategory.solutionsEngineer,
  41: JobCategory.systemEngineer,
  42: JobCategory.systemAdministrator,
  43: JobCategory.technicalLead,
  44: JobCategory.web3Developer,
};

const jobCategory = customType<{
  data: JobCategory,
  driverData: number,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: JobCategory): number {
    return Number(invert(CATEGORY_MAP)[value]);
  },
  fromDriver(value: number): JobCategory {
    return CATEGORY_MAP[value];
  },
});

export enum JobManagementMethodology {
  agile = 'agile',
  waterfall = 'waterfall',
  prince2 = 'prince2',
  devops = 'devops',
  lean = 'lean',
  hybrid = 'hybrid',
  itil = 'itil',
  sixSigma = 'sixSigma',
}

const MANAGEMENT_METHODOLOGY_MAP: Record<number, JobManagementMethodology> = {
  0: JobManagementMethodology.agile,
  1: JobManagementMethodology.waterfall,
  2: JobManagementMethodology.prince2,
  3: JobManagementMethodology.devops,
  4: JobManagementMethodology.lean,
  5: JobManagementMethodology.hybrid,
  6: JobManagementMethodology.itil,
  7: JobManagementMethodology.sixSigma,
};

const jobManagementMethodology = customType<{
  data: JobManagementMethodology,
  driverData: number,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: JobManagementMethodology): number {
    return Number(invert(MANAGEMENT_METHODOLOGY_MAP)[value]);
  },
  fromDriver(value: number): JobManagementMethodology {
    return MANAGEMENT_METHODOLOGY_MAP[value];
  },
});

const jobUrgentStart = customType<{
  data: boolean,
  driverData: number,
  default: true,
}>({
  dataType() {
    return 'tinyint';
  },
  toDriver(value: boolean): number {
    return value ? 1 : 0;
  },
  fromDriver(value: number): boolean {
    return Boolean(value);
  },
});

export enum EquipmentPolicy {
  employees = 'employees',
  equipment = 'equipment',
  reimbursement = 'reimbursement',
}

export enum JobSeniority {
  junior = 'junior',
  middle = 'middle',
  senior = 'senior',
  lead = 'lead',
  architect = 'architect',
}

export enum JobWorkload {
  fullTime = 'fullTime',
  partTime = 'partTime',
}

export enum JobMode {
  remote = 'remote',
  office = 'office',
  hybrid = 'hybrid',
}

export enum JobEmploymentType {
  employee = 'employee',
  contractor = 'contractor',
  temporary = 'temporary',
  intern = 'intern',
}

export enum JobDurationType {
  fixed = 'fixed',
  range = 'range',
  indeterminate = 'indeterminate',
}

export type JobDuration = {
  type: JobDurationType.fixed;
  days: number;
} | {
  type: JobDurationType.range;
  minDays: number;
  maxDays: number;
} | {
  type: JobDurationType.indeterminate;
};

export interface RecruitmentStep {
  name: string;
  duration: number;
  description: string;
  optional?: boolean;
}

export const UTC_OFFSETS = ['-12:00', '-11:00', '-10:00', '-09:30', '-09:00', '-08:00', '-07:00', '-06:00', '-05:00', '-04:00', '-03:30', '-03:00', '-02:00', '-01:00', '+00:00', '+01:00', '+02:00', '+03:00', '+03:30', '+04:00', '+04:30', '+05:00', '+05:30', '+05:45', '+06:00', '+06:30', '+07:00', '+08:00', '+08:45', '+09:00', '+09:30', '+10:00', '+10:30', '+11:00', '+12:00', '+12:45', '+13:00', '+14:00'];

export const job = mysqlTable(
  'Jobs',
  {
    id: int({unsigned: true}).autoincrement().primaryKey(),
    alias: varchar({length: 255}).notNull().unique(),
    title: varchar({length: 255}).notNull(),
    category: jobCategory().notNull(),
    intro: varchar({length: 255}).notNull(),
    description: mediumtext().notNull(),
    seniority: json().notNull().$type<(keyof typeof JobSeniority)[]>(), // ['middle', 'senior']
    workload: json().notNull().$type<(keyof typeof JobWorkload)[]>(), // ['fullTime', 'partTime']
    mode: json().notNull().$type<(keyof typeof JobMode)[]>(), // ['remote', 'office']
    employmentType: json().notNull().$type<(keyof typeof JobEmploymentType)[]>(), // ['employee', 'contractor']
    duration: json().notNull().$type<JobDuration>(), // {"type": "range", "minDays": 30, "maxDays": 60} || {"type": "fixed", "days": 120} || {"type": "indeterminate"}
    urgentStart: jobUrgentStart().notNull().default(false),
    startDate: date(),
    endDate: date(),
    officeLocations: json().notNull().$type<string[]>(), // ['MD', 'RO'] - array of ISO 3166-1 Alpha-2 countries
    hardSkillRequirements: json().notNull().$type<string[]>(),
    softSkillRequirements: json().notNull().$type<string[]>(),
    hardSkillsNiceToHave: json().notNull().$type<string[]>(),
    softSkillsNiceToHave: json().notNull().$type<string[]>(),
    responsibilities: json().notNull().$type<string[]>(),
    workingHoursStart: time(),
    workingHoursEnd: time(),
    workingHoursUTCOffset: varchar({length: 6}), // '+03:00'
    utcOffsetsRestrictions: json().notNull().$type<string[]>(), // ['+02:00', '+03:00']
    allowedRegions: json().notNull().$type<string[]>(), // ['MD', 'RO'] - array of ISO 3166-1 Alpha-2 countries
    restrictedRegions: json().notNull().$type<string[]>(), // ['MD', 'RO'] - array of ISO 3166-1 Alpha-2 countries
    preferredRegions: json().notNull().$type<string[]>(), // ['MD', 'RO'] - array of ISO 3166-1 Alpha-2 countries
    recruitmentSteps: json().notNull().$type<RecruitmentStep[]>(),
    aboutEmployer: text(),
    managementMethodology: jobManagementMethodology(),
    teamSize: tinyint({unsigned: true}),
    teamOverview: text(),
    teamCulture: text(),
    technicalStack: text(),
    workflow: text(),
    technologies: json().notNull().$type<string[]>(), // ['react', 'java', 'aws', 'mysql']
    equipmentPolicies: json().notNull().$type<(keyof typeof EquipmentPolicy)[]>(), // ['employees', 'equipment', 'reimbursement']
    guidelines: json().notNull().$type<string[]>(), // MoldStud internal requirements for each candidate
    legalPolicy: text(),
    financialPolicy: text(),
    tags: json().notNull().$type<string[]>(), // ['react', 'java', 'full-stack']
    metaTitle: varchar({length: 255}),
    metaDescription: varchar({length: 255}),
    publishedAt: timestamp().defaultNow().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  // TODO: Add more indexes and optimize the SQL structure whenever we add more functionality. (filters, search, matching)
  (table) => ([
    uniqueIndex('IDX_Jobs_alias').on(table.alias),
    index('IDX_Jobs_category').on(table.category),
    index('IDX_Jobs_publishedAt').on(table.publishedAt),
    index('IDX_Jobs_updatedAt').on(table.updatedAt),
    index('IDX_Jobs_createdAt').on(table.createdAt),
  ]),
);

export type SelectJob = InferSelectModel<typeof job>;
export type InsertJob = InferInsertModel<typeof job>;
