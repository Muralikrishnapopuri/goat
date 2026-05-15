// ============================================================
// 🪝 TASK 3.5: useContext & Context API
// ============================================================
import { createContext, useContext, useState, useMemo } from 'react';

// ━━━ THE PROBLEM: Props Drilling ━━━
// App → Layout → Sidebar → Menu → MenuItem (needs theme)
// Every level passes theme even if it doesn't use it!

// ━━━ SOLUTION: Context API ━━━
/*
STEPS:
1. createContext()     → Create a context
2. <Context.Provider>  → Wrap tree and provide value
3. useContext(Context) → Consume value anywhere in tree
*/

// ━━━ STEP 1: Create Context ━━━
const ThemeContext = createContext('light'); // default value

// ━━━ STEP 2: Provider Component ━━━
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // ✅ Memoize value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ━━━ STEP 3: Consume with useContext ━━━
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
      }}
    >
      Current: {theme}
    </button>
  );
}

// ━━━ USAGE IN APP ━━━
function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>My App</h1>
        <ThemedButton /> {/* No props drilling! */}
      </div>
    </ThemeProvider>
  );
}

// ━━━ MULTIPLE CONTEXTS ━━━
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for cleaner consumption
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be inside AuthProvider');
  return context;
}

function Profile() {
  const { user, logout } = useAuth();
  if (!user) return <p>Not logged in</p>;
  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Full app with multiple providers:
function FullApp() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
        <Profile />
      </ThemeProvider>
    </AuthProvider>
  );
}

// ━━━ CONTEXT RE-RENDER ISSUE ━━━
/*
⚠️ PROBLEM: ALL consumers re-render when context value changes,
even if they only use part of the value.

SOLUTIONS:
1. Split contexts (ThemeContext + AuthContext, not one big AppContext)
2. useMemo the provider value
3. Use state management libs for frequent updates (Redux, Zustand)
4. React.memo on consumer components
*/

/*
🎯 INTERVIEW:
Q: "What is Context API?"
A: Built-in way to share data across component tree without props drilling.
   createContext → Provider → useContext.

Q: "When NOT to use Context?"
A: For frequently changing values (e.g., mouse position, animation frames).
   Every change re-renders ALL consumers. Use state managers instead.

Q: "How to optimize Context re-renders?"
A: 1. Split into multiple contexts
   2. useMemo the provider value
   3. React.memo on consumer components
*/

export { ThemeProvider, ThemedButton, AuthProvider, useAuth, FullApp };
