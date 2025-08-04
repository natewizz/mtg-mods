"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { User as PrismaUser } from "@prisma/client";

interface ProfileCardProps {
  user: PrismaUser;
  isCurrentUser: boolean;
  onUpdate?: (data: Partial<PrismaUser>) => Promise<void>;
}

export default function ProfileCard({ user, isCurrentUser }: ProfileCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    linkUrl: user.linkUrl || "",
    linkText: user.linkText || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileUpdate = async (data: Partial<PrismaUser>) => {
    if (!user) return Promise.reject(new Error('Profile not loaded'));

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      await response.json();
      
      // If username was changed, redirect to the new profile URL
      if (data.username && data.username !== user.username) {
        console.log(`Username changed from ${user.username} to ${data.username}. Redirecting...`);
        router.push(`/profile/${data.username}`);
      }
      
      return Promise.resolve();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return Promise.reject(err);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`/api/users/${user.id}/profile-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }

      await response.json();
      
      // Refresh the page to show the new image
      router.refresh();
    } catch (err) {
      console.error('Error uploading image:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await handleProfileUpdate(formData);
      setIsEditing(false);
    } catch {
      // Error is already set in handleProfileUpdate
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      username: user.username || "",
      linkUrl: user.linkUrl || "",
      linkText: user.linkText || "",
    });
    setError(null);
    setIsEditing(false);
  };

  const displayName = user.username || user.name || "Anonymous";
  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : 'Unknown';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {user.image ? (
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--primary)]/20">
                <Image 
                  src={user.image}
                  alt={`${displayName}'s profile`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[var(--primary)]/20 flex items-center justify-center border-4 border-[var(--primary)]/20">
                <span className="text-2xl font-bold text-[var(--primary)]">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            {isCurrentUser && (
              <div className="absolute -bottom-1 -right-1">
                <label htmlFor="profile-image-upload" className="cursor-pointer">
                  <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center hover:bg-[var(--primary)]/80 transition-colors">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--dark)]">{displayName}</h1>
            <p className="text-gray-500">Member since {memberSince}</p>
            {user.linkUrl && (
              <a
                href={user.linkUrl.startsWith('http') ? user.linkUrl : `https://${user.linkUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline text-sm"
              >
                {user.linkText || user.linkUrl}
              </a>
            )}
          </div>
        </div>
        
        {isCurrentUser && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Upload Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {uploadError}
        </div>
      )}

      {/* Upload Loading State */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4">
          Uploading image...
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Your display name"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Your username"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              This will change your profile URL
            </p>
          </div>
          
          <div>
            <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL (optional)
            </label>
            <input
              type="url"
              id="linkUrl"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>
          
          <div>
            <label htmlFor="linkText" className="block text-sm font-medium text-gray-700 mb-1">
              Link Text (optional)
            </label>
            <input
              type="text"
              id="linkText"
              value={formData.linkText}
              onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="My Website"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 