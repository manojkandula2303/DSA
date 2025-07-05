import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Problems from './components/Problems';
import Homework from './components/Homework';
import Login from './components/Login';
import TopicModal from './components/TopicModal';
import PracticeProblemPage from './components/PracticeProblemPage';
import NoDo from './components/NoDo';
import { Topic } from './data/topics';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ConnectionTest from './components/ConnectionTest';
import { ArrowLeft } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, string[]>>({});
  const [practiceProblemId, setPracticeProblemId] = useState<string | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const navigateTo = (section: string) => {
    setNavigationHistory(prev => [...prev, section]);
    setActiveSection(section);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousSection = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setActiveSection(previousSection);
      
      // Clear practice problem ID if going back from practice problem page
      if (activeSection === 'practice-problem') {
        setPracticeProblemId(null);
      }
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const handleSubtopicComplete = (topicId: string, subtopic: string) => {
    setCompletedSubtopics(prev => {
      const currentCompleted = prev[topicId] || [];
      const isCompleted = currentCompleted.includes(subtopic);
      
      if (isCompleted) {
        // Remove from completed (unmark)
        return {
          ...prev,
          [topicId]: currentCompleted.filter(item => item !== subtopic)
        };
      } else {
        // Add to completed (mark)
        return {
          ...prev,
          [topicId]: [...currentCompleted, subtopic]
        };
      }
    });
  };

  const renderSection = () => {
    // Restrict access to all pages except Home and Login before login
    if (!user && activeSection !== 'home' && activeSection !== 'login') {
      // Show alert for protected pages
      alert('Please sign in to access this page.');
      setActiveSection('home');
      return (
        <Home 
          onTopicSelect={handleTopicSelect}
          completedSubtopics={completedSubtopics}
          onStartLearning={() => navigateTo('problems')}
        />
      );
    }
    switch (activeSection) {
      case 'home':
        return (
          <Home 
            onTopicSelect={handleTopicSelect}
            completedSubtopics={completedSubtopics}
            onStartLearning={() => navigateTo('problems')}
          />
        );
      case 'practice-problem':
        return practiceProblemId ? (
          <PracticeProblemPage 
            problemId={practiceProblemId} 
            onBack={goBack}
          />
        ) : null;
      case 'problems':
        return <Problems />;
      case 'homework':
        return <Homework />;
      case 'nodo':
        return <NoDo />;
      case 'login':
        return <Login setIsLoggedIn={() => {}} />;
      default:
        return (
          <Home 
            onTopicSelect={handleTopicSelect}
            completedSubtopics={completedSubtopics}
            onStartLearning={() => navigateTo('problems')}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header 
          activeSection={activeSection} 
          setActiveSection={navigateTo}
          isLoggedIn={!!user}
        />
        <main className="pt-16">
          {renderSection()}
        </main>
        
        {selectedTopic && (
          <TopicModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
            completedSubtopics={completedSubtopics[selectedTopic.id] || []}
            onSubtopicComplete={handleSubtopicComplete}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;