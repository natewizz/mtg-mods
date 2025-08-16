"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RandomRecipeButton from '@/components/ui/RandomRecipeButton';
import RecipeCard from '@/components/recipes/RecipeCard';
import Script from 'next/script';

// Types for latest recipes with related data
type HomeRecipeWithRelations = {
  id: string;
  title: string;
  slug: string;
  instructions: string;
  attachmentName: string | null;
  attachmentUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  tags: {
    id: string;
    name: string;
  }[];
  _count: {
    votes: number;
    tried: number;
  };
};

function toRecipeWithRelations(recipe: HomeRecipeWithRelations): HomeRecipeWithRelations {
  return {
    ...recipe,
    author: recipe.author,
    tags: recipe.tags || [],
    _count: recipe._count || { votes: 0, tried: 0 },
  };
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setMessage('Thanks for joining! We\'ll be in touch soon.');
        setEmail('');
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 2000);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Join the Waitlist</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {message ? (
          <p className="text-center py-4 text-green-600">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-4">
              Be the first to know when we launch new features!
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [latestRecipes, setLatestRecipes] = useState<HomeRecipeWithRelations[]>([]);
  const [trendingRecipes, setTrendingRecipes] = useState<HomeRecipeWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.needsUsernameSetup) {
        // Only redirect if we're not already on the setup page
        if (typeof window !== 'undefined' && window.location.pathname !== '/auth/setup-username') {
          router.push("/auth/setup-username");
        }
      }
    }
  }, [status, session?.user?.needsUsernameSetup, router]);

  // Fetch latest recipes via API route to avoid server-only issues
  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const response = await fetch('/api/recipes?latest=4');
        const recipes = await response.json();
        const processedRecipes = recipes.map(toRecipeWithRelations);
        setLatestRecipes(processedRecipes);
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrendingRecipes = async () => {
      try {
        const response = await fetch('/api/recipes?trending=4');
        const recipes = await response.json();
        const processedRecipes = recipes.map(toRecipeWithRelations);
        setTrendingRecipes(processedRecipes);
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchLatestRecipes();
    fetchTrendingRecipes();
  }, []);

  // Structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cantripped",
    "description": "Discover, create, and share innovative Magic: The Gathering rule modifications and game variants",
    "url": "https://www.cantripped.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.cantripped.com/recipes?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cantripped",
      "url": "https://www.cantripped.com"
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--light)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }
  
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
        {/* Hero section with animated gradient background */}
        <div className="gradient-bg py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div>
          <div className="absolute w-60 h-60 rounded-full bg-[var(--primary)]/30 -top-10 -left-10 blur-3xl"></div>
          <div className="absolute w-60 h-60 rounded-full bg-[var(--accent)]/30 -bottom-10 -right-10 blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                <span className="block">MTG MODS</span>
                <span className="block text-3xl md:text-4xl mt-2 text-[var(--accent)]/90">Reimagine the game</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/80">
                Discover innovative game and rule modifications for Magic: The Gathering that transform how you play
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                <Link href="/recipes" className="btn-primary btn-shine rounded-full text-center">
                  Explore Recipes
                </Link>
                <Link href="/auth/signin" className="btn-contrast btn-shine rounded-full text-center">
                  Get Started
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  className="transition-all duration-200 bg-gradient-to-r from-[#FF8661] to-[#5A31F4] text-white font-extrabold py-3 px-6 rounded-full shadow-xl text-lg tracking-wider border-4 border-white hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#5A31F4] focus:ring-offset-2 animate-bounce-slow"
                  onClick={() => setWaitlistOpen(true)}
                >
                  Join Kickstarter Waitlist
                </button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={toRecipeWithRelations(recipe)} compact={true} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Trending Recipes Section */}
        <div className="pt-8 pb-6 bg-[#F1F3FA]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#2C2E3A]">Trending Recipes</h2>
              <Link href="/recipes" className="text-[#5A31F4] hover:underline font-semibold">
                View All →
              </Link>
            </div>
            
            {trendingLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A31F4]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={toRecipeWithRelations(recipe)} compact={true} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Random Recipe Button Section */}
        <div className="pt-6 pb-6 bg-[#F1F3FA]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-center">
              <RandomRecipeButton />
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <div className="pt-0 pb-12 bg-[var(--background)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10 mt-4">Transform Your <span className="text-[var(--primary)]">Magic</span> Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Link href="/recipes" className="card-3d p-8 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">Discover New Ways to Play</h3>
                <p className="text-gray-600 mb-6">Explore a library of rule modifications and game variants from the community.</p>
                <span className="hover-underline text-[var(--primary)] font-semibold group-hover:underline">Browse Recipes →</span>
              </Link>
              
              <Link href="/recipes/new" className="card-3d p-8 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--accent)]">Create Your Rules</h3>
                <p className="text-gray-600 mb-6">Share your own unique game modifications with the MTG community.</p>
                <span className="hover-underline text-[var(--accent)] font-semibold group-hover:underline">Create a Recipe →</span>
              </Link>
              
              <Link href="/policies/community" className="card-3d p-8 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 rounded-full bg-[var(--supporting)]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--supporting)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--supporting)]">Join Community</h3>
                <p className="text-gray-600 mb-6">Connect with other players, share feedback, and collaborate on variants.</p>
                <span className="hover-underline text-[var(--supporting)] font-semibold group-hover:underline">Connect Now →</span>
              </Link>
              
              <Link href="/learn" className="card-3d p-8 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
                <div className="w-16 h-16 rounded-full bg-[var(--contrast)]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--contrast)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--contrast)]">Learn & Grow</h3>
                <p className="text-gray-600 mb-6">Access rule guides and resources to enhance your game variants.</p>
                <span className="hover-underline text-[var(--contrast)] font-semibold group-hover:underline">Start Learning →</span>
              </Link>
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
    </>
  );
}
