import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    // Optimized connection pool for dashboard queries
    datasources: {
      db: {
        url: process.env.DATABASE_URL + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'connection_limit=20&pool_timeout=60'
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 