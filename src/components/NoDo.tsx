import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  FileText,
  Trash2,
  Tag,
  Plus,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Search,
  List,
  Grid,
  Inbox,
  Settings,
  X,
  Trash,
  Edit3,
  Save,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SIDEBAR_ITEMS = [
  { id: 'todos', label: 'To-Do', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'trash', label: 'Trash', icon: Trash2 },
];

const TAGS = [
  { id: 'work', label: 'Work', color: 'bg-blue-500' },
  { id: 'personal', label: 'Personal', color: 'bg-green-500' },
  { id: 'urgent', label: 'Urgent', color: 'bg-red-500' },
  { id: 'important', label: 'Important', color: 'bg-yellow-500' },
  { id: 'meeting', label: 'Meeting', color: 'bg-purple-500' },
];

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  dueTime?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoDo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('todos');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // To-Do state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[]
  });

  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  // Trash state
  const [trashTodos, setTrashTodos] = useState<Todo[]>([]);
  const [trashNotes, setTrashNotes] = useState<Note[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('nodo-todos-v3');
    const savedNotes = localStorage.getItem('nodo-notes-v3');
    const savedTrashTodos = localStorage.getItem('nodo-trash-todos-v3');
    const savedTrashNotes = localStorage.getItem('nodo-trash-notes-v3');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedTrashTodos) setTrashTodos(JSON.parse(savedTrashTodos));
    if (savedTrashNotes) setTrashNotes(JSON.parse(savedTrashNotes));
  }, []);
  useEffect(() => {
    localStorage.setItem('nodo-todos-v3', JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem('nodo-notes-v3', JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem('nodo-trash-todos-v3', JSON.stringify(trashTodos));
  }, [trashTodos]);
  useEffect(() => {
    localStorage.setItem('nodo-trash-notes-v3', JSON.stringify(trashNotes));
  }, [trashNotes]);

  // Add Todo
  const handleAddTodo = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.title.trim(),
        description: newTodo.description.trim(),
        completed: false,
        dueDate: newTodo.dueDate,
        dueTime: newTodo.dueTime,
        priority: newTodo.priority,
        tags: newTodo.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        tags: []
      });
      setShowAddTodo(false);
    }
  };

  // Update Todo
  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates, updatedAt: new Date() } : todo
    ));
    setEditingTodo(null);
  };

  // Toggle Todo completion
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
    ));
  };

  // Delete Todo - Move to trash
  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
      setTrashTodos([...trashTodos, todoToDelete]);
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Add Note
  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        tags: newNote.tags,
        pinned: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([...notes, note]);
      setNewNote({
        title: '',
        content: '',
        tags: []
      });
      setShowAddNote(false);
    }
  };

  // Update Note
  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
    ));
    setEditingNote(null);
  };

  // Delete Note - Move to trash
  const handleDeleteNote = (id: string) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      setTrashNotes([...trashNotes, noteToDelete]);
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  // Toggle tag selection
  const toggleTag = (tagId: string, currentTags: string[]) => {
    if (currentTags.includes(tagId)) {
      return currentTags.filter(tag => tag !== tagId);
    } else {
      return [...currentTags, tagId];
    }
  };

  // Restore Todo from trash
  const handleRestoreTodo = (id: string) => {
    const todoToRestore = trashTodos.find(todo => todo.id === id);
    if (todoToRestore) {
      setTodos([...todos, todoToRestore]);
      setTrashTodos(trashTodos.filter(todo => todo.id !== id));
    }
  };

  // Permanently delete Todo from trash
  const handlePermanentlyDeleteTodo = (id: string) => {
    setTrashTodos(trashTodos.filter(todo => todo.id !== id));
  };

  // Restore Note from trash
  const handleRestoreNote = (id: string) => {
    const noteToRestore = trashNotes.find(note => note.id === id);
    if (noteToRestore) {
      setNotes([...notes, noteToRestore]);
      setTrashNotes(trashNotes.filter(note => note.id !== id));
    }
  };

  // Permanently delete Note from trash
  const handlePermanentlyDeleteNote = (id: string) => {
    setTrashNotes(trashNotes.filter(note => note.id !== id));
  };

  // Filtered lists
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase()) || 
                         todo.description?.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === null || todo.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                         note.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === null || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const filteredTrashTodos = trashTodos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase()) || 
                         todo.description?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const filteredTrashNotes = trashNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                         note.content.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} bg-white/90 dark:bg-gray-900/90 border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col`}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            {sidebarOpen && <span className="text-xl font-bold text-gray-900 dark:text-white">NO - DO</span>}
          </div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-2">
          {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-left ${
                activeSection === id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
          {/* Tags */}
          <div className="mt-6">
            {sidebarOpen && <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">TAGS</div>}
            <div className="space-y-1">
              {TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                    selectedTag === tag.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tag.color}`}></span>
                  {sidebarOpen && <span>{tag.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {sidebarOpen && (
            <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeSection === 'todos' && 'To-Do List'}
              {activeSection === 'notes' && 'Notes'}
              {activeSection === 'trash' && 'Trash'}
            </h1>
            {activeSection === 'notes' && (
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${activeSection === 'todos' ? 'tasks' : activeSection === 'notes' ? 'notes' : 'trash'}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            {activeSection === 'todos' && (
              <button onClick={() => setShowAddTodo(true)} className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all font-medium flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Task</span>
              </button>
            )}
            {activeSection === 'notes' && (
              <button onClick={() => setShowAddNote(true)} className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all font-medium flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Note</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* To-Do Section */}
          {activeSection === 'todos' && (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredTodos.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 py-16">
                  <Inbox className="h-16 w-16 mb-4" />
                  <p className="text-xl font-semibold">No tasks yet</p>
                  <p className="text-sm mt-2">Add your first task to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTodos.map(todo => (
                    <div key={todo.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 transition-all ${todo.completed ? 'opacity-75' : ''}`}>
                      {editingTodo === todo.id ? (
                        <TodoEditForm 
                          todo={todo} 
                          onSave={(updates) => handleUpdateTodo(todo.id, updates)}
                          onCancel={() => setEditingTodo(null)}
                          tags={TAGS}
                        />
                      ) : (
                        <div className="flex items-start space-x-3">
                          <button
                            onClick={() => toggleTodo(todo.id)}
                            className={`flex-shrink-0 mt-1 p-1 rounded transition-colors ${
                              todo.completed
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                          >
                            {todo.completed ? (
                              <CheckSquare className="h-5 w-5" />
                            ) : (
                              <CheckSquare className="h-5 w-5" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className={`font-semibold text-gray-900 dark:text-white ${todo.completed ? 'line-through' : ''}`}>
                                  {todo.title}
                                </h3>
                                {todo.description && (
                                  <p className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${todo.completed ? 'line-through' : ''}`}>
                                    {todo.description}
                                  </p>
                                )}
                                <div className="flex items-center space-x-4 mt-2">
                                  {todo.dueDate && (
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <Calendar className="h-3 w-3" />
                                      <span>{formatDate(todo.dueDate)}</span>
                                    </div>
                                  )}
                                  {todo.dueTime && (
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <Clock className="h-3 w-3" />
                                      <span>{todo.dueTime}</span>
                                    </div>
                                  )}
                                  <span className={`text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                  </span>
                                </div>
                                {todo.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {todo.tags.map(tagId => {
                                      const tag = TAGS.find(t => t.id === tagId);
                                      return tag ? (
                                        <span key={tagId} className={`px-2 py-1 text-xs rounded-full ${tag.color} text-white`}>
                                          {tag.label}
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => setEditingTodo(todo.id)}
                                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTodo(todo.id)}
                                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                >
                                  <Trash className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes Section */}
          {activeSection === 'notes' && (
            <div className="max-w-6xl mx-auto space-y-4">
              {filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 py-16">
                  <Inbox className="h-16 w-16 mb-4" />
                  <p className="text-xl font-semibold">No notes yet</p>
                  <p className="text-sm mt-2">Add your first note to get started!</p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'space-y-3'}>
                  {filteredNotes.map(note => (
                    <div key={note.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
                      {editingNote === note.id ? (
                        <NoteEditForm 
                          note={note} 
                          onSave={(updates) => handleUpdateNote(note.id, updates)}
                          onCancel={() => setEditingNote(null)}
                          tags={TAGS}
                        />
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex-1">{note.title}</h3>
                            <div className="flex items-center space-x-2 ml-2">
                              {note.pinned && <Star className="h-4 w-4 text-yellow-500" />}
                              <button
                                onClick={() => setEditingNote(note.id)}
                                className="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{note.content}</p>
                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {note.tags.map(tagId => {
                                const tag = TAGS.find(t => t.id === tagId);
                                return tag ? (
                                  <span key={tagId} className={`px-2 py-1 text-xs rounded-full ${tag.color} text-white`}>
                                    {tag.label}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Trash Section */}
          {activeSection === 'trash' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Trash Todos */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deleted Tasks ({filteredTrashTodos.length})</h2>
                {filteredTrashTodos.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-gray-600 py-8">
                    <Trash2 className="h-12 w-12 mx-auto mb-2" />
                    <p>No deleted tasks</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTrashTodos.map(todo => (
                      <div key={todo.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 opacity-75">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white line-through">{todo.title}</h3>
                                {todo.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-through">{todo.description}</p>
                                )}
                                <div className="flex items-center space-x-4 mt-2">
                                  {todo.dueDate && (
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <Calendar className="h-3 w-3" />
                                      <span>{formatDate(todo.dueDate)}</span>
                                    </div>
                                  )}
                                  {todo.dueTime && (
                                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                      <Clock className="h-3 w-3" />
                                      <span>{todo.dueTime}</span>
                                    </div>
                                  )}
                                  <span className={`text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                  </span>
                                </div>
                                {todo.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {todo.tags.map(tagId => {
                                      const tag = TAGS.find(t => t.id === tagId);
                                      return tag ? (
                                        <span key={tagId} className={`px-2 py-1 text-xs rounded-full ${tag.color} text-white`}>
                                          {tag.label}
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => handleRestoreTodo(todo.id)}
                                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                  title="Restore"
                                >
                                  <CheckSquare className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handlePermanentlyDeleteTodo(todo.id)}
                                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                  title="Delete permanently"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Trash Notes */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deleted Notes ({filteredTrashNotes.length})</h2>
                {filteredTrashNotes.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-gray-600 py-8">
                    <Trash2 className="h-12 w-12 mx-auto mb-2" />
                    <p>No deleted notes</p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredTrashNotes.map(note => (
                      <div key={note.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 opacity-75">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex-1 line-through">{note.title}</h3>
                            <div className="flex items-center space-x-2 ml-2">
                              <button
                                onClick={() => handleRestoreNote(note.id)}
                                className="p-1 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                                title="Restore"
                              >
                                <CheckSquare className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handlePermanentlyDeleteNote(note.id)}
                                className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                title="Delete permanently"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 line-through">{note.content}</p>
                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {note.tags.map(tagId => {
                                const tag = TAGS.find(t => t.id === tagId);
                                return tag ? (
                                  <span key={tagId} className={`px-2 py-1 text-xs rounded-full ${tag.color} text-white`}>
                                    {tag.label}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {showAddTodo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button onClick={() => setShowAddTodo(false)} className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="h-5 w-5 text-gray-400" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={newTodo.title}
                    onChange={e => setNewTodo({...newTodo, title: e.target.value})}
                    placeholder="Task title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newTodo.description}
                    onChange={e => setNewTodo({...newTodo, description: e.target.value})}
                    placeholder="Task description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newTodo.dueDate}
                      onChange={e => setNewTodo({...newTodo, dueDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Time</label>
                    <input
                      type="time"
                      value={newTodo.dueTime}
                      onChange={e => setNewTodo({...newTodo, dueTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={newTodo.priority}
                    onChange={e => setNewTodo({...newTodo, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => setNewTodo({...newTodo, tags: toggleTag(tag.id, newTodo.tags)})}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          newTodo.tags.includes(tag.id)
                            ? `${tag.color} text-white`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={handleAddTodo} 
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Note Modal */}
        {showAddNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button onClick={() => setShowAddNote(false)} className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="h-5 w-5 text-gray-400" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Note</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={e => setNewNote({...newNote, title: e.target.value})}
                    placeholder="Note title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
                  <textarea
                    value={newNote.content}
                    onChange={e => setNewNote({...newNote, content: e.target.value})}
                    placeholder="Write your note here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map(tag => (
                      <button
                        key={tag.id}
                        onClick={() => setNewNote({...newNote, tags: toggleTag(tag.id, newNote.tags)})}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          newNote.tags.includes(tag.id)
                            ? `${tag.color} text-white`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={handleAddNote} 
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Todo Edit Form Component
const TodoEditForm: React.FC<{
  todo: Todo;
  onSave: (updates: Partial<Todo>) => void;
  onCancel: () => void;
  tags: typeof TAGS;
}> = ({ todo, onSave, onCancel, tags }) => {
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description || '',
    dueDate: todo.dueDate || '',
    dueTime: todo.dueTime || '',
    priority: todo.priority,
    tags: todo.tags
  });

  const toggleTag = (tagId: string, currentTags: string[]) => {
    if (currentTags.includes(tagId)) {
      return currentTags.filter(tag => tag !== tagId);
    } else {
      return [...currentTags, tagId];
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={e => setFormData({...formData, dueDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Time</label>
          <input
            type="time"
            value={formData.dueTime}
            onChange={e => setFormData({...formData, dueTime: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
        <select
          value={formData.priority}
          onChange={e => setFormData({...formData, priority: e.target.value as 'low' | 'medium' | 'high'})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setFormData({...formData, tags: toggleTag(tag.id, formData.tags)})}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                formData.tags.includes(tag.id)
                  ? `${tag.color} text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Note Edit Form Component
const NoteEditForm: React.FC<{
  note: Note;
  onSave: (updates: Partial<Note>) => void;
  onCancel: () => void;
  tags: typeof TAGS;
}> = ({ note, onSave, onCancel, tags }) => {
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
    tags: note.tags
  });

  const toggleTag = (tagId: string, currentTags: string[]) => {
    if (currentTags.includes(tagId)) {
      return currentTags.filter(tag => tag !== tagId);
    } else {
      return [...currentTags, tagId];
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content *</label>
        <textarea
          value={formData.content}
          onChange={e => setFormData({...formData, content: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setFormData({...formData, tags: toggleTag(tag.id, formData.tags)})}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                formData.tags.includes(tag.id)
                  ? `${tag.color} text-white`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onSave(formData)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoDo; 