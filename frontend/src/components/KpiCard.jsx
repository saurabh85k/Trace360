import React from 'react';

export default function KpiCard({ title, value, icon: Icon, color, waveColor }) {
  return (
    <div className="card relative overflow-hidden group">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{value}</h3>
        </div>
        <div 
          className="p-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>
      
      {/* Decorative Wave */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-16 opacity-20 pointer-events-none text-[var(--accent)]" 
        viewBox="0 0 260 60" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0 38 C 30 12, 60 12, 90 32 S 150 56, 180 30 S 225 18, 260 38 V 60 H 0 Z" 
          fill={waveColor || 'currentColor'} 
        />
      </svg>
    </div>
  );
}
