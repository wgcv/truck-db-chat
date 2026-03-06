import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const maintenanceRequestsTable = sqliteTable(
  "maintenance_requests",
  {
    id: int().primaryKey({ autoIncrement: true }),
    vehicleId: text().notNull(),
    status: text().notNull(),
    reason: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
  },
);

export type MaintenanceRequest = typeof maintenanceRequestsTable.$inferSelect;
export type InsertMaintenanceRequest = typeof maintenanceRequestsTable.$inferInsert;



export const maintenanceCommentsTable = sqliteTable(
    "maintenance_comments",
    {
      id: int().primaryKey({ autoIncrement: true }),
      vehicleId: text().notNull(),
      comment: text().notNull(),
      createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    },
  );
  
  export type MaintenanceComment = typeof maintenanceCommentsTable.$inferSelect;
  export type InsertMaintenanceComment = typeof maintenanceCommentsTable.$inferInsert;
  

export const roadSupportServicesTable = sqliteTable(
    "road_support_services",
    {
      id: int().primaryKey({ autoIncrement: true }),
      vehicleId: text().notNull(),
      reason: text().notNull(),
      location: text().notNull(),
      createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    },
  );
  
  export type RoadSupportService = typeof roadSupportServicesTable.$inferSelect;
  export type InsertRoadSupportService = typeof roadSupportServicesTable.$inferInsert;
  


