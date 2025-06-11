"use client";

import { User } from '@prisma/client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import ReactMarkdown from 'react-markdown';
import { formatDistanceToNow } from 'date-fns';

// Extended interface to include new fields during transition
interface ExtendedUser extends User {
  linkUrl: string | null;
  linkText: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

type ProfileCardProps = {
  user: ExtendedUser;
  isCurrentUser: boolean;
  onUpdate?: (data: Partial<ExtendedUser>) => Promise<void>;
};

export default function ProfileCard({ user, isCurrentUser, onUpdate }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || '',
    linkUrl: user.linkUrl || '',
    linkText: user.linkText || '',
    bio: user.bio || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { update } = useSession();

  const validateUrl = (url: string) => {
    if (!url) return true; // Empty URL is valid (optional field)
    
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'linkUrl') {
      setUrlError('');
      if (value && !validateUrl(value)) {
        setUrlError('Please enter a valid URL (e.g., https://example.com)');
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdate) return;
    
    // Validate URL before submission
    if (formData.linkUrl && !validateUrl(formData.linkUrl)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
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
      return;
    }
    
    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return;
    }
    
    // Create a preview
    setPreviewImage(URL.createObjectURL(file));
    
    // Upload the image
    const formData = new FormData();
    formData.append('image', file);
    
    setIsUploadingImage(true);
    
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
      // Refresh the session so the new image appears everywhere
      if (typeof update === 'function') {
        await update();
      } else {
        // fallback for older next-auth: force signIn to refresh session
        await signIn(undefined, { redirect: false });
      }
    } catch {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="bg-gradient-to-r from-[#5A31F4]/10 to-[#3DA1C4]/10 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden group border-4 border-white shadow-md">
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
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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
            {!isEditing ? (
              <div className="mt-4 space-y-4">
                {user.username && (
                  <p className="text-gray-600 font-medium">
                    <span className="text-[#3DA1C4]">@</span>{user.username}
                  </p>
                )}
                
                {user.linkUrl && (
                  <div className="flex items-center text-[#5A31F4] space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <a 
                      href={user.linkUrl} 
                      target="_blank" 
                      rel="nofollow noopener noreferrer" 
                      className="hover:underline transition-all hover:text-[#4A21E4]"
                    >
                      {user.linkText || user.linkUrl}
                    </a>
                  </div>
                )}
                
                {user.bio && (
                  <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gradient-to-br from-white via-[#f6f7fb] to-[#f3f0ff] shadow-sm">
                    <div className="flex items-center mb-2 gap-2">
                      <h3 className="text-lg font-semibold text-[#2C2E3A]">Bio</h3>
                      {isCurrentUser && (
                        <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                          (supports markdown)
                          <a
                            href="https://www.markdownguide.org/cheat-sheet/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 underline hover:text-[#5A31F4]"
                          >
                            Markdown Help
                          </a>
                        </span>
                      )}
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <ReactMarkdown>{user.bio}</ReactMarkdown>
                    </div>
                  </div>
                )}
                
                {isCurrentUser && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A21E4] transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-white rounded-md p-4 shadow-sm">
                {formError && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded mb-4">
                    {formError}
                  </div>
                )}
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-[#2C2E3A]">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      @
                    </span>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-7 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-[#2C2E3A] flex items-center gap-2">
                    Bio
                    {isCurrentUser && (
                      <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                        (supports markdown)
                        <a
                          href="https://www.markdownguide.org/cheat-sheet/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 underline hover:text-[#5A31F4]"
                        >
                          Markdown Help
                        </a>
                      </span>
                    )}
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                    placeholder="Tell others about yourself..."
                  />
                </div>
                
                <div>
                  <label htmlFor="linkUrl" className="block text-sm font-medium text-[#2C2E3A] flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Link URL
                  </label>
                  <input
                    type="url"
                    id="linkUrl"
                    name="linkUrl"
                    placeholder="https://example.com"
                    value={formData.linkUrl}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${urlError ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2`}
                  />
                  {urlError ? (
                    <p className="text-xs text-red-500 mt-1">{urlError}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">Add a link to your personal site, social media, or other profile</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="linkText" className="block text-sm font-medium text-[#2C2E3A]">
                    Link Text (Optional)
                  </label>
                  <input
                    type="text"
                    id="linkText"
                    name="linkText"
                    placeholder="My Website"
                    value={formData.linkText}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#5A31F4] focus:ring-[#5A31F4] px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Custom text to display for your link (URL will be used if empty)</p>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !!urlError}
                    className="px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A21E4] transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="absolute bottom-3 right-6 text-xs text-gray-400 text-right pointer-events-none select-none">
          <div>
            Joined: {user.emailVerified ? new Date(user.emailVerified).toLocaleDateString() : user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
          </div>
          <div>
            Last active: {user.updatedAt ? formatDistanceToNow(new Date(user.updatedAt), { addSuffix: true }) : 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
} 