import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wtagdftiqyswtmyvrpoa.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0YWdkZnRpcXlzd3RteXZycG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTk4ODIsImV4cCI6MjA2NzI3NTg4Mn0.NQAX-un3BIZz87XUatZ3gWnmtt39Ou5LVlVJOAOrMfc'

// Only throw error in production
if (import.meta.env.PROD && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Debug logging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...');

// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Problem {
  id: string
  title: string
  url: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  platform: 'LeetCode' | 'CodeChef' | 'HackerRank' | 'CodeForces' | 'AtCoder'
  tags: string[]
  created_at: string
}

export interface HomeworkProblem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  platform: 'LeetCode' | 'CodeChef' | 'HackerRank' | 'CodeForces' | 'AtCoder'
  tags: string[]
  due_date: string
  estimated_time: string
  points: number
  link: string
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  problem_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface UserHomework {
  id: string
  user_id: string
  homework_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  submitted_at?: string
  score?: number
  created_at: string
  updated_at: string
} 