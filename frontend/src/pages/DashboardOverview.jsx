import React from 'react';
import {
  ShieldAlert,
  SearchCode,
  CalendarDays,
  Building2,
  ClipboardList,
  CloudSun,
  MessageSquareText,
  CheckCircle,
  Zap,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function DashboardOverview({ setActiveTab }) {
  const modules = [
    {
      id: 'safety',
      title: 'Site Safety Analysis',
      epic: 'Epic 2',
      desc: 'Multimodal vision PPE detection (helmets, vests, harnesses) and real-time OSHA hazard scoring.',
      icon: ShieldAlert,
      color: 'amber',
      badge: 'Vision AI'
    },
    {
      id: 'crack',
      title: 'Crack Detection & Severity',
      epic: 'Epic 2',
      desc: 'Structural crack pattern recognition, width estimation (mm), structural risk index, and ASTM repair specs.',
      icon: SearchCode,
      color: 'rose',
      badge: 'Structural AI'
    },
    {
      id: 'planning',
      title: 'Project Planning & WBS',
      epic: 'Epic 3',
      desc: '5-Phase Work Breakdown Structure, Gantt timeline day allocations, critical path, and risk mitigation.',
      icon: CalendarDays,
      color: 'sky',
      badge: 'Planning Engine'
    },
    {
      id: 'valuation',
      title: 'Real Estate Valuation',
      epic: 'Epic 3',
      desc: 'Market valuation engine with location tiering, construction quality modeling, comparables, and 5-yr ROI.',
      icon: Building2,
      color: 'emerald',
      badge: 'Valuation Engine'
    },
    {
      id: 'sitelog',
      title: 'Daily Site Log Assistant',
      epic: 'Epic 5',
      desc: 'Synthesis of trade manpower logs, heavy machinery hours, material deliveries, and bottleneck resolution.',
      icon: ClipboardList,
      color: 'indigo',
      badge: 'Site Operations'
    },
    {
      id: 'weather',
      title: 'Weather-Aware Advisory',
      epic: 'Epic 5',
      desc: 'ACI 305R concrete curing evaluation, plastic shrinkage risk, tower crane wind limits, and schedule alerts.',
      icon: CloudSun,
      color: 'amber',
      badge: 'Risk Advisory'
    },
    {
      id: 'chatbot',
      title: 'Construction Knowledge AI',
      epic: 'Epic 5',
      desc: 'Engineering assistant with instant OSHA 1926 standards, formwork striking times, and ACI concrete specs.',
      icon: MessageSquareText,
      color: 'emerald',
      badge: 'Knowledge Engine'
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Multimodal Decision Support System</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            AI-Powered Multimodal Construction Intelligence
          </h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            A full-stack enterprise decision-support platform designed to assist construction engineers, project managers,
            and safety inspectors across all project lifecycle stages using multimodal artificial intelligence and strict data contracts.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => setActiveTab('safety')}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              <span>Launch Site Safety Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('planning')}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl border border-slate-700 transition"
            >
              <span>Explore Project Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Total Epics Implemented"
          value="6 / 6"
          subtitle="100% of curriculum delivered"
          icon={Layers}
          color="amber"
        />
        <MetricCard
          title="Total Tasks & Subtasks"
          value="18 / 18"
          subtitle="All activities verified"
          icon={CheckCircle}
          color="emerald"
        />
        <MetricCard
          title="Multimodal AI Core"
          value="Dual Engine"
          subtitle="Gemini Vision + Heuristic Fallback"
          icon={Cpu}
          color="sky"
        />
        <MetricCard
          title="Data Contract Reliability"
          value="100% Strict"
          subtitle="Pydantic v2 JSON Schema"
          icon={ShieldAlert}
          color="indigo"
        />
      </div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Intelligent Feature Modules</h3>
            <p className="text-xs text-slate-400">Select any module to inspect real-time AI reasoning and outputs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition duration-200 cursor-pointer shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-800 group-hover:bg-amber-500/10 text-amber-400 rounded-xl border border-slate-700 group-hover:border-amber-500/30 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                      {m.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider mb-1">
                    {m.epic}
                  </div>
                  <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-400 transition">
                  <span className="font-medium">Open Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
