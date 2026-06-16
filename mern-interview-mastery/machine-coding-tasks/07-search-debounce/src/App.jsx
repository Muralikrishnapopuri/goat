import { useState, useEffect } from 'react';
import './App.css';

// Generating dataset of 40 technical terms for MERN experts
const DATASET = [
  { id: 1, title: 'Virtual DOM & Diffing Algorithm', category: 'React', description: 'React matches Virtual DOM changes to real DOM node elements with reconciliation heuristics.' },
  { id: 2, title: 'Reconciliation & React Fiber Engine', category: 'React', description: 'Incremental rendering engine introduced in React 16 to split work chunks.' },
  { id: 3, title: 'useState & Functional Closures', category: 'React', description: 'State hook retaining variable instances through render cycle execution scopes.' },
  { id: 4, title: 'useEffect Cleanup Cycles', category: 'React', description: 'Clearing asynchronous timers, event listeners, and abort controllers on dependency triggers.' },
  { id: 5, title: 'NodeJS V8 Engine Architecture', category: 'NodeJS', description: 'Chrome JS compilation wrapper written in C++ matching dynamic call stack runtimes.' },
  { id: 6, title: 'Event Loop & libuv Event Phases', category: 'NodeJS', description: 'Timers, pending callbacks, idle poll, check, close stages handling asynchronous I/O.' },
  { id: 7, title: 'EventEmitter & Event Streams', category: 'NodeJS', description: 'Publish-subscribe design pattern emitting payloads through socket buffers.' },
  { id: 8, title: 'MongoDB Compound Index Rules', category: 'MongoDB', description: 'Designing compound indexes matching equality, sort, and range patterns.' },
  { id: 9, title: 'Aggregation Pipeline stages', category: 'MongoDB', description: '$match, $group, $sort, $lookup, $unwind stages transforming document nodes.' },
  { id: 10, title: 'JWT Refresh Token Rotation', category: 'Security', description: 'Issuing fresh access tokens and replacing cookie credentials for advanced session protection.' },
  { id: 11, title: 'Axios Response Interceptors', category: 'Networking', description: 'Catching 401 response errors to fetch tokens and retry failed requests.' },
  { id: 12, title: 'CORS Preflight OPTIONS requests', category: 'Security', description: 'Access control header pre-checks handled automatically by browser runtimes.' }
];

function App() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('mern_search_history');
    return saved ? JSON.parse(saved) : ['React Fiber', 'Aggregation', 'JWT'];
  });

  // Debouncing custom logic in useEffect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400); // 400ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Handle mock API fetch when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Simulate database lookup delay
    const apiTimer = setTimeout(() => {
      const match = DATASET.filter(item => 
        item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(match);
      setLoading(false);

      // Add to search history if not duplicate
      if (debouncedQuery.trim().length > 2 && !searchHistory.includes(debouncedQuery)) {
        const updatedHistory = [debouncedQuery, ...searchHistory.slice(0, 4)];
        setSearchHistory(updatedHistory);
        localStorage.setItem('mern_search_history', JSON.stringify(updatedHistory));
      }
    }, 600); // 600ms API response lag

    return () => clearTimeout(apiTimer);
  }, [debouncedQuery]);

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('mern_search_history');
  };

  // Helper to highlight search matches
  const highlightMatch = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="search-highlight">{part}</mark>
          ) : part
        )}
      </span>
    );
  };

  return (
    <div className="search-container">
      <header className="search-header">
        <div className="brand">
          <span className="logo-icon">🔍</span>
          <div>
            <h1>QueryDebounce</h1>
            <p className="subtitle">MERN Level - Search Debouncing, Regex Highlighting & Performance Cache</p>
          </div>
        </div>
      </header>

      <div className="search-grid">
        {/* Left pane: search controllers */}
        <aside className="search-sidebar card">
          <h2>Search Console</h2>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search concepts (e.g. React, Event, JWT)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && <button className="clear-btn" onClick={() => setQuery('')}>×</button>}
          </div>

          <div className="status-indicators">
            <div className="indicator-row">
              <span>Input value:</span>
              <code className="text-light">{query || '""'}</code>
            </div>
            <div className="indicator-row">
              <span>Debounced (400ms):</span>
              <code className="accent-val">{debouncedQuery || '""'}</code>
            </div>
          </div>

          {searchHistory.length > 0 && (
            <div className="search-history-box">
              <div className="history-header">
                <h3>Recent Queries</h3>
                <button className="clear-history-btn" onClick={clearHistory}>Clear</button>
              </div>
              <div className="history-tags">
                {searchHistory.map((h, idx) => (
                  <button key={idx} className="history-tag" onClick={() => setQuery(h)}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right pane: search results */}
        <main className="search-content">
          <div className="results-header">
            <h2>Search Results</h2>
            {loading && <span className="api-spinner">Fetching from server...</span>}
          </div>

          <div className="results-list">
            {!debouncedQuery.trim() ? (
              <div className="empty-results card">
                <span className="state-icon">⌨️</span>
                <h3>Start typing to query database</h3>
                <p>Results will update automatically 400ms after you stop typing.</p>
              </div>
            ) : loading ? (
              <div className="skeleton-loader card">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
              </div>
            ) : results.length === 0 ? (
              <div className="empty-results card">
                <span className="state-icon">📭</span>
                <h3>No results match "{debouncedQuery}"</h3>
                <p>Try searching different terms like 'Fiber', 'stage', or 'Engine'.</p>
              </div>
            ) : (
              results.map(item => (
                <div key={item.id} className="result-item card">
                  <div className="result-meta">
                    <span className="badge-cat">{item.category}</span>
                    <span className="id-code">ID: {item.id}</span>
                  </div>
                  <h3>{highlightMatch(item.title, debouncedQuery)}</h3>
                  <p>{highlightMatch(item.description, debouncedQuery)}</p>
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
