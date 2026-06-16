import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('mern_todo_list');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Master React Reconciliation and Fiber architecture', completed: true, priority: 'high', category: 'Work', dueDate: '2026-06-20' },
      { id: 2, text: 'Design distributed database indexing schema', completed: false, priority: 'high', category: 'Work', dueDate: '2026-06-25' },
      { id: 3, text: 'Optimize aggregation pipeline for slow dashboards', completed: false, priority: 'medium', category: 'Work', dueDate: '2026-06-28' },
      { id: 4, text: 'Prepare system design for multi-tab OAuth token sync', completed: false, priority: 'low', category: 'Personal', dueDate: '2026-07-02' }
    ];
  });

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editCategory, setEditCategory] = useState('Work');
  const [editDueDate, setEditDueDate] = useState('');

  useEffect(() => {
    localStorage.setItem('mern_todo_list', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    };
    setTodos([newTodo, ...todos]);
    setText('');
    setPriority('medium');
    setCategory('Work');
    setDueDate('');
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    setTodos(todos.map(todo => 
      todo.id === editingId 
        ? { ...todo, text: editText.trim(), priority: editPriority, category: editCategory, dueDate: editDueDate } 
        : todo
    ));
    setEditingId(null);
  };

  const handleClearCompleted = () => {
    if (window.confirm('Delete all completed tasks?')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  const handleMarkAllComplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  // Filter & Sort logic
  const filteredTodos = todos
    .filter(todo => {
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' 
        ? true 
        : statusFilter === 'completed' 
          ? todo.completed 
          : !todo.completed;
      const matchesPriority = priorityFilter === 'all' 
        ? true 
        : todo.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return b.id - a.id; // dateAdded
    });

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <div className="brand">
          <span className="logo-icon">⚡</span>
          <div>
            <h1>TaskSphere</h1>
            <p className="subtitle">MERN Level - Advanced Task Management</p>
          </div>
        </div>
        <div className="stats-box">
          <div className="stats-info">
            <span className="stats-label">Completion Status</span>
            <span className="stats-value">{completedCount}/{totalCount} ({completionPercent}%)</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
          </div>
        </div>
      </header>

      <div className="todo-grid">
        {/* Creation Sidebar */}
        <aside className="todo-sidebar card">
          <h2>Create New Task</h2>
          <form onSubmit={handleAddTodo} className="task-form">
            <div className="form-group">
              <label>Task Description</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="high">🔥 High</option>
                  <option value="medium">⚡ Medium</option>
                  <option value="low">🌱 Low</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Work">🏢 Work</option>
                  <option value="Personal">🏡 Personal</option>
                  <option value="Shopping">🛒 Shopping</option>
                  <option value="Other">🏷️ Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Add Task</button>
          </form>
        </aside>

        {/* Task List Section */}
        <main className="todo-content">
          <div className="filters-card card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search tasks by description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <span className="control-label">Status</span>
                <div className="tabs">
                  <button 
                    className={`tab ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`tab ${statusFilter === 'active' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`tab ${statusFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <span className="control-label">Priority</span>
                <select 
                  value={priorityFilter} 
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="select-mini"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="filter-group">
                <span className="control-label">Sort By</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select-mini"
                >
                  <option value="dateAdded">Newest First</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Header */}
          <div className="bulk-actions">
            <span>Showing {filteredTodos.length} Tasks</span>
            <div className="bulk-buttons">
              <button className="btn btn-secondary btn-sm" onClick={handleMarkAllComplete} disabled={totalCount === 0}>
                ✓ Mark All Complete
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleClearCompleted} disabled={completedCount === 0}>
                🗑 Clear Completed
              </button>
            </div>
          </div>

          {/* Main Todo List */}
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state card">
                <span className="empty-icon">☕</span>
                <h3>No tasks found</h3>
                <p>Try resetting filters or adding new items to get started.</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`todo-item card ${todo.completed ? 'completed' : ''} ${todo.priority}-priority`}
                >
                  {editingId === todo.id ? (
                    <form onSubmit={handleSaveEdit} className="edit-form">
                      <input 
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)} 
                        className="edit-input"
                        autoFocus
                        required
                      />
                      <div className="edit-row">
                        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                          <option value="high">🔥 High</option>
                          <option value="medium">⚡ Medium</option>
                          <option value="low">🌱 Low</option>
                        </select>
                        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                          <option value="Work">🏢 Work</option>
                          <option value="Personal">🏡 Personal</option>
                          <option value="Shopping">🛒 Shopping</option>
                          <option value="Other">🏷️ Other</option>
                        </select>
                        <input 
                          type="date" 
                          value={editDueDate} 
                          onChange={(e) => setEditDueDate(e.target.value)} 
                        />
                      </div>
                      <div className="edit-buttons">
                        <button type="submit" className="btn btn-success btn-sm">Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="todo-checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleComplete(todo.id)}
                          id={`todo-${todo.id}`}
                        />
                        <label htmlFor={`todo-${todo.id}`} className="checkbox-custom"></label>
                      </div>

                      <div className="todo-body">
                        <p className="todo-text">{todo.text}</p>
                        <div className="todo-meta">
                          <span className={`badge badge-priority-${todo.priority}`}>{todo.priority}</span>
                          <span className="badge badge-category">{todo.category}</span>
                          <span className="due-date">📅 Due: {todo.dueDate}</span>
                        </div>
                      </div>

                      <div className="todo-actions">
                        <button 
                          className="btn-action edit" 
                          onClick={() => handleStartEdit(todo)}
                          title="Edit Task"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-action delete" 
                          onClick={() => handleDeleteTodo(todo.id)}
                          title="Delete Task"
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
