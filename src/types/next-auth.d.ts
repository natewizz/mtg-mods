// Remove unused imports
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// Augment the built-in session types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

// Augment the JWT type (if needed, e.g., if adding custom properties to token)
declare module "next-auth/jwt" {
    interface JWT {
        userId?: string;
        sub?: string;
    }
} 