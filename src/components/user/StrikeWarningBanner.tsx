'use client';
import { useState } from 'react';
import { useUserBanned } from '@/hooks/useUserBanned';

export default function StrikeWarningBanner() {
  const { strikes, loading } = useUserBanned();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if loading, dismissed, or no strikes
  if (loading || dismissed || strikes.length === 0) {
    return null;
  }

  // Only show warning for users with exactly 1 strike
  if (strikes.length !== 1) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-yellow-800">
              Content Violation Warning
            </h3>
          </div>
          <p className="text-yellow-700 mb-2">
            You have received {strikes.length} strike{strikes.length !== 1 ? 's' : ''} for inappropriate content.
            {strikes.length === 1 && ' One more strike will result in your account being disabled.'}
          </p>
          {strikes.length === 1 && (
            <div className="bg-yellow-100 rounded p-3 mb-2">
              <p className="text-sm text-yellow-800 font-medium">Recent violation:</p>
              <p className="text-sm text-yellow-700">
                Recipe: &ldquo;{strikes[0].recipeTitle || 'Unknown Recipe'}&rdquo;
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Reason: {strikes[0].reason}
              </p>
            </div>
          )}
          <p className="text-sm text-yellow-600">
            Please ensure all content follows our community guidelines.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 text-yellow-400 hover:text-yellow-600"
          title="Dismiss warning"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
} 