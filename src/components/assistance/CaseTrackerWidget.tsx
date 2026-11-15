import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { AssistanceCase, StandardCaseStatus } from '../../types';

interface CaseTrackerWidgetProps {
  initialCaseId?: string;
}

export const CaseTrackerWidget: React.FC<CaseTrackerWidgetProps> = ({ initialCaseId }) => {
  const { cases, getCaseById } = useUDAAN();
  const [searchId, setSearchId] = useState(initialCaseId || 'CASE-2026-0891');
  const [foundCase, setFoundCase] = useState<AssistanceCase | null>(() => {
    return getCaseById(initialCaseId || 'CASE-2026-0891') || cases[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const result = getCaseById(searchId);
    setFoundCase(result || null);
  };

  const caseSteps: StandardCaseStatus[] = [
    'Submitted',
    'Under Review',
    'Matched',
    'Referral Initiated',
    'Assistance In Progress',
    'Completed'
  ];

  const getStepIndex = (status: string) => {
    const idx = caseSteps.indexOf(status as StandardCaseStatus);
    return idx >= 0 ? idx : 1;
  };

  const activeIndex = foundCase ? getStepIndex(foundCase.status) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6 text-xs">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="bg-udaan-blue-soft text-udaan-blue font-bold px-2 py-0.5 rounded text-[10px] uppercase">
            Feature 4 Tracking
          </span>
          <h3 className="font-extrabold text-base text-udaan-navy mt-1">
            Beneficiary Case Tracker
          </h3>
          <p className="text-slate-500 text-[11px]">
            Track your assistance request in real-time using your unique Case ID
          </p>
        </div>

        {/* Lookup input */}
        <form onSubmit={handleSearch} className="flex items-center gap-1.5 w-full sm:w-auto">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="e.g. CASE-2026-0891"
            className="p-2 border border-slate-300 rounded-xl font-mono text-xs focus:ring-1 focus:ring-udaan-blue focus:outline-none uppercase w-48"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition text-xs flex items-center gap-1 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {foundCase ? (
        <div className="space-y-6">
          {/* Status Stepper (6 Steps) */}
          <div className="space-y-2">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block">
              Case Lifecycle Progress (Step {activeIndex + 1} of 6)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {caseSteps.map((step, idx) => {
                const isPast = idx < activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={step}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      isPast
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : isCurrent
                        ? 'bg-udaan-blue text-white border-udaan-blue shadow-sm ring-2 ring-udaan-blue/20'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full mx-auto flex items-center justify-center font-bold text-[10px] mb-1">
                      {isPast ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : idx + 1}
                    </div>
                    <span className="font-bold text-[10px] block leading-tight">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-udaan-navy text-sm">{foundCase.id}</span>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {foundCase.urgency} Urgency
                </span>
              </div>
              <p className="text-slate-700 italic">
                "{foundCase.beneficiary.description}"
              </p>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 flex justify-between">
                <span>Beneficiary: <strong>{foundCase.beneficiary.identifierName}</strong></span>
                <span>People: <strong>{foundCase.beneficiary.numberOfPeople}</strong></span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Assigned Provider & Status</span>
              <div>
                <strong className="text-slate-900 block text-sm">
                  {foundCase.assignedOrganisationName || 'Samarthanam Trust & Partners'}
                </strong>
                <span className="text-[11px] text-slate-500">
                  Caseworker: {foundCase.assignedWorker?.name || 'Kavitha Ramesh (MSW)'}
                </span>
              </div>
              <div className="pt-1">
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[10px]">
                  Current Status: {foundCase.status}
                </span>
              </div>
            </div>
          </div>

          {/* Referrals Status Table */}
          <div className="space-y-2">
            <span className="font-bold text-slate-800 text-xs block">Service Referrals in Progress</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold">
                  <tr>
                    <th className="p-2.5 rounded-l">Service Provider</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5 rounded-r">Action / Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {foundCase.referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50 transition">
                      <td className="p-2.5 font-bold text-slate-800">{ref.organisationName}</td>
                      <td className="p-2.5 capitalize text-slate-600">{ref.category.replace('_', ' ')}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ref.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ref.status === 'In Progress' || ref.status === 'Accepted'
                            ? 'bg-blue-100 text-blue-800'
                            : ref.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600 text-[11px]">
                        {ref.completionNotes || ref.rejectionReason || 'Referral active and under ground execution'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="p-6 bg-red-50 text-red-800 rounded-xl border border-red-200 text-center space-y-1">
          <AlertCircle className="w-5 h-5 text-red-600 mx-auto" />
          <strong className="block">No case found with ID "{searchId}"</strong>
          <span className="text-[11px]">Please verify your Case ID or test with demo ID <strong>CASE-2026-0891</strong>.</span>
        </div>
      ) : null}
    </div>
  );
};
