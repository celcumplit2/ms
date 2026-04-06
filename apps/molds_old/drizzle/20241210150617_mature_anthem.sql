CREATE TABLE IF NOT EXISTS `Jobs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`alias` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` tinyint NOT NULL,
	`intro` varchar(255) NOT NULL,
	`seniority` tinyint NOT NULL,
	`type` tinyint NOT NULL,
	`location` tinyint NOT NULL,
	`description` mediumtext NOT NULL,
	`hardSkills` json NOT NULL,
	`softSkills` json NOT NULL,
	`timezone` json NOT NULL,
	`workingHours` varchar(255) NOT NULL,
	`management` varchar(255) NOT NULL,
	`teamSize` varchar(255) NOT NULL,
	`recruitmentSteps` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `Jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `Jobs_alias_unique` UNIQUE(`alias`),
	CONSTRAINT `IDX_Jobs_alias` UNIQUE(`alias`)
);
--> statement-breakpoint
CREATE INDEX `IDX_Jobs_createdAt` ON `Jobs` (`createdAt`);