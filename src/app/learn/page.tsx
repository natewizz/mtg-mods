import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Learn About MTG Game Modifications | MTG Mods',
  description: 'Discover how to create, share, and play with game rule modifications for Magic: The Gathering. Learn about recipe complexity, dependencies, and unleash your creativity.',
  keywords: [
    'Magic the Gathering', 'MTG', 'learn', 'how to', 'game mods', 'rule variants', 'custom rules', 'community', 'tutorial', 'guide'
  ],
  alternates: {
    canonical: 'https://www.mtgmods.xyz/learn',
  },
  openGraph: {
    title: 'Learn About MTG Game Modifications | MTG Mods',
    description: 'Discover how to create, share, and play with game rule modifications for Magic: The Gathering. Learn about recipe complexity, dependencies, and unleash your creativity.',
    url: 'https://www.mtgmods.xyz/learn',
    siteName: 'MTG Mods',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=Learn%20About%20MTG%20Game%20Modifications&description=Discover%20how%20to%20create%2C%20share%2C%20and%20play%20with%20game%20rule%20modifications%20for%20Magic%3A%20The%20Gathering&type=learn`,
        width: 1200,
        height: 630,
        alt: 'Learn About MTG Game Modifications'
      }
    ],
    locale: 'en_US',
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn About MTG Game Modifications | MTG Mods',
    description: 'Discover how to create, share, and play with game rule modifications for Magic: The Gathering. Learn about recipe complexity, dependencies, and unleash your creativity.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=Learn%20About%20MTG%20Game%20Modifications&description=Discover%20how%20to%20create%2C%20share%2C%20and%20play%20with%20game%20rule%20modifications%20for%20Magic%3A%20The%20Gathering&type=learn`]
  }
};

