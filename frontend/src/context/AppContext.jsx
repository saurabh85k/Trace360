import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHIPMENTS_SEED, DRIVERS_ALL } from '../utils/data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [shipmentsData, setShipmentsData] = useState(SHIPMENTS_SEED);
  const [driverCards, setDriverCards] = useState(DRIVERS_ALL);
  const [accentColor, setAccentColor] = useState('#3B82F6');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--blue', accentColor);
  }, [accentColor]);

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const value = {
    darkMode,
    toggleTheme,
    shipmentsData,
    setShipmentsData,
    driverCards,
    setDriverCards,
    accentColor,
    setAccentColor,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
