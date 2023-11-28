import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import { env } from "~/env.mjs";
import * as schema from "./schema";

const client = new Client({
  connectionString: env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();
export const db = drizzle(client, {
  schema: schema,
});

// Connect to Vercel Postgres
// import { sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";

// export const db = drizzle(sql);
