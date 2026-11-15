import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Edit2,
  Check,
  X,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';
import { Referral, ResourceItem } from '../../types';

export const NGODashboard: React.FC = () => {
  const { cases, resources, organisations, respondToReferral, updateResourceCapacity } = useUDAAN();
  const { currentUser } = useAuth();

  // Find partner organisation matching user or default to Samarthanam
  const myOrg =
    organisations.find(o => o.id === currentUser.organisationId) ||
    organisations[0];

  const myResources = resources.filter(r => r.organisationId === myOrg.id);

  // Collect referrals for this organization across all cases
  const incomingReferrals = cases.flatMap(c =>
    c.referrals
      .filter(r => r.organisationId === myOrg.id || r.organisationName === myOrg.name)
      .map(r => ({ referral: r, caseItem: c }))
  );

  // State for rejection modal
  const [rejectingRefId, setRejectingRefId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Editing capacity
  const [editingResId, setEditingResId] = useState<string | null>(null);
  const [newCapacity, setNewCapacity] = useState<number>(0);

  const handleStartEdit = (res: ResourceItem) => {
    setEditingResId(res.id);
    setNewCapacity(res.availableCapacity);
  };

  const handleSaveCapacity = (resId: string) => {
    updateResourceCapacity(resId, newCapacity);
    setEditingResId(null);
  };

  const handleAccept = (refId: string) => {
    respondToReferral(refId, 'Accepted', 'Referral accepted by NGO intake coordinator. Bed/meal allocated.');
  };

  const handleRejectConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRefId || !rejectionReason.trim()) return;
    respondToReferral(rejectingRefId, 'Rejected', rejectionReason);
    setRejectingRefId(null);
    setRejectionReason('');
  };

  const handleMarkProgress = (refId: string) => {
    respondToReferral(refId, 'In Progress', 'Beneficiary is currently receiving direct services at the facility.');
  };

  const handleMarkComplete = (refId: string) => {
    respondToReferral(refId, 'Completed', 'Assistance successfully fulfilled and signed off by on-duty supervisor.');
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-blue text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Role B
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              NGO & Service Provider Dashboard
            </h1>
          </div>
          <p className="text-slate-500">
            Organisation: <strong>{myOrg.name}</strong> ({myOrg.registrationNumber}) | Verified Status:{' '}
            <span className="text-emerald-700 font-bold uppercase">{myOrg.verifiedStatus}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <span className="text-slate-500 font-medium">Pending Referrals:</span>
          <span className="font-extrabold text-udaan-red text-sm">
            {incomingReferrals.filter(item => item.referral.status === 'Pending').length}
          </span>
        </div>
      </div>

      {/* Grid: Service Capacities & Incoming Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Manage Services & Live Capacities (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-udaan-navy">
              Active Facility Capacities
            </h3>
            <span className="text-[10px] text-slate-400">Click to update</span>
          </div>

          <div className="space-y-3">
            {myResources.map((res) => {
              const isEditing = editingResId === res.id;
              return (
                <div key={res.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-slate-900 block font-semibold text-xs">{res.name}</strong>
                      <span className="text-[10px] text-slate-500 capitalize">{res.category.replace('_', ' ')}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-xs">
                    <span className="text-slate-500">Available Capacity:</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={res.totalCapacity}
                          value={newCapacity}
                          onChange={(e) => setNewCapacity(Number(e.target.value))}
                          className="w-14 p-1 border border-udaan-blue rounded text-center font-bold text-xs"
                        />
                        <button
                          onClick={() => handleSaveCapacity(res.id)}
                          className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setEditingResId(null)}
                          className="p-1 bg-slate-200 text-slate-600 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-udaan-teal text-sm">
                          {res.availableCapacity} / {res.totalCapacity} {res.unit}
                        </span>
                        <button
                          onClick={() => handleStartEdit(res)}
                          className="text-[10px] text-udaan-blue font-bold hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-[11px] leading-relaxed border border-blue-200">
            <strong>Capacity Integrity Rule:</strong> Keeping capacity updated in real time ensures the Digital Twin accurately reflects available beds and prevents sending beneficiaries to full shelters.
          </div>
        </div>

        {/* Right: Incoming Case Referrals (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-udaan-navy">
              Matched Assistance Referrals & Requests
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold">
              {incomingReferrals.length} Cases Referred
            </span>
          </div>

          <div className="space-y-3">
            {incomingReferrals.map(({ referral, caseItem }) => (
              <div
                key={referral.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-500">{caseItem.id}</span>
                    <strong className="block text-sm text-slate-900 font-bold">
                      {caseItem.beneficiary.identifierName}
                    </strong>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    referral.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : referral.status === 'In Progress' || referral.status === 'Accepted'
                      ? 'bg-blue-100 text-blue-800'
                      : referral.status === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {referral.status}
                  </span>
                </div>

                <p className="text-slate-600 text-[11px] italic">
                  "{caseItem.beneficiary.description}"
                </p>

                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  <span>Category: <strong className="text-slate-700 capitalize">{referral.category.replace('_', ' ')}</strong></span>
                  <span>Headcount: <strong className="text-slate-700">{caseItem.beneficiary.numberOfPeople} person(s)</strong></span>
                  <span>Urgency: <strong className="text-udaan-red uppercase">{referral.urgency}</strong></span>
                </div>

                {referral.rejectionReason && (
                  <div className="p-2 bg-red-50 text-red-800 rounded border border-red-200 text-[10px]">
                    <strong>Rejection Reason:</strong> {referral.rejectionReason}
                  </div>
                )}

                {referral.completionNotes && (
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-[10px]">
                    <strong>Completion Note:</strong> {referral.completionNotes}
                  </div>
                )}

                {/* NGO Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {referral.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAccept(referral.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                      >
                        Accept Referral
                      </button>
                      <button
                        onClick={() => setRejectingRefId(referral.id)}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-lg text-xs transition"
                      >
                        Reject with Explanation
                      </button>
                    </>
                  )}

                  {referral.status === 'Accepted' && (
                    <button
                      onClick={() => handleMarkProgress(referral.id)}
                      className="px-3 py-1.5 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition"
                    >
                      Mark Assistance In Progress
                    </button>
                  )}

                  {referral.status === 'In Progress' && (
                    <button
                      onClick={() => handleMarkComplete(referral.id)}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition"
                    >
                      Mark Completed & Verified
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rejection Modal with Required Explanation */}
      {rejectingRefId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-sm text-udaan-navy">Explain Reason for Rejection</h4>
              <button onClick={() => setRejectingRefId(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectConfirm} className="space-y-3">
              <div className="space-y-1">
                <label className="text-slate-700 font-semibold text-xs block">
                  Rejection Reason (Required for transparency):
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Currently full capacity in women's dorm; cannot accommodate until morning discharge."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingRefId(null)}
                  className="flex-1 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
