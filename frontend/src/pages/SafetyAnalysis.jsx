import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Users,
  Code2,
  Sparkles
} from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function SafetyAnalysis({ openJsonModal }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.analyzeSafety(file);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze safety image.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSafetySample();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze sample image.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'moderate': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <span>Epic 2 : Activity 2.1</span>
            <span>•</span>
            <span>Vision Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Site Safety & PPE Image Analysis</h2>
          <p className="text-xs text-slate-400 mt-1">
            Multimodal detection of personal protective equipment (PPE), worker counts, and OSHA hazard compliance.
          </p>
        </div>

        {result && (
          <button
            onClick={() => openJsonModal('Safety Analysis Data Contract', result)}
            className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-xl transition font-medium self-start md:self-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Data Contract (JSON)</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploader */}
      <ImageUploader
        title="Upload Construction Site Photograph"
        subtitle="Capture workers, scaffolding, slab edges, or ground operations"
        onAnalyze={handleAnalyze}
        onSampleLoad={handleSampleLoad}
        loading={loading}
        sampleLabel="Analyze Built-in Safety Site Sample"
      />

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Site Safety Score"
              value={`${result.safety_score} / 100`}
              subtitle={`Risk Level: ${result.risk_level}`}
              icon={ShieldAlert}
              color={result.safety_score >= 80 ? 'emerald' : result.safety_score >= 65 ? 'amber' : 'rose'}
            />
            <MetricCard
              title="PPE Compliance Rate"
              value={`${result.ppe_compliance_rate}%`}
              subtitle="All monitored safety gear"
              icon={CheckCircle2}
              color={result.ppe_compliance_rate >= 80 ? 'emerald' : 'amber'}
            />
            <MetricCard
              title="Personnel Detected"
              value={result.workers_detected}
              subtitle="Active on visual frame"
              icon={Users}
              color="sky"
            />
            <MetricCard
              title="Identified Hazards"
              value={result.detected_hazards.length}
              subtitle="Requires immediate attention"
              icon={AlertTriangle}
              color={result.detected_hazards.length > 0 ? 'rose' : 'emerald'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PPE Checklist */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center justify-between">
                <span>Personal Protective Equipment (PPE) Audit</span>
                <span className="text-xs font-normal text-slate-400">
                  Engine: <span className="font-mono text-amber-400">{result.engine_mode}</span>
                </span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Safety Item</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Confidence</th>
                      <th className="p-3">Action / Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {result.ppe_checklist.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/40 transition">
                        <td className="p-3 font-medium text-slate-200">{item.name}</td>
                        <td className="p-3">
                          {item.status === 'compliant' ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md text-[11px] font-semibold border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Compliant</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md text-[11px] font-semibold border border-rose-500/20">
                              <XCircle className="w-3 h-3" />
                              <span>Missing</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-slate-400 font-mono">{(item.confidence * 100).toFixed(0)}%</td>
                        <td className="p-3 text-slate-300">
                          {item.recommendation ? (
                            <span className="text-amber-300">{item.recommendation}</span>
                          ) : (
                            <span className="text-slate-500">Verified on site</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hazards Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm mb-4">Detected Site Hazards</h3>
                {result.detected_hazards.length === 0 ? (
                  <p className="text-xs text-slate-500">No imminent hazards detected.</p>
                ) : (
                  <div className="space-y-3">
                    {result.detected_hazards.map((h, i) => (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-slate-200">{h.category}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRiskColor(h.severity)}`}>
                            {h.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{h.description}</p>
                        <div className="text-[11px] text-amber-300 font-medium pt-1">
                          Fix: {h.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* OSHA refs */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 mb-2 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Applicable OSHA 29 CFR 1926 Standards</span>
                </h4>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {result.osha_references.map((ref, idx) => (
                    <li key={idx} className="truncate">• {ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
