# Supabase Setup Guide for KMK

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" → "New project"
3. Choose your organization
4. Enter project name: `kmk-learning-platform`
5. Enter database password (save this!)
6. Choose region closest to you
7. Click "Create new project"

### 2. Get Your Credentials
1. Go to Settings → API
2. Copy your **Project URL** and **anon public** key
3. Create `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Set Up Database Tables
1. Go to SQL Editor in Supabase dashboard
2. Run this SQL script:

```sql
-- Create problems table
CREATE TABLE problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  platform TEXT CHECK (platform IN ('LeetCode', 'CodeChef', 'HackerRank', 'CodeForces', 'AtCoder')) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homework_problems table
CREATE TABLE homework_problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
  platform TEXT CHECK (platform IN ('LeetCode', 'CodeChef', 'HackerRank', 'CodeForces', 'AtCoder')) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  due_date DATE NOT NULL,
  estimated_time TEXT NOT NULL,
  points INTEGER NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, problem_id)
);

-- Create user_homework table
CREATE TABLE user_homework (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  homework_id UUID REFERENCES homework_problems(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  submitted_at TIMESTAMP WITH TIME ZONE,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, homework_id)
);

-- Enable Row Level Security
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_homework ENABLE ROW LEVEL SECURITY;

-- Policies for problems (readable by all authenticated users)
CREATE POLICY "Problems are viewable by authenticated users" ON problems
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for homework_problems (readable by all authenticated users)
CREATE POLICY "Homework problems are viewable by authenticated users" ON homework_problems
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for user_progress (users can only see their own progress)
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for user_homework (users can only see their own homework)
CREATE POLICY "Users can view their own homework" ON user_homework
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own homework" ON user_homework
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own homework" ON user_homework
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_platform ON problems(platform);
CREATE INDEX idx_homework_due_date ON homework_problems(due_date);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_problem_id ON user_progress(problem_id);
CREATE INDEX idx_user_homework_user_id ON user_homework(user_id);
CREATE INDEX idx_user_homework_homework_id ON user_homework(homework_id);

-- Insert sample data
INSERT INTO problems (title, url, difficulty, platform, tags) VALUES
('Two Sum', 'https://leetcode.com/problems/two-sum/', 'Easy', 'LeetCode', ARRAY['Array', 'Hash Table']),
('Valid Parentheses', 'https://leetcode.com/problems/valid-parentheses/', 'Easy', 'LeetCode', ARRAY['String', 'Stack']),
('Longest Substring Without Repeating Characters', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'Medium', 'LeetCode', ARRAY['Hash Table', 'String', 'Sliding Window']),
('Container With Most Water', 'https://leetcode.com/problems/container-with-most-water/', 'Medium', 'LeetCode', ARRAY['Array', 'Two Pointers', 'Greedy']),
('3Sum', 'https://leetcode.com/problems/3sum/', 'Medium', 'LeetCode', ARRAY['Array', 'Two Pointers', 'Sorting']);

INSERT INTO homework_problems (title, description, difficulty, platform, tags, due_date, estimated_time, points, link) VALUES
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Easy', 'LeetCode', ARRAY['Array', 'Hash Table'], '2024-02-15', '30 mins', 10, 'https://leetcode.com/problems/two-sum/'),
('Valid Parentheses', 'Given a string s containing just the characters (, ), {, }, [ and ], determine if the input string is valid.', 'Easy', 'LeetCode', ARRAY['String', 'Stack'], '2024-02-16', '40 mins', 12, 'https://leetcode.com/problems/valid-parentheses/'),
('Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without repeating characters.', 'Medium', 'LeetCode', ARRAY['Hash Table', 'String', 'Sliding Window'], '2024-02-17', '1 hour', 20, 'https://leetcode.com/problems/longest-substring-without-repeating-characters/');
```

### 4. Test Your Setup
1. Run `npm run dev`
2. Go to your app
3. Try to sign up with an email
4. Check Supabase dashboard → Authentication → Users to see the new user

## Features You Now Have

✅ **User Authentication** - Sign up, sign in, sign out
✅ **Database Storage** - Problems, homework, user progress
✅ **Real-time Updates** - Live data synchronization
✅ **Row Level Security** - Users can only see their own data
✅ **TypeScript Support** - Full type safety

## Why Supabase over MongoDB?

| Feature | Supabase | MongoDB |
|---------|----------|---------|
| **Setup Time** | 5 minutes | 30+ minutes |
| **Free Tier** | 500MB + 50K users | 512MB |
| **Authentication** | Built-in | Manual setup |
| **Real-time** | Built-in | Manual setup |
| **Dashboard** | Beautiful UI | Basic |
| **SQL** | Yes | NoSQL |
| **TypeScript** | Excellent | Good |

## Next Steps

1. **Migrate your data**: Use the database functions in `src/lib/database.ts`
2. **Add more features**: User profiles, progress tracking, etc.
3. **Deploy**: Supabase works great with Vercel, Netlify, etc.

## Troubleshooting

**"Missing Supabase environment variables"**
- Make sure `.env.local` exists with correct values
- Restart your dev server after adding env vars

**"Authentication failed"**
- Check your Supabase URL and key are correct
- Ensure email confirmation is disabled in Supabase settings

**"Permission denied"**
- Run the SQL policies script in Supabase SQL editor
- Check Row Level Security is enabled

Need help? Check [Supabase docs](https://supabase.com/docs) or ask in their Discord! 