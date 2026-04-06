ALTER TABLE `Jobs` ADD `publishedAt` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
CREATE INDEX `IDX_Jobs_publishedAt` ON `Jobs` (`publishedAt`);--> statement-breakpoint
CREATE INDEX `IDX_Jobs_updatedAt` ON `Jobs` (`updatedAt`);