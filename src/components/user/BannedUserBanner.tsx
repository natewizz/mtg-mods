'use client';
import { useUserBanned } from '@/hooks/useUserBanned';

export default function BannedUserBanner() {
  const { strikes, loading } = useUserBanned();

  // Don't show if loading or no strikes
  if (loading || strikes.length === 0) {
    return null;
  }

  // Only show for users with 2+ strikes (banned)
  if (strikes.length < 2) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-red-800">
              Account Disabled
            </h3>
          </div>
          <p className="text-red-700 mb-3">
            Your account has been disabled due to multiple content violations. You cannot create new content, vote, or interact with recipes.
          </p>
          
          <div className="bg-red-100 rounded p-3 mb-3">
            <p className="text-sm text-red-800 font-medium mb-2">Violations:</p>
            {strikes.slice(0, 3).map((strike, index) => (
              <div key={strike.id} className="mb-2 last:mb-0">
                <p className="text-sm text-red-700">
                  {index + 1}. Recipe: "{strike.recipeTitle || 'Unknown Recipe'}"
                </p>
                <p className="text-xs text-red-600 ml-2">
                  Reason: {strike.reason}
                </p>
              </div>
            ))}
            {strikes.length > 3 && (
              <p className="text-xs text-red-600 ml-2">
                ... and {strikes.length - 3} more violation{strikes.length - 3 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <p className="text-sm text-red-600">
            If you believe this was an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
} 