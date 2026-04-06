ALTER TABLE `Jobs` MODIFY COLUMN `seniority` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` MODIFY COLUMN `teamSize` tinyint unsigned;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `workload` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `mode` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `employmentType` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `duration` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `urgentStart` tinyint unsigned;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `startDate` date;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `endDate` date;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `officeLocations` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `hardSkillRequirements` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `softSkillRequirements` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `hardSkillsNiceToHave` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `softSkillsNiceToHave` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `responsibilities` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `workingHoursStart` time;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `workingHoursEnd` time;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `workingHoursUTCOffset` varchar(6);--> statement-breakpoint
ALTER TABLE `Jobs` ADD `utcOffsetsRestrictions` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `allowedRegions` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `restrictedRegions` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `preferredRegions` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `aboutEmployer` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `managementMethodology` tinyint;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `teamOverview` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `teamCulture` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `technicalStack` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `workflow` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `technologies` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `equipmentPolicies` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `guidelines` json NOT NULL;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `legalPolicy` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `financialPolicy` text;--> statement-breakpoint
ALTER TABLE `Jobs` ADD `tags` json NOT NULL;--> statement-breakpoint
CREATE INDEX `IDX_Jobs_category` ON `Jobs` (`category`);--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `type`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `location`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `hardSkills`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `softSkills`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `timezone`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `workingHours`;--> statement-breakpoint
ALTER TABLE `Jobs` DROP COLUMN `management`;