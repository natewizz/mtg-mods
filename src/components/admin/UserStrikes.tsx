'use client';
import { useState, useEffect } from 'react';

interface UserStrike {
  id: string;
  userId: string;
  reason: string;
  recipeId?: string;
  recipeTitle?: string;
  adminId: string;
  adminName: string;
  createdAt: string;
}

interface UserStrikeSummary {
  userId: string;
  username: string;
  strikeCount: number;
  isDisabled: boolean;
  strikes: UserStrike[];
  lastStrike?: string;
}

export default function UserStrikes() {
  const [userStrikes, setUserStrikes] = useState<UserStrikeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserStrikes();
    
    // Listen for refresh events from ContentReports component
    const handleRefresh = (event: CustomEvent) => {
      setUserStrikes(event.detail);
    };
    
    window.addEventListener('refreshUserStrikes', handleRefresh as EventListener);
    
    return () => {
      window.removeEventListener('refreshUserStrikes', handleRefresh as EventListener);
    };
  }, []);

  const fetchUserStrikes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/user-strikes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user strikes');
      }
      
      const data = await response.json();
      setUserStrikes(data.strikes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user strikes');
    } finally {
      setLoading(false);
    }
  };

  const banUser = async (userId: string, username: string) => {
    const reason = prompt(`Enter reason for banning ${username}:`);
    if (!reason) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        alert(`User ${username} has been banned successfully`);
        await fetchUserStrikes(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to ban user');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">⚠️ User Strikes</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A31F4] mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading user strikes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">⚠️ User Strikes</h2>
        <div className="text-center py-8 text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={fetchUserStrikes}
            className="mt-2 px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A2BE4]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (userStrikes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">⚠️ User Strikes</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No user strikes yet</p>
          <p className="text-sm">Users get strikes when their content is removed due to inappropriate content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C2E3A]">⚠️ User Strikes ({userStrikes.length} users)</h2>
        <button 
          onClick={fetchUserStrikes}
          className="px-3 py-1 text-sm bg-[#5A31F4] text-white rounded hover:bg-[#4A2BE4]"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {userStrikes.map((user) => (
          <div key={user.userId} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-[#2C2E3A]">
                  {user.username}
                </h3>
                <p className="text-xs text-gray-500">ID: {user.userId}</p>
                              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user.isDisabled 
                    ? 'bg-red-100 text-red-800' 
                    : user.strikeCount === 1 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                }`}>
                  {user.strikeCount} strike{user.strikeCount !== 1 ? 's' : ''}
                </span>
                {user.isDisabled && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                    ACCOUNT DISABLED
                  </span>
                )}
                {!user.isDisabled && user.strikeCount >= 1 && (
                  <button
                    onClick={() => banUser(user.userId, user.username)}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                    title="Ban user"
                  >
                    Ban User
                  </button>
                )}
              </div>
              </div>
              {user.lastStrike && (
                <span className="text-xs text-gray-500">
                  Last strike: {formatDate(user.lastStrike)}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              {user.strikes.map((strike) => (
                <div key={strike.id} className="bg-gray-50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {strike.reason}
                      </p>
                      {strike.recipeTitle && (
                        <p className="text-xs text-gray-500 mt-1">
                          Recipe: {strike.recipeTitle}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Admin: {strike.adminName}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(strike.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 