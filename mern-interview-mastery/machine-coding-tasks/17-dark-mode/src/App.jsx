import { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

// 1. Create Theme Context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage
    const saved = localStorage.getItem('mern_color_theme');
    if (saved) return saved;
    // Check system preference default
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPref ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('mern_color_theme', theme);
    // Apply class to body element for global styling hooks
    const body = document.body;
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to consume context
export function useTheme() {
  return useContext(ThemeContext);
}

// Inner App representation consuming theme context variables
function ThemeApp() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`theme-page-wrapper ${theme}-mode`}>
      <header className="theme-page-header">
        <div className="brand">
          <span className="logo-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
          <div>
            <h1>ThemeShifter</h1>
            <p className="subtitle">MERN Level - React Context Providers, LocalStorage Caching & Dynamic Class Hooks</p>
          </div>
        </div>
        
        {/* Toggle Switch */}
        <div className="theme-toggle-row">
          <span className="theme-indicator-text">{theme.toUpperCase()} MODE ACTIVE</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </header>

      {/* Grid of cards demonstrating theme mutations */}
      <div className="theme-grid">
        <div className="demo-card card">
          <h3>Interface Element A</h3>
          <p>This panel uses CSS custom variables to automatically invert foreground text and card background layers when the wrapper class shifts.</p>
          <span className="badge">System Node</span>
        </div>

        <div className="demo-card card">
          <h3>Interface Element B</h3>
          <p>Buttons and status badges dynamically transition their gradient intensities to guarantee strong contrast ratios in both light and dark modes.</p>
          <span className="badge">Control Node</span>
        </div>
      </div>
    </div>
  );
}

// Root component exporting ThemeProvider wrapper
function App() {
  return (
    <ThemeProvider>
      <ThemeApp />
    </ThemeProvider>
  );
}

export default App;
