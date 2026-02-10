import { useState } from 'react';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';
import { jobsAPI, flexMatchAPI } from '../utils/api';

export function DataInitializer() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function initializeData() {
    try {
      setStatus('loading');
      setMessage('Initializing database...');

      // Initialize jobs
      await jobsAPI.init();
      
      // Initialize partners
      await flexMatchAPI.init();

      setStatus('success');
      setMessage('Database initialized successfully! You can now use all features.');
      
      // Reload the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error initializing data:', error);
      setStatus('error');
      setMessage('Failed to initialize database. Please try again.');
    }
  }

  if (status === 'idle') {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-purple-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <Database className="w-6 h-6 text-purple-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">First Time Setup</h3>
            <p className="text-sm text-gray-600 mb-3">
              Initialize the database with sample data to explore all features.
            </p>
            <button
              onClick={initializeData}
              className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
            >
              Initialize Database
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-purple-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-green-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-red-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-3">{message}</p>
            <button
              onClick={initializeData}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
