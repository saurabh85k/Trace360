import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHIPMENTS_SEED, DRIVERS_ALL } from '../utils/data';

const AppContext = createContext();

// Mock Initial Locations for Agents
const INITIAL_AGENT_LOCATIONS = {
  'DRV-1001': { lat: 34.0522, lng: -118.2437 }, // LA
  'DRV-1002': { lat: 47.6062, lng: -122.3321 }, // Seattle
  'DRV-1003': { lat: 41.8781, lng: -87.6298 },  // Chicago
  'DRV-1004': { lat: 29.7604, lng: -95.3698 },  // Houston
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [shipmentsData, setShipmentsData] = useState(SHIPMENTS_SEED);
  const [driverCards, setDriverCards] = useState(DRIVERS_ALL);
  const [accentColor, setAccentColor] = useState('#3B82F6');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Real-time tracking mock state
  const [agentLocations, setAgentLocations] = useState(INITIAL_AGENT_LOCATIONS);

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

  // Simulate Live GPS Polling (moves agents slightly every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentLocations(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          // Random tiny movement
          next[id] = {
            lat: next[id].lat + (Math.random() - 0.5) * 0.005,
            lng: next[id].lng + (Math.random() - 0.5) * 0.005,
          };
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    agentLocations,
    setAgentLocations
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
