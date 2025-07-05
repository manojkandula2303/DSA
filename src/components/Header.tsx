import React from 'react';
import { Code, Home, BookOpen, PenTool, User, Sun, Moon, CheckSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, isLoggedIn }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'problems', label: 'Problems', icon: BookOpen },
    { id: 'homework', label: 'Homework', icon: PenTool },
    { id: 'nodo', label: 'NO - DO', icon: CheckSquare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-full h-full animate-header-gradient bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-30 blur-2xl" />
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">KMK</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === id
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* User Avatar or Login Button */}
            {user ? (
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <span className="text-sm font-medium">Log Out</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveSection('login')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;