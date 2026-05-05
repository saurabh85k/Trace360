import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { STATUS_META } from '../utils/data';
import { useAppContext } from '../context/AppContext';

export default function ShipmentsPage() {
  const { shipmentsData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredData = shipmentsData.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || shipment.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-primary)]">Shipments</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage and track all ongoing and past shipments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search by ID or recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md pl-9 pr-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
          <div className="flex bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md overflow-hidden">
            {['All', 'In Transit', 'Delivered', 'Delayed'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${filter === f ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Status</th>
                <th className="p-4">ETA</th>
                <th className="p-4">Driver</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[var(--border-color)]">
              {filteredData.length > 0 ? (
                filteredData.map((shipment) => {
                  const statusInfo = STATUS_META[shipment.status];
                  return (
                    <tr key={shipment.id} className="hover:bg-[var(--bg-primary)] transition-colors">
                      <td className="p-4 font-medium text-[var(--text-primary)]">{shipment.id}</td>
                      <td className="p-4 text-[var(--text-primary)]">{shipment.recipient}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{shipment.dest}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo?.tailwind || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-4 text-[var(--text-secondary)]">{shipment.eta}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{shipment.driver}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[var(--text-secondary)]">
                    No shipments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
