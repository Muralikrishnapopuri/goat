import React, { createContext, useState, useContext, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light' | 'cyberpunk'
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({
    name: 'Murali Krishna',
    role: 'Full Stack Developer',
    isLoggedIn: true
  });

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'dark') return 'light';
      if (prevTheme === 'light') return 'cyberpunk';
      return 'dark';
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        notifications,
        addNotification,
        removeNotification,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};
