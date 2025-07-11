"use client";

import { useState, useEffect } from "react";
import { generateMtgUsername, isUsernameAvailable } from "@/lib/username-generator";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type UsernameSetupProps = {
  userId: string;
  onComplete?: (username: string) => void;
};

export default function UsernameSetup({ userId, onComplete }: UsernameSetupProps) {
  const router = useRouter();
  const { update } = useSession();
  const [username, setUsername] = useState("");
  const [usernameOptions, setUsernameOptions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingOptions, setIsGeneratingOptions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  // Generate username options when component mounts
  useEffect(() => {
    const generateUsernameOptions = async () => {
      setIsGeneratingOptions(true);
      const options: string[] = [];
      let attempts = 0;
      const maxAttempts = 20; // Limit attempts to prevent infinite loop
      
      // Generate 3 unique username options
      while (options.length < 3 && attempts < maxAttempts) {
        attempts++;
        const newUsername = generateMtgUsername();
        
        // Skip if the username is already in our options
        if (options.includes(newUsername)) continue;
        
        // Check availability
        const available = await isUsernameAvailable(newUsername);
        
        if (available) {
          options.push(newUsername);
        }
      }
      
      setUsernameOptions(options);
      
      // Set the first option as the default selected username
      if (options.length > 0) {
        setUsername(options[0]);
      }
      
      setIsGeneratingOptions(false);
    };
    
    generateUsernameOptions();
  }, []);

  // Check username availability when edited
  useEffect(() => {
    const checkAvailability = async () => {
      if (!username || !isEditing) return;
      
      setIsCheckingAvailability(true);
      const available = await isUsernameAvailable(username);
      setIsAvailable(available);
      setIsCheckingAvailability(false);
      
      if (!available) {
        setError("This username is already taken");
      } else {
        setError(null);
      }
    };
    
    // Debounce the availability check
    const timer = setTimeout(() => {
      checkAvailability();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [username, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleGenerateNew = async () => {
    setIsLoading(true);
    setIsGeneratingOptions(true);
    
    const options: string[] = [];
    let attempts = 0;
    const maxAttempts = 20;
    
    while (options.length < 3 && attempts < maxAttempts) {
      attempts++;
      const newUsername = generateMtgUsername();
      
      if (options.includes(newUsername)) continue;
      
      const available = await isUsernameAvailable(newUsername);
      
      if (available) {
        options.push(newUsername);
      }
    }
    
    setUsernameOptions(options);
    
    if (options.length > 0) {
      setUsername(options[0]);
    }
    
    setError(null);
    setIsAvailable(true);
    setIsLoading(false);
    setIsGeneratingOptions(false);
  };

  const handleSelectUsername = (selected: string) => {
    setUsername(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      setError("Username cannot be empty");
      return;
    }
    
    if (!isAvailable) {
      setError("This username is already taken");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/users/${userId}/username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update username");
      }
      
      // Update the session to reflect the new username
      await update();

      // Callback if provided
      if (onComplete) {
        onComplete(username);
      } else {
        // Redirect to homepage for better onboarding experience
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#2C2E3A] mb-4">Choose Your Magical Identity</h2>
        
        <p className="text-gray-600 mb-4">
          Select one of these MTG-inspired usernames, or customize your own magical identity.
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {/* Username Option Cards */}
        {isGeneratingOptions ? (
          <div className="flex justify-center my-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5A31F4]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {usernameOptions.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleSelectUsername(option)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  username === option 
                    ? 'border-[#5A31F4] bg-[#5A31F4]/10' 
                    : 'border-gray-200 hover:border-[#5A31F4]/50'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-1 font-medium overflow-hidden text-ellipsis">
                    {option}
                  </div>
                  {username === option && (
                    <div className="text-[#5A31F4]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Your Username
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleChange}
                  onFocus={() => setIsEditing(true)}
                  onBlur={() => setIsEditing(false)}
                  className={`w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 ${
                    isEditing && !isAvailable 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-[#5A31F4]"
                  }`}
                  placeholder="Your magical username"
                />
                {isCheckingAvailability ? (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-t-2 border-[#5A31F4] rounded-full"></div>
                  </div>
                ) : isEditing && isAvailable && username ? (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={handleGenerateNew}
                disabled={isLoading || isGeneratingOptions}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#5A31F4] disabled:opacity-50"
              >
                <span className="sr-only">Generate New</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              This is how others will know you, and it will be used in your profile URL.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !isAvailable || !username || isGeneratingOptions}
              className="px-4 py-2 bg-[#5A31F4] hover:bg-[#4A21E4] text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-[#5A31F4] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Username"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 