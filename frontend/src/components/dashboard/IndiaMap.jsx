import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MOCK_STATE_DATA } from '../../data/mockData';
import { formatINR } from '../../utils/formatters';
import { MapPin, ShieldAlert, TrendingUp, Info } from 'lucide-react';

/**
 * IndiaMap Component
 * Interactive SVG / Geo-grid state-wise fund utilization and anomaly risk heatmap.
 */
export const IndiaMap = ({ onSelectState, selectedStateId }) => {
  const [activeMetric, setActiveMetric] = useState('utilization'); // 'utilization' | 'risk'
  const [hoveredState, setHoveredState] = useState(null);

  // Find hovered or selected state details
  const activeStateData = hoveredState || MOCK_STATE_DATA.find((s) => s.id === selectedStateId) || MOCK_STATE_DATA[0];

  const getColor = (state) => {
    if (activeMetric === 'utilization') {
      const rate = state.utilizationRate;
      if (rate >= 90) return '#046A38'; // Dark Emerald
      if (rate >= 80) return '#10B981'; // Green
      if (rate >= 75) return '#F59E0B'; // Amber
      return '#EF4444'; // Red
    } else {
      const score = state.riskScore;
      if (score >= 75) return '#EF4444'; // High Risk
      if (score >= 45) return '#F59E0B'; // Moderate
      return '#10B981'; // Low Risk
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-gov">
      {/* Header and Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>Pan-India Geographic Heatmap & State Drilldown</span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
            Real-time monitoring across 28 States & 8 UTs (Interactive Geo-Matrix)
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            type="button"
            onClick={() => setActiveMetric('utilization')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeMetric === 'utilization'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Fund Utilization %
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('risk')}
            className={`px-3 py-1 rounded-md font-semibold transition-all ${
              activeMetric === 'risk'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Anomaly Risk Index
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Interactive Grid / Heatmap Matrix */}
        <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 mb-3 px-1">
            <span>Select any State to filter regional dashboards:</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 85%+ / Low Risk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 75-84% / Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> &lt;75% / High Anomaly
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {MOCK_STATE_DATA.map((state) => {
              const isSelected = (selectedStateId === state.id) || (hoveredState?.id === state.id);
              const color = getColor(state);

              return (
                <div
                  key={state.id}
                  onMouseEnter={() => setHoveredState(state)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => onSelectState && onSelectState(state)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-150 relative overflow-hidden ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-md ring-2 ring-blue-400/30'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{ backgroundColor: color }}
                  />

                  <div className="pl-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                        {state.name}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {state.code}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-baseline justify-between text-xs">
                      {activeMetric === 'utilization' ? (
                        <>
                          <span className="text-[11px] text-slate-700 dark:text-slate-300">Utilized:</span>
                          <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                            {state.utilizationRate}%
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-[11px] text-slate-700 dark:text-slate-300">Risk Score:</span>
                          <span className="font-bold font-mono text-red-600 dark:text-red-400">
                            {state.riskScore}/100
                          </span>
                        </>
                      )}
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-1">
                      <span>{state.activeWorks} Works</span>
                      <span className="text-red-600 font-semibold">{state.highAnomalies} Flagged</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* State Detail Inspector Card */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-orange-400 font-bold">
                  State Focus Drilldown
                </span>
                <h4 className="text-xl font-bold font-display text-white">
                  {activeStateData.name}
                </h4>
              </div>
              <span className="px-2 py-1 rounded bg-slate-800 text-xs font-mono font-bold text-blue-300 border border-slate-700">
                Code: {activeStateData.code}
              </span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex flex-col gap-1.5 pb-2 border-b border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    Total Sanctioned Fund
                  </span>
                  <span className="font-mono font-bold text-white text-sm">
                    ₹{activeStateData.totalFunds} Cr
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pb-2 border-b border-slate-800/80">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    Expended So Far
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ₹{activeStateData.utilizedFunds} Cr
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1">
                  <div 
                    className={`h-1.5 rounded-full ${activeStateData.utilizationRate >= 80 ? 'bg-emerald-500' : activeStateData.utilizationRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                    style={{ width: `${activeStateData.utilizationRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Utilization Rate</span>
                  <span className="font-mono font-bold">{activeStateData.utilizationRate}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  Active GovFund Tracer Projects
                </span>
                <span className="font-mono font-bold text-white text-sm bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                  {activeStateData.activeWorks.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  High Risk Flagged Works
                </span>
                <span className="font-mono font-bold text-red-400 text-sm flex items-center gap-1">
                  {activeStateData.highAnomalies}
                  <span className="text-[10px] text-slate-500 font-sans">works</span>
                </span>
              </div>
              
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    Composite ML Risk Index
                  </span>
                  <span className={`font-mono font-bold text-sm px-2 py-0.5 rounded-md ${
                    activeStateData.riskScore >= 75 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                    activeStateData.riskScore >= 45 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {activeStateData.riskScore} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full ${
                      activeStateData.riskScore >= 75 ? 'bg-red-500' : 
                      activeStateData.riskScore >= 45 ? 'bg-amber-500' : 
                      'bg-emerald-500'
                    }`} 
                    style={{ width: `${activeStateData.riskScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => onSelectState && onSelectState(activeStateData)}
              className="w-full py-2 rounded-lg bg-gov-blue hover:bg-blue-600 text-white text-xs font-semibold shadow-md transition-all text-center"
            >
              Filter Entire Dashboard by {activeStateData.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

IndiaMap.propTypes = {
  onSelectState: PropTypes.func,
  selectedStateId: PropTypes.string,
};

export default IndiaMap;
