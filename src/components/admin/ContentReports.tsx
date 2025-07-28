'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ContentReport {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  userId: string;
  userEmail: string;
  reason: string;
  status: 'pending' | 'resolved';
  createdAt: string;
}

export default function ContentReports() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(7);
  const [allReports, setAllReports] = useState<ContentReport[]>([]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/admin/content-reports');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      const pendingReports = data.reports.filter((report: ContentReport) => report.status === 'pending');
      setAllReports(pendingReports);
      setReports(pendingReports.slice(0, displayCount));
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await fetchReports();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReportAction = async (reportId: string, action: 'dismiss' | 'remove') => {
    setUpdating(reportId);
    try {
      const response = await fetch(`/api/admin/content-reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'resolved',
          action: action // 'dismiss' or 'remove'
        })
      });

      if (response.ok) {
        await fetchReports();
        alert(`Report ${action === 'dismiss' ? 'dismissed' : 'resolved'} successfully`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to update report');
      }
    } catch (err) {
      console.error('Error updating report:', err);
      alert('Network error. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const loadMore = () => {
    const newCount = displayCount + 7;
    setDisplayCount(newCount);
    setReports(allReports.slice(0, newCount));
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
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5A31F4] mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (allReports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No pending content reports</p>
          <p className="text-sm">All reports have been reviewed and resolved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C2E3A]">🚨 Content Reports ({allReports.length} pending)</h2>
        <button 
          onClick={fetchData}
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
                  <Link href={`/recipes/${report.recipeSlug}`} className="hover:text-[#5A31F4]">
                    &ldquo;{report.recipeTitle}&rdquo;
                  </Link>
                </h3>
                <div className="text-sm text-gray-600">
                  <p><strong>Reported by:</strong> {report.userEmail}</p>
                  <p><strong>Reported:</strong> {formatDate(report.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleReportAction(report.id, 'dismiss')}
                  disabled={updating === report.id}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
                  title="Dismiss report without removing recipe"
                >
                  {updating === report.id ? 'Updating...' : 'Dismiss'}
                </button>
                <button
                  onClick={() => handleReportAction(report.id, 'remove')}
                  disabled={updating === report.id}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                  title="Remove recipe and ban user if needed"
                >
                  {updating === report.id ? 'Updating...' : 'Remove Recipe'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {reports.length < allReports.length && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            Load More ({allReports.length - reports.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
} 