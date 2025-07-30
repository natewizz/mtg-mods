"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  // Popular tags from the plan document
  const popularTags = ['commander', 'combo', 'tokens', 'multiplayer', 'budget-friendly'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to your newsletter service in production
    console.log('Newsletter signup:', email);
    setEmail('');
    // Would show success message in production
  };
  
  return (
    <footer className="bg-[#2C2E3A] text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10">
                <Image 
                  src="/images/logo.png" 
                  alt="MTG Mods Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">MTG Mods</h3>
            </div>
            <p className="text-gray-300 mb-4">Share your Magic: The Gathering rule modifications and discover creative ways to enhance your gameplay experience.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-[#5A31F4] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5A31F4] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5A31F4] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.21c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.755zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5A31F4] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="https://discord.gg/mtgmods" className="text-gray-300 hover:text-[#5A31F4] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FFC145]">Policies</h4>
            <ul className="space-y-2">
              <li><Link href="/policies/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/policies/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/policies/community" className="text-gray-300 hover:text-white transition">Community Guidelines</Link></li>
              <li><Link href="/changelog" className="text-gray-300 hover:text-white transition">Changelog</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Resources column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#FF8661]">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-gray-300 hover:text-white transition">Learn</Link></li>
              <li><Link href="/recipes" className="text-gray-300 hover:text-white transition">Browse Mods</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/recipes/new" className="text-gray-300 hover:text-white transition">Create a Recipe</Link></li>
              <li><Link href="/policies/community" className="text-gray-300 hover:text-white transition">Community</Link></li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#3DA1C4]">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest mods and MTG content.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5A31F4]"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#5A31F4] hover:bg-[#4921D8] rounded font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2 text-[#FFC145]">Popular Tags</h5>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/recipes?tag=${tag}`} 
                    className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} MTG Mods. All rights reserved.</p>
          <p className="mt-2 text-sm">Magic: The Gathering is a trademark of Wizards of the Coast LLC. MTG Mods is not affiliated with Wizards of the Coast.</p>
        </div>
      </div>
    </footer>
  );
} 