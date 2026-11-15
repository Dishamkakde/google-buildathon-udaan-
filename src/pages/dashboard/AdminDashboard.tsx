import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Building2,
  Users2,
  CheckCircle2,
  XCircle,
  Globe2,
  Sliders,
  Filter,
  ChevronRight,
  UserCheck,
  Award
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';
import { CityMap } from '../../components/digital-twin/CityMap';
import { ScenarioSimulator } from '../../components/digital-twin/ScenarioSimulator';

export const AdminDashboard: React.FC = () => {
  const {
    cases,
    resources,
    organisations,
    volunteers,
    verifyOrganisation,
    approveCase,
    cityZones
  } = useUDAAN();

  const { currentUser, availableRoles, switchRole } = useAuth();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'ngos' | 'users' | 'twin'>('overview');

  const pendingApprovals = cases.filter(c => !c.humanReviewApproved);
  const totalBeds = resources
    .filter(r => r.category === 'emergency_shelter')
    .reduce((a, b) => a + b.availableCapacity, 0);
  const totalMeals = resources
    .filter(r => r.category === 'food_water')
    .reduce((a, b) => a + b.availableCapacity, 0);

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Role D
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              Administrator Operations Command Center
            </h1>
          </div>
          <p className="text-slate-500">
            Platform-wide governance: NGO registration verification, user role control, case monitoring & Digital Twin intelligence.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeAdminTab === 'overview' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Overview
          </button>
          <button
            onClick={() => setActiveAdminTab('ngos')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeAdminTab === 'ngos' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            NGO Verification ({organisations.filter(o => o.verifiedStatus === 'pending_verification').length})
          </button>
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeAdminTab === 'users' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Roles ({volunteers.length + organisations.length + 2})
          </button>
          <button
            onClick={() => setActiveAdminTab('twin')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeAdminTab === 'twin' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Digital Twin & Simulation
          </button>
        </div>
      </div>

      {/* Summary KPI Cards (Feature 3 & 6 requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Total Assistance Requests</span>
          <span className="text-2xl font-extrabold text-udaan-navy">{cases.length}</span>
          <span className="text-[10px] text-slate-400">DEMO DATA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Active Requests In Progress</span>
          <span className="text-2xl font-extrabold text-udaan-blue">
            {cases.filter(c => c.status !== 'Completed').length}
          </span>
          <span className="text-[10px] text-slate-400">Under ground intervention</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Available Resources</span>
          <span className="text-2xl font-extrabold text-udaan-teal">
            {totalBeds} beds / {totalMeals} meals
          </span>
          <span className="text-[10px] text-slate-400">Verified capacity</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Completed Assistance Cases</span>
          <span className="text-2xl font-extrabold text-emerald-700">
            {cases.filter(c => c.status === 'Completed').length}
          </span>
          <span className="text-[10px] text-emerald-600">Successfully resolved</span>
        </div>
      </div>

      {/* TAB 1: Overview Queue */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="font-bold text-sm text-udaan-navy">
                Urgent Assistance Case Queue (Human Sign-off Required)
              </h3>
              <span className="text-[10px] text-red-600 font-bold">
                {pendingApprovals.length} Pending Approvals
              </span>
            </div>

            <div className="space-y-3">
              {cases.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500">{c.id}</span>
                      <strong className="text-sm font-bold text-slate-900">{c.beneficiary.identifierName}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.urgency === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.urgency}
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-1 italic">"{c.beneficiary.description}"</p>
                    <span className="text-[10px] text-slate-400">
                      Sector: {c.beneficiary.approximateLocation.zone} | Status: <strong className="text-udaan-blue">{c.status}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!c.humanReviewApproved ? (
                      <button
                        onClick={() => approveCase(c.id, currentUser.name)}
                        className="px-3.5 py-1.5 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-lg transition"
                      >
                        Authorize Referrals
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Authorized</span>
                      </span>
                    )}

                    <Link
                      to="/dashboard/assistance-cases"
                      className="px-2.5 py-1.5 text-slate-600 hover:text-slate-900 font-semibold border border-slate-200 rounded-lg bg-white"
                    >
                      View Case
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NGO Verification Queue (Feature 6 requirement) */}
      {activeAdminTab === 'ngos' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-udaan-navy">
                Partner NGO Registration & Verification Desk
              </h3>
              <p className="text-[11px] text-slate-500">
                Audit non-profit registration credentials before enabling referrals
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {organisations.map((org) => {
              const isVerified = org.verifiedStatus === 'verified';
              return (
                <div
                  key={org.id}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-slate-900">{org.name}</strong>
                      <span className="font-mono text-[10px] text-slate-400">({org.registrationNumber})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {org.verifiedStatus}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Contact: <strong>{org.contactPerson}</strong> | Phone: {org.phone} | Email: {org.email}
                    </p>
                    <p className="text-slate-500 text-[10px]">
                      Coverage Zones: {org.coverageZones.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isVerified ? (
                      <button
                        onClick={() => verifyOrganisation(org.id, true)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition text-xs"
                      >
                        Approve & Verify NGO
                      </button>
                    ) : (
                      <button
                        onClick={() => verifyOrganisation(org.id, false)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition text-xs"
                      >
                        Revoke Verification
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: User & Role Management (Feature 6 requirement) */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-udaan-navy">
              User and Role Access Management
            </h3>
            <span className="text-[10px] text-slate-400">4 Active System Roles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableRoles.map((r) => (
              <div key={r.role} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-sm font-bold text-udaan-navy">{r.label}</strong>
                  <button
                    onClick={() => switchRole(r.role)}
                    className="px-2.5 py-1 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] transition"
                  >
                    Switch to this Role
                  </button>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Digital Twin & Simulation */}
      {activeAdminTab === 'twin' && (
        <div className="space-y-6">
          <ScenarioSimulator />
        </div>
      )}
    </div>
  );
};
