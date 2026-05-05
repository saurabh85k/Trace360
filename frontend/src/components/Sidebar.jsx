import React from 'react';
import { NavLink } from 'react-router-dom';
import { Truck, LogOut, X } from 'lucide-react';
import { SIDEBAR_GROUPS } from '../utils/data';
import { useAppContext } from '../context/AppContext';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)]
        flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex-shrink-0
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <Truck size={24} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight">Trace360</span>
          </div>
          <button 
            className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SIDEBAR_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <NavLink
                key={group.key}
                to={group.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all border-l-4
                  ${isActive 
                    ? 'bg-[var(--accent)] text-white font-semibold border-[var(--accent)] shadow-sm' 
                    : 'text-[var(--text-secondary)] font-medium border-transparent hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                  }
                `}
              >
                <Icon size={18} />
                {group.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User / Footer area */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--red)] transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
