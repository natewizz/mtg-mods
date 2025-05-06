"use client";

import { User } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

type ProfileCardProps = {
  user: User;
  isCurrentUser: boolean;
  onUpdate?: (data: Partial<User>) => Promise<void>;
};

export default function ProfileCard({ user, isCurrentUser, onUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    favoriteDeck: user.favoriteDeck || '',
    bio: user.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      await onUpdate(formData);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name || 'User'} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#5A31F4] flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0) || '?'}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#2C2E3A]">{user.name}</h1>
            
            {!isEditing ? (
              <div className="mt-4 space-y-2">
                {user.username && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Username:</span> {user.username}
                  </p>
                )}
                {user.favoriteDeck && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Favorite Deck:</span> {user.favoriteDeck}
                  </p>
                )}
                {user.bio && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-[#2C2E3A]">Bio</h3>
                    <p className="text-gray-600 mt-1">{user.bio}</p>
                  </div>
                )}
                
                {isCurrentUser && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A21E4] transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="favoriteDeck" className="block text-sm font-medium text-gray-700">
                    Favorite Deck
                  </label>
                  <input
                    type="text"
                    id="favoriteDeck"
                    name="favoriteDeck"
                    value={formData.favoriteDeck}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2 border"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2 border"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A21E4] transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 