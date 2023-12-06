import {
  pgTable,
  serial,
  text,
  uniqueIndex,
  pgSchema,
} from "drizzle-orm/pg-core";

// CAMPAINS TABLE
const campainsColumns = {
  id: serial("id").notNull(),
  name: text("name").notNull(),
};

export const campains = pgTable("campain", campainsColumns);

export const getCampainsTable = <TSchema extends string>(
  schemaName: TSchema,
) => {
  return pgSchema(schemaName).table("campain", clientsColumns);
};

export type CampainsType = typeof campains.$inferInsert;

// CLIENTS TABLE
const clientsColumns = {
  id: serial("id").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  legal_representative: text("legal_representative"),
  client_id: text("client_id").primaryKey().notNull(),
  client_id_type: text("client_id_type").notNull(),
  business_name: text("business_name").notNull(),
  personal_phone: text("personal_phone").notNull(),
  business_phone: text("business_phone"),
  website: text("website"),
};

export const clients = pgTable("client", clientsColumns, (client) => {
  return {
    cliendIdx: uniqueIndex("client_idx").on(client.client_id),
  };
});

export const getClientsTable = <TSchema extends string>(
  schemaName: TSchema,
) => {
  return pgSchema(schemaName).table("client", clientsColumns);
};

export type ClientsType = typeof clients.$inferInsert;
