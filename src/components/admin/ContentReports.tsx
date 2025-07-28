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
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export default function ContentReports() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await fetchReports();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/admin/content-reports');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      
      const data = await response.json();
      setReports(data.reports || []);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleReportAction = async (reportId: string, action: 'reviewed' | 'resolved') => {
    setUpdating(reportId);
    try {
      const response = await fetch(`/api/admin/content-reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });

      if (response.ok) {
        await fetchReports();
        alert(`Report ${action} successfully`);
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

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#2C2E3A]">🚨 Content Reports</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No content reports yet</p>
          <p className="text-sm">Users can report inappropriate content using the &ldquo;Report Content&rdquo; button on recipe cards.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C2E3A]">🚨 Content Reports ({reports.length})</h2>
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
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${
                      report.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : report.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {report.status.toUpperCase()}
                    </span>
                  </p>
                  <p><strong>Reported:</strong> {formatDate(report.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {report.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleReportAction(report.id, 'reviewed')}
                      disabled={updating === report.id}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                    >
                      {updating === report.id ? 'Updating...' : 'Mark Reviewed'}
                    </button>
                    <button
                      onClick={() => handleReportAction(report.id, 'resolved')}
                      disabled={updating === report.id}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                    >
                      {updating === report.id ? 'Updating...' : 'Remove Recipe'}
                    </button>
                  </>
                )}
                {report.status === 'reviewed' && (
                  <button
                    onClick={() => handleReportAction(report.id, 'resolved')}
                    disabled={updating === report.id}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    {updating === report.id ? 'Updating...' : 'Remove Recipe'}
                  </button>
                )}
                {report.status === 'resolved' && (
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                    Recipe Removed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 