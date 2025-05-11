// Remove unused imports
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

import "next-auth";
import { User as PrismaUser } from "@prisma/client";

// Augment the built-in session types
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            username?: string | null;
        };
    }

    interface User extends Omit<PrismaUser, "emailVerified"> {
        emailVerified?: Date | null;
    }
}

// Augment the JWT type (if needed, e.g., if adding custom properties to token)
declare module "next-auth/jwt" {
    interface JWT {
        userId?: string;
        sub?: string;
    }
} 