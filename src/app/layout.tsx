import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { NextAuthProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "MTG Mods – Magic: The Gathering Rule Variants & Community",
  description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
  keywords: [
    "Magic the Gathering", "MTG", "game mods", "rule variants", "custom rules", "Kickstarter", "waitlist", "card game", "tabletop", "community"
  ],
  openGraph: {
    title: "MTG Mods – Magic: The Gathering Rule Variants & Community",
    description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
    url: "https://mtgmods.xyz",
    siteName: "MTG Mods",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MTG Mods Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MTG Mods – Magic: The Gathering Rule Variants & Community",
    description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
    images: ["/logo.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5A31F4" />
      </head>
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
