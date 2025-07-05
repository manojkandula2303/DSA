import React, { useState } from 'react';
import { ChevronRight, ExternalLink, Play, CheckCircle } from 'lucide-react';
import { javaTopics, dsaTopics, Topic } from '../data/topics';
import InteractiveHero from './InteractiveHero';

interface HomeProps {
  onTopicSelect: (topic: Topic) => void;
  completedSubtopics: Record<string, string[]>;
  onStartLearning?: () => void;
}

const Home: React.FC<HomeProps> = ({ onTopicSelect, completedSubtopics, onStartLearning }) => {
  const [activeCategory, setActiveCategory] = useState<'java' | 'dsa'>('java');

  const currentTopics = activeCategory === 'java' ? javaTopics : dsaTopics;

  const calculateProgress = (topic: Topic) => {
    const completed = completedSubtopics[topic.id] || [];
    return Math.round((completed.length / topic.subtopics.length) * 100);
  };

  return (
    <div>
      {/* Interactive Hero Section */}
      <InteractiveHero onStartLearning={onStartLearning} />
      
      {/* Main Content */}
      <div id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveCategory('java')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeCategory === 'java'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Java Programming
            </button>
            <button
              onClick={() => setActiveCategory('dsa')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeCategory === 'dsa'
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Data Structures & Algorithms
            </button>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentTopics.map((topic) => {
            const progress = calculateProgress(topic);
            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => onTopicSelect(topic)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{topic.title}</h3>
                    <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{topic.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {topic.subtopics.length} subtopics
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;