import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Percent,
  MapPin,
  Car,
  Star,
  Code2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { api } from '../services/api';

export default function PropertyValuation({ openJsonModal }) {
  const [formData, setFormData] = useState({
    property_name: 'Skyline Residences Unit 402',
    property_type: 'Residential Apartment',
    built_up_area_sqft: 1850,
    location_tier: 'Tier 1 - Prime Downtown',
    construction_quality: 'Premium',
    age_years: 2,
    parking_spaces: 2,
    amenities_rating: 4
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.calculateValuation(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to calculate valuation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Epic 3 : Activity 3.2</span>
            <span>•</span>
            <span>Real Estate Valuation Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Automated Property Valuation & Comps Engine</h2>
          <p className="text-xs text-slate-400 mt-1">
            Predict property asset valuation based on location tiering, construction material grades, comparable transactions, and projected ROI.
          </p>
        </div>

        {result && (
          <button
            onClick={() => openJsonModal('Property Valuation Data Contract', result)}
            className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-4 py-2 rounded-xl transition font-medium self-start md:self-auto"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Inspect Data Contract (JSON)</span>
          </button>
        )}
      </div>

      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-slate-100 text-sm mb-4">Property Characteristics</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-400 mb-1">Property Name / Unit</label>
            <input
              type="text"
              value={formData.property_name}
              onChange={(e) => setFormData({ ...formData, property_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Property Type</label>
            <select
              value={formData.property_type}
              onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value="Residential Apartment">Residential Apartment</option>
              <option value="Single Family Villa">Single Family Villa</option>
              <option value="Commercial Retail">Commercial Retail</option>
              <option value="Office Suite">Office Suite</option>
              <option value="Industrial Warehouse">Industrial Warehouse</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Built-Up Area (sq ft)</label>
            <input
              type="number"
              value={formData.built_up_area_sqft}
              onChange={(e) => setFormData({ ...formData, built_up_area_sqft: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Location Micro-Market Tier</label>
            <select
              value={formData.location_tier}
              onChange={(e) => setFormData({ ...formData, location_tier: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value="Tier 1 - Prime Downtown">Tier 1 - Prime Downtown</option>
              <option value="Tier 2 - Suburban Growth">Tier 2 - Suburban Growth</option>
              <option value="Tier 3 - Developing Peripheral">Tier 3 - Developing Peripheral</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Construction Material Grade</label>
            <select
              value={formData.construction_quality}
              onChange={(e) => setFormData({ ...formData, construction_quality: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
            >
              <option value="Standard">Standard ($130/sqft base)</option>
              <option value="Premium">Premium ($195/sqft base)</option>
              <option value="Luxury">Luxury ($285/sqft base)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Structure Age (Years)</label>
            <input
              type="number"
              value={formData.age_years}
              onChange={(e) => setFormData({ ...formData, age_years: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              min="0"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Covered Parking Stalls</label>
            <input
              type="number"
              value={formData.parking_spaces}
              onChange={(e) => setFormData({ ...formData, parking_spaces: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none"
              min="0"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>Amenities Rating:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, amenities_rating: star })}
                    className="p-1 text-slate-500 hover:text-amber-400 transition"
                  >
                    <Star className={`w-4 h-4 ${formData.amenities_rating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Calculate Valuation & Comps</span>
            </button>
          </div>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard
              title="Estimated Market Value"
              value={`$${result.estimated_market_value.toLocaleString()}`}
              subtitle={`Range: $${result.valuation_range_min.toLocaleString()} - $${result.valuation_range_max.toLocaleString()}`}
              icon={DollarSign}
              color="emerald"
            />
            <MetricCard
              title="Price Per Square Foot"
              value={`$${result.price_per_sqft} / sqft`}
              subtitle={`Built-up Area: ${result.built_up_area_sqft} sqft`}
              icon={TrendingUp}
              color="sky"
            />
            <MetricCard
              title="5-Year Projected Value"
              value={`$${result.projected_5yr_value.toLocaleString()}`}
              subtitle={`+${result.projected_5yr_appreciation_pct}% Annual Growth`}
              icon={Building2}
              color="amber"
            />
            <MetricCard
              title="Est. Gross Rental Yield"
              value={`${result.estimated_annual_rental_yield_pct}%`}
              subtitle="Projected annual lease return"
              icon={Percent}
              color="indigo"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cost Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-100 text-sm">Asset Valuation Decomposition</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Base Construction Cost</span>
                  <span className="font-mono text-slate-200">${result.base_construction_cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Location Tier Premium</span>
                  <span className="font-mono text-emerald-400">+${result.location_premium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Amenities & Parking Valuation</span>
                  <span className="font-mono text-emerald-400">+${result.amenities_bonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Physical Age Depreciation</span>
                  <span className="font-mono text-rose-400">-${result.depreciation_adjustment.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <span className="font-semibold text-amber-400">Market Intelligence: </span>
                  {result.market_sentiment}
                </p>
              </div>
            </div>

            {/* Comparables Table */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-slate-100 text-sm mb-4">Micro-Market Comparable Sales (Comps)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Comparable Property</th>
                      <th className="p-3">Proximity</th>
                      <th className="p-3">Area</th>
                      <th className="p-3">Recent Sale Price</th>
                      <th className="p-3">Rate / sqft</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {result.comparable_properties.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/40 transition">
                        <td className="p-3 font-medium text-slate-200">{comp.name}</td>
                        <td className="p-3 text-slate-400">{comp.distance_km} km away</td>
                        <td className="p-3 text-slate-300 font-mono">{comp.area_sqft} sqft</td>
                        <td className="p-3 text-emerald-400 font-semibold font-mono">${comp.sale_price.toLocaleString()}</td>
                        <td className="p-3 text-amber-300 font-mono">${comp.price_per_sqft}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
