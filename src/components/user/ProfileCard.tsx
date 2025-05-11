"use client";

import { User } from '@prisma/client';
import Image from 'next/image';
import { useState, useRef } from 'react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdate) return;
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setUploadError('Only JPG and PNG images are allowed');
      return;
    }
    
    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setUploadError('Image size must be less than 2MB');
      return;
    }
    
    // Create a preview
    setPreviewImage(URL.createObjectURL(file));
    
    // Upload the image
    const formData = new FormData();
    formData.append('image', file);
    
    setIsUploadingImage(true);
    setUploadError('');
    
    try {
      const response = await fetch(`/api/users/${user.id}/profile-image`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
      
      // Update the user object in the parent component
      const data = await response.json();
      
      if (onUpdate) {
        await onUpdate({ image: data.user.image });
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
      // Reset preview on error
      setPreviewImage(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden group">
            {previewImage || user.image ? (
              <Image 
                src={previewImage || user.image || ''} 
                alt={user.name || 'User'} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#5A31F4] flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0) || '?'}
              </div>
            )}
            
            {isCurrentUser && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={triggerFileInput}
              >
                {isUploadingImage ? (
                  <span className="text-white text-xs font-medium">Uploading...</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                  </svg>
                )}
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-[#2C2E3A]">{user.name}</h1>
            
            {uploadError && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
                {uploadError}
              </div>
            )}
            
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
                {formError && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded mb-4">
                    {formError}
                  </div>
                )}
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[#2C2E3A]">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="favoriteDeck" className="block text-sm font-medium text-[#2C2E3A]">
                    Favorite Deck
                  </label>
                  <input
                    type="text"
                    id="favoriteDeck"
                    name="favoriteDeck"
                    value={formData.favoriteDeck}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-[#2C2E3A]">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A21E4] transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
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