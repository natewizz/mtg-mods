"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RandomRecipeButton from '@/components/ui/RandomRecipeButton';
import { getLatestRecipes } from '@/lib/recipe-actions';
import { User, RecipeTag } from '@prisma/client';
import TagPill from '@/components/ui/TagPill';
import { slugify } from '@/lib/utils';

// Types for latest recipes with related data
type RecipeWithRelations = {
  id: string;
  title: string;
  slug: string;
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  tags: RecipeTag[];
  _count: {
    votes: number;
    tried: number;
  };
};

function WaitlistSignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"success"|"error"|"duplicate">("idle");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        onClose();
        setStatus("idle");
        setEmail("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "homepage-modal" }),
    });
    setLoading(false);
    if (res.ok) setStatus("success");
    else if (res.status === 409) setStatus("duplicate");
    else setStatus("error");
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative animate-pop-in">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Join the Waitlist</h2>
        <p className="mb-4 text-gray-600 text-center">Get notified about our Kickstarter and early access!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field border px-3 py-2 rounded"
            disabled={loading || status === "success"}
          />
          <button
            type="submit"
            className={`transition-all duration-200 bg-gradient-to-r from-[#5A31F4] to-[#FF8661] text-white font-bold py-3 rounded shadow-lg text-lg tracking-wide hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5A31F4] focus:ring-offset-2 ${loading || status === "success" ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={loading || status === "success"}
          >
            {loading ? "Joining..." : "Join Kickstarter Waitlist"}
          </button>
        </form>
        {status === "success" && <p className="text-green-600 mt-3 text-center animate-fade-in">Thanks! You&apos;re on the list.</p>}
        {status === "duplicate" && <p className="text-yellow-600 mt-3 text-center">You&apos;re already signed up!</p>}
        {status === "error" && <p className="text-red-600 mt-3 text-center">Something went wrong. Try again.</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [latestRecipes, setLatestRecipes] = useState<RecipeWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      // @ts-expect-error -- session.user is extended in next-auth.d.ts
      if (session?.user?.needsUsernameSetup) {
        router.push("/auth/setup-username");
      }
    }
  }, [status, session, router]);

  // Fetch latest recipes on component mount
  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const recipes = await getLatestRecipes(4);
        setLatestRecipes(recipes);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen">
      <WaitlistSignupModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      {/* Hero section with animated gradient background */}
      <div className="gradient-bg py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>
        <div className="absolute w-60 h-60 rounded-full bg-[var(--primary)]/30 -top-10 -left-10 blur-3xl"></div>
        <div className="absolute w-60 h-60 rounded-full bg-[var(--accent)]/30 -bottom-10 -right-10 blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
              <span className="block">MTG MODS</span>
              <span className="block text-3xl md:text-4xl mt-2 text-[var(--accent)]/90">Reimagine the game</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-white/80">
              Discover innovative game and rule modifications for Magic: The Gathering that transform how you play
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                className="transition-all duration-200 bg-gradient-to-r from-[#FF8661] to-[#5A31F4] text-white font-extrabold py-4 px-8 rounded-full shadow-xl text-xl tracking-wider border-4 border-white hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#5A31F4] focus:ring-offset-2 animate-bounce-slow"
                onClick={() => setWaitlistOpen(true)}
              >
                Join Kickstarter Waitlist
              </button>
            </div>
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
      
      {/* Latest Recipes Section */}
      <div className="pt-16 pb-6 bg-[#F1F3FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#2C2E3A]">Latest Recipes</h2>
            <Link href="/recipes" className="text-[#5A31F4] hover:underline font-semibold">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {latestRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2 line-clamp-1">
                        <Link href={`/recipes/${slugify(recipe.title)}`} className="hover:text-[#5A31F4] transition">
                          {recipe.title}
                        </Link>
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.slice(0, 3).map((tag) => (
                          <TagPill key={tag.id} tag={tag.name} size="sm" />
                        ))}
                        {recipe.tags.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">+{recipe.tags.length - 3} more</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>By {recipe.author.name}</span>
                        <div className="flex items-center">
                          <span className="flex items-center mr-3">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            {recipe._count?.votes ?? 0}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {recipe._count?.tried ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <RandomRecipeButton />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Features section */}
      <div className="pt-0 pb-12 bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10 mt-4">Transform Your <span className="text-[var(--primary)]">Magic</span> Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">Discover New Ways to Play</h3>
              <p className="text-gray-600 mb-6">Explore a library of rule modifications and game variants from the community.</p>
              <Link href="/recipes" className="hover-underline text-[var(--primary)] font-semibold">Browse Recipes →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">Create Your Rules</h3>
              <p className="text-gray-600 mb-6">Share your own unique game modifications with the MTG community.</p>
              <Link href="/recipes/new" className="hover-underline text-[var(--accent)] font-semibold">Create a Recipe →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--supporting)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--supporting)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--supporting)]">Join Community</h3>
              <p className="text-gray-600 mb-6">Connect with other players, share feedback, and collaborate on variants.</p>
              <Link href="/community" className="hover-underline text-[var(--supporting)] font-semibold">Connect Now →</Link>
            </div>
            
            <div className="card-3d p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--contrast)]/10 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--contrast)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--contrast)]">Learn & Grow</h3>
              <p className="text-gray-600 mb-6">Access rule guides and resources to enhance your game variants.</p>
              <Link href="/learn" className="hover-underline text-[var(--contrast)] font-semibold">Start Learning →</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="py-16 bg-[var(--primary)]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Magic Experience?</h2>
          <p className="text-white/80 text-xl mb-8 max-w-3xl mx-auto">Join fellow MTG enthusiasts sharing and discovering exciting new ways to play.</p>
          <Link href="/auth/signup" className="inline-block bg-white text-[var(--primary)] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
            Create Free Account
          </Link>
        </div>
      </div>
    </main>
  );
}
