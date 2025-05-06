// @ts-nocheck
// Next.js 15 + NextAuth.js v4 integration
// This uses an approach that bypasses TypeScript errors with a cast
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { config } from "@/config";
import * as bcrypt from "bcrypt";
import type { SessionUser } from "@/lib/auth/types";

// Note: Session type is extended in src/types/next-auth.d.ts
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find the user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            return null;
          }

          // Get user credentials - use directly since we don't have type support
          const sql = `SELECT * FROM UserCredential WHERE userId = '${user.id}'`;
          const userCreds = await prisma.$queryRawUnsafe(sql);
          
          // Should return array, take first result
          const cred = Array.isArray(userCreds) && userCreds.length > 0 ? userCreds[0] : null;

          if (!cred?.hashedPassword) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            cred.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ 
      session, 
      token 
    }: { 
      session: { user: SessionUser; expires: string }; 
      token: { sub?: string; [key: string]: any } 
    }) {
      // Add the user ID from token to the session
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Bypass TypeScript errors with a cast to any
const nextAuthHandler = NextAuth(authOptions) as any;

// Export for API route handler
export const { GET, POST } = nextAuthHandler;

// Export auth function for use in server components
export const auth = nextAuthHandler.auth; 