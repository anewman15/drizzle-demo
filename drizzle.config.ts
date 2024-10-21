import "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema",
  out: "./src/drizzle/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: `S{process.env.DB_URL}`,
  },
  verbose: true,
  strict: true,
});