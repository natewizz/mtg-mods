import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { NextAuthProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      <body className={`${inter.className} bg-[var(--background)] min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 flex-grow">
            {children}
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
