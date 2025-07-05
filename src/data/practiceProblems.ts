export interface PracticeTestCase {
  input: string;
  expectedOutput: string;
  visible: boolean;
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  statement: string;
  testCases: PracticeTestCase[];
}

export const practiceProblems: PracticeProblem[] = [
  // Basic Java Problems
  {
    id: 'hello-world',
    title: 'Hello World Program',
    difficulty: 'Easy',
    description: 'Write a program that prints "Hello, World!" to the output.',
    statement: 'Write a program that prints "Hello, World!" to the output.\n\nFor printing use:\n- C++: cout << "Hello, World!";\n- Java: System.out.println("Hello, World!");\n- Python: print("Hello, World!")',
    testCases: [
      { input: '', expectedOutput: 'Hello, World!', visible: true },
      { input: '', expectedOutput: 'Hello, World!', visible: false }
    ]
  },
  {
    id: 'variable-declaration',
    title: 'Variable Declaration and Initialization',
    difficulty: 'Easy',
    description: 'Declare and initialize variables of different data types.',
    statement: 'Declare and initialize the following variables:\n- An integer variable named "age" with value 25\n- A string variable named "name" with value "John"\n- A double variable named "height" with value 5.9\n- A boolean variable named "isStudent" with value true\n\nPrint all variables in the format: "Name: [name], Age: [age], Height: [height], Is Student: [isStudent]"',
    testCases: [
      { input: '', expectedOutput: 'Name: John, Age: 25, Height: 5.9, Is Student: true', visible: true },
      { input: '', expectedOutput: 'Name: John, Age: 25, Height: 5.9, Is Student: true', visible: false }
    ]
  },
  {
    id: 'basic-calculator',
    title: 'Basic Calculator Operations',
    difficulty: 'Easy',
    description: 'Perform basic arithmetic operations on two numbers.',
    statement: 'Given two integers a and b, perform the following operations and print the results:\n- Addition: a + b\n- Subtraction: a - b\n- Multiplication: a * b\n- Division: a / b (as a double)\n- Modulus: a % b\n\nInput: Two space-separated integers\nOutput: Five lines with the results\n\nExample:\nInput: 10 3\nOutput:\nAddition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.333333\nModulus: 1',
    testCases: [
      { input: '10 3', expectedOutput: 'Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3.333333\nModulus: 1', visible: true },
      { input: '15 4', expectedOutput: 'Addition: 19\nSubtraction: 11\nMultiplication: 60\nDivision: 3.75\nModulus: 3', visible: false }
    ]
  },
  {
    id: 'data-type-conversion',
    title: 'Data Type Conversion',
    difficulty: 'Medium',
    description: 'Convert between different data types.',
    statement: 'Given a string representing a number, convert it to different data types and perform operations.\n\nInput: A string number (e.g., "123.45")\n\nPerform the following conversions:\n1. Convert to integer (truncate decimal part)\n2. Convert to double\n3. Convert to float\n4. Add 10 to the integer value\n5. Multiply the double value by 2\n\nPrint each result on a new line.\n\nExample:\nInput: 123.45\nOutput:\nInteger: 123\nDouble: 123.45\nFloat: 123.45\nInteger + 10: 133\nDouble * 2: 246.9',
    testCases: [
      { input: '123.45', expectedOutput: 'Integer: 123\nDouble: 123.45\nFloat: 123.45\nInteger + 10: 133\nDouble * 2: 246.9', visible: true },
      { input: '99.99', expectedOutput: 'Integer: 99\nDouble: 99.99\nFloat: 99.99\nInteger + 10: 109\nDouble * 2: 199.98', visible: false }
    ]
  },

  // Control Flow Problems
  {
    id: 'switch-case',
    title: 'Switch Case',
    difficulty: 'Easy',
    description: 'Given the integer day denoting the day number, print on the screen which day of the week it is. Week starts from Monday and for values greater than 7 or less than 1, print Invalid. Ensure only the 1st letter of the answer is capitalised.',
    statement: 'Given the integer day denoting the day number, print on the screen which day of the week it is. Week starts from Monday and for values greater than 7 or less than 1, print Invalid.\n\nEnsure only the 1st letter of the answer is capitalised.\n\nFor printing use:\n- C++: cout << variable_name;\n- Java: System.out.print();\n- Python: print()\n- Javascript: console.log()\n\nExamples:\nInput: day = 3\nOutput: Wednesday\n\nInput: day = 8\nOutput: Invalid',
    testCases: [
      { input: '3', expectedOutput: 'Wednesday', visible: true },
      { input: '8', expectedOutput: 'Invalid', visible: true },
      { input: '1', expectedOutput: 'Monday', visible: false },
      { input: '0', expectedOutput: 'Invalid', visible: false }
    ]
  },
  {
    id: 'grade-calculator',
    title: 'Grade Calculator',
    difficulty: 'Easy',
    description: 'Calculate and assign grades based on percentage scores.',
    statement: 'Write a program that takes a percentage score and assigns a grade according to the following scale:\n- 90-100: A\n- 80-89: B\n- 70-79: C\n- 60-69: D\n- Below 60: F\n\nInput: A percentage score (integer)\nOutput: The corresponding grade\n\nExample:\nInput: 85\nOutput: B',
    testCases: [
      { input: '85', expectedOutput: 'B', visible: true },
      { input: '95', expectedOutput: 'A', visible: true },
      { input: '55', expectedOutput: 'F', visible: false },
      { input: '72', expectedOutput: 'C', visible: false }
    ]
  },
  {
    id: 'prime-number-check',
    title: 'Prime Number Check',
    difficulty: 'Easy',
    description: 'Check if a given number is prime.',
    statement: 'Write a program to check if a given number is prime.\n\nA prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.\n\nInput: An integer n\nOutput: "Prime" if n is prime, "Not Prime" otherwise\n\nExample:\nInput: 17\nOutput: Prime\n\nInput: 24\nOutput: Not Prime',
    testCases: [
      { input: '17', expectedOutput: 'Prime', visible: true },
      { input: '24', expectedOutput: 'Not Prime', visible: true },
      { input: '2', expectedOutput: 'Prime', visible: false },
      { input: '1', expectedOutput: 'Not Prime', visible: false }
    ]
  },
  {
    id: 'fibonacci-series',
    title: 'Fibonacci Series',
    difficulty: 'Medium',
    description: 'Generate the Fibonacci series up to n terms.',
    statement: 'Write a program to generate the Fibonacci series up to n terms.\n\nThe Fibonacci series is a sequence where each number is the sum of the two preceding ones, usually starting with 0 and 1.\n\nInput: Number of terms n\nOutput: First n terms of Fibonacci series, space-separated\n\nExample:\nInput: 8\nOutput: 0 1 1 2 3 5 8 13',
    testCases: [
      { input: '8', expectedOutput: '0 1 1 2 3 5 8 13', visible: true },
      { input: '5', expectedOutput: '0 1 1 2 3', visible: true },
      { input: '10', expectedOutput: '0 1 1 2 3 5 8 13 21 34', visible: false }
    ]
  },
  {
    id: 'pattern-printing',
    title: 'Pattern Printing',
    difficulty: 'Medium',
    description: 'Print various patterns using loops.',
    statement: 'Print the following pattern:\n\n*\n**\n***\n****\n*****\n\nInput: Number of rows n\nOutput: The pattern\n\nExample:\nInput: 5\nOutput:\n*\n**\n***\n****\n*****',
    testCases: [
      { input: '5', expectedOutput: '*\n**\n***\n****\n*****', visible: true },
      { input: '3', expectedOutput: '*\n**\n***', visible: false }
    ]
  },

  // Methods Problems
  {
    id: 'calculate-area',
    title: 'Calculate Area of Shapes',
    difficulty: 'Easy',
    description: 'Calculate area of different geometric shapes using methods.',
    statement: 'Write methods to calculate the area of different shapes:\n\n1. Circle: area = π * r²\n2. Rectangle: area = length * width\n3. Triangle: area = 0.5 * base * height\n\nInput: Three lines:\n- Radius of circle\n- Length and width of rectangle (space-separated)\n- Base and height of triangle (space-separated)\n\nOutput: Areas of all three shapes, each on a new line\n\nExample:\nInput:\n5\n4 6\n3 8\nOutput:\n78.54\n24.0\n12.0',
    testCases: [
      { input: '5\n4 6\n3 8', expectedOutput: '78.54\n24.0\n12.0', visible: true },
      { input: '3\n2 5\n4 6', expectedOutput: '28.27\n10.0\n12.0', visible: false }
    ]
  },
  {
    id: 'factorial-recursion',
    title: 'Factorial using Recursion',
    difficulty: 'Medium',
    description: 'Calculate factorial using recursive method.',
    statement: 'Write a recursive method to calculate the factorial of a number.\n\nThe factorial of n (n!) is the product of all positive integers less than or equal to n.\n\nInput: An integer n\nOutput: The factorial of n\n\nExample:\nInput: 5\nOutput: 120\n\nNote: 5! = 5 × 4 × 3 × 2 × 1 = 120',
    testCases: [
      { input: '5', expectedOutput: '120', visible: true },
      { input: '0', expectedOutput: '1', visible: true },
      { input: '3', expectedOutput: '6', visible: false }
    ]
  },
  {
    id: 'method-overloading',
    title: 'Method Overloading Example',
    difficulty: 'Easy',
    description: 'Demonstrate method overloading with different parameter types.',
    statement: 'Create overloaded methods named "add" that can:\n1. Add two integers\n2. Add two doubles\n3. Add three integers\n4. Add two strings (concatenate)\n\nInput: Multiple test cases\nOutput: Results of each add operation\n\nExample:\nInput:\n10 20\n5.5 3.2\n1 2 3\nHello World\nOutput:\n30\n8.7\n6\nHelloWorld',
    testCases: [
      { input: '10 20\n5.5 3.2\n1 2 3\nHello World', expectedOutput: '30\n8.7\n6\nHelloWorld', visible: true },
      { input: '15 25\n2.1 4.3\n5 6 7\nTest String', expectedOutput: '40\n6.4\n18\nTestString', visible: false }
    ]
  },
  {
    id: 'tower-of-hanoi',
    title: 'Tower of Hanoi',
    difficulty: 'Hard',
    description: 'Solve the Tower of Hanoi puzzle using recursion.',
    statement: 'Implement the Tower of Hanoi puzzle using recursion.\n\nThe puzzle consists of three rods and n disks of different sizes. Move all disks from the source rod to the destination rod using the auxiliary rod.\n\nRules:\n1. Only one disk can be moved at a time\n2. A larger disk cannot be placed on top of a smaller disk\n3. Only the top disk on any rod can be moved\n\nInput: Number of disks n\nOutput: The sequence of moves\n\nExample:\nInput: 3\nOutput:\nMove disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C',
    testCases: [
      { input: '3', expectedOutput: 'Move disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C', visible: true },
      { input: '2', expectedOutput: 'Move disk 1 from A to B\nMove disk 2 from A to C\nMove disk 1 from B to C', visible: false }
    ]
  },

  // OOP Problems
  {
    id: 'student-management',
    title: 'Student Management System',
    difficulty: 'Medium',
    description: 'Create a simple student management system using classes and objects.',
    statement: 'Create a Student class with the following attributes:\n- name (String)\n- rollNumber (int)\n- marks (double)\n\nMethods:\n- Constructor to initialize all attributes\n- displayInfo() to print student information\n- calculateGrade() to return grade based on marks\n\nCreate a main method that:\n1. Creates a Student object\n2. Displays student information\n3. Shows the calculated grade\n\nInput: Student details (name, roll number, marks)\nOutput: Student information and grade\n\nExample:\nInput:\nJohn Doe\n101\n85.5\nOutput:\nName: John Doe\nRoll Number: 101\nMarks: 85.5\nGrade: B',
    testCases: [
      { input: 'John Doe\n101\n85.5', expectedOutput: 'Name: John Doe\nRoll Number: 101\nMarks: 85.5\nGrade: B', visible: true },
      { input: 'Jane Smith\n102\n92.0', expectedOutput: 'Name: Jane Smith\nRoll Number: 102\nMarks: 92.0\nGrade: A', visible: false }
    ]
  },
  {
    id: 'shape-hierarchy',
    title: 'Shape Hierarchy with Inheritance',
    difficulty: 'Medium',
    description: 'Create a hierarchy of shape classes using inheritance.',
    statement: 'Create a hierarchy of shape classes:\n\n1. Abstract class Shape with abstract method calculateArea()\n2. Circle class extending Shape\n3. Rectangle class extending Shape\n4. Triangle class extending Shape\n\nEach class should have appropriate constructors and implement calculateArea().\n\nInput: Shape type and dimensions\nOutput: Area of the shape\n\nExample:\nInput:\nCircle\n5\nOutput:\nArea: 78.54',
    testCases: [
      { input: 'Circle\n5', expectedOutput: 'Area: 78.54', visible: true },
      { input: 'Rectangle\n4 6', expectedOutput: 'Area: 24.0', visible: true },
      { input: 'Triangle\n3 8', expectedOutput: 'Area: 12.0', visible: false }
    ]
  },
  {
    id: 'bank-account',
    title: 'Bank Account with Encapsulation',
    difficulty: 'Easy',
    description: 'Create a bank account class demonstrating encapsulation.',
    statement: 'Create a BankAccount class with:\n- Private fields: accountNumber, balance, accountHolder\n- Public methods: deposit(), withdraw(), getBalance(), displayInfo()\n- Constructor to initialize account\n\nImplement proper encapsulation with getters and setters.\n\nInput: Account details and transactions\nOutput: Account information and balance\n\nExample:\nInput:\n12345\nJohn Doe\n1000\n500\n200\nOutput:\nAccount: 12345\nHolder: John Doe\nBalance: 1300.0',
    testCases: [
      { input: '12345\nJohn Doe\n1000\n500\n200', expectedOutput: 'Account: 12345\nHolder: John Doe\nBalance: 1300.0', visible: true },
      { input: '67890\nJane Smith\n2000\n1000\n300', expectedOutput: 'Account: 67890\nHolder: Jane Smith\nBalance: 2700.0', visible: false }
    ]
  },

  // String Handling Problems
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    difficulty: 'Easy',
    description: 'Check if a string is a palindrome.',
    statement: 'Write a program to check if a given string is a palindrome.\n\nA palindrome is a string that reads the same backward as forward (ignoring case).\n\nInput: A string\nOutput: "Palindrome" if the string is a palindrome, "Not Palindrome" otherwise\n\nExample:\nInput: racecar\nOutput: Palindrome\n\nInput: hello\nOutput: Not Palindrome',
    testCases: [
      { input: 'racecar', expectedOutput: 'Palindrome', visible: true },
      { input: 'hello', expectedOutput: 'Not Palindrome', visible: true },
      { input: 'A man a plan a canal Panama', expectedOutput: 'Palindrome', visible: false }
    ]
  },
  {
    id: 'anagram-detection',
    title: 'Anagram Detection',
    difficulty: 'Medium',
    description: 'Check if two strings are anagrams.',
    statement: 'Write a program to check if two strings are anagrams.\n\nAn anagram is a word or phrase formed by rearranging the letters of another word or phrase.\n\nInput: Two strings (space-separated)\nOutput: "Anagram" if they are anagrams, "Not Anagram" otherwise\n\nExample:\nInput: listen silent\nOutput: Anagram\n\nInput: hello world\nOutput: Not Anagram',
    testCases: [
      { input: 'listen silent', expectedOutput: 'Anagram', visible: true },
      { input: 'hello world', expectedOutput: 'Not Anagram', visible: true },
      { input: 'debit card bad credit', expectedOutput: 'Anagram', visible: false }
    ]
  },
  {
    id: 'string-reversal',
    title: 'String Reversal',
    difficulty: 'Easy',
    description: 'Reverse a string using different methods.',
    statement: 'Write a program to reverse a string.\n\nInput: A string\nOutput: The reversed string\n\nExample:\nInput: hello\nOutput: olleh\n\nInput: world\nOutput: dlrow',
    testCases: [
      { input: 'hello', expectedOutput: 'olleh', visible: true },
      { input: 'world', expectedOutput: 'dlrow', visible: true },
      { input: 'programming', expectedOutput: 'gnimmargorp', visible: false }
    ]
  },

  // Array Problems
  {
    id: 'find-maximum',
    title: 'Find Maximum Element',
    difficulty: 'Easy',
    description: 'Find the maximum element in an array.',
    statement: 'Write a program to find the maximum element in an array.\n\nInput: Array size n, followed by n space-separated integers\nOutput: The maximum element\n\nExample:\nInput:\n5\n10 5 20 15 8\nOutput: 20',
    testCases: [
      { input: '5\n10 5 20 15 8', expectedOutput: '20', visible: true },
      { input: '4\n1 2 3 4', expectedOutput: '4', visible: true },
      { input: '3\n-5 -10 -3', expectedOutput: '-3', visible: false }
    ]
  },
  {
    id: 'array-rotation',
    title: 'Array Rotation',
    difficulty: 'Medium',
    description: 'Rotate an array by a given number of positions.',
    statement: 'Write a program to rotate an array by k positions to the right.\n\nInput: Array size n, array elements, and rotation count k\nOutput: The rotated array\n\nExample:\nInput:\n5\n1 2 3 4 5\n2\nOutput: 4 5 1 2 3',
    testCases: [
      { input: '5\n1 2 3 4 5\n2', expectedOutput: '4 5 1 2 3', visible: true },
      { input: '4\n10 20 30 40\n1', expectedOutput: '40 10 20 30', visible: false }
    ]
  },
  {
    id: 'matrix-multiplication',
    title: 'Matrix Multiplication',
    difficulty: 'Medium',
    description: 'Multiply two matrices.',
    statement: 'Write a program to multiply two matrices.\n\nInput: Dimensions and elements of two matrices\nOutput: The resulting matrix\n\nExample:\nInput:\n2 2\n1 2\n3 4\n2 2\n5 6\n7 8\nOutput:\n19 22\n43 50',
    testCases: [
      { input: '2 2\n1 2\n3 4\n2 2\n5 6\n7 8', expectedOutput: '19 22\n43 50', visible: true },
      { input: '2 3\n1 2 3\n4 5 6\n3 2\n7 8\n9 10\n11 12', expectedOutput: '58 64\n139 154', visible: false }
    ]
  },

  // Exception Handling Problems
  {
    id: 'division-by-zero',
    title: 'Division by Zero Handler',
    difficulty: 'Easy',
    description: 'Handle division by zero exception.',
    statement: 'Write a program that performs division and handles the division by zero exception.\n\nInput: Two integers a and b\nOutput: Result of a/b or error message\n\nExample:\nInput: 10 2\nOutput: 5.0\n\nInput: 10 0\nOutput: Error: Division by zero',
    testCases: [
      { input: '10 2', expectedOutput: '5.0', visible: true },
      { input: '10 0', expectedOutput: 'Error: Division by zero', visible: true },
      { input: '15 3', expectedOutput: '5.0', visible: false }
    ]
  },
  {
    id: 'file-reading-exception',
    title: 'File Reading with Exception Handling',
    difficulty: 'Medium',
    description: 'Read from a file with proper exception handling.',
    statement: 'Write a program that attempts to read from a file and handles FileNotFoundException.\n\nInput: A filename\nOutput: File contents or error message\n\nExample:\nInput: test.txt\nOutput: File contents or "Error: File not found"',
    testCases: [
      { input: 'test.txt', expectedOutput: 'File contents or "Error: File not found"', visible: true },
      { input: 'nonexistent.txt', expectedOutput: 'Error: File not found', visible: false }
    ]
  },

  // Collections Problems
  {
    id: 'arraylist-operations',
    title: 'ArrayList Operations',
    difficulty: 'Easy',
    description: 'Perform basic operations on ArrayList.',
    statement: 'Write a program to demonstrate ArrayList operations:\n- Add elements\n- Remove elements\n- Search for elements\n- Display the list\n\nInput: A series of operations\nOutput: Results of operations\n\nExample:\nInput:\nadd 10\nadd 20\nadd 30\nremove 20\ncontains 10\nOutput:\nList: [10, 30]\nContains 10: true',
    testCases: [
      { input: 'add 10\nadd 20\nadd 30\nremove 20\ncontains 10', expectedOutput: 'List: [10, 30]\nContains 10: true', visible: true },
      { input: 'add 5\nadd 15\nremove 5\ncontains 15', expectedOutput: 'List: [15]\nContains 15: true', visible: false }
    ]
  },
  {
    id: 'hashmap-implementation',
    title: 'HashMap Implementation',
    difficulty: 'Medium',
    description: 'Implement basic HashMap operations.',
    statement: 'Write a program to demonstrate HashMap operations:\n- Put key-value pairs\n- Get values by key\n- Remove entries\n- Check if key exists\n\nInput: A series of operations\nOutput: Results of operations\n\nExample:\nInput:\nput name John\nput age 25\nget name\ncontains age\nOutput:\nValue for name: John\nContains age: true',
    testCases: [
      { input: 'put name John\nput age 25\nget name\ncontains age', expectedOutput: 'Value for name: John\nContains age: true', visible: true },
      { input: 'put city NewYork\nput country USA\nget city\nremove country', expectedOutput: 'Value for city: NewYork\nCountry removed', visible: false }
    ]
  },

  // DSA Problems - Linked Lists
  {
    id: 'linked-list-insertion',
    title: 'Linked List Insertion',
    difficulty: 'Medium',
    description: 'Insert elements into a linked list.',
    statement: 'Implement a linked list with insertion operations:\n- Insert at beginning\n- Insert at end\n- Insert at specific position\n\nInput: A series of insertion operations\nOutput: The final linked list\n\nExample:\nInput:\ninsert_end 10\ninsert_end 20\ninsert_begin 5\ninsert_pos 1 15\nOutput:\n5 -> 15 -> 10 -> 20',
    testCases: [
      { input: 'insert_end 10\ninsert_end 20\ninsert_begin 5\ninsert_pos 1 15', expectedOutput: '5 -> 15 -> 10 -> 20', visible: true },
      { input: 'insert_begin 1\ninsert_end 2\ninsert_end 3', expectedOutput: '1 -> 2 -> 3', visible: false }
    ]
  },
  {
    id: 'linked-list-reversal',
    title: 'Linked List Reversal',
    difficulty: 'Medium',
    description: 'Reverse a linked list.',
    statement: 'Write a program to reverse a linked list.\n\nInput: A linked list (space-separated values)\nOutput: The reversed linked list\n\nExample:\nInput: 1 2 3 4 5\nOutput: 5 -> 4 -> 3 -> 2 -> 1',
    testCases: [
      { input: '1 2 3 4 5', expectedOutput: '5 -> 4 -> 3 -> 2 -> 1', visible: true },
      { input: '10 20 30', expectedOutput: '30 -> 20 -> 10', visible: false }
    ]
  },

  // DSA Problems - Trees
  {
    id: 'binary-tree-traversal',
    title: 'Binary Tree Traversal',
    difficulty: 'Medium',
    description: 'Perform different tree traversal methods.',
    statement: 'Implement binary tree traversals:\n- Inorder (Left -> Root -> Right)\n- Preorder (Root -> Left -> Right)\n- Postorder (Left -> Right -> Root)\n\nInput: A binary tree (level order)\nOutput: All three traversals\n\nExample:\nInput: 1 2 3 4 5 6 7\nOutput:\nInorder: 4 2 5 1 6 3 7\nPreorder: 1 2 4 5 3 6 7\nPostorder: 4 5 2 6 7 3 1',
    testCases: [
      { input: '1 2 3 4 5 6 7', expectedOutput: 'Inorder: 4 2 5 1 6 3 7\nPreorder: 1 2 4 5 3 6 7\nPostorder: 4 5 2 6 7 3 1', visible: true },
      { input: '1 2 3', expectedOutput: 'Inorder: 2 1 3\nPreorder: 1 2 3\nPostorder: 2 3 1', visible: false }
    ]
  },
  {
    id: 'binary-search-tree',
    title: 'Binary Search Tree Operations',
    difficulty: 'Medium',
    description: 'Implement BST insertion and search.',
    statement: 'Implement Binary Search Tree operations:\n- Insert a value\n- Search for a value\n- Display inorder traversal\n\nInput: A series of operations\nOutput: Results of operations\n\nExample:\nInput:\ninsert 50\ninsert 30\ninsert 70\ninsert 20\nsearch 30\nOutput:\nBST Inorder: 20 30 50 70\nFound: 30',
    testCases: [
      { input: 'insert 50\ninsert 30\ninsert 70\ninsert 20\nsearch 30', expectedOutput: 'BST Inorder: 20 30 50 70\nFound: 30', visible: true },
      { input: 'insert 10\ninsert 5\ninsert 15\nsearch 20', expectedOutput: 'BST Inorder: 5 10 15\nNot Found: 20', visible: false }
    ]
  },

  // DSA Problems - Graphs
  {
    id: 'graph-dfs',
    title: 'Graph DFS Traversal',
    difficulty: 'Medium',
    description: 'Implement Depth-First Search on a graph.',
    statement: 'Implement Depth-First Search (DFS) traversal on an undirected graph.\n\nInput: Number of vertices and edges, followed by edge list\nOutput: DFS traversal starting from vertex 0\n\nExample:\nInput:\n4 4\n0 1\n0 2\n1 2\n2 3\nOutput:\nDFS: 0 1 2 3',
    testCases: [
      { input: '4 4\n0 1\n0 2\n1 2\n2 3', expectedOutput: 'DFS: 0 1 2 3', visible: true },
      { input: '3 2\n0 1\n1 2', expectedOutput: 'DFS: 0 1 2', visible: false }
    ]
  },
  {
    id: 'graph-bfs',
    title: 'Graph BFS Traversal',
    difficulty: 'Medium',
    description: 'Implement Breadth-First Search on a graph.',
    statement: 'Implement Breadth-First Search (BFS) traversal on an undirected graph.\n\nInput: Number of vertices and edges, followed by edge list\nOutput: BFS traversal starting from vertex 0\n\nExample:\nInput:\n4 4\n0 1\n0 2\n1 2\n2 3\nOutput:\nBFS: 0 1 2 3',
    testCases: [
      { input: '4 4\n0 1\n0 2\n1 2\n2 3', expectedOutput: 'BFS: 0 1 2 3', visible: true },
      { input: '3 2\n0 1\n1 2', expectedOutput: 'BFS: 0 1 2', visible: false }
    ]
  },

  // DSA Problems - Sorting
  {
    id: 'bubble-sort',
    title: 'Bubble Sort Implementation',
    difficulty: 'Easy',
    description: 'Implement bubble sort algorithm.',
    statement: 'Implement the bubble sort algorithm to sort an array in ascending order.\n\nInput: Array size n, followed by n space-separated integers\nOutput: The sorted array\n\nExample:\nInput:\n5\n64 34 25 12 22\nOutput:\n12 22 25 34 64',
    testCases: [
      { input: '5\n64 34 25 12 22', expectedOutput: '12 22 25 34 64', visible: true },
      { input: '4\n5 2 8 1', expectedOutput: '1 2 5 8', visible: false }
    ]
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort Implementation',
    difficulty: 'Medium',
    description: 'Implement quick sort algorithm.',
    statement: 'Implement the quick sort algorithm to sort an array in ascending order.\n\nInput: Array size n, followed by n space-separated integers\nOutput: The sorted array\n\nExample:\nInput:\n6\n10 7 8 9 1 5\nOutput:\n1 5 7 8 9 10',
    testCases: [
      { input: '6\n10 7 8 9 1 5', expectedOutput: '1 5 7 8 9 10', visible: true },
      { input: '4\n3 1 4 2', expectedOutput: '1 2 3 4', visible: false }
    ]
  },

  // DSA Problems - Searching
  {
    id: 'binary-search',
    title: 'Binary Search Implementation',
    difficulty: 'Easy',
    description: 'Implement binary search algorithm.',
    statement: 'Implement binary search to find an element in a sorted array.\n\nInput: Array size n, sorted array, and target element\nOutput: Index of target element or -1 if not found\n\nExample:\nInput:\n5\n1 3 5 7 9\n5\nOutput:\n2',
    testCases: [
      { input: '5\n1 3 5 7 9\n5', expectedOutput: '2', visible: true },
      { input: '4\n2 4 6 8\n10', expectedOutput: '-1', visible: true },
      { input: '3\n1 2 3\n2', expectedOutput: '1', visible: false }
    ]
  },
  {
    id: 'linear-search',
    title: 'Linear Search Implementation',
    difficulty: 'Easy',
    description: 'Implement linear search algorithm.',
    statement: 'Implement linear search to find an element in an array.\n\nInput: Array size n, array elements, and target element\nOutput: Index of target element or -1 if not found\n\nExample:\nInput:\n5\n10 20 30 40 50\n30\nOutput:\n2',
    testCases: [
      { input: '5\n10 20 30 40 50\n30', expectedOutput: '2', visible: true },
      { input: '4\n1 2 3 4\n5', expectedOutput: '-1', visible: true },
      { input: '3\n5 10 15\n10', expectedOutput: '1', visible: false }
    ]
  },

  // Additional Java Problems - Generics
  {
    id: 'generic-stack',
    title: 'Generic Stack Implementation',
    difficulty: 'Medium',
    description: 'Implement a generic stack data structure.',
    statement: 'Implement a generic Stack class with the following operations:\n- push(T item): Add element to top\n- pop(): Remove and return top element\n- peek(): Return top element without removing\n- isEmpty(): Check if stack is empty\n- size(): Return number of elements\n\nInput: A series of stack operations\nOutput: Results of operations\n\nExample:\nInput:\npush 10\npush 20\npush 30\npop\npeek\nsize\nOutput:\nPopped: 30\nTop: 20\nSize: 2',
    testCases: [
      { input: 'push 10\npush 20\npush 30\npop\npeek\nsize', expectedOutput: 'Popped: 30\nTop: 20\nSize: 2', visible: true },
      { input: 'push 5\npush 15\npop\npop\nisEmpty', expectedOutput: 'Popped: 15\nPopped: 5\nEmpty: true', visible: false }
    ]
  },

  // Additional Java Problems - Multithreading
  {
    id: 'thread-synchronization',
    title: 'Thread Synchronization',
    difficulty: 'Hard',
    description: 'Implement thread synchronization using synchronized blocks.',
    statement: 'Create a Counter class with a shared counter variable and two threads that increment it.\n\nUse synchronized blocks to ensure thread safety.\n\nInput: Number of increments per thread\nOutput: Final counter value\n\nExample:\nInput:\n1000\n1000\nOutput:\nFinal Counter: 2000',
    testCases: [
      { input: '1000\n1000', expectedOutput: 'Final Counter: 2000', visible: true },
      { input: '500\n500', expectedOutput: 'Final Counter: 1000', visible: false }
    ]
  },

  // Additional DSA Problems - Stacks and Queues
  {
    id: 'stack-queue-operations',
    title: 'Stack and Queue Operations',
    difficulty: 'Medium',
    description: 'Implement basic stack and queue operations.',
    statement: 'Implement both Stack and Queue data structures with basic operations.\n\nStack: push, pop, peek\nQueue: enqueue, dequeue, front\n\nInput: A series of operations\nOutput: Results of operations\n\nExample:\nInput:\nstack push 10\nstack push 20\nstack pop\nqueue enqueue 30\nqueue enqueue 40\nqueue dequeue\nOutput:\nStack popped: 20\nQueue dequeued: 30',
    testCases: [
      { input: 'stack push 10\nstack push 20\nstack pop\nqueue enqueue 30\nqueue enqueue 40\nqueue dequeue', expectedOutput: 'Stack popped: 20\nQueue dequeued: 30', visible: true },
      { input: 'stack push 5\nstack pop\nqueue enqueue 15\nqueue dequeue', expectedOutput: 'Stack popped: 5\nQueue dequeued: 15', visible: false }
    ]
  },

  // Additional DSA Problems - Dynamic Programming
  {
    id: 'fibonacci-dp',
    title: 'Fibonacci with Dynamic Programming',
    difficulty: 'Medium',
    description: 'Calculate Fibonacci numbers using dynamic programming.',
    statement: 'Implement Fibonacci calculation using dynamic programming (memoization).\n\nInput: A positive integer n\nOutput: The nth Fibonacci number\n\nExample:\nInput: 10\nOutput: 55',
    testCases: [
      { input: '10', expectedOutput: '55', visible: true },
      { input: '15', expectedOutput: '610', visible: true },
      { input: '20', expectedOutput: '6765', visible: false }
    ]
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'Hard',
    description: 'Find the longest common subsequence of two strings.',
    statement: 'Given two strings, find the length of their longest common subsequence.\n\nA subsequence is a sequence that appears in the same relative order but not necessarily contiguous.\n\nInput: Two strings (space-separated)\nOutput: Length of LCS\n\nExample:\nInput: ABCDEFGH BDFH\nOutput: 4',
    testCases: [
      { input: 'ABCDEFGH BDFH', expectedOutput: '4', visible: true },
      { input: 'HELLO WORLD', expectedOutput: '3', visible: true },
      { input: 'ABCDEF ABCDEF', expectedOutput: '6', visible: false }
    ]
  },

  // Additional DSA Problems - Advanced Algorithms
  {
    id: 'dijkstra-algorithm',
    title: 'Dijkstra\'s Shortest Path',
    difficulty: 'Hard',
    description: 'Implement Dijkstra\'s algorithm for shortest path.',
    statement: 'Implement Dijkstra\'s algorithm to find the shortest path from source to all vertices.\n\nInput: Number of vertices, adjacency matrix, source vertex\nOutput: Shortest distances from source\n\nExample:\nInput:\n4\n0 4 0 0\n4 0 8 0\n0 8 0 7\n0 0 7 0\n0\nOutput:\n0 4 12 19',
    testCases: [
      { input: '4\n0 4 0 0\n4 0 8 0\n0 8 0 7\n0 0 7 0\n0', expectedOutput: '0 4 12 19', visible: true },
      { input: '3\n0 2 0\n2 0 3\n0 3 0\n0', expectedOutput: '0 2 5', visible: false }
    ]
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort Implementation',
    difficulty: 'Medium',
    description: 'Implement merge sort algorithm.',
    statement: 'Implement the merge sort algorithm to sort an array in ascending order.\n\nInput: Array size n, followed by n space-separated integers\nOutput: The sorted array\n\nExample:\nInput:\n6\n38 27 43 3 9 82\nOutput:\n3 9 27 38 43 82',
    testCases: [
      { input: '6\n38 27 43 3 9 82', expectedOutput: '3 9 27 38 43 82', visible: true },
      { input: '4\n5 2 8 1', expectedOutput: '1 2 5 8', visible: false }
    ]
  }
]; 