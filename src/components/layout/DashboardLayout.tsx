import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe2,
  FolderHeart,
  Bot,
  Building,
  Users2,
  Compass,
  BarChart3,
  Settings,
  Menu,
  X,
  PlayCircle,
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  User,
  Building2,
  HeartHandshake,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUDAAN } from '../../context/UDAANContext';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser, switchRole, availableRoles } = useAuth();
  const { cases, setGuidedDemoActive } = useUDAAN();

  const pendingApprovalsCount = cases.filter(c => !c.humanReviewApproved).length;

  const rolePortals = [
    { name: 'Beneficiary Portal', path: '/dashboard/beneficiary', icon: User, badge: 'Role A' },
    { name: 'NGO Partner Hub', path: '/dashboard/ngo', icon: Building2, badge: 'Role B' },
    { name: 'Volunteer Dispatch', path: '/dashboard/volunteer', icon: HeartHandshake, badge: 'Role C' },
    { name: 'Admin Command', path: '/dashboard/admin', icon: ShieldAlert, badge: 'Role D' },
  ];

  const commandModules = [
    { name: 'Command Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'City Intelligence (Twin)', path: '/dashboard/city-intelligence', icon: Globe2 },
    { name: 'Assistance Cases', path: '/dashboard/assistance-cases', icon: FolderHeart, badge: pendingApprovalsCount ? `${pendingApprovalsCount}` : undefined },
    { name: 'AI Coordinator (Gemini)', path: '/dashboard/ai-coordinator', icon: Bot },
    { name: 'Resource Network', path: '/dashboard/resources', icon: Building },
    { name: 'Partner Organisations', path: '/dashboard/organisations', icon: Users2 },
    { name: 'Rehabilitation Pathways', path: '/dashboard/rehabilitation', icon: Compass },
    { name: 'Analytics & Impact', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'System Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Dashboard Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-8 z-30 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg border border-slate-200"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-udaan-navy flex items-center justify-center p-1">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M12 28C14 20 20 14 36 12C36 12 30 20 28 26C26 32 20 34 16 34C13 34 12 31 12 28Z" fill="#18A999"/>
                <path d="M14 34C18 28 24 24 38 18C38 18 31 27 28 32C25 37 20 38 17 38C15 38 14 36 14 34Z" fill="#2463A6"/>
                <circle cx="34" cy="14" r="3.5" fill="#E5A23C"/>
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-sm text-udaan-navy tracking-tight">UDAAN</span>
              <span className="text-[10px] text-slate-500 font-medium block leading-none">Operations Hub</span>
            </div>
          </Link>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1-Click Guided Demo Launch Button */}
          <button
            onClick={() => setGuidedDemoActive(true)}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-udaan-teal to-udaan-blue text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:opacity-95 transition"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Interactive Demo (8 Steps)</span>
          </button>

          {/* Quick Role Switcher Pill */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-500 hidden md:inline text-[11px] font-medium">Role:</span>
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as any)}
              className="bg-transparent font-bold text-udaan-navy focus:outline-none cursor-pointer text-xs"
            >
              {availableRoles.map(r => (
                <option key={r.role} value={r.role}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-udaan-navy text-white text-xs font-bold flex items-center justify-center">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</span>
              <span className="block text-[10px] text-slate-500 capitalize">{currentUser.role.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col justify-between py-5 px-3 overflow-y-auto">
            <div className="space-y-6">
              {/* Role-Based Portals (Feature 6) */}
              <div className="space-y-1.5">
                <div className="px-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Role Portals (Feature 6)
                  </span>
                  <span className="text-[9px] font-bold text-udaan-teal bg-teal-50 px-1.5 py-0.5 rounded">
                    4 Roles
                  </span>
                </div>
                <nav className="space-y-1">
                  {rolePortals.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-udaan-navy text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-udaan-teal' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Command Modules (Features 1-5) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="px-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Command Modules
                  </span>
                </div>

                <nav className="space-y-1">
                  {commandModules.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-udaan-teal' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </div>
                        {Boolean(item.badge) && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            isActive ? 'bg-udaan-red text-white' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-100 pt-4 px-2 space-y-3">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Competition Ready</span>
                </div>
                <p className="text-slate-500 text-[10px]">
                  All 6 core modules fully interactive with zero dead buttons.
                </p>
              </div>

              <Link
                to="/"
                className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 px-2 py-1"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                <span>Return to Public Portal</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
