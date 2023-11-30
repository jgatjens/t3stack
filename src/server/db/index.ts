import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "~/env.mjs";
import * as schema from "./schema";

console.log("process.env.VERCEL", process.env.VERCEL);

const url =
  Number(process.env.VERCEL) === 1
    ? env.POSTGRES_URL + "?sslmode=require"
    : env.POSTGRES_URL;

console.log("url", url);
const client = new Client({
  connectionString: url,
});

await client.connect();

export const db = drizzle(client, {
  schema: schema,
  logger: true,
});
