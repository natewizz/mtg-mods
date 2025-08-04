'use client';

import { useState, useEffect } from 'react';
import Badge from '../ui/Badge';

interface Badge {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  isManual: boolean;
}

interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
}

export default function BadgeManager() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBadges();
    fetchUsers();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch('/api/admin/badges');
      if (response.ok) {
        const data = await response.json();
        setBadges(data.filter((badge: Badge) => badge.isManual));
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const awardBadge = async () => {
    if (!selectedUser || !selectedBadge) {
      setMessage('Please select both a user and a badge');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/badges/award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          badgeName: selectedBadge,
          reason: reason || 'Manually awarded by admin'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        setSelectedUser('');
        setSelectedBadge('');
        setReason('');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error awarding badge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Badge Manager</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select User
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.username || user.email} ({user.id.slice(0, 8)}...)
              </option>
            ))}
          </select>
        </div>

        {/* Badge Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Badge
          </label>
          <select
            value={selectedBadge}
            onChange={(e) => setSelectedBadge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a badge...</option>
            {badges.map((badge) => (
              <option key={badge.id} value={badge.name}>
                {badge.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reason */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason (Optional)
        </label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Why is this badge being awarded?"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Selected Badge Preview */}
      {selectedBadge && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Badge:</h3>
          <div className="flex items-center gap-3">
            {badges.find(b => b.name === selectedBadge) && (
              <Badge
                icon={badges.find(b => b.name === selectedBadge)!.icon}
                color={badges.find(b => b.name === selectedBadge)!.color}
                displayName={badges.find(b => b.name === selectedBadge)!.displayName}
                description={badges.find(b => b.name === selectedBadge)!.description}
                size="md"
                showTooltip={false}
              />
            )}
            <div>
              <div className="font-medium">
                {badges.find(b => b.name === selectedBadge)?.displayName}
              </div>
              <div className="text-sm text-gray-600">
                {badges.find(b => b.name === selectedBadge)?.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Award Button */}
      <div className="mt-6">
        <button
          onClick={awardBadge}
          disabled={loading || !selectedUser || !selectedBadge}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Awarding...' : 'Award Badge'}
        </button>
      </div>

      {/* Available Badges */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Available Manual Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Badge
                icon={badge.icon}
                color={badge.color}
                displayName={badge.displayName}
                description={badge.description}
                size="sm"
                showTooltip={false}
              />
              <div>
                <div className="font-medium text-sm">{badge.displayName}</div>
                <div className="text-xs text-gray-600">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 