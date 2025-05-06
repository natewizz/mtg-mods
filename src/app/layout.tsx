import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { NextAuthProvider } from "./providers";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MTG Mods - Share Your Magic: The Gathering Modifications",
  description: "A platform for sharing and discovering Magic: The Gathering card modifications and recipes",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] min-h-screen`}>
        <NextAuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
