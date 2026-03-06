import { Database } from "bun:sqlite";
import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema.js";

// Bun expects a path; strip file: prefix if present (used by drizzle-kit with libsql)
const raw = process.env.DATABASE_URL ?? "sqlite.db";
const path = raw.startsWith("file:") ? raw.replace(/^file:/, "") : raw;
const sqlite = new Database(path);

export const db = drizzle(sqlite, { schema });