'use client';
import { useState, useEffect } from 'react';

interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipeId?: string;
  recipeTitle?: string;
  userId?: string;
  adminId: string;
  adminName: string;
  reason?: string;
  read: boolean;
  createdAt: string;
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/notifications');
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId, action: 'mark_read' })
      });

      if (response.ok) {
        // Remove from local state
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
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
    return null; // Don't show loading state for notifications
  }

  if (error || notifications.length === 0) {
    return null; // Don't show anything if no notifications
  }

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3 shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-red-800 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-red-700 mb-2">
                {notification.message}
              </p>
              {notification.reason && (
                <p className="text-xs text-red-600 mb-2">
                  Reason: {notification.reason}
                </p>
              )}
              <p className="text-xs text-red-500">
                {formatDate(notification.createdAt)}
              </p>
            </div>
            <button
              onClick={() => markAsRead(notification.id)}
              className="ml-2 text-red-400 hover:text-red-600"
              title="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 