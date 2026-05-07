import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { darkMode, toggleTheme, toggleSidebar } = useAppContext();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };
  
  const username = auth?.username || 'Guest';
  const role = auth?.role || 'Visitor';
  const initial = username.charAt(0).toUpperCase();

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

        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-medium text-sm">
              {initial}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{username}</p>
              <p className="text-xs text-[var(--text-secondary)] capitalize">{role.replace('_', ' ')}</p>
            </div>
            <ChevronDown size={16} className={`text-[var(--text-secondary)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-[var(--border-color)]">
                <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{username}</p>
                <p className="text-xs text-[var(--text-secondary)] capitalize truncate">{auth?.email || role.replace('_', ' ')}</p>
              </div>
              
              <button 
                className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] flex items-center gap-2 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <User size={16} className="text-[var(--text-secondary)]" />
                My Profile
              </button>
              
              <button 
                className="w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-primary)] flex items-center gap-2 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={16} className="text-[var(--text-secondary)]" />
                Account Settings
              </button>
              
              <div className="border-t border-[var(--border-color)] mt-1 pt-1">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[var(--bg-primary)] flex items-center gap-2 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
