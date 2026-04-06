ALTER TABLE `Jobs` MODIFY COLUMN `urgentStart` tinyint UNSIGNED NOT NULL DEFAULT 0;--> statement-breakpoint
CREATE INDEX `IDX_Categories_parentId` ON `Categories` (`name`);