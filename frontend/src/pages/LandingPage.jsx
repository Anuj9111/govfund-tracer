import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Brain,
  BarChart3,
  Activity,
  AlertTriangle,
  Clock,
  Copy,
  CheckCircle2,
  Lock,
  Building,
  Users,
  MapPin,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="h-1 gov-tricolor-bar bg-gradient-to-r from-[#FF671F] via-white to-[#046A38]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center overflow-hidden border border-slate-200">
                <img src="/custom-logo.jpg" alt="GovFund Tracer Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                GovFund <span className="text-orange-600">Tracer</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-12 text-sm font-semibold text-slate-600">
              <a href="#home" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            </nav>
            <div className="flex items-center ml-12">
              <button
                onClick={handleLoginClick}
                className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-slate-50 transform -skew-y-3 origin-top-left z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            AI-Powered Monitoring for <br className="hidden lg:block" />
            <span className="text-blue-700">GovFund Tracer Implementation</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 mx-auto mb-10 leading-relaxed">
            Detect anomalies, monitor project progress, identify potential risks, and support data-driven monitoring of developmental works.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleLoginClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
            >
              Login to Dashboard
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-base font-bold shadow-sm transition-colors text-center"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">About the Platform</h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            GovFund Tracer is a state-of-the-art administrative platform designed to use AI and data analytics to analyze implementation data. The platform helps authorized government stakeholders identify unusual patterns, risks, project delays, cost-related issues, and other implementation concerns. It ensures that developmental funds are monitored transparently and effectively, enabling proactive decision-making.
          </p>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Key Features</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Advanced modules designed for comprehensive project and financial oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Anomaly Detection</h3>
              <p className="text-sm text-slate-600">Identify unusual patterns in implementation data to detect anomalies early.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4 text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Risk Scoring & Alerts</h3>
              <p className="text-sm text-slate-600">Generate risk scores and alerts for projects requiring immediate attention.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Project Monitoring</h3>
              <p className="text-sm text-slate-600">Monitor project progress, status, and on-ground implementation information.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 text-amber-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Fund & Expenditure</h3>
              <p className="text-sm text-slate-600">Analyze sanctioned amounts, expenditure rates, and overall fund utilization.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Predictive Insights</h3>
              <p className="text-sm text-slate-600">Provide analytical insights that support early identification of potential issues.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4 text-teal-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Compliance Monitoring</h3>
              <p className="text-sm text-slate-600">Support monitoring of implementation and compliance-related documentation.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delayed Project Detection</h3>
              <p className="text-sm text-slate-600">Highlight projects showing significant delays or unusual progress patterns.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 text-indigo-600">
                <Copy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Duplicate Work Detection</h3>
              <p className="text-sm text-slate-600">Identify potentially duplicate or similar works for further administrative review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-16">How It Works</h2>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 w-full relative group">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center text-blue-600 mb-6 z-10 transition-colors shadow-sm bg-white">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">GovFund Data</h3>
              <p className="text-sm text-slate-600 text-center px-2">Ingestion of sanctioned works, financial releases, and district progress reports.</p>
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-200 -z-0"></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 w-full relative group">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-purple-500 flex items-center justify-center text-purple-600 mb-6 z-10 transition-colors shadow-sm bg-white">
                <Brain className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Data Processing</h3>
              <p className="text-sm text-slate-600 text-center px-2">Normalization, data structuring, and initial analytical baseline calculations.</p>
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-200 -z-0"></div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 w-full relative group">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-amber-500 flex items-center justify-center text-amber-600 mb-6 z-10 transition-colors shadow-sm bg-white">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Anomaly Detection</h3>
              <p className="text-sm text-slate-600 text-center px-2">Machine learning screening for outliers, duplicates, and irregularities.</p>
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-200 -z-0"></div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center flex-1 w-full relative group">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-red-500 flex items-center justify-center text-red-600 mb-6 z-10 transition-colors shadow-sm bg-white">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Risk Scoring</h3>
              <p className="text-sm text-slate-600 text-center px-2">Assigning risk levels (0-100) and generating targeted contextual alerts.</p>
              {/* Connector */}
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-slate-200 -z-0"></div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center flex-1 w-full relative group">
              <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-200 group-hover:border-emerald-500 flex items-center justify-center text-emerald-600 mb-6 z-10 transition-colors shadow-sm bg-white">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Role Dashboards</h3>
              <p className="text-sm text-slate-600 text-center px-2">Secure delivery of insights and monitoring tools to authorized stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO CAN USE IT */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Authorized Access Matrix</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Access is strictly restricted to designated government officials. Dashboards are dynamically customized based on the authenticated user's jurisdiction and scope of authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">Member of Parliament</h3>
              <div className="w-8 h-1 bg-blue-600 rounded-full mb-4"></div>
              <p className="text-sm text-slate-600 flex-1">Access is strictly limited to viewing associated developmental works and risk flags within the MP's own constituency.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">District Authority</h3>
              <div className="w-8 h-1 bg-emerald-600 rounded-full mb-4"></div>
              <p className="text-sm text-slate-600 flex-1">Monitoring and oversight dashboard scoped purely to projects operating within the administrator's assigned district.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">State Nodal Authority</h3>
              <div className="w-8 h-1 bg-amber-600 rounded-full mb-4"></div>
              <p className="text-sm text-slate-600 flex-1">Consolidated multi-district oversight tailored strictly to the boundaries of the designated State.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-3">Ministry / MoSPI</h3>
              <div className="w-8 h-1 bg-purple-600 rounded-full mb-4"></div>
              <p className="text-sm text-slate-600 flex-1">Nationwide macro-monitoring, policy analysis, and highest-level administrative oversight capabilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN CTA */}
      <section className="py-24 bg-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Authorized User Login</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Access your role-specific monitoring dashboard to review AI risk assessments and track project implementations.
          </p>
          <button
            onClick={handleLoginClick}
            className="px-8 py-3.5 rounded-xl bg-white text-blue-800 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Login to Dashboard
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-white">
                <div className="w-5 h-5 rounded overflow-hidden border border-slate-700 bg-white">
                  <img src="/custom-logo.jpg" alt="GovFund Tracer Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-lg">GovFund Tracer Monitor</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                AI-powered monitoring and decision-support platform for GovFund Tracer implementation. Designed exclusively for authorized government officials.
              </p>
            </div>
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-4">Access</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={handleLoginClick} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Authorized Login
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} GovFund Tracer Monitor. Secure Government Portal.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
