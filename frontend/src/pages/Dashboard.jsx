import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import KpiCard from '../components/common/KpiCard';
import ChartCard from '../components/common/ChartCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import IndiaMap from '../components/dashboard/IndiaMap';
import RiskOverviewWidget from '../components/dashboard/RiskOverviewWidget';
import TopAlertsWidget from '../components/dashboard/TopAlertsWidget';
import FundFunnelChart from '../components/dashboard/FundFunnelChart';
import StateNodalDashboard from '../components/dashboard/StateNodalDashboard';
import PaymentTimelineChart from '../components/analytics/PaymentTimelineChart';
import AlertDetailModal from '../components/alerts/AlertDetailModal';
import {
  IndianRupee,
  ShieldAlert,
  TrendingUp,
  Clock,
  CheckCircle2,
  Filter,
  Sparkles,
  Building,
  RefreshCw,
  GitBranch,
  Shield,
  Layers,
  MapPin,
  Lock,
  Search,
} from 'lucide-react';
import { formatINR, formatNumber } from '../utils/formatters';
import { ROLES } from '../services/rbacService';
import { FLAG_METADATA } from '../data/riskContractData';

/**
 * Dashboard Page Component
 * Role-adaptive executive cockpit for MP, District Authority, State Nodal Authority, Ministry, and System Admin.
 */
