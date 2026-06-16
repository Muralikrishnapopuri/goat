import { useState, useEffect } from 'react';
import './App.css';

const COLUMNS = [
  { id: 'todo', title: '📋 To Do' },
  { id: 'in_progress', title: '⚡ In Progress' },
  { id: 'review', title: '🔍 Code Review' },
  { id: 'done', title: '✅ Completed' }
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('mern_kanban_board');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Implement custom useDebounce hooks', columnId: 'todo', priority: 'high' },
      { id: '2', title: 'Optimize express aggregation queries', columnId: 'in_progress', priority: 'high' },
      { id: '3', title: 'Integrate protected route redirection', columnId: 'review', priority: 'medium' },
      { id: '4', title: 'Design Star Rating reusable widget', columnId: 'done', priority: 'low' }
    ];
  });

  const [titleInput, setTitleInput] = useState('');
  const [priorityInput, setPriorityInput] = useState('medium');

  useEffect(() => {
    localStorage.setItem('mern_kanban_board', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      columnId: 'todo',
      priority: priorityInput
    };

    setTasks([...tasks, newTask]);
    setTitleInput('');
    setPriorityInput('medium');
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Delete this task card?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Drag & Drop native HTML handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to enable drop event callback
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      moveTask(taskId, targetColumnId);
    }
  };

  // Move task to a specific column (drag or click based fallback)
  const moveTask = (taskId, targetColumnId) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, columnId: targetColumnId } : t
    ));
  };

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <div className="brand">
          <span className="logo-icon">📊</span>
          <div>
            <h1>KanbanForge</h1>
            <p className="subtitle">MERN Level - Drag & Drop Task Board with Column Status Managers</p>
          </div>
        </div>
      </header>

      {/* Creation form */}
      <div className="creation-section card">
        <form onSubmit={handleCreateTask} className="task-creation-form">
          <input
            type="text"
            placeholder="Describe your task (e.g. Build OTP input container)..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            required
          />
          <select value={priorityInput} onChange={(e) => setPriorityInput(e.target.value)}>
            <option value="high">🔥 High</option>
            <option value="medium">⚡ Medium</option>
            <option value="low">🌱 Low</option>
          </select>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
      </div>

      {/* Kanban Grid */}
      <div className="kanban-grid">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.columnId === col.id);
          return (
            <div 
              key={col.id} 
              className="kanban-column card"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="column-header">
                <h3>{col.title}</h3>
                <span className="task-count">{colTasks.length}</span>
              </div>

              <div className="cards-stack">
                {colTasks.length === 0 ? (
                  <div className="empty-column-placeholder">Drag cards here</div>
                ) : (
                  colTasks.map(task => (
                    <div
                      key={task.id}
                      className={`task-card ${task.priority}-priority`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <div className="card-top-row">
                        <span className={`badge-priority badge-${task.priority}`}>{task.priority}</span>
                        <button className="card-delete-btn" onClick={() => handleDeleteTask(task.id)}>×</button>
                      </div>
                      <p className="task-title">{task.title}</p>
                      
                      {/* Interactive mover for mobile / no-drag accessibility */}
                      <div className="card-mover-controls">
                        {col.id !== 'todo' && (
                          <button 
                            className="move-btn" 
                            title="Move Left"
                            onClick={() => {
                              const colIndex = COLUMNS.findIndex(c => c.id === col.id);
                              moveTask(task.id, COLUMNS[colIndex - 1].id);
                            }}
                          >
                            ◀
                          </button>
                        )}
                        <span className="drag-handle-indicator">⋮⋮</span>
                        {col.id !== 'done' && (
                          <button 
                            className="move-btn" 
                            title="Move Right"
                            onClick={() => {
                              const colIndex = COLUMNS.findIndex(c => c.id === col.id);
                              moveTask(task.id, COLUMNS[colIndex + 1].id);
                            }}
                          >
                            ▶
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
