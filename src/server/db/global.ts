import {
  pgTable,
  uuid,
  text,
  uniqueIndex,
  pgSchema,
} from "drizzle-orm/pg-core";

const clientsColumns = {
  id: uuid("id").primaryKey().defaultRandom(),
  emailAddress: text("email_address").notNull(),
};

export const clients = pgTable("client", clientsColumns, (client) => {
  return {
    emailIdx: uniqueIndex("email_idx").on(client.emailAddress),
  };
});

export const getClientsTable = <TSchema extends string>(
  schemaName: TSchema,
) => {
  return pgSchema(schemaName).table("client", clientsColumns);
};
