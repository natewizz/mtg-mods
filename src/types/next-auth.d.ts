// Remove unused imports
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

import "next-auth";

// Augment the built-in session types
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
    }

    interface User {
        id: string;
        name?: string | null;
        username?: string | null;
        email?: string | null;
        image?: string | null;
        bio?: string | null;
        linkUrl?: string | null;
        linkText?: string | null;
        role?: string;
        createdAt?: Date;
        updatedAt?: Date;
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