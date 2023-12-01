import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const url = env.POSTGRES_URL.includes("vercel-storage")
  ? env.POSTGRES_URL + "?sslmode=require"
  : env.POSTGRES_URL;

const client = new Client({
  connectionString: url,
});

await client.connect();

export const db = drizzle(client, {
  schema: schema,
  logger: true,
});
