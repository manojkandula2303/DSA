-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

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