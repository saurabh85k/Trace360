import React from 'react';

export default function FleetMapPage() {
  return (
    <div className="fade-in flex flex-col items-center justify-center h-full min-h-[60vh]">
      <div className="w-24 h-24 mb-6 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--accent)] shadow-md">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Fleet Map Tracker</h1>
      <p className="text-[var(--text-secondary)] max-w-md text-center">
        Live geographic visualization of all active fleet units. This premium feature is currently being upgraded for production release.
      </p>
    </div>
  );
}
