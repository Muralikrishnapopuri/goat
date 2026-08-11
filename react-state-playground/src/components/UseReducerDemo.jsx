import React, { useReducer, useState } from 'react';
import { useAppState } from '../context/AppContext';

// Initial state for tasks
const initialTaskState = {
  tasks: [
    { id: 1, text: 'Review React Reconciliation (vdom & fiber)', completed: true, priority: 'high' },
    { id: 2, text: 'Master useReducer and Context API', completed: false, priority: 'medium' },
    { id: 3, text: 'Build offline-first sync features', completed: false, priority: 'low' }
  ],
  actionLog: []
};

// Reducer function
function taskReducer(state, action) {
  const timestamp = new Date().toLocaleTimeString();
  const logAction = {
    type: action.type,
    payload: action.payload,
    time: timestamp
  };

  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload.text,
            completed: false,
            priority: action.payload.priority || 'medium'
          }
        ],
        actionLog: [logAction, ...state.actionLog].slice(0, 8) // Limit to last 8 logs
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        actionLog: [logAction, ...state.actionLog].slice(0, 8)
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        actionLog: [logAction, ...state.actionLog].slice(0, 8)
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
        actionLog: [logAction, ...state.actionLog].slice(0, 8)
      };

    default:
      return state;
  }
}

export const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [activeTab, setActiveTab] = useState('demo');

  const { addNotification } = useAppState();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    dispatch({
      type: 'ADD_TASK',
      payload: { text: taskText, priority }
    });
    addNotification(`Task "${taskText.slice(0, 15)}..." added successfully`, 'info');
    setTaskText('');
  };

  return (
    <div className="state-card border-glow">
      <div className="card-header">
        <div className="badge state-badge red-badge">Reducer State</div>
        <h3>useReducer hook</h3>
        <p className="card-desc">For complex state logic involving multiple sub-values or when the next state depends on the previous one. Follows Redux pattern.</p>
      </div>

      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          Interactive Demo
        </button>
        <button 
          className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          View Code
        </button>
      </div>

      {activeTab === 'demo' ? (
        <div className="card-body">
          {/* Task Form */}
          <form onSubmit={handleAddTask} className="task-form">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter new task..."
              className="input-field"
            />
            <div className="form-row mt-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="select-field"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>

          {/* Task List */}
          <div className="task-list mt-4">
            {state.tasks.length === 0 ? (
              <p className="empty-message">No tasks found. Create one above!</p>
            ) : (
              state.tasks.map((task) => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                      className="task-checkbox"
                    />
                    <span className="task-text">{task.text}</span>
                  </div>
                  <div className="task-right">
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    <button
                      onClick={() => {
                        dispatch({ type: 'DELETE_TASK', payload: task.id });
                        addNotification('Task removed', 'warning');
                      }}
                      className="btn-delete"
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {state.tasks.some(t => t.completed) && (
            <button
              onClick={() => {
                dispatch({ type: 'CLEAR_COMPLETED' });
                addNotification('Cleared all completed tasks', 'info');
              }}
              className="btn btn-secondary btn-block mt-3"
            >
              Clear Completed Tasks
            </button>
          )}

          {/* Dispatch Action Log */}
          <div className="state-visualizer mt-4">
            <div className="visualizer-header">
              <h5>Dispatched Actions Log (Redux Style)</h5>
              <span className="tiny-info">Listens to state.actionLog</span>
            </div>
            <div className="log-container">
              {state.actionLog.length === 0 ? (
                <p className="tiny-info">No actions dispatched yet. Try adding or completing tasks.</p>
              ) : (
                state.actionLog.map((log, index) => (
                  <div key={index} className="log-item">
                    <span className="log-time">[{log.time}]</span>
                    <span className="log-type">{log.type}</span>
                    <span className="log-payload">
                      {log.payload ? JSON.stringify(log.payload) : 'none'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="code-view">
          <pre className="code-box">
{`import React, { useReducer } from 'react';

// 1. Define initial state
const initialState = { tasks: [] };

// 2. Reducer receives state & action, returns NEW state
function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload 
            ? { ...task, completed: !task.completed } 
            : task
        )
      };
    default:
      return state;
  }
}

function UseReducerComponent() {
  // 3. Initialize hook
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (text) => {
    // 4. Dispatch action object with type & payload
    dispatch({ 
      type: 'ADD_TASK', 
      payload: { id: Date.now(), text, completed: false } 
    });
  };

  return (
    <div>
      {state.tasks.map(t => (
        <p key={t.id} onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: t.id })}>
          {t.text} {t.completed ? '✅' : '❌'}
        </p>
      ))}
    </div>
  );
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
