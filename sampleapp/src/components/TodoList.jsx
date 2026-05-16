// ─────────────────────────────────────────────
// TodoList.jsx
// CONCEPT: Array state + list rendering with .map() + immutable updates
// EXECUTION FLOW:
//   1. constructor()    → state.todos = initial array of todo objects
//   2. render()         → todos.map() renders each item as JSX
//   3. [add]            → addTodo → setState with new array (spread + new item)
//   4. [toggle]         → toggleTodo → setState with mapped array (immutable update)
//   5. [delete]         → deleteTodo → setState with filtered array
//   6. componentDidUpdate → syncs count to document title
// ─────────────────────────────────────────────

import React, { Component } from 'react';

// Counter variable outside class — shared across all instances
// (not in state because it's just for generating unique IDs)
let nextId = 4;

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Array of todo objects — each has id, text, done
      todos: [
        { id: 1, text: 'Learn class components', done: true },
        { id: 2, text: 'Understand lifecycle methods', done: false },
        { id: 3, text: 'Build a project', done: false },
      ],
      inputText: '',    // controlled input value
      filter: 'all',    // 'all' | 'active' | 'done'
    };
  }

  // ── LIFECYCLE ──────────────────────────────
  componentDidMount() {
    console.log('[TodoList] Mounted with', this.state.todos.length, 'todos');
  }

  componentDidUpdate(prevProps, prevState) {
    // Update title when todo count changes
    const activeCount = this.state.todos.filter(t => !t.done).length;
    const prevActiveCount = prevState.todos.filter(t => !t.done).length;
    if (activeCount !== prevActiveCount) {
      document.title = activeCount > 0 ? `(${activeCount}) Todos` : 'All done! ✅';
    }
  }

  componentWillUnmount() {
    document.title = 'React App';
  }

  // ── CUSTOM METHODS ─────────────────────────

  // IMMUTABLE UPDATE PATTERN — React requires new array/object references
  // Never mutate state directly: this.state.todos.push(...)  ← WRONG
  // Always return a new array/object

  addTodo = () => {
    const text = this.state.inputText.trim();
    if (!text) return; // guard: ignore empty input

    const newTodo = { id: nextId++, text, done: false };

    this.setState(prevState => ({
      // Spread (...) copies all existing todos, then appends newTodo
      todos: [...prevState.todos, newTodo],
      inputText: '',  // clear input after adding
    }));
  }

  toggleTodo = (id) => {
    this.setState(prevState => ({
      // .map() returns a NEW array — does not modify the original
      todos: prevState.todos.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }  // spread + override done for matching todo
          : todo                            // return unchanged for non-matching
      )
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      // .filter() returns a NEW array excluding the deleted item
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  }

  clearDone = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.done)
    }));
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  // Submit on Enter key press
  handleKeyDown = (e) => {
    if (e.key === 'Enter') this.addTodo();
  }

  setFilter = (filter) => {
    this.setState({ filter });
  }

  // Pure method (no setState) — derives filtered list from state
  // Computed values like this don't need to be in state
  getFilteredTodos() {
    const { todos, filter } = this.state;
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'done')   return todos.filter(t => t.done);
    return todos; // 'all'
  }

  // ── RENDER ─────────────────────────────────
  render() {
    const { inputText, todos, filter } = this.state;
    const filtered = this.getFilteredTodos();
    const activeCount = todos.filter(t => !t.done).length;

    return (
      <div style={{ fontFamily: 'sans-serif', padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 380 }}>
        <h2 style={{ marginBottom: 16 }}>
          📝 Todo List
          <span style={{ fontSize: 13, fontWeight: 400, color: '#888', marginLeft: 8 }}>
            {activeCount} remaining
          </span>
        </h2>

        {/* Add todo row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            value={inputText}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Add a todo..."
            style={{ flex: 1, padding: '8px 10px', borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button onClick={this.addTodo} style={{ padding: '8px 16px' }}>Add</button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['all', 'active', 'done'].map(f => (
            // Inline arrow: () => this.setFilter(f) creates new fn per render
            // Acceptable for simple handlers that need to pass arguments
            <button
              key={f}
              onClick={() => this.setFilter(f)}
              style={{
                padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc',
                background: filter === f ? '#333' : 'transparent',
                color: filter === f ? '#fff' : '#555',
                cursor: 'pointer', textTransform: 'capitalize'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo list — .map() renders an array of JSX elements
            `key` prop is REQUIRED in lists — helps React track which items changed
            key must be unique and stable (use IDs, not array index when items move) */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filtered.map(todo => (
            <li
              key={todo.id}   // unique key per item — required!
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: '1px solid #f0f0f0'
              }}
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => this.toggleTodo(todo.id)}
              />
              <span style={{
                flex: 1, fontSize: 14,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#aaa' : '#333'
              }}>
                {todo.text}
              </span>
              <button
                onClick={() => this.deleteTodo(todo.id)}
                style={{ color: '#e44', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Conditional render with && operator */}
        {todos.some(t => t.done) && (
          <button
            onClick={this.clearDone}
            style={{ marginTop: 12, fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear completed
          </button>
        )}

        {/* Conditional: show empty state */}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: 13, marginTop: 16 }}>
            No {filter === 'all' ? '' : filter} todos
          </p>
        )}
      </div>
    );
  }
}

// Usage example:
// <TodoList />

export default TodoList;
