import React, { useState } from 'react';
import {
  CloudSun,
  Thermometer,
  Wind,
  Droplets,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Code2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function WeatherAdvisory({ openJsonModal }) {
  const [formData, setFormData] = useState({
    location: 'Metro Construction Zone - Sector 4',
    temperature_c: 37.5,
    humidity_pct: 28.0,
    precipitation_prob_pct: 10.0,
    wind_speed_kmh: 34.0,
    planned_activities: [
      'Concrete Slab Pouring',
      'Tower Crane Lifting',
      'Exterior Waterproofing & Painting',
      'Deep Trench Excavation'
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
      const data = await api.getWeatherAdvisory(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to evaluate weather advisory.');
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset) => {
    setFormData({
      ...formData,
      temperature_c: preset.temperature_c,
      humidity_pct: preset.humidity_pct,
      precipitation_prob_pct: preset.precipitation_prob_pct,
      wind_speed_kmh: preset.wind_speed_kmh,
      planned_activities: preset.planned_activities
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'GO':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'CAUTION':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'NO-GO':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <span>Epic 5 : Activity 5.3</span>
            <span>•</span>
            <span>Environmental Risk Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Weather-Aware Construction Advisory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate microclimate parameters against ACI 305R concrete curing protocols, OSHA crane wind thresholds, and trenching safety.
          </p>
        </div>

        {result && (
          <button
            onClick={() => openJsonModal('Weather Advisory Data Contract', result)}
            className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-xl transition font-medium self-start md:self-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Data Contract (JSON)</span>
          </button>
        )}
      </div>

      {/* Inputs & Quick Scenarios */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-slate-100 text-sm">Meteorological Conditions</h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Weather Scenarios:</span>
            <button
              type="button"
              onClick={() => applyPreset({ temperature_c: 39.0, humidity_pct: 22.0, precipitation_prob_pct: 5.0, wind_speed_kmh: 30.0, planned_activities: formData.planned_activities })}
              className="px-2.5 py-1 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs rounded-lg border border-amber-500/30 transition"
            >
              Heatwave (Plastic Shrinkage)
            </button>
            <button
              type="button"
              onClick={() => applyPreset({ temperature_c: 22.0, humidity_pct: 90.0, precipitation_prob_pct: 80.0, wind_speed_kmh: 46.0, planned_activities: formData.planned_activities })}
              className="px-2.5 py-1 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs rounded-lg border border-rose-500/30 transition"
            >
              Gale & Rain (Crane Alert)
            </button>
            <button
              type="button"
              onClick={() => applyPreset({ temperature_c: 24.0, humidity_pct: 55.0, precipitation_prob_pct: 5.0, wind_speed_kmh: 12.0, planned_activities: formData.planned_activities })}
              className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs rounded-lg border border-emerald-500/30 transition"
            >
              Ideal Weather (All Clear)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 flex items-center space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" />
              <span>Ambient Temp (°C)</span>
            </label>
            <input
              type="number"
              step="0.5"
              value={formData.temperature_c}
              onChange={(e) => setFormData({ ...formData, temperature_c: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 flex items-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Relative Humidity (%)</span>
            </label>
            <input
              type="number"
              value={formData.humidity_pct}
              onChange={(e) => setFormData({ ...formData, humidity_pct: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 flex items-center space-x-1">
              <CloudRain className="w-3.5 h-3.5 text-indigo-400" />
              <span>Precipitation Prob (%)</span>
            </label>
            <input
              type="number"
              value={formData.precipitation_prob_pct}
              onChange={(e) => setFormData({ ...formData, precipitation_prob_pct: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 flex items-center space-x-1">
              <Wind className="w-3.5 h-3.5 text-teal-400" />
              <span>Wind Speed (km/h)</span>
            </label>
            <input
              type="number"
              value={formData.wind_speed_kmh}
              onChange={(e) => setFormData({ ...formData, wind_speed_kmh: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Evaluate Site Environmental Risk</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Overall Site Risk"
              value={result.overall_site_risk.split('/')[0]}
              subtitle={result.overall_site_risk}
              icon={CloudSun}
              color={result.overall_site_risk.includes('Favorable') ? 'emerald' : result.overall_site_risk.includes('High') ? 'rose' : 'amber'}
            />
            <MetricCard
              title="Concrete Curing Protocol"
              value={result.concrete_curing_condition.split(' ')[0]}
              subtitle={result.concrete_curing_condition}
              icon={Droplets}
              color="sky"
            />
            <MetricCard
              title="Shrinkage Crack Hazard"
              value={result.plastic_shrinkage_risk.split(' ')[0]}
              subtitle="ACI 305R Evaporation Model"
              icon={AlertTriangle}
              color={result.plastic_shrinkage_risk.includes('High') ? 'rose' : 'emerald'}
            />
          </div>

          {/* Activity Feasibility Cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm">Activity Feasibility & Safety Go / No-Go Directives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.activities_assessment.map((act, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-200">{act.activity}</span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getStatusBadge(act.status)}`}>
                      {act.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-500">Risk Factor: </span>
                    {act.risk_factors.join('; ')}
                  </p>
                  <div className="text-[11px] text-amber-300 font-medium pt-1 border-t border-slate-800/60">
                    Rule: {act.specific_guidelines}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Alerts */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-bold text-rose-400 text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Safety Alerts</span>
              </h3>
              <div className="space-y-2">
                {result.critical_safety_alerts.map((alert, idx) => (
                  <div key={idx} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-200">
                    • {alert}
                  </div>
                ))}
              </div>
            </div>

            {/* Reschedule Recommendations */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h3 className="font-bold text-amber-400 text-sm flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Shift Schedule & Operational Recommendations</span>
              </h3>
              <div className="space-y-2">
                {result.reschedule_recommendations.map((rec, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
