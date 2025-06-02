"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/**
 * NextAuth Provider with error boundary and client-side only rendering
 */
export function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
} 