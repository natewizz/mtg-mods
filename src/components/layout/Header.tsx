"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { SessionUser } from "@/lib/auth/types";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserStrikes } from '@/contexts/UserStrikesContext';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isBanned } = useUserStrikes();
  
  // Safely access user properties with type safety
  const user = session?.user as SessionUser | undefined;
  const userName = user?.username ? `@${user.username}` : 'Anonymous';
  const userImage = user?.image;
  
  // Update profile image when session changes
  useEffect(() => {
    if (userImage) {
      setProfileImage(userImage);
    }
  }, [userImage]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sign out with proper redirection
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Beta Testers Sticky Link */}
      <div className="fixed top-4 right-4 z-50 md:block hidden">
        <a
          href="https://forms.gle/KCK8AYfWL1Jd6CUY6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <span className="animate-pulse">🚀</span>
          Beta Testers Click Here
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      {/* Mobile Beta Testers Link - positioned below header */}
      <div className="md:hidden block">
        <a
          href="https://forms.gle/KCK8AYfWL1Jd6CUY6"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed top-20 right-4 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <span className="animate-pulse">🚀</span>
          Beta Testers
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-14">
              <Image 
                src="/images/logo.png" 
                alt="MTG Mods Logo" 
                width={56} 
                height={56} 
                className="object-contain"
                priority
              />
            </div>
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
            <Link href="/policies/community" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/learn" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Learn
            </Link>
            <Link href="/faq" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover-underline font-medium text-dark hover:text-primary transition-colors">
              Contact
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/dashboard" className="hover-underline font-medium text-[#5A31F4] hover:text-[#4A21E4] transition-colors flex items-center gap-1">
                <span>Admin</span>
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">🚨</span>
              </Link>
            )}
            
            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full border-2 border-t-primary border-r-transparent animate-spin"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button 
                    ref={buttonRef}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    {profileImage ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                        <Image 
                          src={profileImage}
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
                  {isDropdownOpen && (
                    <div 
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 transition-all duration-200 ease-in-out"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <Link href="/profile/me" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Profile
                        </Link>
                        {!isBanned && (
                          <Link href="/recipes/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Create Recipe
                          </Link>
                        )}
                        <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
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
            <Link href="/" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              Home
            </Link>
            <Link href="/recipes" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              Recipes
            </Link>
            <Link href="/policies/community" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              Community
            </Link>
            <Link href="/learn" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              Learn
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
              Contact
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/dashboard" className="hover:text-[#5A31F4] transition-colors flex items-center gap-1" onClick={handleMobileLinkClick}>
                <span>Admin Dashboard</span>
                <span className="text-xs">🚨</span>
              </Link>
            )}
            
            {session ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  {profileImage ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary">
                      <Image 
                        src={profileImage}
                        alt={userName || "User"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                      {userName?.charAt(0) || "U"}
                    </div>
                  )}
                  <Link href="/profile/me" className="hover:text-primary transition-colors" onClick={handleMobileLinkClick}>
                    My Profile
                  </Link>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    handleMobileLinkClick();
                  }}
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
                  onClick={handleMobileLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 rounded-md bg-primary text-white text-center"
                  onClick={handleMobileLinkClick}
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