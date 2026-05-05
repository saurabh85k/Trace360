import React, { useState } from 'react';
import { KPI_CARDS, DELIVERY_PERFORMANCE_DATA, DELIVERY_RANGES, STATUS_PIE_DATA } from '../utils/data';
import KpiCard from '../components/KpiCard';
import ReviewSection from '../components/ReviewSection';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [deliveryRange, setDeliveryRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-[var(--text-primary)]">Overview Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Welcome back! Here's what's happening with your fleet today.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <KpiCard 
            key={card.key}
            title={card.label}
            value={card.value}
            icon={card.icon}
            color={card.color}
            waveColor={card.wave}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="card lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Delivery Performance</h2>
            <select 
              value={deliveryRange}
              onChange={(e) => setDeliveryRange(e.target.value)}
              className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {DELIVERY_RANGES.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DELIVERY_PERFORMANCE_DATA[deliveryRange]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="delivered" name="Delivered" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="delayed" name="Delayed" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: '#EF4444' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Status Distribution</h2>
          </div>
          <div className="h-64 w-full relative flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {STATUS_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-bold text-[var(--text-primary)]">1,250</span>
                <span className="block text-xs text-[var(--text-secondary)]">Total</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
             {STATUS_PIE_DATA.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-[var(--text-secondary)]">{item.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      <ReviewSection />
    </div>
  );
}
