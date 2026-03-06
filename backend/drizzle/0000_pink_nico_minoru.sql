CREATE TABLE `maintenance_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vehicleId` text NOT NULL,
	`comment` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_id_maintenance_comments_idx` ON `maintenance_comments` (`vehicleId`);--> statement-breakpoint
CREATE TABLE `maintenance_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vehicleId` text NOT NULL,
	`status` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_id_maintenance_requests_idx` ON `maintenance_requests` (`vehicleId`);--> statement-breakpoint
CREATE TABLE `road_support_services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vehicleId` text NOT NULL,
	`reason` text NOT NULL,
	`location` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicle_id_road_support_services_idx` ON `road_support_services` (`vehicleId`);