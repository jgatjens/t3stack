import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { roleEnum, users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set({
          name: input.name,
        })
        .where(eq(users.email, input.email));
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        organization_id: z.string().uuid(),
        role: z.enum(roleEnum.enumValues),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set({
          name: input.name,
          organization_id: input.name,
          role: input.role,
        })
        .where(eq(users.email, input.email));
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        organization_id: z.string().uuid(),
        role: z.enum(roleEnum.enumValues),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        organization_id: input.organization_id,
        role: input.role,
      });
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
