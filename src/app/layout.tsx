import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { NextAuthProvider } from "./providers";
import { UserStrikesProvider } from "@/contexts/UserStrikesContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'),
  title: "Cantripped – Magic: The Gathering Rule Variants & Community",
  description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
  keywords: [
    "Magic the Gathering", "MTG", "game mods", "rule variants", "custom rules", "Kickstarter", "waitlist", "card game", "tabletop", "community"
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com',
  },
  openGraph: {
    title: "Cantripped – Magic: The Gathering Rule Variants & Community",
    description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
    url: "https://www.cantripped.com",
    siteName: "Cantripped",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Cantripped&description=Magic%3A%20The%20Gathering%20Rule%20Variants%20%26%20Community&type=default`,
        width: 1200,
        height: 630,
        alt: "Cantripped - Magic: The Gathering Rule Variants & Community"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantripped – Magic: The Gathering Rule Variants & Community",
    description: "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants. Join the Kickstarter waitlist for early access!",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Cantripped&description=Magic%3A%20The%20Gathering%20Rule%20Variants%20%26%20Community&type=default`]
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
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7KRYYYL31Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7KRYYYL31Z');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-[var(--background)] min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <UserStrikesProvider>
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            <Footer />
          </UserStrikesProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
