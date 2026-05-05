import React from 'react';
import { Menu, Sun, Moon, Bell, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { darkMode, toggleTheme, toggleSidebar } = useAppContext();

  return (
    <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--bg-primary)] transition-colors"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3 py-1.5 focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)] transition-all">
          <Search size={16} className="text-[var(--text-secondary)] mr-2" />
          <input 
            type="text" 
            placeholder="Search tracking ID..." 
            className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-64 placeholder:text-[var(--text-secondary)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-full hover:bg-[var(--bg-primary)] transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-secondary)]"></span>
        </button>

        <button 
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-full hover:bg-[var(--bg-primary)] transition-colors"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="w-px h-6 bg-[var(--border-color)] mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-medium text-sm">
            MH
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[var(--text-primary)]">Michael Harris</p>
            <p className="text-xs text-[var(--text-secondary)]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
