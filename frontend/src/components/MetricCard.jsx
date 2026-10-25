import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'amber' }) {
  const colorMap = {
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start justify-between">
      <div>
        <p className="text-xs text-slate-400 font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-100 mt-1 tracking-tight">{value}</h4>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.amber}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
