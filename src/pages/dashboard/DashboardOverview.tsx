import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { BeneficiaryDashboard } from './BeneficiaryDashboard';
import { NGODashboard } from './NGODashboard';
import { VolunteerDashboard } from './VolunteerDashboard';
import { AdminDashboard } from './AdminDashboard';
import {
  User,
  Building2,
  HeartHandshake,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { currentUser, switchRole } = useAuth();

  const roleConfigs: {
    role: UserRole;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      role: 'beneficiary',
      label: 'Role A: Beneficiary',
      sublabel: 'Conversational AI, Case Tracker & Rehab',
      icon: User,
      badge: 'Feature 6.A',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      role: 'ngo_partner',
      label: 'Role B: NGO Partner',
      sublabel: 'Capacity Management & Referral Dispatch',
      icon: Building2,
      badge: 'Feature 6.B',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      role: 'volunteer',
      label: 'Role C: Field Volunteer',
      sublabel: 'Assigned Missions & Ground Verification',
      icon: HeartHandshake,
      badge: 'Feature 6.C',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200'
    },
    {
      role: 'administrator',
      label: 'Role D: Administrator',
      sublabel: 'Digital Twin, Simulation & Governance',
      icon: ShieldAlert,
      badge: 'Feature 6.D',
      badgeColor: 'bg-slate-800 text-white border-slate-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* 4-Role Instant Switcher Ribbon for Competition Evaluators */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-udaan-blue-soft text-udaan-blue">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-xs font-bold text-udaan-navy uppercase tracking-wider">
                Feature 6: Role-Based Dashboard Switcher
              </h2>
              <p className="text-[11px] text-slate-500">
                1-Click switch between the 4 dedicated experiences specified in the competition guidelines.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            DEMO DATA VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {roleConfigs.map((cfg) => {
            const isActive = currentUser.role === cfg.role;
            const Icon = cfg.icon;
            return (
              <button
                key={cfg.role}
                onClick={() => switchRole(cfg.role)}
                className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-udaan-navy text-white border-udaan-navy shadow-md ring-2 ring-udaan-navy/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-white/10 text-white' : 'bg-white text-slate-700 shadow-xs'}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase ${
                    isActive ? 'bg-white/20 text-white border-white/30' : cfg.badgeColor
                  }`}>
                    {cfg.badge}
                  </span>
                </div>
                <div>
                  <div className={`font-bold text-xs ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {cfg.label}
                  </div>
                  <div className={`text-[10px] line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cfg.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the Active Role Experience */}
      <div>
        {currentUser.role === 'beneficiary' && <BeneficiaryDashboard />}
        {currentUser.role === 'ngo_partner' && <NGODashboard />}
        {currentUser.role === 'volunteer' && <VolunteerDashboard />}
        {currentUser.role === 'administrator' && <AdminDashboard />}
      </div>
    </div>
  );
};
