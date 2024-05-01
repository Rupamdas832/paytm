import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      try {
        const existingUser = await db.merchant.findFirst({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          await db.merchant.create({
            data: {
              email: user.email,
              name: user.name,
              id: user.id,
              auth_type: "Google",
            },
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
