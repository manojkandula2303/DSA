import React, { useState, useEffect } from 'react';
import { practiceProblems, PracticeProblem } from '../data/practiceProblems';
import { ArrowLeft } from 'lucide-react';

interface PracticeProblemPageProps {
  problemId: string;
  onBack?: () => void;
}

const PracticeProblemPage: React.FC<PracticeProblemPageProps> = ({ problemId, onBack }) => {
  const problem = practiceProblems.find(p => p.id === problemId);
  const [showVisibleResults, setShowVisibleResults] = useState(false);
  const [showHiddenResults, setShowHiddenResults] = useState(false);
  const [output, setOutput] = useState('');
  const [userCode, setUserCode] = useState('');
  const [language, setLanguage] = useState('python');

  if (!problem) return <div className="p-8 text-red-500">Problem not found.</div>;

  // Simulate code execution and test case checking
  const runCode = () => {
    setShowVisibleResults(true);
    setShowHiddenResults(false);
    // Simulate output for visible test cases
    setOutput('');
  };
  const submitCode = () => {
    setShowVisibleResults(true);
    setShowHiddenResults(true);
    // Simulate output for all test cases
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{problem?.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{problem?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Left: Problem Statement & Test Cases */}
          <div className="w-full md:w-1/2 p-8 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{problem.difficulty}</span>
              <h2 className="text-2xl font-bold mt-2 mb-2 text-gray-900 dark:text-white">{problem.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{problem.description}</p>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap mb-4">{problem.statement}</pre>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Test Cases</h3>
              <div className="space-y-2">
                {problem.testCases.filter(tc => tc.visible).map((tc, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-500 mb-1">Visible Test Case {idx + 1}</div>
                    <div><span className="font-semibold">Input:</span> {tc.input || <span className="italic text-gray-400">(none)</span>}</div>
                    {showVisibleResults && <div><span className="font-semibold">Expected Output:</span> {tc.expectedOutput}</div>}
                  </div>
                ))}
                {showHiddenResults && problem.testCases.filter(tc => !tc.visible).map((tc, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-500 mb-1">Hidden Test Case {idx + 1}</div>
                    <div><span className="font-semibold">Input:</span> {tc.input || <span className="italic text-gray-400">(none)</span>}</div>
                    <div><span className="font-semibold">Expected Output:</span> {tc.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Code Editor */}
          <div className="w-full md:w-1/2 p-8 flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} className="px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:text-white">
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
              </select>
            </div>
            <textarea
              value={userCode}
              onChange={e => setUserCode(e.target.value)}
              className="w-full h-64 p-4 text-sm font-mono border-none outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white resize-y mb-4"
              spellCheck={false}
              placeholder="Write your code here..."
            />
            <div className="flex gap-4 mb-4">
              <button onClick={runCode} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Run</button>
              <button onClick={submitCode} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 min-h-[40px] border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Output</h4>
              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{output || 'Output will appear here after you run or submit your code.'}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeProblemPage; 