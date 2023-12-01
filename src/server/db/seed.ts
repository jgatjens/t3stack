// src/db/seed.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { faker } from "@faker-js/faker";
import { companies, users, organizations, sessions } from "./schema";
import { Pool } from "pg";
import { env } from "~/env.mjs";

const url = env.POSTGRES_URL.includes("vercel-storage")
  ? env.POSTGRES_URL + "?sslmode=require"
  : env.POSTGRES_URL;

const main = async () => {
  const client = new Pool({
    connectionString: url,
  });

  const db = drizzle(client);
  const dataCompanies: (typeof companies.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    dataCompanies.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
    });
  }

  console.log("Empty sessions");
  await db.delete(sessions).execute();
  console.log("Empty users");
  await db.delete(users).execute();
  console.log("Empty organizations");
  await db.delete(organizations).execute();
  console.log("Empty companies");
  await db.delete(companies).execute();

  console.log("Seed start");
  await db.insert(companies).values(dataCompanies);

  const dataOrganization: (typeof organizations.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    dataOrganization.push({
      id: faker.string.uuid(),
      company_id: dataCompanies[0]?.id ?? "",
      name: faker.company.name(),
    });
  }

  await db.insert(organizations).values(dataOrganization);

  const dataUsers: (typeof users.$inferInsert)[] = [];

  dataUsers.push({
    organization_id: dataOrganization[0]?.id ?? "",
    email: "jgatjens@gmail.com",
    name: "Jairo Gatjens",
    role: "ADMIN",
  });

  dataUsers.push({
    organization_id: dataOrganization[0]?.id ?? "",
    email: "estebangatjens@gmail.com",
    name: "Esteban Gatjens",
    role: "ADMIN",
  });

  dataUsers.push({
    organization_id: dataOrganization[0]?.id ?? "",
    email: "andgatjens@gmail.com",
    name: "Andres Gatjens",
    role: "ADMIN",
  });

  dataUsers.push({
    organization_id: dataOrganization[0]?.id ?? "",
    email: "gatjensb@gmail.com",
    name: "Bruno Gatjens",
    role: "ADMIN",
  });

  dataUsers.push({
    organization_id: dataOrganization[0]?.id ?? "",
    email: "jariasq@gmail.com",
    name: "Jimmy Arias",
    role: "ADMIN",
  });

  await db.insert(users).values(dataUsers);

  console.log("Seed done");
  process.exit();
};

await main();
