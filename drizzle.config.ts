import type { Config } from "drizzle-kit";

import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  schemaFilter: ["public", "company_1"],
  out: "./drizzle/migrations",
  driver: "pg",
  verbose: true,
  dbCredentials: {
    connectionString: env.POSTGRES_URL + "&sslmode=require",
  },
} satisfies Config;
