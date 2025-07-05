import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('Testing basic connection...');
        
        // Test 1: Basic fetch to Supabase
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        setStatus('✅ Basic connection successful');
        setDetails('Supabase API is reachable');
        
        // Test 2: Auth connection
        setStatus('Testing auth connection...');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw new Error(`Auth error: ${error.message}`);
        }
        
        setStatus('✅ Auth connection successful');
        setDetails('Both API and Auth are working');
        
      } catch (err) {
        console.error('Connection test error:', err);
        setStatus('❌ Connection failed');
        setDetails(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        Connection Test
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Status: <span className="font-medium">{status}</span>
      </p>
      {details && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Details: {details}
        </p>
      )}
    </div>
  );
};

export default ConnectionTest; 