import React, { useState } from 'react';
import {
  SearchCode,
  AlertOctagon,
  Wrench,
  Clock,
  DollarSign,
  Activity,
  Code2,
  XCircle,
  FileCheck
} from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function CrackInspection({ openJsonModal }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.detectCrack(file);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze crack.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCrackSample();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze sample crack.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (sev) => {
    switch (sev?.toLowerCase()) {
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
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            <span>Epic 2 : Activity 2.2</span>
            <span>•</span>
            <span>Forensic Structural AI</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Structural Crack Detection & Analysis</h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated crack pattern classification, width measurement, structural integrity risk index, and repair protocols.
          </p>
        </div>

        {result && (
          <button
            onClick={() => openJsonModal('Crack Inspection Data Contract', result)}
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
        title="Upload Concrete, Slab, or Beam Photograph"
        subtitle="Capture concrete surface, beam junctions, shear walls, or masonry joints"
        onAnalyze={handleAnalyze}
        onSampleLoad={handleSampleLoad}
        loading={loading}
        sampleLabel="Analyze Built-in Concrete Crack Sample"
      />

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Estimated Crack Width"
              value={`${result.estimated_width_mm} mm`}
              subtitle="Forensic edge calibration"
              icon={SearchCode}
              color={result.estimated_width_mm > 2.0 ? 'rose' : 'amber'}
            />
            <MetricCard
              title="Structural Risk Score"
              value={`${result.structural_risk_score} / 100`}
              subtitle={`Severity: ${result.severity}`}
              icon={AlertOctagon}
              color={result.structural_risk_score > 70 ? 'rose' : result.structural_risk_score > 40 ? 'amber' : 'emerald'}
            />
            <MetricCard
              title="Action Timeframe"
              value={result.urgency_timeframe.split(' ')[0]}
              subtitle={result.urgency_timeframe}
              icon={Clock}
              color="sky"
            />
            <MetricCard
              title="Estimated Repair Cost"
              value={result.estimated_repair_cost_range}
              subtitle="Material & labor estimate"
              icon={DollarSign}
              color="emerald"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Diagnosis & Classification */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">Classified Crack Topology</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getSeverityBadge(result.severity)}`}>
                    {result.severity} Risk
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-100">{result.crack_type}</h3>
                <p className="text-xs text-slate-300 mt-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                  <span className="font-semibold text-amber-400">Integrity Risk Assessment: </span>
                  {result.structural_integrity_risk}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">Probable Engineering Causes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {result.probable_causes.map((cause, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Recommended Remediation & Repair Methodologies</span>
                </h4>
                <div className="space-y-2">
                  {result.recommended_repair_methods.map((method, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200 bg-slate-850 p-3 rounded-xl border border-slate-700/60">
                      <span className="font-bold text-amber-400">{idx + 1}.</span>
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bill of Materials & Specifications */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm mb-4 flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Required Repair Materials & Consumables</span>
                </h3>
                <div className="space-y-2.5">
                  {result.required_materials.map((mat, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
                      • {mat}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Engine Diagnostic:</span>
                  <span className="font-mono text-amber-400">{result.engine_mode}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Analysis Timestamp:</span>
                  <span className="text-slate-300">{result.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
