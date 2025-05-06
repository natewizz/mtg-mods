// Configuration file for environment variables
// Copy this file to config.local.ts and fill in your values
// Make sure to add config.local.ts to .gitignore

export const config = {
  database: {
    url: process.env.DATABASE_URL || "mysql://user:password@localhost:3306/mtg_mods",
  },
  nextAuth: {
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
  },
}; 