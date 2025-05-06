"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { SessionUser } from "@/lib/auth/types";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Safely access user properties with type safety
  const user = session?.user as SessionUser | undefined;
  const userId = user?.id;
  const userName = user?.name;
  const userImage = user?.image;
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="bg-primary text-white h-8 w-8 rounded-md flex items-center justify-center font-bold">M</span>
            <span>MTG Mods</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/recipes" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Recipes
            </Link>
            <Link href="/community" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/learn" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Learn
            </Link>
            
            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full border-2 border-t-primary border-r-transparent animate-spin"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    {userImage ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                        <Image 
                          src={userImage}
                          alt={userName || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        {userName?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="font-medium">{userName}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 scale-95 origin-top-right group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out">
                    <div className="py-1">
                      <Link href={`/profile/${userId}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <Link href="/recipes/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Create Recipe
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </Link>
                      <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-primary font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col space-y-4 py-4">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/recipes" className="hover:text-primary transition-colors">
              Recipes
            </Link>
            <Link href="/community" className="hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/learn" className="hover:text-primary transition-colors">
              Learn
            </Link>
            
            {session ? (
              <>
                <Link href={`/profile/${userId}`} className="hover:text-primary transition-colors">
                  My Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-left text-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 rounded-md border border-primary text-primary text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md bg-primary text-white text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 