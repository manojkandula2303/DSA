import React from 'react';

interface ProgressStatsProps {
  totalProblems: number;
  easyProblems: number;
  mediumProblems: number;
  hardProblems: number;
  completedTotal: number;
  completedEasy: number;
  completedMedium: number;
  completedHard: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  totalProblems,
  easyProblems,
  mediumProblems,
  hardProblems,
  completedTotal,
  completedEasy,
  completedMedium,
  completedHard
}) => {
  const totalProgress = totalProblems > 0 ? Math.round((completedTotal / totalProblems) * 100) : 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6 mb-8 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Progress */}
        <div className="text-center">
          <div className="mb-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
                <circle
                  className="text-blue-400 dark:text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${totalProgress}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="15.9155"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{totalProgress}%</span>
              </div>
            </div>
          </div>
          <h3 className="text-base font-semibold mb-1 text-gray-800 dark:text-gray-100">Total Progress</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {completedTotal} / {totalProblems}
          </p>
        </div>

        {/* Easy */}
        <div className="text-center">
          <h3 className="text-base font-semibold mb-2 text-green-500 dark:text-green-400">Easy</h3>
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedEasy}</span>
            <span className="text-gray-500 dark:text-gray-400"> / {easyProblems}</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">completed</p>
        </div>

        {/* Medium */}
        <div className="text-center">
          <h3 className="text-base font-semibold mb-2 text-yellow-500 dark:text-yellow-400">Medium</h3>
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedMedium}</span>
            <span className="text-gray-500 dark:text-gray-400"> / {mediumProblems}</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">completed</p>
        </div>

        {/* Hard */}
        <div className="text-center">
          <h3 className="text-base font-semibold mb-2 text-red-500 dark:text-red-400">Hard</h3>
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedHard}</span>
            <span className="text-gray-500 dark:text-gray-400"> / {hardProblems}</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">completed</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;