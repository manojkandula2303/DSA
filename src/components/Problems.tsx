import React, { useState, useEffect } from 'react';
import { updateUserProgress } from '../lib/database';
import { useAuth } from '../contexts/AuthContext';
import ProgressStats from './ProgressStats';
import { Star, Edit2, StickyNote } from 'lucide-react';
import { leetcodeProblems } from '../data/problems';

interface Problem {
  id: string;
  title: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Problems: React.FC = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<{ [id: string]: string }>({});
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [revisions, setRevisions] = useState<{ [id: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [showNoteId, setShowNoteId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    status: 'all',
    revision: 'all'
  });

  useEffect(() => {
    // Convert local problems data to match the expected format
    const formattedProblems: Problem[] = leetcodeProblems.map((problem, index) => ({
      id: `problem-${index + 1}`,
      title: problem.title,
      url: problem.url,
      difficulty: problem.difficulty
    }));
    
    setProblems(formattedProblems);
    setLoading(false);
  }, []);

  const handleProblemToggle = async (problemId: string, isCompleted: boolean) => {
    // Always update local state so checkboxes work for everyone
    setChecked(prev => ({ ...prev, [problemId]: isCompleted }));
    // Optionally update user progress in DB if logged in
    if (user) {
      try {
        await updateUserProgress(user.id, problemId, isCompleted ? 'completed' : 'not_started');
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  // Calculate stats for progress
  const totalProblems = problems.length;
  const easyProblems = problems.filter(p => p.difficulty === 'Easy').length;
  const mediumProblems = problems.filter(p => p.difficulty === 'Medium').length;
  const hardProblems = problems.filter(p => p.difficulty === 'Hard').length;
  
  // Calculate completed problems
  const completedTotal = Object.values(checked).filter(Boolean).length;
  const completedEasy = problems
    .filter(p => p.difficulty === 'Easy' && checked[p.id])
    .length;
  const completedMedium = problems
    .filter(p => p.difficulty === 'Medium' && checked[p.id])
    .length;
  const completedHard = problems
    .filter(p => p.difficulty === 'Hard' && checked[p.id])
    .length;

  const handleNoteEdit = (id: string, currentNote: string) => {
    setEditingNoteId(id);
    setNoteInput(currentNote);
  };

  const handleNoteSave = (id: string) => {
    setNotes({ ...notes, [id]: noteInput });
    setEditingNoteId(null);
    setNoteInput('');
  };

  // Filter logic
  const filteredProblems = problems.filter(problem => {
    // Difficulty filter
    if (filters.difficulty !== 'all' && problem.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Status filter (completed/not completed)
    if (filters.status === 'completed' && !checked[problem.id]) {
      return false;
    }
    if (filters.status === 'not_completed' && checked[problem.id]) {
      return false;
    }
    
    // Revision filter (starred/not starred)
    if (filters.revision === 'starred' && !revisions[problem.id]) {
      return false;
    }
    if (filters.revision === 'not_starred' && revisions[problem.id]) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Coding Problems</h1>
        <p className="text-gray-600 dark:text-gray-300">{problems.length} carefully curated problems to master your coding skills</p>
      </div>

      {/* Progress Stats */}
      <ProgressStats
        totalProblems={totalProblems}
        easyProblems={easyProblems}
        mediumProblems={mediumProblems}
        hardProblems={hardProblems}
        completedTotal={completedTotal}
        completedEasy={completedEasy}
        completedMedium={completedMedium}
        completedHard={completedHard}
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</label>
          <select
            value={filters.difficulty}
            onChange={e => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</label>
          <select
            value={filters.status}
            onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not_completed">Not Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Revision:</label>
          <select
            value={filters.revision}
            onChange={e => setFilters(prev => ({ ...prev, revision: e.target.value }))}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All</option>
            <option value="starred">Starred</option>
            <option value="not_starred">Not Starred</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {filteredProblems.length} of {problems.length} problems
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Title</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Platform</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Notes</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Revision</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">Difficulty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredProblems.map((problem) => {
              return (
                <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                  {/* Status */}
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={checked[problem.id] || false}
                      onChange={() => handleProblemToggle(problem.id, !checked[problem.id])}
                      className="form-checkbox h-4 w-4 text-blue-600 dark:text-blue-400"
                    />
                  </td>
                  {/* Title as link */}
                  <td className="px-4 py-2">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {problem.title}
                    </a>
                  </td>
                  {/* Platform */}
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                      LeetCode
                    </span>
                  </td>
                  {/* Notes */}
                  <td className="px-4 py-2 max-w-lg min-w-[120px]">
                    <button
                      onClick={() => setShowNoteId(problem.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <StickyNote className="h-4 w-4" />
                      Notes
                    </button>
                    {/* Modal for notes */}
                    {showNoteId === problem.id && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                          <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onClick={() => setShowNoteId(null)}
                          >
                            ×
                          </button>
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Notes for {problem.title}</h3>
                          {editingNoteId === problem.id ? (
                            <div className="flex flex-col gap-2">
                              <textarea
                                value={noteInput}
                                onChange={e => setNoteInput(e.target.value)}
                                className="w-full min-h-[80px] max-h-60 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-y"
                                autoFocus
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => { handleNoteSave(problem.id); setShowNoteId(null); }}
                                  className="text-blue-600 dark:text-blue-400 text-xs font-semibold"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="text-gray-400 text-xs font-semibold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2">
                              <div className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line break-words max-w-lg">
                                {notes[problem.id] || <span className="italic text-gray-400">-</span>}
                              </div>
                              <button
                                onClick={() => setEditingNoteId(problem.id)}
                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-1"
                                aria-label="Edit note"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  {/* Revision */}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setRevisions({ ...revisions, [problem.id]: !revisions[problem.id] })}
                      className={revisions[problem.id] ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                      aria-label="Toggle revision"
                    >
                      <Star className={`h-5 w-5 ${revisions[problem.id] ? 'fill-yellow-400 stroke-yellow-400' : ''}`} />
                    </button>
                  </td>
                  {/* Difficulty */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : problem.difficulty === 'Medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;