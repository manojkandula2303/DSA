import React from 'react';
import { X, Square, CheckSquare, ExternalLink, BookOpen, Target, Award } from 'lucide-react';
import { Topic } from '../data/topics';

interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
  completedSubtopics: string[];
  onSubtopicComplete: (topicId: string, subtopic: string) => void;
}

const TopicModal: React.FC<TopicModalProps> = ({
  topic,
  onClose,
  completedSubtopics,
  onSubtopicComplete
}) => {
  const progress = Math.round((completedSubtopics.length / topic.subtopics.length) * 100);

  const handleSubtopicToggle = (subtopic: string) => {
    onSubtopicComplete(topic.id, subtopic);
  };

  const getSubtopicGfgLink = (subtopic: string) => {
    // Create specific GeeksforGeeks URLs based on topic and subtopic
    const topicMap: Record<string, Record<string, string>> = {
      'learn-basics': {
        'Java Introduction and Setup': 'https://www.geeksforgeeks.org/java-how-to-start-learning-java/',
        'Variables and Data Types': 'https://www.geeksforgeeks.org/variables-in-java/',
        'Operators and Expressions': 'https://www.geeksforgeeks.org/operators-in-java/',
        'Input/Output Operations': 'https://www.geeksforgeeks.org/scanner-class-in-java/',
        'Comments and Documentation': 'https://www.geeksforgeeks.org/comments-in-java/',
        'Basic Program Structure': 'https://www.geeksforgeeks.org/java-basic-syntax/'
      },
      'control-flow': {
        'If-else Statements': 'https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/',
        'Switch-case Statements': 'https://www.geeksforgeeks.org/switch-statement-in-java/',
        'For Loops': 'https://www.geeksforgeeks.org/loops-in-java/',
        'While and Do-while Loops': 'https://www.geeksforgeeks.org/java-while-loop-with-examples/',
        'Break and Continue': 'https://www.geeksforgeeks.org/break-statement-in-java/',
        'Nested Control Structures': 'https://www.geeksforgeeks.org/nested-loops-in-java/'
      },
      'methods': {
        'Method Declaration and Definition': 'https://www.geeksforgeeks.org/methods-in-java/',
        'Parameters and Arguments': 'https://www.geeksforgeeks.org/parameter-passing-techniques-in-java-with-examples/',
        'Return Types and Values': 'https://www.geeksforgeeks.org/return-keyword-java/',
        'Method Overloading': 'https://www.geeksforgeeks.org/overloading-in-java/',
        'Static vs Instance Methods': 'https://www.geeksforgeeks.org/static-methods-vs-instance-methods-java/',
        'Recursion': 'https://www.geeksforgeeks.org/recursion-in-java/'
      },
      'oop': {
        'Classes and Objects': 'https://www.geeksforgeeks.org/classes-objects-java/',
        'Constructors and Destructors': 'https://www.geeksforgeeks.org/constructors-in-java/',
        'Inheritance and Super Keyword': 'https://www.geeksforgeeks.org/inheritance-in-java/',
        'Polymorphism and Method Overriding': 'https://www.geeksforgeeks.org/polymorphism-in-java/',
        'Encapsulation and Access Modifiers': 'https://www.geeksforgeeks.org/encapsulation-in-java/',
        'Abstraction and Abstract Classes': 'https://www.geeksforgeeks.org/abstract-classes-in-java/',
        'Interfaces': 'https://www.geeksforgeeks.org/interfaces-in-java/'
      },
      'string-handling': {
        'String Class and Methods': 'https://www.geeksforgeeks.org/string-class-in-java/',
        'String vs StringBuffer vs StringBuilder': 'https://www.geeksforgeeks.org/string-vs-stringbuilder-vs-stringbuffer-in-java/',
        'String Concatenation': 'https://www.geeksforgeeks.org/string-concatenation-in-java/',
        'String Comparison': 'https://www.geeksforgeeks.org/compare-strings-java/',
        'Regular Expressions': 'https://www.geeksforgeeks.org/regular-expressions-in-java/',
        'String Formatting': 'https://www.geeksforgeeks.org/java-string-format-method-with-examples/'
      },
      'arrays': {
        'Array Declaration and Initialization': 'https://www.geeksforgeeks.org/arrays-in-java/',
        'Array Traversal and Access': 'https://www.geeksforgeeks.org/array-data-structure/',
        'Multi-dimensional Arrays': 'https://www.geeksforgeeks.org/multidimensional-arrays-in-java/',
        'Array Sorting and Searching': 'https://www.geeksforgeeks.org/arrays-sort-in-java-with-examples/',
        'Array Copying and Cloning': 'https://www.geeksforgeeks.org/array-copy-in-java/',
        'Jagged Arrays': 'https://www.geeksforgeeks.org/jagged-array-in-java/'
      },
      'exception-handling': {
        'Exception Hierarchy': 'https://www.geeksforgeeks.org/exceptions-in-java/',
        'Try-Catch-Finally Blocks': 'https://www.geeksforgeeks.org/try-catch-throw-and-throws-in-java/',
        'Throw and Throws Keywords': 'https://www.geeksforgeeks.org/throw-throws-java/',
        'Custom Exception Classes': 'https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/',
        'Checked vs Unchecked Exceptions': 'https://www.geeksforgeeks.org/checked-vs-unchecked-exceptions-in-java/',
        'Exception Propagation': 'https://www.geeksforgeeks.org/exception-propagation-in-java/'
      },
      'packages-access': {
        'Package Declaration and Import': 'https://www.geeksforgeeks.org/packages-in-java/',
        'Access Modifiers (public, private, protected)': 'https://www.geeksforgeeks.org/access-modifiers-java/',
        'Default Access Level': 'https://www.geeksforgeeks.org/default-methods-java/',
        'Package Structure and Naming': 'https://www.geeksforgeeks.org/java-package/',
        'CLASSPATH and Package Location': 'https://www.geeksforgeeks.org/classpath-in-java/',
        'Static Import': 'https://www.geeksforgeeks.org/static-import-java/'
      },
      'collections': {
        'Collection Interface Hierarchy': 'https://www.geeksforgeeks.org/collections-in-java-2/',
        'List (ArrayList, LinkedList, Vector)': 'https://www.geeksforgeeks.org/list-interface-java-examples/',
        'Set (HashSet, TreeSet, LinkedHashSet)': 'https://www.geeksforgeeks.org/set-in-java/',
        'Map (HashMap, TreeMap, LinkedHashMap)': 'https://www.geeksforgeeks.org/map-interface-java-examples/',
        'Queue and Deque Interfaces': 'https://www.geeksforgeeks.org/queue-interface-java/',
        'Iterators and Enhanced For Loop': 'https://www.geeksforgeeks.org/iterators-in-java/',
        'Collections Utility Class': 'https://www.geeksforgeeks.org/collections-class-in-java/'
      },
      'generics': {
        'Generic Classes and Interfaces': 'https://www.geeksforgeeks.org/generics-in-java/',
        'Generic Methods': 'https://www.geeksforgeeks.org/generic-methods-in-java/',
        'Bounded Type Parameters': 'https://www.geeksforgeeks.org/bounded-types-generics-java/',
        'Wildcards (?, extends, super)': 'https://www.geeksforgeeks.org/wildcards-in-java/',
        'Type Erasure': 'https://www.geeksforgeeks.org/type-erasure-java/',
        'Generic Collections': 'https://www.geeksforgeeks.org/generics-in-java/'
      },
      'inner-classes': {
        'Member Inner Classes': 'https://www.geeksforgeeks.org/inner-class-java/',
        'Static Nested Classes': 'https://www.geeksforgeeks.org/static-class-in-java/',
        'Local Inner Classes': 'https://www.geeksforgeeks.org/local-inner-class-java/',
        'Anonymous Inner Classes': 'https://www.geeksforgeeks.org/anonymous-inner-class-java/',
        'Lambda Expressions': 'https://www.geeksforgeeks.org/lambda-expressions-java-8/',
        'Method References': 'https://www.geeksforgeeks.org/method-references-in-java-with-examples/'
      },
      'file-handling': {
        'File and FileReader/FileWriter': 'https://www.geeksforgeeks.org/file-handling-in-java/',
        'BufferedReader and BufferedWriter': 'https://www.geeksforgeeks.org/java-io-bufferedreader-class-java/',
        'FileInputStream and FileOutputStream': 'https://www.geeksforgeeks.org/java-io-fileinputstream-class-java/',
        'Object Serialization': 'https://www.geeksforgeeks.org/serialization-in-java/',
        'NIO Package (New I/O)': 'https://www.geeksforgeeks.org/java-nio-package/',
        'Path and Files Classes': 'https://www.geeksforgeeks.org/java-nio-file-path-class-java/'
      },
      'multithreading': {
        'Thread Creation and Lifecycle': 'https://www.geeksforgeeks.org/multithreading-in-java/',
        'Runnable Interface vs Thread Class': 'https://www.geeksforgeeks.org/implement-runnable-vs-extend-thread-in-java/',
        'Thread Synchronization': 'https://www.geeksforgeeks.org/synchronization-in-java/',
        'Inter-thread Communication': 'https://www.geeksforgeeks.org/inter-thread-communication-java/',
        'Thread Pools and Executors': 'https://www.geeksforgeeks.org/thread-pools-java/',
        'Concurrent Collections': 'https://www.geeksforgeeks.org/concurrent-collections-in-java/',
        'Locks and Atomic Variables': 'https://www.geeksforgeeks.org/lock-framework-vs-thread-synchronization-in-java/'
      },
      'java8-features': {
        'Lambda Expressions': 'https://www.geeksforgeeks.org/lambda-expressions-java-8/',
        'Functional Interfaces': 'https://www.geeksforgeeks.org/functional-interfaces-java/',
        'Stream API': 'https://www.geeksforgeeks.org/stream-in-java/',
        'Optional Class': 'https://www.geeksforgeeks.org/java-8-optional-class/',
        'Method References': 'https://www.geeksforgeeks.org/method-references-in-java-with-examples/',
        'Default and Static Methods in Interfaces': 'https://www.geeksforgeeks.org/default-methods-java/',
        'Date and Time API': 'https://www.geeksforgeeks.org/java-8-date-time-api/'
      },
      'miscellaneous': {
        'Annotations': 'https://www.geeksforgeeks.org/annotations-in-java/',
        'Reflection API': 'https://www.geeksforgeeks.org/reflection-in-java/',
        'Garbage Collection': 'https://www.geeksforgeeks.org/garbage-collection-java/',
        'JVM Architecture': 'https://www.geeksforgeeks.org/jvm-works-jvm-architecture/',
        'Design Patterns in Java': 'https://www.geeksforgeeks.org/design-patterns-in-java/',
        'JDBC Basics': 'https://www.geeksforgeeks.org/introduction-to-jdbc/',
        'Unit Testing with JUnit': 'https://www.geeksforgeeks.org/junit-5-tutorial/'
      }
    };

    // Return specific URL if available, otherwise fallback to search
    const specificUrl = topicMap[topic.id]?.[subtopic];
    if (specificUrl) {
      return specificUrl;
    }
    
    // Fallback to search
    const searchQuery = encodeURIComponent(`${topic.title} ${subtopic}`);
    return `https://www.geeksforgeeks.org/?s=${searchQuery}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500 ease-out transition-colors duration-200">
        {/* Header Section - Redesigned */}
        <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{topic.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{topic.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section - Hidden Scrollbar */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-hide" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* Progress Section - Reduced Size */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
              </div>
            </div>
            
            {/* Progress Bar - Reduced Height */}
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span>{completedSubtopics.length} completed</span>
                <span>{topic.subtopics.length} total topics</span>
              </div>
            </div>
          </div>

          {/* Subtopics Grid - No Emojis */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Topics</h3>
            
            <div className="grid gap-3 md:grid-cols-2">
              {topic.subtopics.map((subtopic, index) => {
                const isCompleted = completedSubtopics.includes(subtopic);
                return (
                  <div
                    key={index}
                    className={`group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => handleSubtopicToggle(subtopic)}
                        className={`flex-shrink-0 p-1 rounded transition-all duration-200 ${
                          isCompleted
                            ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300'
                            : 'text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckSquare className="h-5 w-5" />
                        ) : (
                          <Square className="h-5 w-5" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm leading-relaxed ${
                          isCompleted ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {subtopic}
                        </h4>
                      </div>
                      
                      <a
                        href={getSubtopicGfgLink(subtopic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default TopicModal;