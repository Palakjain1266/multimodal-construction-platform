import React, { useState } from 'react';
import {
  CalendarDays,
  Layers,
  Flag,
  AlertTriangle,
  TrendingUp,
  HardHat,
  Code2,
  RefreshCw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function ProjectPlanner({ openJsonModal }) {
  const [formData, setFormData] = useState({
    project_name: 'Skyline Commercial Hub',
    project_type: 'Commercial High-Rise',
    total_area_sqft: 35000,
    target_duration_months: 16,
    estimated_budget: 5200000,
    floors: 5,
    soil_condition: 'Normal Cohesive Clay'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.generatePlan(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate project plan.');
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = (name, type, area, months, budget, floors, soil) => {
    setFormData({
      project_name: name,
      project_type: type,
      total_area_sqft: area,
      target_duration_months: months,
      estimated_budget: budget,
      floors: floors,
      soil_condition: soil
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <span>Epic 3 : Activity 3.1 & 4.3</span>
            <span>•</span>
            <span>Planning & WBS Logic</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Construction Project Planning Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate 5-phase Work Breakdown Structures (WBS), milestone roadmaps, critical paths, and risk mitigations.
          </p>
        </div>

        {result && (
          <button
            onClick={() => openJsonModal('Project Plan Data Contract', result)}
            className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-xl transition font-medium self-start md:self-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Data Contract (JSON)</span>
          </button>
        )}
      </div>

      {/* Input Form & Templates */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h3 className="font-bold text-slate-100 text-sm">Project Specifications</h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Quick Templates:</span>
            <button
              type="button"
              onClick={() => loadTemplate('Grand Commercial Plaza', 'Commercial', 45000, 18, 6500000, 7, 'Dense Sand')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition"
            >
              Commercial
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('Palm Grove Residential Villas', 'Residential', 22000, 12, 2800000, 2, 'Normal Cohesive')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition"
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => loadTemplate('Logistics Cold Hub', 'Industrial', 55000, 14, 4200000, 1, 'Compacted Fill')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700 transition"
            >
              Industrial
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-400 mb-1">Project Name</label>
            <input
              type="text"
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Project Classification</label>
            <select
              value={formData.project_type}
              onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value="Commercial High-Rise">Commercial High-Rise</option>
              <option value="Residential Gated Community">Residential Community</option>
              <option value="Industrial Warehouse">Industrial Warehouse</option>
              <option value="Infrastructure / Institutional">Infrastructure / Institutional</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Total Built-Up Area (sq ft)</label>
            <input
              type="number"
              value={formData.total_area_sqft}
              onChange={(e) => setFormData({ ...formData, total_area_sqft: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Target Duration (Months)</label>
            <input
              type="number"
              value={formData.target_duration_months}
              onChange={(e) => setFormData({ ...formData, target_duration_months: parseInt(e.target.value) || 1 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Estimated Budget ($ USD)</label>
            <input
              type="number"
              value={formData.estimated_budget}
              onChange={(e) => setFormData({ ...formData, estimated_budget: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Floors / Levels</label>
            <input
              type="number"
              value={formData.floors}
              onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) || 1 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Subsurface Soil Condition</label>
            <input
              type="text"
              value={formData.soil_condition}
              onChange={(e) => setFormData({ ...formData, soil_condition: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div className="md:col-span-3 lg:col-span-4 flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate 5-Phase WBS & Timeline</span>
            </button>
          </div>
        </form>
      </div>

      {/* Plan Output */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Working Days"
              value={`${result.total_estimated_days} Days`}
              subtitle={`${result.target_duration_months} Months duration`}
              icon={CalendarDays}
              color="sky"
            />
            <MetricCard
              title="Estimated Cost / sq ft"
              value={`$${result.cost_per_sqft}`}
              subtitle={`Total Budget: $${result.total_budget.toLocaleString()}`}
              icon={TrendingUp}
              color="emerald"
            />
            <MetricCard
              title="Execution Phases"
              value={`${result.phases.length} Phases`}
              subtitle="Full Work Breakdown Structure"
              icon={Layers}
              color="amber"
            />
            <MetricCard
              title="Key Milestones"
              value={result.milestones.length}
              subtitle="Statutory QA checkpoints"
              icon={Flag}
              color="indigo"
            />
          </div>

          {/* 5-Phase Work Breakdown Structure */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
              <span>5-Phase Work Breakdown Structure (WBS) & Task Schedule</span>
              <span className="text-xs text-slate-400 font-normal">Gantt Day Allocations</span>
            </h3>

            <div className="space-y-4">
              {result.phases.map((phase) => (
                <div key={phase.phase_number} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                        {phase.phase_number}
                      </span>
                      <h4 className="font-semibold text-slate-100 text-xs">{phase.name}</h4>
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-slate-400">Day {phase.start_day} - {phase.end_day} ({phase.duration_days} days)</span>
                      <span className="text-emerald-400 font-semibold">${phase.budget_allocated.toLocaleString()} ({phase.percentage_of_budget}%)</span>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {phase.tasks.map((task) => (
                      <div key={task.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-400">
                          <span className="font-mono text-amber-400 font-semibold">{task.id}</span>
                          <span>{task.duration_days} days</span>
                        </div>
                        <p className="font-medium text-slate-200">{task.title}</p>
                        <p className="text-[11px] text-slate-400 pt-1">Deliverable: {task.deliverable}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Path & Milestones */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-3 flex items-center space-x-2">
                  <Flag className="w-4 h-4 text-amber-400" />
                  <span>Quality Sign-off Milestones</span>
                </h4>
                <div className="space-y-2.5">
                  {result.milestones.map((m, i) => (
                    <div key={i} className="flex items-start justify-between text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="font-semibold text-slate-200">{m.name}</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">Inspection: {m.inspection_required}</p>
                      </div>
                      <span className="font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]">
                        Day {m.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-bold text-slate-100 text-sm mb-3 text-rose-400 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Critical Path Activities (Zero Float)</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {result.critical_path.map((cp, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Mitigation & Resources */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Risk Assessment & Mitigation Matrix</span>
                </h4>
                <div className="space-y-2.5">
                  {result.risk_mitigation.map((r, i) => (
                    <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-200">{r.risk}</span>
                        <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                          {r.impact} Impact
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">Strategy: {r.mitigation_strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="font-bold text-slate-100 text-sm mb-3 flex items-center space-x-2">
                  <HardHat className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Peak Resource Allocation</span>
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(result.resource_allocation).map(([k, v], idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">{k}</span>
                      <span className="font-semibold text-slate-200">{v}</span>
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
