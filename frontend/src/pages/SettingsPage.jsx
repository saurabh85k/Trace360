import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function SettingsPage() {
  const { darkMode, toggleTheme } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div>
        <h1 className="text-[var(--text-primary)]">Settings</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage your account and preferences.</p>
      </div>

      <div className="card space-y-6">
        <h2 className="text-xl font-semibold border-b border-[var(--border-color)] pb-4">Appearance</h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-[var(--text-primary)]">Theme Preference</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Toggle between light and dark mode across the application.</p>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] ${darkMode ? 'bg-[var(--accent)]' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span 
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
