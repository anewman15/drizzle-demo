import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@/drizzle/schema";
import { Pool } from "pg";

export const client = new Pool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT as string),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

export const db = drizzle(client, { schema });
