import { supabase, type Problem, type HomeworkProblem, type UserProgress, type UserHomework } from './supabase'

// Problems
export const getProblems = async () => {
  try {
    console.log('Fetching problems from database...');
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Database error:', error);
      throw error;
    }
    
    console.log('Problems fetched successfully:', data?.length || 0, 'problems');
    return data || [];
  } catch (error) {
    console.error('Error in getProblems:', error);
    throw error;
  }
}

export const getProblemById = async (id: string) => {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export const createProblem = async (problem: Omit<Problem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('problems')
    .insert(problem)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Homework Problems
export const getHomeworkProblems = async () => {
  const { data, error } = await supabase
    .from('homework_problems')
    .select('*')
    .order('due_date', { ascending: true })
  
  if (error) throw error
  return data
}

export const getHomeworkById = async (id: string) => {
  const { data, error } = await supabase
    .from('homework_problems')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export const createHomeworkProblem = async (homework: Omit<HomeworkProblem, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('homework_problems')
    .insert(homework)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// User Progress
export const getUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      problems (*)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const updateUserProgress = async (userId: string, problemId: string, status: UserProgress['status']) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      problem_id: problemId,
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// User Homework
export const getUserHomework = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_homework')
    .select(`
      *,
      homework_problems (*)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const updateUserHomework = async (userId: string, homeworkId: string, status: UserHomework['status'], score?: number) => {
  const { data, error } = await supabase
    .from('user_homework')
    .upsert({
      user_id: userId,
      homework_id: homeworkId,
      status,
      submitted_at: status === 'completed' ? new Date().toISOString() : null,
      score,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
} 