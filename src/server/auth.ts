import { DrizzleAdapter } from "@auth/drizzle-adapter";
import EmailProvider from "next-auth/providers/email";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import type { DefaultSession, NextAuthOptions, Session } from "next-auth";
import type { DefaultJWT, JWT } from "next-auth/jwt";
import type { UserRole } from "~/constans";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { sendVerificationRequest } from "./send-verification-request";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      organization_id: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/adapters" {
  export interface AdapterUser {
    role: UserRole;
    organization_id?: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    emailVerified: Date | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        // session.user.organization_id = token.organization_id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.picture; // replace 'image' with 'picture'
      }
      return session;
    },
    jwt: async ({ token }: { token: JWT }) => {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, token.email ?? ""),
      });

      if (!dbUser) {
        console.log("No User");
        throw new Error("Unable to find user");
      }

      return {
        id: dbUser.id,
        role: dbUser.role as UserRole,
        email: dbUser.email,
        organization_id: dbUser.organization_id,
        emailVerified: dbUser.emailVerified,
        name: dbUser.name,
        picture: dbUser.image,
        sub: token.sub,
      };
    },

    // If Email provider is used, on the first call, it contains a verificationRequest: true property
    // to indicate it is being triggered in the verification request flow.

    signIn: async ({ user, email }) => {
      if (email?.verificationRequest) {
        // Query database to get user by email address (identifier)
        try {
          const dbUser = await db.query.users.findFirst({
            where: eq(users.email, user.email ?? ""),
          });

          console.log("signIn => dbUser", dbUser);

          if (!dbUser) {
            return false;
          }

          console.log("signIn => verificationRequest", dbUser.email);
        } catch (error) {
          console.log("error:", error);
        }
      }
      // if we dont find a user with the email, we throw an error
      // we dont want to send a magic link if user doesnt exist
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: env.NEXTAUTH_SECRET,
  // },
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),

  pages: {
    signIn: "/login",
  },
  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
  providers: [
    EmailProvider({
      sendVerificationRequest,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
