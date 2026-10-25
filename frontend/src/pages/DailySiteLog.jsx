import React, { useState } from 'react';
import {
  ClipboardList,
  Users,
  Clock,
  Truck,
  AlertCircle,
  CheckSquare,
  Sparkles,
  RefreshCw,
  Code2
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function DailySiteLog({ openJsonModal }) {
  const [formData, setFormData] = useState({
    site_name: 'Skyline Commercial Hub - Block B',
    date: '2026-10-25',
    weather_summary: 'Clear, 28°C, humidity 50%, wind 14 km/h',
    workforce: {
      masons: 14,
      rebar_fitters: 12,
      carpenters: 10,
      electricians: 6,
      plumbers: 5,
      helpers: 22
    },
    active_equipment: ['Tower Crane Potain MDT 219', '36m Concrete Boom Pump', 'Transit Mixers (3 units)', 'Scissor Lift'],
    completed_activities: [
      'Cast 65 m3 Grade C35 concrete on 5th floor transfer slab',
      'Installed MEP conduits in Sector 3 ceiling',
      'Completed plumbing hydro-test on 3rd floor riser'
    ],
    reported_delays: [
      'Morning aggregate truck delayed 45 minutes due to perimeter highway congestion'
    ],
    material_deliveries: [
      '40 MT Fe500D High-Yield Rebar',
      '180 Bags Ordinary Portland Cement',
      '200m PVC conduits'
    ]
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.analyzeSiteLog(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to process site log.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setLoading(true);
    try {
      const sample = await api.getSampleSiteLog();
      setFormData(sample);
      const data = await api.analyzeSiteLog(sample);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to load sample.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
            <span>Epic 5 : Activity 5.2</span>
            <span>•</span>
            <span>Site Operations Assistant</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Daily Site Assistant & Log Synthesis</h2>
          <p className="text-xs text-slate-400 mt-1">
            Transform multi-trade manpower, equipment utilization, and delay logs into structured executive reports and next-day action plans.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleLoadSample}
            disabled={loading}
            className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 rounded-xl transition font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load & Analyze Sample Log</span>
          </button>

          {result && (
            <button
              onClick={() => openJsonModal('Daily Site Log Data Contract', result)}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Inspect JSON</span>
            </button>
          )}
        </div>
      </div>

      {/* Inputs Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">Site Log Metadata & Operations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Project Site</label>
            <input
              type="text"
              value={formData.site_name}
              onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Weather Observation</label>
            <input
              type="text"
              value={formData.weather_summary}
              onChange={(e) => setFormData({ ...formData, weather_summary: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
            />
          </div>
        </div>

        {/* Trade counts */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Trade Workforce Allocation</label>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {Object.entries(formData.workforce).map(([trade, count]) => (
              <div key={trade} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 capitalize block truncate">{trade.replace('_', ' ')}</span>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => {
                    const newW = { ...formData.workforce, [trade]: parseInt(e.target.value) || 0 };
                    setFormData({ ...formData, workforce: newW });
                  }}
                  className="w-16 mx-auto bg-transparent text-center font-bold text-amber-400 text-sm mt-1 outline-none"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-indigo-500/20"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ClipboardList className="w-4 h-4" />}
            <span>Synthesize Daily Log & Bottlenecks</span>
          </button>
        </div>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Workforce Deployed"
              value={`${result.total_manpower} Workers`}
              subtitle="Active across all trades"
              icon={Users}
              color="sky"
            />
            <MetricCard
              title="Productivity Index"
              value={result.productivity_rating.split(' ')[0]}
              subtitle={result.productivity_rating}
              icon={Clock}
              color="emerald"
            />
            <MetricCard
              title="Bottlenecks Identified"
              value={result.critical_bottlenecks.length}
              subtitle="Operational constraints"
              icon={AlertCircle}
              color={result.critical_bottlenecks.length > 0 ? 'amber' : 'emerald'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Executive Summary & Delays */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-100 text-sm">Executive Site Progress Summary</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {result.executive_summary}
              </p>

              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">Delay Impact Analysis</h4>
                <p className="text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                  {result.delay_impact_analysis}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">Critical Bottlenecks</h4>
                <div className="space-y-2">
                  {result.critical_bottlenecks.map((b, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Plan & Safety Notes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h3 className="font-bold text-slate-100 text-sm mb-3 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  <span>Tomorrow's Priority Action Plan</span>
                </h3>
                <div className="space-y-2.5">
                  {result.tomorrow_action_plan.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-200">
                      <span className="font-bold text-emerald-400">{i + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">Safety Compliance Notes</h4>
                <div className="space-y-1.5 text-xs text-slate-400">
                  {result.safety_compliance_notes.map((note, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
