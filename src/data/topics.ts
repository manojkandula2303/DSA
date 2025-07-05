export interface Topic {
  id: string;
  title: string;
  description: string;
  subtopics: string[];
  gfgLink: string;
  sampleProblems: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
}

export const javaTopics: Topic[] = [
  {
    id: 'learn-basics',
    title: 'Learn Basics',
    description: 'Fundamental concepts of Java programming including syntax, variables, and basic operations.',
    subtopics: [
      'Java Introduction and Setup',
      'Variables and Data Types',
      'Operators and Expressions',
      'Input/Output Operations',
      'Comments and Documentation',
      'Basic Program Structure'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/java-basics/',
    sampleProblems: [
      { title: 'Hello World Program', difficulty: 'Easy' },
      { title: 'Variable Declaration and Initialization', difficulty: 'Easy' },
      { title: 'Basic Calculator Operations', difficulty: 'Easy' },
      { title: 'Data Type Conversion', difficulty: 'Medium' }
    ]
  },
  {
    id: 'control-flow',
    title: 'Control Flow Statements',
    description: 'Decision making and looping constructs to control program execution flow.',
    subtopics: [
      'If-else Statements',
      'Switch-case Statements',
      'For Loops',
      'While and Do-while Loops',
      'Break and Continue',
      'Nested Control Structures'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/decision-making-javaif-else-switch-break-continue-jump/',
    sampleProblems: [
      { title: 'Grade Calculator', difficulty: 'Easy' },
      { title: 'Pattern Printing', difficulty: 'Medium' },
      { title: 'Prime Number Check', difficulty: 'Easy' },
      { title: 'Fibonacci Series', difficulty: 'Medium' }
    ]
  },
  {
    id: 'methods',
    title: 'Methods (Functions)',
    description: 'Creating reusable code blocks with parameters, return types, and method overloading.',
    subtopics: [
      'Method Declaration and Definition',
      'Parameters and Arguments',
      'Return Types and Values',
      'Method Overloading',
      'Static vs Instance Methods',
      'Recursion'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/methods-in-java/',
    sampleProblems: [
      { title: 'Calculate Area of Shapes', difficulty: 'Easy' },
      { title: 'Factorial using Recursion', difficulty: 'Medium' },
      { title: 'Method Overloading Example', difficulty: 'Easy' },
      { title: 'Tower of Hanoi', difficulty: 'Hard' }
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming (OOP)',
    description: 'Core OOP principles including classes, objects, inheritance, polymorphism, and encapsulation.',
    subtopics: [
      'Classes and Objects',
      'Constructors and Destructors',
      'Inheritance and Super Keyword',
      'Polymorphism and Method Overriding',
      'Encapsulation and Access Modifiers',
      'Abstraction and Abstract Classes',
      'Interfaces'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
    sampleProblems: [
      { title: 'Student Management System', difficulty: 'Medium' },
      { title: 'Shape Hierarchy with Inheritance', difficulty: 'Medium' },
      { title: 'Bank Account with Encapsulation', difficulty: 'Easy' },
      { title: 'Animal Interface Implementation', difficulty: 'Hard' }
    ]
  },
  {
    id: 'string-handling',
    title: 'String Handling',
    description: 'String manipulation, operations, and optimization techniques in Java.',
    subtopics: [
      'String Class and Methods',
      'String vs StringBuffer vs StringBuilder',
      'String Concatenation',
      'String Comparison',
      'Regular Expressions',
      'String Formatting'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/strings-in-java/',
    sampleProblems: [
      { title: 'Palindrome Check', difficulty: 'Easy' },
      { title: 'Anagram Detection', difficulty: 'Medium' },
      { title: 'String Reversal', difficulty: 'Easy' },
      { title: 'Pattern Matching with Regex', difficulty: 'Hard' }
    ]
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Single and multi-dimensional arrays, array operations, and algorithms.',
    subtopics: [
      'Array Declaration and Initialization',
      'Array Traversal and Access',
      'Multi-dimensional Arrays',
      'Array Sorting and Searching',
      'Array Copying and Cloning',
      'Jagged Arrays'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/arrays-in-java/',
    sampleProblems: [
      { title: 'Find Maximum Element', difficulty: 'Easy' },
      { title: 'Array Rotation', difficulty: 'Medium' },
      { title: 'Matrix Multiplication', difficulty: 'Medium' },
      { title: 'Merge Sorted Arrays', difficulty: 'Hard' }
    ]
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    description: 'Error handling mechanisms using try-catch blocks and custom exceptions.',
    subtopics: [
      'Exception Hierarchy',
      'Try-Catch-Finally Blocks',
      'Throw and Throws Keywords',
      'Custom Exception Classes',
      'Checked vs Unchecked Exceptions',
      'Exception Propagation'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/exceptions-in-java/',
    sampleProblems: [
      { title: 'Division by Zero Handler', difficulty: 'Easy' },
      { title: 'File Reading with Exception Handling', difficulty: 'Medium' },
      { title: 'Custom Exception Implementation', difficulty: 'Medium' },
      { title: 'Multiple Exception Handling', difficulty: 'Hard' }
    ]
  },
  {
    id: 'packages-access',
    title: 'Packages & Access Control',
    description: 'Organizing code with packages and controlling access with modifiers.',
    subtopics: [
      'Package Declaration and Import',
      'Access Modifiers (public, private, protected)',
      'Default Access Level',
      'Package Structure and Naming',
      'CLASSPATH and Package Location',
      'Static Import'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/packages-in-java/',
    sampleProblems: [
      { title: 'Create Custom Package', difficulty: 'Easy' },
      { title: 'Access Modifier Demo', difficulty: 'Easy' },
      { title: 'Library Management with Packages', difficulty: 'Medium' },
      { title: 'Cross-Package Communication', difficulty: 'Medium' }
    ]
  },
  {
    id: 'collections',
    title: 'Java Collection Framework (JCF)',
    description: 'Comprehensive collection classes including List, Set, Map, and their implementations.',
    subtopics: [
      'Collection Interface Hierarchy',
      'List (ArrayList, LinkedList, Vector)',
      'Set (HashSet, TreeSet, LinkedHashSet)',
      'Map (HashMap, TreeMap, LinkedHashMap)',
      'Queue and Deque Interfaces',
      'Iterators and Enhanced For Loop',
      'Collections Utility Class'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/collections-in-java-2/',
    sampleProblems: [
      { title: 'ArrayList Operations', difficulty: 'Easy' },
      { title: 'HashMap Implementation', difficulty: 'Medium' },
      { title: 'Set Operations and Comparisons', difficulty: 'Medium' },
      { title: 'Custom Collection Implementation', difficulty: 'Hard' }
    ]
  },
  {
    id: 'generics',
    title: 'Generics',
    description: 'Type-safe programming with generic classes, methods, and wildcards.',
    subtopics: [
      'Generic Classes and Interfaces',
      'Generic Methods',
      'Bounded Type Parameters',
      'Wildcards (?, extends, super)',
      'Type Erasure',
      'Generic Collections'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/generics-in-java/',
    sampleProblems: [
      { title: 'Generic Stack Implementation', difficulty: 'Medium' },
      { title: 'Bounded Generic Method', difficulty: 'Medium' },
      { title: 'Wildcard Usage Examples', difficulty: 'Hard' },
      { title: 'Generic Utility Class', difficulty: 'Hard' }
    ]
  },
  {
    id: 'inner-classes',
    title: 'Inner Classes',
    description: 'Nested classes, anonymous classes, and lambda expressions.',
    subtopics: [
      'Member Inner Classes',
      'Static Nested Classes',
      'Local Inner Classes',
      'Anonymous Inner Classes',
      'Lambda Expressions',
      'Method References'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/inner-class-java/',
    sampleProblems: [
      { title: 'Event Handling with Inner Classes', difficulty: 'Medium' },
      { title: 'Anonymous Class Implementation', difficulty: 'Medium' },
      { title: 'Lambda Expression Examples', difficulty: 'Easy' },
      { title: 'Nested Class Hierarchy', difficulty: 'Hard' }
    ]
  },
  {
    id: 'file-handling',
    title: 'File Handling',
    description: 'Reading from and writing to files using various I/O streams and NIO.',
    subtopics: [
      'File and FileReader/FileWriter',
      'BufferedReader and BufferedWriter',
      'FileInputStream and FileOutputStream',
      'Object Serialization',
      'NIO Package (New I/O)',
      'Path and Files Classes'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/file-handling-in-java/',
    sampleProblems: [
      { title: 'Read File Content', difficulty: 'Easy' },
      { title: 'Write Data to File', difficulty: 'Easy' },
      { title: 'Object Serialization Demo', difficulty: 'Medium' },
      { title: 'File Copy with NIO', difficulty: 'Hard' }
    ]
  },
  {
    id: 'multithreading',
    title: 'Multithreading & Concurrency',
    description: 'Concurrent programming with threads, synchronization, and thread safety.',
    subtopics: [
      'Thread Creation and Lifecycle',
      'Runnable Interface vs Thread Class',
      'Thread Synchronization',
      'Inter-thread Communication',
      'Thread Pools and Executors',
      'Concurrent Collections',
      'Locks and Atomic Variables'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/multithreading-in-java/',
    sampleProblems: [
      { title: 'Simple Thread Example', difficulty: 'Medium' },
      { title: 'Producer-Consumer Problem', difficulty: 'Hard' },
      { title: 'Thread Synchronization Demo', difficulty: 'Hard' },
      { title: 'Thread Pool Implementation', difficulty: 'Hard' }
    ]
  },
  {
    id: 'java8-features',
    title: 'Java 8 Features (Modern Java)',
    description: 'Modern Java features including streams, lambda expressions, and functional interfaces.',
    subtopics: [
      'Lambda Expressions',
      'Functional Interfaces',
      'Stream API',
      'Optional Class',
      'Method References',
      'Default and Static Methods in Interfaces',
      'Date and Time API'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/java-8-features/',
    sampleProblems: [
      { title: 'Stream Operations on Collections', difficulty: 'Medium' },
      { title: 'Lambda Expression Examples', difficulty: 'Easy' },
      { title: 'Optional Usage Patterns', difficulty: 'Medium' },
      { title: 'Functional Programming Style', difficulty: 'Hard' }
    ]
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous Java Concepts',
    description: 'Additional important Java concepts and advanced topics.',
    subtopics: [
      'Annotations',
      'Reflection API',
      'Garbage Collection',
      'JVM Architecture',
      'Design Patterns in Java',
      'JDBC Basics',
      'Unit Testing with JUnit'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/java-programming-language/',
    sampleProblems: [
      { title: 'Custom Annotation Creation', difficulty: 'Hard' },
      { title: 'Reflection Usage Example', difficulty: 'Hard' },
      { title: 'Singleton Pattern Implementation', difficulty: 'Medium' },
      { title: 'Database Connection with JDBC', difficulty: 'Medium' }
    ]
  }
];

export const dsaTopics: Topic[] = [
  {
    id: 'mathematics',
    title: 'Mathematics & Number Theory',
    description: 'Mathematical foundations essential for algorithmic problem solving.',
    subtopics: [
      'Prime Numbers and Sieve',
      'GCD and LCM',
      'Modular Arithmetic',
      'Fast Exponentiation',
      'Combinatorics Basics',
      'Number Theory Algorithms'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/mathematical-algorithms/',
    sampleProblems: [
      { title: 'Check Prime Number', difficulty: 'Easy' },
      { title: 'Sieve of Eratosthenes', difficulty: 'Medium' },
      { title: 'Fast Exponentiation', difficulty: 'Medium' },
      { title: 'Extended Euclidean Algorithm', difficulty: 'Hard' }
    ]
  },
  {
    id: 'complexity-analysis',
    title: 'Complexity Analysis',
    description: 'Understanding time and space complexity for algorithm optimization.',
    subtopics: [
      'Big O Notation',
      'Time Complexity Analysis',
      'Space Complexity Analysis',
      'Best, Average, Worst Case',
      'Amortized Analysis',
      'Complexity Classes'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/',
    sampleProblems: [
      { title: 'Analyze Loop Complexity', difficulty: 'Easy' },
      { title: 'Recursive Complexity Analysis', difficulty: 'Medium' },
      { title: 'Compare Algorithm Efficiency', difficulty: 'Medium' },
      { title: 'Amortized Analysis Example', difficulty: 'Hard' }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Various sorting techniques and their applications.',
    subtopics: [
      'Bubble Sort and Selection Sort',
      'Insertion Sort',
      'Merge Sort',
      'Quick Sort',
      'Heap Sort',
      'Counting Sort and Radix Sort'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/sorting-algorithms/',
    sampleProblems: [
      { title: 'Implement Bubble Sort', difficulty: 'Easy' },
      { title: 'Merge Sort Implementation', difficulty: 'Medium' },
      { title: 'Quick Sort with Optimization', difficulty: 'Medium' },
      { title: 'Custom Comparator Sorting', difficulty: 'Hard' }
    ]
  },
  {
    id: 'searching',
    title: 'Searching Algorithms',
    description: 'Linear and binary search techniques with variations.',
    subtopics: [
      'Linear Search',
      'Binary Search',
      'Binary Search on Answer',
      'Ternary Search',
      'Exponential Search',
      'Interpolation Search'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/searching-algorithms/',
    sampleProblems: [
      { title: 'Binary Search Implementation', difficulty: 'Easy' },
      { title: 'Search in Rotated Array', difficulty: 'Medium' },
      { title: 'Find Peak Element', difficulty: 'Medium' },
      { title: 'Median of Two Sorted Arrays', difficulty: 'Hard' }
    ]
  },
  {
    id: 'recursion-backtracking',
    title: 'Recursion & Backtracking',
    description: 'Recursive problem solving and backtracking algorithms.',
    subtopics: [
      'Recursion Basics',
      'Tail Recursion',
      'Backtracking Fundamentals',
      'N-Queens Problem',
      'Sudoku Solver',
      'Permutations and Combinations'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/recursion/',
    sampleProblems: [
      { title: 'Factorial using Recursion', difficulty: 'Easy' },
      { title: 'Generate All Subsets', difficulty: 'Medium' },
      { title: 'N-Queens Solution', difficulty: 'Hard' },
      { title: 'Rat in a Maze', difficulty: 'Hard' }
    ]
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    description: 'Bitwise operations and their applications in problem solving.',
    subtopics: [
      'Bitwise Operators',
      'Bit Masking',
      'Power of Two Operations',
      'XOR Properties',
      'Bit Counting',
      'Advanced Bit Tricks'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/bits-manipulation-important-tactics/',
    sampleProblems: [
      { title: 'Check if Power of Two', difficulty: 'Easy' },
      { title: 'Count Set Bits', difficulty: 'Easy' },
      { title: 'Single Number in Array', difficulty: 'Medium' },
      { title: 'Maximum XOR Subset', difficulty: 'Hard' }
    ]
  },
  {
    id: 'greedy',
    title: 'Greedy Algorithms',
    description: 'Optimization problems solved using greedy approach.',
    subtopics: [
      'Greedy Strategy',
      'Activity Selection',
      'Fractional Knapsack',
      'Huffman Coding',
      'Job Scheduling',
      'Minimum Spanning Tree'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/greedy-algorithms/',
    sampleProblems: [
      { title: 'Coin Change Greedy', difficulty: 'Easy' },
      { title: 'Activity Selection Problem', difficulty: 'Medium' },
      { title: 'Job Scheduling with Deadlines', difficulty: 'Medium' },
      { title: 'Huffman Coding Implementation', difficulty: 'Hard' }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming (DP)',
    description: 'Optimization technique solving problems by breaking them into subproblems.',
    subtopics: [
      'Memoization vs Tabulation',
      'Overlapping Subproblems',
      'Optimal Substructure',
      'Classic DP Problems',
      'DP on Trees',
      'DP with Bitmasks'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/dynamic-programming/',
    sampleProblems: [
      { title: 'Fibonacci with DP', difficulty: 'Easy' },
      { title: 'Longest Common Subsequence', difficulty: 'Medium' },
      { title: '0/1 Knapsack Problem', difficulty: 'Medium' },
      { title: 'Edit Distance', difficulty: 'Hard' }
    ]
  },
  {
    id: 'divide-conquer',
    title: 'Divide and Conquer',
    description: 'Problem solving by dividing into smaller subproblems.',
    subtopics: [
      'Divide and Conquer Strategy',
      'Merge Sort Analysis',
      'Quick Sort Analysis',
      'Binary Search Applications',
      'Closest Pair Problem',
      'Strassen\'s Matrix Multiplication'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/divide-and-conquer/',
    sampleProblems: [
      { title: 'Maximum Subarray Sum', difficulty: 'Medium' },
      { title: 'Closest Pair of Points', difficulty: 'Hard' },
      { title: 'Inversion Count', difficulty: 'Medium' },
      { title: 'Fast Matrix Multiplication', difficulty: 'Hard' }
    ]
  },
  {
    id: 'graph-theory',
    title: 'Graph Theory',
    description: 'Graph algorithms including traversal, shortest paths, and connectivity.',
    subtopics: [
      'Graph Representation',
      'BFS and DFS Traversal',
      'Shortest Path Algorithms',
      'Minimum Spanning Tree',
      'Topological Sorting',
      'Strongly Connected Components'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
    sampleProblems: [
      { title: 'BFS and DFS Implementation', difficulty: 'Medium' },
      { title: 'Dijkstra\'s Shortest Path', difficulty: 'Medium' },
      { title: 'Detect Cycle in Graph', difficulty: 'Medium' },
      { title: 'Tarjan\'s Algorithm', difficulty: 'Hard' }
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Tree data structures and algorithms including binary trees and BSTs.',
    subtopics: [
      'Binary Trees',
      'Binary Search Trees',
      'Tree Traversals',
      'Balanced Trees (AVL, Red-Black)',
      'Segment Trees',
      'Fenwick Trees'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
    sampleProblems: [
      { title: 'Tree Traversal Methods', difficulty: 'Easy' },
      { title: 'Lowest Common Ancestor', difficulty: 'Medium' },
      { title: 'Serialize and Deserialize Tree', difficulty: 'Hard' },
      { title: 'Range Sum Query with Segment Tree', difficulty: 'Hard' }
    ]
  },
  {
    id: 'heaps-priority-queues',
    title: 'Heaps & Priority Queues',
    description: 'Heap data structure and priority queue implementations.',
    subtopics: [
      'Binary Heap Properties',
      'Heap Operations',
      'Priority Queue Implementation',
      'Heap Sort Algorithm',
      'K-way Merge',
      'Median Finding'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/heap-data-structure/',
    sampleProblems: [
      { title: 'Implement Min Heap', difficulty: 'Medium' },
      { title: 'Kth Largest Element', difficulty: 'Medium' },
      { title: 'Merge K Sorted Lists', difficulty: 'Hard' },
      { title: 'Running Median', difficulty: 'Hard' }
    ]
  },
  {
    id: 'hashing',
    title: 'Hashing',
    description: 'Hash tables, hash functions, and collision resolution techniques.',
    subtopics: [
      'Hash Functions',
      'Collision Resolution',
      'Open Addressing',
      'Chaining',
      'Hash Table Applications',
      'Rolling Hash'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/hashing-data-structure/',
    sampleProblems: [
      { title: 'Implement Hash Table', difficulty: 'Medium' },
      { title: 'Two Sum using Hashing', difficulty: 'Easy' },
      { title: 'Longest Substring without Repeating', difficulty: 'Medium' },
      { title: 'Rabin-Karp String Matching', difficulty: 'Hard' }
    ]
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Linear data structures with dynamic memory allocation.',
    subtopics: [
      'Singly Linked List',
      'Doubly Linked List',
      'Circular Linked List',
      'Linked List Operations',
      'Cycle Detection',
      'Merge and Sort Operations'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/linked-list-data-structure/',
    sampleProblems: [
      { title: 'Reverse Linked List', difficulty: 'Easy' },
      { title: 'Detect Cycle in Linked List', difficulty: 'Medium' },
      { title: 'Merge Two Sorted Lists', difficulty: 'Easy' },
      { title: 'Clone List with Random Pointers', difficulty: 'Hard' }
    ]
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures with various applications.',
    subtopics: [
      'Stack Implementation',
      'Queue Implementation',
      'Circular Queue',
      'Priority Queue',
      'Deque (Double-ended Queue)',
      'Stack and Queue Applications'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/stack-data-structure/',
    sampleProblems: [
      { title: 'Valid Parentheses', difficulty: 'Easy' },
      { title: 'Implement Queue using Stacks', difficulty: 'Easy' },
      { title: 'Largest Rectangle in Histogram', difficulty: 'Hard' },
      { title: 'Sliding Window Maximum', difficulty: 'Hard' }
    ]
  },
  {
    id: 'strings-pattern',
    title: 'Strings & Pattern Matching',
    description: 'String algorithms and pattern matching techniques.',
    subtopics: [
      'String Basics',
      'KMP Algorithm',
      'Rabin-Karp Algorithm',
      'Z Algorithm',
      'Suffix Arrays',
      'Trie Data Structure'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/string-data-structure/',
    sampleProblems: [
      { title: 'Implement Trie', difficulty: 'Medium' },
      { title: 'KMP Pattern Matching', difficulty: 'Hard' },
      { title: 'Longest Palindromic Substring', difficulty: 'Medium' },
      { title: 'Suffix Array Construction', difficulty: 'Hard' }
    ]
  },
  {
    id: 'geometric',
    title: 'Geometric Algorithms',
    description: 'Computational geometry and geometric problem solving.',
    subtopics: [
      'Point and Line Operations',
      'Convex Hull',
      'Line Intersection',
      'Closest Pair of Points',
      'Area and Perimeter Calculations',
      'Polygon Algorithms'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/geometric-algorithms/',
    sampleProblems: [
      { title: 'Point in Polygon', difficulty: 'Medium' },
      { title: 'Convex Hull using Graham Scan', difficulty: 'Hard' },
      { title: 'Line Segment Intersection', difficulty: 'Hard' },
      { title: 'Closest Pair of Points', difficulty: 'Hard' }
    ]
  },
  {
    id: 'combinatorics',
    title: 'Combinatorics & Probability',
    description: 'Counting principles and probability in algorithmic contexts.',
    subtopics: [
      'Permutations and Combinations',
      'Binomial Coefficients',
      'Inclusion-Exclusion Principle',
      'Probability Basics',
      'Expected Value',
      'Random Algorithms'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/mathematical-algorithms/',
    sampleProblems: [
      { title: 'Calculate nCr efficiently', difficulty: 'Medium' },
      { title: 'Derangement Problem', difficulty: 'Medium' },
      { title: 'Birthday Paradox', difficulty: 'Easy' },
      { title: 'Randomized Quick Sort', difficulty: 'Hard' }
    ]
  },
  {
    id: 'game-theory',
    title: 'Game Theory & Puzzles',
    description: 'Strategic decision making and puzzle solving algorithms.',
    subtopics: [
      'Nim Game',
      'Minimax Algorithm',
      'Alpha-Beta Pruning',
      'Game Trees',
      'Winning and Losing Positions',
      'Mathematical Puzzles'
    ],
    gfgLink: 'https://www.geeksforgeeks.org/game-theory/',
    sampleProblems: [
      { title: 'Nim Game Strategy', difficulty: 'Medium' },
      { title: 'Tic-Tac-Toe with Minimax', difficulty: 'Hard' },
      { title: 'Stone Game', difficulty: 'Medium' },
      { title: 'Tower of Hanoi', difficulty: 'Medium' }
    ]
  }
];