import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const url = process.env.VERCEL
  ? env.POSTGRES_URL
  : env.POSTGRES_URL + "&sslmode=require";

const client = new Client({
  connectionString: url,
});

await client.connect();

export const db = drizzle(client, {
  schema: schema,
  logger: true,
});
