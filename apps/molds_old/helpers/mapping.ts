import {JobCategory, JobManagementMethodology, JobMode, JobSeniority, JobWorkload} from '@/modules/job/job.model';

export const JOB_CATEGORY_MAP = {
  [JobCategory.frontend]: 'Frontend',
  [JobCategory.backend]: 'Backend',
  [JobCategory.design]: 'Design',
  [JobCategory.mobile]: 'Mobile',
  [JobCategory.qa]: 'Quality Assurance',
  [JobCategory.management]: 'Management',
  [JobCategory.devops]: 'DevOps',
  [JobCategory.androidDeveloper]: 'Android Developer',
  [JobCategory.iosDeveloper]: 'IOS Developer',
  [JobCategory.aiEngineer]: 'Artificial Intelligence Engineer',
  [JobCategory.backendEngineer]: 'Backend Engineer',
  [JobCategory.bigDataEngineer]: 'Big Data Engineer',
  [JobCategory.blockchainDeveloper]: 'Blockchain Developer',
  [JobCategory.blockchainEngineer]: 'Blockchain Engineer',
  [JobCategory.biAnalyst]: 'Business Intelligence Analyst',
  [JobCategory.biEngineer]: 'Business Intelligence Engineer',
  [JobCategory.cloudArchitect]: 'Cloud Architect',
  [JobCategory.cloudEngineer]: 'Cloud Engineer',
  [JobCategory.crossPlatformMobileDeveloper]: 'Cross-Platform Mobile Developer',
  [JobCategory.cybersecurityEngineer]: 'Cybersecurity Engineer',
  [JobCategory.dataAnalyst]: 'Data Analyst',
  [JobCategory.dataEngineer]: 'Data Engineer',
  [JobCategory.dataScientist]: 'Data Scientist',
  [JobCategory.dataArchitect]: 'Data Architect',
  [JobCategory.databaseAdministrator]: 'Database Administrator',
  [JobCategory.databaseEngineer]: 'Database Engineer',
  [JobCategory.devOpsEngineer]: 'DevOps Engineer',
  [JobCategory.frontendEngineer]: 'Frontend Engineer',
  [JobCategory.fullStackEngineer]: 'FullStack Engineer',
  [JobCategory.gameDeveloper]: 'Game Developer',
  [JobCategory.gameEngineer]: 'Game Engineer',
  [JobCategory.infrastructureEngineer]: 'Infrastructure Engineer',
  [JobCategory.mlEngineer]: 'Machine Learning Engineer',
  [JobCategory.mlOpsEngineer]: 'Machine Learning Ops Engineer',
  [JobCategory.networkEngineer]: 'Network Engineer',
  [JobCategory.platformEngineer]: 'Platform Engineer',
  [JobCategory.promptEngineer]: 'Prompt Engineer',
  [JobCategory.siteReliabilityEngineer]: 'Site Reliability Engineer',
  [JobCategory.softwareEngineer]: 'Software Engineer',
  [JobCategory.softwareArchitect]: 'Software Architect',
  [JobCategory.solutionsEngineer]: 'Solution Engineer',
  [JobCategory.systemEngineer]: 'System Engineer',
  [JobCategory.systemAdministrator]: 'System Administrator',
  [JobCategory.technicalLead]: 'Technical Lead',
  [JobCategory.web3Developer]: 'Web3 Developer',
};

export const JOB_SENIORITY_MAP = {
  [JobSeniority.junior]: 'Junior-Level',
  [JobSeniority.middle]: 'Middle-Level',
  [JobSeniority.senior]: 'Senior-Level',
  [JobSeniority.lead]: 'Lead-Level',
  [JobSeniority.architect]: 'Architect-Level',
};

export const JOB_WORKLOAD_MAP = {
  [JobWorkload.fullTime]: 'Full-Time',
  [JobWorkload.partTime]: 'Part-Time',
};

export const JOB_MODE_MAP = {
  [JobMode.remote]: 'Remote',
  [JobMode.office]: 'In-Office',
  [JobMode.hybrid]: 'Hybrid',
};

export const JOB_MANAGEMENT_METHODOLOGY_MAP = {
  [JobManagementMethodology.agile]: 'Agile',
  [JobManagementMethodology.waterfall]: 'Waterfall',
  [JobManagementMethodology.prince2]: 'PRINCE2',
  [JobManagementMethodology.devops]: 'DevOps',
  [JobManagementMethodology.lean]: 'Lean',
  [JobManagementMethodology.hybrid]: 'Hybrid',
  [JobManagementMethodology.itil]: 'ITIL',
  [JobManagementMethodology.sixSigma]: 'Six Sigma',
};
