// import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
// import { getClientsTable } from "~/server/db/global";
import { organizations } from "~/server/db/schema";

export const organizationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(organizations);
  }),
});
