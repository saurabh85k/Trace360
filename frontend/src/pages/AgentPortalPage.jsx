import React, { useState } from 'react';
import { User, Key, Navigation, Power } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AgentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const { agentLocations, setAgentLocations } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    if (agentId && password) {
      setIsLoggedIn(true);
    }
  };

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const currentLocation = agentLocations[agentId] || { lat: 34.0522, lng: -118.2437 };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-12 fade-in">
        <div className="card space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Agent Portal</h1>
            <p className="text-[var(--text-secondary)] mt-1">Sign in to manage your deliveries</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-primary)]">Agent ID</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input 
                  type="text" 
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  placeholder="e.g. DRV-1001"
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-primary)]">Password</label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-[var(--accent)] text-white py-2.5 rounded-md font-medium hover:bg-blue-600 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Welcome, {agentId}</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your active route and location broadcasts.</p>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="text-[var(--text-secondary)] hover:text-[var(--red)] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Power size={16} /> Sign Out
        </button>
      </div>

      <div className="card space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
              <Navigation size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Live Location Broadcast</h2>
              <p className="text-sm text-[var(--text-secondary)]">Simulate updating GPS every 5 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulating ? 'bg-green-400' : 'bg-gray-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isSimulating ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            </span>
            <span className="text-sm font-medium text-[var(--text-primary)]">{isSimulating ? 'Broadcasting' : 'Offline'}</span>
          </div>
        </div>

        <div className="bg-[var(--bg-primary)] p-4 rounded-md border border-[var(--border-color)] flex justify-between items-center">
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-medium mb-1">Current Coordinates</p>
            <p className="font-mono text-lg text-[var(--text-primary)]">{currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}</p>
          </div>
          <button 
            onClick={toggleSimulation}
            className={`px-6 py-2.5 rounded-md font-medium text-white transition-colors ${isSimulating ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isSimulating ? 'Stop Broadcasting' : 'Start Delivery'}
          </button>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md text-sm border border-blue-200 dark:border-blue-800">
          <strong>Note:</strong> In this mockup, "Start Delivery" enables the global tracking loop, simulating background updates to the server. You can watch this marker move in the Fleet Map.
        </div>
      </div>
    </div>
  );
}
