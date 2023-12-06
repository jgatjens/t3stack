import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getClientsTable } from "~/server/db/org-schema";
// import { mySchemaUsers } from "~/server/db/schemas/bcr";

export const userRouter = createTRPCRouter({
  update: publicProcedure
    .input(z.object({ name: z.string().min(3), id: z.string() }))
    .mutation(async ({ ctx }) => {
      // simulate a slow db call
      const client = getClientsTable("company_1");
      const sql = await ctx.db.select().from(client);
      console.log(sql);
    }),
});