export const Dashboard = () => {
  const { currentRole, currentUser } = useAuth();
  const { t } = useLanguage();
  const {
    alerts,
    works,
    isLoading,
    selectedAlert,
    setSelectedAlert,
    handleAlertAction,
    roleKpis,
    globalSearch,
    setGlobalSearch,
  } = useData();

  const [selectedState, setSelectedState] = useState(null);
  const [selectedStage, setSelectedStage] = useState('ALL');

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonLoader type="kpi" count={4} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <SkeletonLoader type="chart" />
          </div>
          <div className="lg:col-span-4">
            <SkeletonLoader type="card" count={2} />
          </div>
        </div>
      </div>
    );
  }

  const realTopAlerts = [...works]
    .filter(w => w.risk_score && w.risk_score > 0)
    .sort((a, b) => b.risk_score - a.risk_score)
    .map(w => {
      const primaryFlag = w.flags && w.flags.length > 0 ? w.flags[0] : 'UNKNOWN';
      const meta = FLAG_METADATA[primaryFlag] || { label: 'General Anomaly', badgeClass: 'bg-red-100 text-red-800 border-red-200' };

      return {
        id: `ALT-${w.ida}`,
        workId: w.ida,
        title: w.work_description || w.title,
        category: 'custom',
        categoryLabel: meta.label,
        categoryColor: meta.badgeClass,
        riskLevel: w.risk_score >= 80 ? 'critical' : 'high',
        riskScore: w.risk_score || 0,
        confidence: '95%',
        dateFlagged: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        state: w.state || 'UP',
        district: w.district || 'Varanasi',
        implementingAgency: w.agency || 'PWD',
        sanctionedAmount: w.total_cost || w.sanctionedAmount || 0,
        expenditureSoFar: w.expenditureSoFar || (w.total_cost * 0.5) || 0,
        status: 'active',
        summary: w.explanation || 'High risk score based on anomaly detection models.',
      };
    });

  return (
    <div className="space-y-6">
      {/* Role Context & Welcome Banner */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-5 sm:p-6 shadow-gov-md border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500 text-white font-mono uppercase">
              {currentUser.roleName}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
              {currentUser.jurisdiction}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Welcome, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {currentRole === ROLES.MP && (
              <>
                Monitoring <strong>{works.length}</strong> sanctioned works in your constituency. Showing fund utilization and high-risk alerts.
              </>
            )}
            {currentRole === ROLES.DISTRICT && (
              <>
                District Collectorate Cockpit: Managing <strong>{works.length}</strong> active district works, contractor payment schedules, and physical inspection certificates.
              </>
            )}
            {currentRole === ROLES.STATE && (
              <>
                State Nodal Authority: Consolidated oversight across all districts in <strong>{currentUser.jurisdiction}</strong> with real-time duplicate sanction detection.
              </>
            )}
            {currentRole === ROLES.MINISTRY && (
              <>
                MoSPI National Apex Desk: Macro oversight across <strong>{formatNumber(roleKpis.totalWorksCount)}</strong> projects nationwide.
              </>
            )}
            {currentRole === ROLES.ADMIN && (
              <>
                NIC Cloud & AI Operations: Managing user credentials, role-based entitlements, security audit ledgers, and model drift.
              </>
            )}
          </p>
        </div>

      </div>

      {/* 4 Primary Multi-Metric KPI Cards (Scoped to Role) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title={currentRole === ROLES.MP ? 'My Sanctioned Funds' : t('kpi_sanctioned')}
          value={formatINR(roleKpis.totalSanctioned)}
          subtitle={`${works.length > 0 ? works.length : roleKpis.totalWorksCount} Authorized Works`}
          icon={<IndianRupee className="w-5 h-5 text-blue-600" />}
          variant="blue"
          trend={12.4}
          trendLabel="vs last year"
        />

        <KpiCard
          title={t('kpi_utilized')}
          value={formatINR(roleKpis.totalUtilized)}
          subtitle={`Disbursement velocity: 84.2%`}
          progress={roleKpis.utilizationRate}
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          variant="green"
          badge={`${roleKpis.utilizationRate}% Utilized`}
        />

        <KpiCard
          title={t('kpi_unutilized')}
          value={formatINR(roleKpis.unutilizedBalance)}
          subtitle="Unspent balance in accounts"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          variant="amber"
          badge="Idle Balance"
        />

        <KpiCard
          title={t('kpi_flaggedCount')}
          value={roleKpis.flaggedHighCount}
          subtitle="High probability cost/delay anomalies"
          icon={<ShieldAlert className="w-5 h-5 text-red-600" />}
          variant="red"
          badge="Critical Alert"
          trend={-4.5}
          trendLabel="this month"
        />
      </div>

      {/* Main Grid: Heatmap (State/National) or Scoped Works (MP/District) */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          {currentRole === ROLES.MINISTRY ? (
            <IndiaMap
              selectedStateId={selectedState?.id}
              onSelectState={(st) => setSelectedState(st)}
            />
          ) : currentRole === ROLES.STATE ? (
            <StateNodalDashboard 
              currentUser={currentUser} 
              works={works} 
              alerts={alerts} 
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-gov space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display">
                    {currentRole === ROLES.MP ? 'My Recommended Projects & Progress' : 'District Works Under Monitoring'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                  {works.length} Works Authorized
                </span>
              </div>

              <div className="relative mb-4">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t('search') || 'Search projects...'}
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>

              {/* Progress Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                {['ALL', 'Sanctioned', 'In Progress', 'Delayed / At Risk', 'Physically Completed'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                      selectedStage === stage
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {works
                  .filter((work) => {
                    // Global search filter
                    if (globalSearch) {
                      const q = globalSearch.toLowerCase();
                      const matches = work.title?.toLowerCase().includes(q) ||
                        work.id?.toLowerCase().includes(q) ||
                        work.category?.toLowerCase().includes(q) ||
                        work.agency?.toLowerCase().includes(q);
                      if (!matches) return false;
                    }
                    
                    // Stage filter
                    if (selectedStage !== 'ALL') {
                      const workStage = (work.stage || '').toLowerCase();
                      if (selectedStage === 'Sanctioned' && !workStage.includes('sanctioned')) return false;
                      if (selectedStage === 'In Progress' && !(workStage.includes('progress') || workStage.includes('ongoing'))) return false;
                      if (selectedStage === 'Delayed / At Risk' && !(workStage.includes('delay') || workStage.includes('risk') || workStage.includes('hold'))) return false;
                      if (selectedStage === 'Physically Completed' && !workStage.includes('complet')) return false;
                    }
                    
                    return true;
                  })
                  .slice(0, 10)
                  .map((work) => (
                    <div
                      key={work.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[10px] font-bold text-slate-500">{work.id}</span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold ${work.stage === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : work.stage === 'delayed'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                }`}
                            >
                              {work.stage.toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {work.title}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {work.agency} • {work.category}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100">
                            {formatINR(work.sanctionedAmount)}
                          </div>
                          <div className="text-[11px] text-emerald-600 font-bold font-mono">
                            {work.physicalProgress}% Done
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Second Row: Risk Distribution + Top Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <RiskOverviewWidget kpis={roleKpis} />
        </div>

        <div className="lg:col-span-8">
          <TopAlertsWidget
            alerts={realTopAlerts.length > 0 ? realTopAlerts : alerts}
            onSelectAlert={(a) => setSelectedAlert(a)}
            onQuickAction={handleAlertAction}
          />
        </div>
      </div>

      {/* Expenditure Trajectory & Forecast */}
      <ChartCard
        title="Sanctioned Budget vs Actual Expenditure Trajectory & ML Forecast"
        subtitle="Quarterly time series with ARIMA + Weibull survival projection for next 3 fiscal quarters"
        infoTooltip="Purple dashed line indicates predicted expenditure trajectory based on historic seasonal patterns"
      >
        <PaymentTimelineChart />
      </ChartCard>

      {/* Deep-Dive Modal for Selected Alert */}
      <AlertDetailModal
        alert={selectedAlert}
        isOpen={Boolean(selectedAlert)}
        onClose={() => setSelectedAlert(null)}
        onAction={handleAlertAction}
      />
    </div>
  );
};

export default Dashboard;