export default function LearnPage() {
  return (
    <div className="bg-[#F1F3FA] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#5A31F4] to-[#3DA1C4] py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Understanding MTG Game Modifications</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Learn how to reimagine the game you love with creative rule changes and variants
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-3xl font-bold text-[#2C2E3A] mb-6">What is an MTG Recipe?</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            In the context of MTG Mods, a <strong>recipe</strong> is a set of custom rule modifications or game variants
            that transform how Magic: The Gathering is played. Unlike card alterations, these recipes change
            the fundamental rules, interactions, and dynamics of the game itself.
          </p>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Think of recipes as culinary instructions for your MTG experience—they provide ingredients 
            (rule changes) and directions (how to implement them) that result in a fresh take on the 
            familiar game you love. Just as a food recipe transforms basic ingredients into something 
            new and exciting, an MTG mod recipe transforms the base game into novel play experiences.
          </p>
          
          <div className="bg-[#F1F3FA] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold text-[#5A31F4] mb-3">Example Recipe: &quot;Shared Destiny&quot;</h3>
            <p className="text-gray-700 mb-3">
              <strong>Basic Rule Change:</strong> All players draw from a single shared library created by shuffling together 20 cards from each player&apos;s deck.
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Additional Rules:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-3">
              <li>Players must reveal all cards drawn</li>
              <li>Players may cast any card drawn, using any color of mana</li>
              <li>When a player would lose, they instead shuffle their hand and graveyard into the shared library</li>
            </ul>
            <p className="text-gray-700">
              <strong>Result:</strong> A chaotic, unpredictable game where strategy revolves around adapting to random cards and creating unexpected synergies.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-3xl font-bold text-[#2C2E3A] mb-6">Recipe Complexity</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Game modification recipes can range from simple tweaks to elaborate new game modes. Understanding
            complexity helps players find recipes that match their experience level and desired play style.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#A3D39C] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Simple Mods</h3>
              <p className="text-gray-700">
                Single rule changes that can be explained in a sentence or two. These don&apos;t fundamentally
                alter core game mechanics but add interesting twists.
              </p>
              <div className="mt-4 text-sm bg-white p-3 rounded-md">
                <strong>Example:</strong> &quot;Players may cast one spell each turn from their graveyard.&quot;
              </div>
            </div>
            
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#F8AA92] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Moderate Mods</h3>
              <p className="text-gray-700">
                Multiple rule changes that work together to create a coherent variant, requiring
                more explanation and potentially some preparation.
              </p>
              <div className="mt-4 text-sm bg-white p-3 rounded-md">
                <strong>Example:</strong> &quot;Players draft cards from a shared pile each turn and life totals affect draft priority.&quot;
              </div>
            </div>
            
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#5A31F4] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Complex Mods</h3>
              <p className="text-gray-700">
                Comprehensive rules overhauls that may introduce entirely new game mechanics, 
                phases, or win conditions, often requiring additional components.
              </p>
              <div className="mt-4 text-sm bg-white p-3 rounded-md">
                <strong>Example:</strong> &quot;A roleplaying variant where players are adventurers in a dungeon with a Dungeon Master player controlling monsters.&quot;
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-3xl font-bold text-[#2C2E3A] mb-6">Recipe Dependencies</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Some recipe modifications have specific requirements or considerations that affect 
            how they can be implemented. Understanding these dependencies helps you prepare 
            properly and select compatible recipes.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="p-5 bg-[#F1F3FA] rounded-lg h-full">
                  <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Format Dependencies</h3>
                  <p className="text-gray-700">
                    Recipes that work only with specific MTG formats like Commander, Draft, 
                    Standard, or require a specific number of players.
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <div className="p-5 bg-[#F1F3FA] rounded-lg h-full">
                  <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Component Dependencies</h3>
                  <p className="text-gray-700">
                    Recipes that require additional items like dice, counters, 
                    tokens, special cards, or tracking sheets.
                  </p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <div className="p-5 bg-[#F1F3FA] rounded-lg h-full">
                  <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Deck Dependencies</h3>
                  <p className="text-gray-700">
                    Recipes that require specific deck construction rules or work better with 
                    certain types of decks/cards.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFC145]">
              <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Compatibility Tip</h3>
              <p className="text-gray-700">
                When combining multiple recipes, check for conflicting rules! Some modifications work 
                beautifully together, creating rich gameplay experiences, while others may create 
                rule contradictions or unbalanced gameplay.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-3xl font-bold text-[#2C2E3A] mb-6">Fostering Creativity</h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Creating your own game modifications is a rewarding way to express your creativity and 
            deepen your understanding of MTG&apos;s mechanics. Here are some approaches to developing 
            your own unique recipes:
          </p>
          
          <div className="space-y-8">
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#5A31F4] mb-3">Starting With a Problem</h3>
              <p className="text-gray-700 mb-3">
                Identify an aspect of MTG that you&apos;d like to change or improve:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>&quot;Games end too quickly in my playgroup&quot;</li>
                <li>&quot;We have a player who always uses the same winning strategy&quot;</li>
                <li>&quot;New players struggle to keep up with experienced ones&quot;</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Then design rule modifications that address this specific problem.
              </p>
            </div>
            
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#5A31F4] mb-3">Borrowing From Other Games</h3>
              <p className="text-gray-700 mb-3">
                Draw inspiration from mechanics in other games:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Auction/bidding systems from board games</li>
                <li>Team dynamics from party video games</li>
                <li>Role-playing elements from RPGs</li>
                <li>Hidden information from social deduction games</li>
              </ul>
            </div>
            
            <div className="bg-[#F1F3FA] p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#5A31F4] mb-3">Exploring &quot;What If&quot; Scenarios</h3>
              <p className="text-gray-700 mb-3">
                Ask disruptive questions and see where they lead:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>&quot;What if players could cast spells during any phase?&quot;</li>
                <li>&quot;What if life totals were shared between teammates?&quot;</li>
                <li>&quot;What if losing a creature meant gaining some other advantage?&quot;</li>
                <li>&quot;What if the board state periodically reset like a video game level?&quot;</li>
              </ul>
            </div>
            
            <div className="bg-[#FFF8E1] p-6 rounded-lg border-l-4 border-[#FFC145]">
              <h3 className="text-xl font-bold text-[#2C2E3A] mb-3">Creativity Tip</h3>
              <p className="text-gray-700">
                Not every rule modification will work perfectly the first time. Embrace iteration! 
                Play-test your recipes, gather feedback, and refine your ideas. Some of the most 
                interesting game variants have evolved through multiple revisions and collaborative improvement.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#5A31F4] to-[#3DA1C4] rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Your Own Recipe?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Apply what you&apos;ve learned and share your creative game modifications with the community
          </p>
          <Link 
            href="/recipes/new" 
            className="inline-block bg-white text-[#5A31F4] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all"
          >
            Create a Recipe
          </Link>
        </div>
      </div>
    </div>
  );
} 