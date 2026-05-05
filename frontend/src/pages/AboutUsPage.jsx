import React from 'react';
import { Target, Zap, Shield, TrendingUp } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';

export default function AboutUsPage() {
  return (
    <div className="space-y-12 fade-in max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
          Revolutionizing Logistics with <span className="text-[var(--accent)]">Trace360</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          We build efficient, transparent, and scalable delivery systems. Our platform provides real-time tracking, advanced analytics, and fleet optimization for modern supply chains.
        </p>
      </div>

      {/* Mission & Highlights */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card border-l-4 border-l-[var(--accent)]">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-[var(--accent)]" size={24} />
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            To empower businesses with unparalleled visibility into their logistics operations. We believe that efficient delivery systems are the backbone of modern commerce, and we're here to make them seamless, predictable, and cost-effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="card p-4 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)]">Real-Time Tracking</h3>
            <p className="text-xs text-[var(--text-secondary)]">Millisecond precision tracking</p>
          </div>
          <div className="card p-4 flex flex-col items-center text-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)]">Performance Analytics</h3>
            <p className="text-xs text-[var(--text-secondary)]">Data-driven decisions</p>
          </div>
          <div className="card p-4 flex flex-col items-center text-center gap-2 sm:col-span-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)]">Fleet Optimization</h3>
            <p className="text-xs text-[var(--text-secondary)]">Maximize efficiency and reduce overheads</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection />
    </div>
  );
}
