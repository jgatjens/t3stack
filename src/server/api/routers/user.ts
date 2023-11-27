import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(z.object({ name: z.string().min(3), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db
        .update(users)
        .set({
          name: input.name,
        })
        .where(eq(users.id, input.id));
    }),

  getUserByEmail: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.name)],
    });
  }),
});
