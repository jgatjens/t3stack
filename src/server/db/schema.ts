import {
  timestamp,
  text,
  primaryKey,
  integer,
  pgTable,
  json,
  pgEnum,
  uuid,
  serial,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const schemaEnum = pgEnum("schema", ["company_1"]);

// Change name of copy_hub_t3 to create prefixes for tables:

export const companies = pgTable("company", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  settings: json("settings"),
});

export const organizations = pgTable("organization", {
  id: uuid("id").primaryKey().defaultRandom(),
  company_id: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  name: text("name"),
  schema: schemaEnum("schema").default("company_1"),
  settings: json("settings"),
});

export type OrganizationType = typeof organizations.$inferInsert;

export const users = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role").notNull(),
});

export type UsersType = typeof users.$inferInsert;

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    refresh_token_expires_in: integer("refresh_token_expires_in"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
