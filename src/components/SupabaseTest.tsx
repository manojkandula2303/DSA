import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('Testing Supabase connection...');
        
        // Test 1: Basic auth connection (doesn't require tables)
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          setError(`Auth error: ${authError.message}`);
          setStatus('Connection failed');
          return;
        }
        
        // Test 2: Try to access database (this will fail if tables don't exist)
        const { data, error } = await supabase.from('problems').select('count').limit(1);
        
        if (error) {
          if (error.code === 'PGRST116') {
            setError('Table "problems" does not exist. Please run the SQL script in Supabase dashboard.');
          } else if (error.code === 'PGRST301') {
            setError('Row Level Security policy violation. Please check your RLS policies.');
          } else {
            setError(`Database error: ${error.message}`);
          }
          setStatus('Connection failed');
        } else {
          setStatus('✅ Supabase connection successful!');
        }
      } catch (err) {
        console.error('Connection test error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setStatus('Connection failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Supabase Connection Test
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Status:</p>
        <p className={`font-medium ${
          status.includes('✅') ? 'text-green-600 dark:text-green-400' : 
          status.includes('failed') ? 'text-red-600 dark:text-red-400' : 
          'text-blue-600 dark:text-blue-400'
        }`}>
          {status}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>URL: {import.meta.env.VITE_SUPABASE_URL}</p>
        <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...</p>
      </div>
    </div>
  );
};

export default SupabaseTest; 