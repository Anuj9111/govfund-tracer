import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Clock, AlertTriangle, CheckCircle2, MapPin, Building2, Sparkles, Image as ImageIcon, Copy, TrendingUp } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import { formatINR } from '../../utils/formatters';
import { FLAG_METADATA } from '../../data/riskContractData';

/**
 * WorkKanban Component
 * Displays works across 4 lifecycle stages: Sanctioned → In Progress → Delayed/At Risk → Completed
 * Displays contract risk score, IDA, and multi-flag chips on cards.
 */
export const WorkKanban = ({ works = [], onSelectWork, onVerifyPhotos }) => {
  const columns = [
    {
      id: 'sanctioned',
      label: 'Sanctioned',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
    },
    {
      id: 'inprogress',
      label: 'In Progress',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'delayed',
      label: 'Delayed / At Risk',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
    },
    {
      id: 'completed',
      label: 'Physically Completed',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
  ];
  const [activeStage, setActiveStage] = useState('all');

  const displayedWorks = activeStage === 'all' ? works : works.filter((w) => w.stage === activeStage);

  return (
    <div className="space-y-4">
      {/* Stage Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveStage('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
            activeStage === 'all'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          All Stages
        </button>
        {columns.map(col => (
          <button
            key={col.id}
            onClick={() => setActiveStage(col.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
              activeStage === col.id
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedWorks.length === 0 ? (
          <div className="col-span-full h-32 flex items-center justify-center text-sm text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
            No works found for this stage.
          </div>
        ) : (
          displayedWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => onSelectWork && onSelectWork(work)}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-150 flex flex-col"
            >
              {/* Top Row: Category & Risk */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {work.category}
                </span>
                <RiskBadge level={work.riskLevel} score={work.risk_score || work.riskScore} size="sm" showPulse={false} />
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-3">
                {work.title}
              </h4>

              {/* Meta info: Work ID & IDA */}
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 mt-auto">
                <div className="flex items-center justify-between">
                  <span>Work ID:</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{work.id || work.work_id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Stage:</span>
                  <span className="font-semibold capitalize text-slate-700 dark:text-slate-300">
                    {work.stage === 'inprogress' ? 'In Progress' : work.stage}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sanctioned:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
                    {formatINR(work.sanctionedAmount)}
                  </span>
                </div>
              </div>

              {/* Physical vs Financial Progress Bars */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-500 mb-1">
                    <span>Physical Progress</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{work.physicalProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${work.physicalProgress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-500 mb-1">
                    <span>Financial Disbursed</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{work.financialProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${work.financialProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Delay Prediction or ML Tag */}
              {work.delayLikelihood > 40 && (
                <div className="mt-3 px-2 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between text-xs text-red-700 dark:text-red-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Delay Risk
                  </span>
                  <span className="font-mono font-bold">{work.delayLikelihood}% prob.</span>
                </div>
              )}

              {/* Photo verification trigger */}
              {work.beforePhoto && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Geotag Photos
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onVerifyPhotos) onVerifyPhotos(work);
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Inspect Photos
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

WorkKanban.propTypes = {
  works: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectWork: PropTypes.func,
  onVerifyPhotos: PropTypes.func,
};

export default WorkKanban;
