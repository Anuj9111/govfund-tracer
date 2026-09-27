import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import LanguageToggle from './LanguageToggle';
import NotificationCenter from './NotificationCenter';
import {
  Sparkles,
  Search,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Lock,
  User,
  MapPin,
  BadgeCheck,
  Shield,
  AlertOctagon,
  Settings,
  Languages,
} from 'lucide-react';
import { ROLE_DEFINITIONS } from '../../services/rbacService';

/**
 * Header Component
 * Government navigation bar — profile card shows current user + Logout only.
 * Role-switching requires going through the Login page.
 */
export const Header = ({ onSearch, isDarkMode, toggleDarkMode, onToggleMobileSidebar }) => {
  const { currentRole, currentUser, currentUserKey, logout } = useAuth();
  const { t } = useLanguage();
  const { testIdTampering, globalSearch, setGlobalSearch } = useData();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const settingsRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const roleMeta = ROLE_DEFINITIONS.find(r => r.role === currentRole) || ROLE_DEFINITIONS[0];

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm no-print">
      {/* Government Tricolor Top Stripe */}
      <div className="gov-tricolor-bar" />

      {/* Main Header Content */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">

        {/* Left: Mobile menu + Branding */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <img src="/custom-logo.jpg" alt="GovFund Tracer Logo" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg font-display tracking-tight text-slate-900 dark:text-white">
                  GovFund <span className="text-orange-500">Tracer</span>
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
                  RBAC Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                {t('govOrg')} • {currentUser?.jurisdiction}
              </p>
            </div>
          </div>
        </div>



        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">



          {/* Notifications */}
          <NotificationCenter />

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              type="button"
              onClick={() => setSettingsOpen(p => !p)}
              title="Settings"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Settings className="w-4 h-4" />
            </button>
            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-slide-up">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                  Settings
                </div>
                <div className="p-2 space-y-1">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                  </button>
                  <div className="w-full">
                    <LanguageToggle />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── User Profile Pill ── */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="profile-menu-btn"
              onClick={() => setProfileOpen(p => !p)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-left transition-all shadow-sm"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1 leading-tight max-w-[120px]">
                  {currentUser?.name}
                </div>
                <div className="text-[10px] font-medium text-orange-600 dark:text-orange-400 font-mono leading-tight">
                  {currentRole?.toUpperCase()}
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown — info + logout only, no role switcher */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-slide-up">

                {/* User Identity Block */}
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-200 dark:border-orange-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                        {currentUser?.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {currentUser?.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role & Jurisdiction Info */}
                <div className="px-4 py-3 space-y-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2 text-xs">
                    <Shield className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Role</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{currentUser?.roleName}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Jurisdiction</div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{currentUser?.jurisdiction}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <BadgeCheck className="w-3.5 h-3.5 text-purple-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Access Level</div>
                      <div className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${roleMeta?.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                        {currentRole}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Info */}
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Lock className="w-3 h-3" />
                    <span>Session secured · NIC Authentication Active</span>
                  </div>
                </div>

                {/* Logout */}
                <div className="pt-1">
                  <button
                    type="button"
                    id="logout-btn"
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2.5 font-bold transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout &amp; Return to Login</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
  isDarkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  onToggleMobileSidebar: PropTypes.func,
};

export default Header;
