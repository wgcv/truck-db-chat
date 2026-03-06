import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL!;
// Drizzle-kit with @libsql/client needs file: protocol for local SQLite
const drizzleUrl = url.startsWith("file:") ? url : `file:${url}`;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: drizzleUrl,
  },
});