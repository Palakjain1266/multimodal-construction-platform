import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  SearchCode,
  CalendarDays,
  Building2,
  ClipboardList,
  CloudSun,
  MessageSquareText,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Platform Overview', icon: LayoutDashboard, epic: 'Overview' },
    { id: 'safety', label: 'Site Safety Analysis', icon: ShieldAlert, epic: 'Epic 2: Vision' },
    { id: 'crack', label: 'Crack Detection Logic', icon: SearchCode, epic: 'Epic 2: Vision' },
    { id: 'planning', label: 'Project Planning & WBS', icon: CalendarDays, epic: 'Epic 3: Planning' },
    { id: 'valuation', label: 'Real Estate Valuation', icon: Building2, epic: 'Epic 3: Valuation' },
    { id: 'sitelog', label: 'Daily Site Assistant', icon: ClipboardList, epic: 'Epic 5: Assistant' },
    { id: 'weather', label: 'Weather-Aware Advisory', icon: CloudSun, epic: 'Epic 5: Advisory' },
    { id: 'chatbot', label: 'Construction Knowledge AI', icon: MessageSquareText, epic: 'Epic 5: Chatbot' },
  ];

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 border-b border-slate-800">
        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Platform Completion</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100%
            </span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
          </div>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-400">
            <span>6 Epics Active</span>
            <span>18/18 Tasks Ready</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition font-medium text-xs ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md flex-shrink-0 ml-1 ${
                isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {item.epic.split(':')[0]}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-slate-400 text-[11px]">
        <div className="flex items-center justify-between">
          <span>Backend Server:</span>
          <span className="font-mono text-slate-300">127.0.0.1:8000</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Data Contract:</span>
          <span className="text-emerald-400 font-semibold">Strict JSON Schema</span>
        </div>
      </div>
    </aside>
  );
}
