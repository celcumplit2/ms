CREATE TABLE `LatestArticles` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`categoryId` int unsigned,
	`authorId` int unsigned,
	`alias` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`image` varchar(255),
	`intro` text NOT NULL,
	`content` mediumtext NOT NULL,
	`status` tinyint NOT NULL,
	`timeToRead` int NOT NULL,
	`metaTitle` varchar(255) NOT NULL,
	`metaDescription` text NOT NULL,
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `LatestArticles_id` PRIMARY KEY(`id`),
	CONSTRAINT `IDX_LatestArticles_alias` UNIQUE(`alias`)
);
--> statement-breakpoint
ALTER TABLE `LatestArticles` ADD CONSTRAINT `LatestArticles_categoryId_Categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `LatestArticles` ADD CONSTRAINT `LatestArticles_authorId_Authors_id_fk` FOREIGN KEY (`authorId`) REFERENCES `Authors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `IDX_LatestArticles_categoryId` ON `LatestArticles` (`categoryId`);--> statement-breakpoint
CREATE INDEX `IDX_LatestArticles_authorId` ON `LatestArticles` (`authorId`);--> statement-breakpoint
CREATE INDEX `IDX_LatestArticles_status` ON `LatestArticles` (`status`);--> statement-breakpoint
CREATE INDEX `IDX_LatestArticles_publishedAt` ON `LatestArticles` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `IDX_LatestArticles_createdAt` ON `LatestArticles` (`createdAt`);