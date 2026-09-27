import React from 'react';
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
const WorkCard = ({ work, onSelectWork, onVerifyPhotos }) => (
  <div
    onClick={() => onSelectWork && onSelectWork(work)}
    className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all duration-150 relative flex flex-col min-h-[220px]"
  >
    {/* Top Row: Category & Risk */}
    <div className="flex items-center justify-between gap-1 mb-1.5">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
        {work.category}
      </span>
      <RiskBadge level={work.riskLevel} score={work.risk_score || work.riskScore} size="sm" showPulse={false} />
    </div>

    {/* Title */}
    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
      {work.title}
    </h4>

    {/* Meta info: Work ID & IDA */}
    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 space-y-1 flex-1">
      <div className="flex items-center justify-between">
        <span>Work ID:</span>
        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{work.id || work.work_id}</span>
      </div>
      {work.ida && (
        <div className="flex items-center justify-between">
          <span>IDA:</span>
          <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{work.ida}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span>Sanctioned:</span>
        <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
          {formatINR(work.sanctionedAmount)}
        </span>
      </div>
    </div>

    {/* Multi-Flag Chips if present */}
    {work.flags && work.flags.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-1">
        {work.flags.map((f) => {
          const meta = FLAG_METADATA[f] || { label: f, badgeClass: 'bg-slate-100 text-slate-700' };
          return (
            <span key={f} className={`px-2 py-0.5 text-[10px] font-bold rounded ${meta.badgeClass}`}>
              {meta.label}
            </span>
          );
        })}
      </div>
    )}

    {/* Physical vs Financial Progress Bars */}
    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2 text-xs">
      <div>
        <div className="flex justify-between text-slate-500 mb-0.5">
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
        <div className="flex justify-between text-slate-500 mb-0.5">
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
      <div className="mt-3 px-2.5 py-1.5 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between text-xs text-red-700 dark:text-red-400">
        <span className="flex items-center gap-1 font-semibold">
          <Clock className="w-3 h-3" /> Delay Risk
        </span>
        <span className="font-mono font-bold">{work.delayLikelihood}% prob.</span>
      </div>
    )}

    {/* Photo verification trigger */}
    {work.beforePhoto && (
      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
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
);

export const WorkKanban = ({ works = [], selectedStage = 'ALL', onSelectWork, onVerifyPhotos }) => {
  const getStageId = (label) => {
    switch (label) {
      case 'Sanctioned': return 'sanctioned';
      case 'In Progress': return 'inprogress';
      case 'Delayed / At Risk': return 'delayed';
      case 'Physically Completed': return 'completed';
      default: return 'all';
    }
  };

  const stageId = getStageId(selectedStage);
  const displayedWorks = stageId === 'all' ? works : works.filter((w) => w.stage === stageId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {displayedWorks.length === 0 ? (
        <div className="col-span-full h-32 flex items-center justify-center text-sm text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl">
          No works found for the selected stage.
        </div>
      ) : (
        displayedWorks.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            onSelectWork={onSelectWork}
            onVerifyPhotos={onVerifyPhotos}
          />
        ))
      )}
    </div>
  );
};

WorkKanban.propTypes = {
  works: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedStage: PropTypes.string,
  onSelectWork: PropTypes.func,
  onVerifyPhotos: PropTypes.func,
};

export default WorkKanban;
