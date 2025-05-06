"use client";

import React from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { SessionUser } from "@/lib/auth/types";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }
  
  // Cast to our custom type for type safety
  const user = session?.user as SessionUser | undefined;
  const isAuthenticated = !!user;
  const userId = user?.id;
  const userName = user?.name;

  return (
    <main className="min-h-screen">
      {/* Hero section with animated gradient background */}
      <div className="gradient-bg py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>
        <div className="absolute w-60 h-60 rounded-full bg-[var(--primary)]/30 -top-10 -left-10 blur-3xl"></div>
        <div className="absolute w-60 h-60 rounded-full bg-[var(--accent)]/30 -bottom-10 -right-10 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
              <span className="block">MTG Mods</span>
              <span className="block text-3xl md:text-4xl mt-2 text-[var(--accent)]/90">Reimagine Your Collection</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-white/80">
              Share your Magic: The Gathering card modifications and discover unique recipes from the community
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/recipes" className="btn-primary btn-shine rounded-full text-center">
                Explore Recipes
              </Link>
              <Link href="/auth/signin" className="btn-contrast btn-shine rounded-full text-center">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold text-[var(--primary)]">500+</p>
              <p className="text-gray-500">Recipes</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[var(--primary)]">10k+</p>
              <p className="text-gray-500">Community Members</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[var(--primary)]">30k+</p>
              <p className="text-gray-500">Card Modifications</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold text-[var(--primary)]">4.8</p>
              <p className="text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-24 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Transform Your <span className="text-[var(--primary)]">Magic</span> Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">Discover Techniques</h3>
              <p className="text-gray-600 mb-6">Explore a vast library of card modification techniques from the community.</p>
              <Link href="/recipes" className="hover-underline text-[var(--primary)] font-semibold">Browse Techniques →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">Create Recipes</h3>
              <p className="text-gray-600 mb-6">Share your own unique modification recipes with the MTG modding community.</p>
              <Link href="/recipes/new" className="hover-underline text-[var(--accent)] font-semibold">Create a Recipe →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--supporting)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--supporting)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--supporting)]">Join Community</h3>
              <p className="text-gray-600 mb-6">Connect with other modders, share feedback, and collaborate on projects.</p>
              <Link href="/community" className="hover-underline text-[var(--supporting)] font-semibold">Connect Now →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--contrast)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--contrast)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--contrast)]">Learn & Grow</h3>
              <p className="text-gray-600 mb-6">Access tutorials, guides, and resources to improve your modding skills.</p>
              <Link href="/learn" className="hover-underline text-[var(--contrast)] font-semibold">Start Learning →</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="py-16 bg-[var(--primary)]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Modding Journey?</h2>
          <p className="text-white/80 text-xl mb-8 max-w-3xl mx-auto">Join thousands of MTG enthusiasts sharing and discovering card modifications daily.</p>
          <Link href="/auth/signup" className="inline-block bg-white text-[var(--primary)] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
            Create Free Account
          </Link>
        </div>
      </div>
    </main>
  );
}
