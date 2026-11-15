import React from 'react';
import { Sparkles, Info, ShieldAlert, PlayCircle, RefreshCw } from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';

export const DemoBanner: React.FC = () => {
  const { demoMode, setGuidedDemoActive, resetToDefaultData } = useUDAAN();
  const { currentUser, switchRole, availableRoles } = useAuth();

  if (!demoMode) return null;

  return (
    <div className="bg-udaan-navy text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-udaan-navy-light sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="bg-udaan-amber text-udaan-navy font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
          DEMO MODE / SIMULATED DATA
        </span>
        <span className="text-slate-300 hidden sm:inline">
          Bengaluru humanitarian simulation. Realistic data labeled for development & evaluation.
        </span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Role Selector Pill */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
          <span className="text-slate-400 text-[11px]">Role:</span>
          <select
            value={currentUser.role}
            onChange={(e) => switchRole(e.target.value as any)}
            className="bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer"
          >
            {availableRoles.map(r => (
              <option key={r.role} value={r.role} className="bg-slate-900 text-white">
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* 1-Click Interactive Demo */}
        <button
          onClick={() => setGuidedDemoActive(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-udaan-teal to-udaan-blue text-white px-2.5 py-1 rounded font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>Interactive Demo (8-Steps)</span>
        </button>

        {/* Reset State */}
        <button
          onClick={resetToDefaultData}
          title="Reset simulated data"
          className="text-slate-400 hover:text-white p-1 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
