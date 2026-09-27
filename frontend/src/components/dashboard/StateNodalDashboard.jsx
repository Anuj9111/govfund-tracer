import React, { useState } from 'react';
import { MOCK_STATE_DATA } from '../../data/mockData';
import { MapPin, Building, Activity, AlertCircle, IndianRupee } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export const StateNodalDashboard = ({ currentUser, works, alerts }) => {
  const [districtFilter, setDistrictFilter] = useState('');
  
  // Get all unique districts from works belonging to this state
  const stateDistricts = Array.from(new Set(works.filter(w => w.state === currentUser.state).map(w => w.district))).filter(Boolean);
  
  const selectedStateStr = currentUser.state;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-gov">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              State Authority Dashboard
            </h3>
            <p className="text-xs text-slate-500 mt-1">Monitoring all districts in {selectedStateStr}</p>
          </div>
          
          {/* STATE FILTER (Fixed for State Authority) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500">State Filter</label>
            <select 
              disabled 
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold opacity-80 cursor-not-allowed"
              value={selectedStateStr}
            >
              <option value={selectedStateStr}>{selectedStateStr}</option>
            </select>
          </div>
          
          {/* DISTRICT FILTER */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase text-slate-500">District Filter</label>
            <select 
              className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm cursor-pointer focus:ring-2 focus:ring-blue-500"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              <option value="">All Districts in {selectedStateStr}</option>
              {stateDistricts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* DISTRICT OVERVIEW TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">District</th>
                <th className="px-4 py-3">Total Works</th>
                <th className="px-4 py-3">Sanctioned</th>
                <th className="px-4 py-3">Expenditure</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3 text-center">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {stateDistricts.filter(d => !districtFilter || d === districtFilter).map(dist => {
                const distWorks = works.filter(w => w.district === dist);
                const totalWorks = distWorks.length;
                const totalSanctioned = distWorks.reduce((sum, w) => sum + (w.sanctionedAmount || 0), 0);
                const totalUtilized = distWorks.reduce((sum, w) => sum + (w.utilizedAmount || 0), 0);
                const distAlerts = alerts.filter(a => a.district === dist).length;
                const utilizationRate = totalSanctioned > 0 ? ((totalUtilized / totalSanctioned) * 100).toFixed(1) : 0;
                
                return (
                  <tr key={dist} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{dist}</td>
                    <td className="px-4 py-3">{totalWorks} projects</td>
                    <td className="px-4 py-3 font-mono">{formatINR(totalSanctioned)}</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">{formatINR(totalUtilized)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
                          <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                        </div>
                        <span className="text-xs font-mono">{utilizationRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {distAlerts > 0 ? (
                        <span className="inline-flex items-center justify-center px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-full text-xs font-bold">
                          {distAlerts}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {stateDistricts.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    No district data available for this state.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* PROJECT MONITORING LIST */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-gov space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          Project Monitoring ({works.filter(w => !districtFilter || w.district === districtFilter).length} Works)
        </h3>
        
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {works
            .filter(w => !districtFilter || w.district === districtFilter)
            .map(work => (
            <div key={work.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-500">{work.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {work.district}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    work.stage === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                    work.stage === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {work.stage.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mb-1">{work.title}</h4>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{work.category}</span>
                  <span>•</span>
                  <span>{work.agency}</span>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{formatINR(work.sanctionedAmount)}</div>
                  <div className="text-xs text-emerald-600 font-bold">{work.physicalProgress}% Completed</div>
                </div>
                {work.hasAnomaly && (
                  <div className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-1 rounded">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Risk: {work.riskScore}/100
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateNodalDashboard;
