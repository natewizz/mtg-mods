'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RecipeForm from '@/components/recipes/RecipeForm';

export default function NewRecipePage() {
  const { data: session, status } = useSession();

  // Redirect unauthenticated users to sign in
  if (status === 'unauthenticated') {
    redirect('/auth/signin?callbackUrl=/recipes/new');
  }

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--dark)] mb-6">Share a New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
