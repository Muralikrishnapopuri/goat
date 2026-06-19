// ─────────────────────────────────────────────
// App.jsx — root component
// Imports all class component examples and renders them in a grid
// Drop this into src/App.jsx in your Vite React project
// ─────────────────────────────────────────────

import React, { Component } from 'react';
import Counter     from './components/Counter';
import Timer       from './components/Timer';
import FetchUser   from './components/FetchUser';
import LoginForm   from './components/LoginForm';
import TodoList    from './components/TodoList';
import AccordionDemo from './components/Accordion';
import ThemeToggle from './components/ThemeToggle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'counter',
    };
  }

  render() {
    const tabs = [
      { id: 'counter',   label: '🔢 Counter',   desc: 'state · setState · bind' },
      { id: 'timer',     label: '⏱ Timer',      desc: 'interval · cleanup' },
      { id: 'fetch',     label: '🌐 FetchUser',  desc: 'API · loading · error' },
      { id: 'form',      label: '📝 LoginForm',  desc: 'controlled inputs · validate' },
      { id: 'todo',      label: '✅ TodoList',   desc: 'array state · map · filter' },
      { id: 'accordion', label: '📂 Accordion',  desc: 'children · exclusive panels' },
      { id: 'theme',     label: '🎨 Theme',      desc: 'shouldUpdate · ErrorBoundary' },
    ];

    const { activeTab } = this.state;

    return (
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
        <header style={{ background: '#1a1a2e', color: '#fff', padding: '20px 32px' }}>
          <h1 style={{ margin: 0, fontSize: 22 }}>React Class Components — Practice Lab</h1>
          <p style={{ margin: '6px 0 0', fontSize: 13, opacity: 0.6 }}>Each tab = one pattern. Read the comments in each file.</p>
        </header>

        {/* Tab bar */}
        <nav style={{ background: '#fff', borderBottom: '1px solid #ddd', padding: '0 32px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => this.setState({ activeTab: tab.id })}
              style={{
                padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #333' : '2px solid transparent',
                fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? '#333' : '#777',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
              <span style={{ display: 'block', fontSize: 10, color: '#aaa', fontWeight: 400 }}>{tab.desc}</span>
            </button>
          ))}
        </nav>

        {/* Active component panel */}
        <main style={{ padding: 32, display: 'flex', justifyContent: 'center' }}>
          {activeTab === 'counter'   && <Counter label="Score" step={1} />}
          {activeTab === 'timer'     && <Timer label="Stopwatch" autoStart={false} />}
          {activeTab === 'fetch'     && <FetchUser userId={1} />}
          {activeTab === 'form'      && <LoginForm onSuccess={(email) => alert(`Welcome, ${email}!`)} />}
          {activeTab === 'todo'      && <TodoList />}
          {activeTab === 'accordion' && <AccordionDemo />}
          {activeTab === 'theme'     && <ThemeToggle />}
        </main>
      </div>
    );
  }
}

export default App;
