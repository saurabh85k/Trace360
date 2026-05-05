import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Download, Printer } from 'lucide-react';
import { REPORT_KPIS, REPORT_PERIODS, DRIVER_PERFORMANCE_ROWS } from '../utils/data';

export default function ReportsPage() {
  const [period, setPeriod] = useState('30 Days');
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    const element = reportRef.current;
    
    // Temporarily apply styles for PDF layout if needed
    const opt = {
      margin: 10,
      filename: `trace360-report-${period.replace(' ', '-').toLowerCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-primary)]">Performance Reports</h1>
          <p className="text-[var(--text-secondary)] mt-1">Export and analyze your fleet's delivery metrics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {REPORT_PERIODS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button 
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isExporting ? <Printer size={16} className="animate-pulse" /> : <Download size={16} />}
            {isExporting ? 'Generating PDF...' : 'Download Report'}
          </button>
        </div>
      </div>

      {/* Printable Report Container */}
      <div 
        ref={reportRef} 
        className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 shadow-sm"
      >
        <div className="mb-8 border-b border-[var(--border-color)] pb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Trace360 Analytics</h2>
            <p className="text-[var(--text-secondary)] mt-1">Period: {period}</p>
          </div>
          <div className="text-right text-sm text-[var(--text-secondary)]">
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* KPIs Grid */}
        <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Key Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {REPORT_KPIS[period].map((kpi, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-secondary)] mb-1">{kpi.label}</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
              <div className="mt-2 flex items-center gap-1 text-xs">
                <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {kpi.trend === 'up' ? '↑' : '↓'}
                </span>
                <span className="text-[var(--text-secondary)]">{kpi.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Driver Performance</h3>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-primary)] text-[var(--text-secondary)] text-sm border-b border-[var(--border-color)]">
                <th className="p-3 font-medium">Rank</th>
                <th className="p-3 font-medium">Driver</th>
                <th className="p-3 font-medium text-right">Deliveries</th>
                <th className="p-3 font-medium text-right">On-Time %</th>
                <th className="p-3 font-medium text-right">Avg Time</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {DRIVER_PERFORMANCE_ROWS[period].map((row, idx) => (
                <tr key={idx} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--bg-primary)] transition-colors">
                  <td className="p-3 font-medium text-[var(--text-primary)]">#{row.rank}</td>
                  <td className="p-3 text-[var(--text-primary)]">{row.driver}</td>
                  <td className="p-3 text-right text-[var(--text-primary)]">{row.deliveries}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.onTime >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {row.onTime}%
                    </span>
                  </td>
                  <td className="p-3 text-right text-[var(--text-secondary)]">{row.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 pt-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
          <p>Confidential Analytics Report - Trace360 Dashboard</p>
        </div>
      </div>
    </div>
  );
}
