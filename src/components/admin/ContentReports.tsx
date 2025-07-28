'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ContentReport {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  recipeAuthorId: string;
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  action?: string;
}

export default function ContentReports() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/content-reports');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (reportId: string, action: 'dismiss' | 'remove_recipe', reason?: string) => {
    try {
      const response = await fetch(`/api/admin/content-reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason })
      });

      if (response.ok) {
        // Refresh both reports and strikes after action
        await Promise.all([fetchReports(), fetchUserStrikes()]);
        alert(`Report ${action === 'dismiss' ? 'dismissed' : 'resolved'} successfully`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update report');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const fetchUserStrikes = async () => {
    try {
      const response = await fetch('/api/admin/user-strikes');
      if (response.ok) {
        const data = await response.json();
        // Trigger a custom event to refresh UserStrikes component
        window.dispatchEvent(new CustomEvent('refreshUserStrikes', { detail: data.strikes }));
      }
    } catch (error) {
      console.error('Error fetching user strikes:', error);
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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REVIEWED: 'bg-blue-100 text-blue-800',
      RESOLVED: 'bg-green-100 text-green-800',
      DISMISSED: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status as keyof typeof statusColors] || statusColors.PENDING}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A31F4] mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8 text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={fetchReports}
            className="mt-2 px-4 py-2 bg-[#5A31F4] text-white rounded hover:bg-[#4A2BE4]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No content reports yet</p>
          <p className="text-sm">Users can report inappropriate content using the "Report Content" button on recipe cards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C2E3A]">🚨 Content Reports ({reports.length})</h2>
        <button 
          onClick={fetchReports}
          className="px-3 py-1 text-sm bg-[#5A31F4] text-white rounded hover:bg-[#4A2BE4]"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-[#2C2E3A]">
                  <Link 
                    href={`/recipes/${report.recipeSlug}`}
                    className="hover:text-[#5A31F4] hover:underline"
                  >
                    {report.recipeTitle}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Reported by {report.reporterName} ({report.reporterEmail})
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(report.status)}
                <span className="text-xs text-gray-500">
                  {formatDate(report.createdAt)}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-3">
              {report.status === 'PENDING' && (
                <>
                  <Link
                    href={`/recipes/${report.recipeSlug}`}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    View Recipe
                  </Link>
                  <button 
                    onClick={() => {
                      const reason = prompt('Reason for removing recipe (optional):');
                      if (reason !== null) {
                        handleAction(report.id, 'remove_recipe', reason);
                      }
                    }}
                    className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Remove Recipe
                  </button>
                  <button 
                    onClick={() => {
                      const reason = prompt('Reason for dismissal (optional):');
                      if (reason !== null) {
                        handleAction(report.id, 'dismiss', reason);
                      }
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Dismiss
                  </button>
                </>
              )}
              {report.status === 'RESOLVED' && report.action === 'RECIPE_REMOVED' && (
                <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                  <p className="font-medium">Recipe permanently deleted</p>
                  {report.adminNotes && <p>Reason: {report.adminNotes}</p>}
                  {report.resolvedAt && <p>Removed: {formatDate(report.resolvedAt)}</p>}
                </div>
              )}
              {report.status === 'DISMISSED' && (
                <div className="text-xs text-gray-500">
                  {report.adminNotes && <p>Notes: {report.adminNotes}</p>}
                  {report.resolvedAt && <p>Dismissed: {formatDate(report.resolvedAt)}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 