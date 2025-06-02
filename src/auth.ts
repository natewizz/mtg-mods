// @ts-nocheck
// Next.js 15 + NextAuth.js v4 integration
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { config } from "@/config";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import type { SessionUser } from "@/lib/auth/types";

// Note: Session type is extended in src/types/next-auth.d.ts
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: "19569256258-c4oipcu5is7j5mr8lfeb356lec57hthf.apps.googleusercontent.com",
      clientSecret: "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",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    DiscordProvider({
      clientId: "1371192484943892611",
      clientSecret: "NsUMNKJ5XB1mJ-7w43IPX8s8cfsksHfD",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "identify email"
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
            image: user.image,
            username: user.username
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Allow OAuth providers to link to an existing account with the same email
      return true;
    },
    async redirect({ url, baseUrl }) {
      // If the redirect URL is already set, respect it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      
      // Default redirect URL (will be checked in session callback)
      return baseUrl;
    },
    async session({ session, token }) {
      // Add the user ID from token to the session
      if (session.user && token.sub) {
        session.user.id = token.sub;
        
        // Fetch the username from the database and add it to the session
        try {
          const user = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { username: true, image: true }
          });
          
          if (user) {
            session.user.username = user.username;
            session.user.image = user.image;
          }
        } catch (error) {
          console.error("Error fetching user data for session:", error);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      // When signing in, add the user's ID to the token
      if (user) {
        token.sub = user.id;
        
        // Include username if available
        if ('username' in user) {
          token.username = user.username;
        }
        
        // Set a flag to check if username should be set up
        token.needsUsernameSetup = !user.username;
      }
      return token;
    }
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn({ user, isNewUser }) {
      // Check if user needs to set up username
      if (!user.username) {
        // This will be handled by the client-side redirect in SignInForm
        console.log("User needs to set up username");
      }
    }
  }
};

// Standard Auth.js setup for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// Implementation of auth function for server components and API routes
export async function auth() {
  // Access cookies and find auth session token
  const cookiesList = cookies();
  
  // Try both secure and non-secure cookie names (for dev and prod environments)
  const isDev = process.env.NODE_ENV === 'development';
  const cookieName = isDev ? 'next-auth.session-token' : '__Secure-next-auth.session-token';
  const nextAuthSessionToken = cookiesList.get(cookieName)?.value;
  
  if (!nextAuthSessionToken) {
    return null;
  }
  
  try {
    // Decode the session token to get user info
    const secret = process.env.NEXTAUTH_SECRET || '';
    const decoded = await decode({
      token: nextAuthSessionToken,
      secret
    });
    
    if (!decoded) {
      return null;
    }
    
    // If we have the user ID, try to fetch the username from the database
    let username = null;
    let image = null;
    if (decoded.sub) {
      try {
        const user = await prisma.user.findUnique({
          where: { id: decoded.sub },
          select: { username: true, image: true }
        });
        username = user?.username;
        image = user?.image;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    
    // Create session object similar to what NextAuth would return
    return {
      user: {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        image: image || decoded.picture,
        username: username || decoded.username || null
      },
      expires: new Date(decoded.exp * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error decoding session token:', error);
    return null;
  }
} 