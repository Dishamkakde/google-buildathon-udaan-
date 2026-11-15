import React, { useState } from 'react';
import {
  FolderHeart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  ChevronRight,
  ShieldAlert,
  Send,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';
import { AssistanceCase, CaseStatus, UrgencyLevel } from '../../types';

export const AssistanceCasesPage: React.FC = () => {
  const { cases, approveCase, updateReferralStatus } = useUDAAN();
  const { currentUser } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CaseStatus>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | UrgencyLevel>('all');
  const [selectedCase, setSelectedCase] = useState<AssistanceCase | null>(cases[0] || null);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.beneficiary.identifierName?.toLowerCase().includes(search.toLowerCase()) ||
      c.beneficiary.description.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || c.urgency === urgencyFilter;

    return matchesSearch && matchesStatus && matchesUrgency;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
            Assistance Cases & Referrals
          </h1>
          <p className="text-xs text-slate-500">
            Case management queue with AI need assessment, smart matches, and human approval tracking.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          Total Cases: {cases.length} | Pending Approval: {cases.filter(c => !c.humanReviewApproved).length}
        </span>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 flex flex-col md:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by case ID, beneficiary name, or circumstances..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Case Statuses</option>
          <option value="pending_approval">Pending Human Approval</option>
          <option value="referrals_active">Referrals Active / Dispatched</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value as any)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Urgency Levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Cases List & Case Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cases List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCases.map((c) => {
            const isSelected = selectedCase?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-4 rounded-2xl border transition shadow-card cursor-pointer space-y-2 text-xs ${
                  isSelected
                    ? 'bg-udaan-blue-soft/50 border-udaan-blue ring-2 ring-udaan-blue/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-slate-500">{c.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    c.urgency === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : c.urgency === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {c.urgency}
                  </span>
                </div>

                <div>
                  <strong className="text-sm font-bold text-slate-900 block">
                    {c.beneficiary.identifierName || 'Beneficiary'}
                  </strong>
                  <p className="text-slate-600 line-clamp-2 mt-0.5">
                    {c.beneficiary.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>{c.beneficiary.approximateLocation.zone.split('/')[0]}</span>
                  <span className={`font-semibold ${c.humanReviewApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {c.humanReviewApproved ? 'Approved ✓' : 'Needs Approval'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Details File (7 cols) */}
        <div className="lg:col-span-7">
          {selectedCase ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6 text-xs">
              {/* Case Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{selectedCase.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      selectedCase.urgency === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedCase.urgency} Urgency
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-udaan-navy mt-1">
                    {selectedCase.beneficiary.identifierName}
                  </h2>
                  <p className="text-slate-500 text-[11px]">
                    Reported by: <strong>{selectedCase.beneficiary.reporterName}</strong> | Language: <strong>{selectedCase.beneficiary.preferredLanguage.toUpperCase()}</strong>
                  </p>
                </div>

                {/* Human Approval Status */}
                <div className="text-right">
                  {!selectedCase.humanReviewApproved ? (
                    <button
                      onClick={() => approveCase(selectedCase.id, currentUser.name)}
                      className="px-4 py-2 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm text-xs"
                    >
                      Authorize Case Referrals
                    </button>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Approved by {selectedCase.approvedBy}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Original Intake Circumstances */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-700 block">Beneficiary Description:</span>
                <p className="text-slate-800 leading-relaxed italic">
                  "{selectedCase.beneficiary.description}"
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500">
                  <span>📍 {selectedCase.beneficiary.approximateLocation.address || selectedCase.beneficiary.approximateLocation.zone}</span>
                  {selectedCase.beneficiary.accessibilityNeeds && (
                    <span>♿ Accessibility: {selectedCase.beneficiary.accessibilityNeeds}</span>
                  )}
                </div>
              </div>

              {/* Gemini Structured AI Assessment */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Sparkles className="w-4 h-4 text-udaan-teal" />
                    <span>Gemini AI Structured Assessment</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {selectedCase.aiAssessment.confidence_score}% Confidence
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Food Assistance</span>
                    <strong className="text-slate-800 capitalize">{selectedCase.aiAssessment.food_assistance}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Emergency Shelter</span>
                    <strong className="text-slate-800 capitalize">{selectedCase.aiAssessment.shelter}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Medical Evaluation</span>
                    <strong className="text-slate-800 capitalize">{selectedCase.aiAssessment.medical_evaluation}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Elderly Care</span>
                    <strong className="text-slate-800 capitalize">{selectedCase.aiAssessment.elderly_care}</strong>
                  </div>
                </div>

                {selectedCase.aiAssessment.safety_alert && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs">
                    <strong className="block text-red-700 font-bold mb-0.5">Safety Alert:</strong>
                    {selectedCase.aiAssessment.safety_alert}
                  </div>
                )}
              </div>

              {/* Active Referrals */}
              <div className="space-y-3">
                <span className="font-bold text-slate-800 block text-xs">
                  Active Service Referrals ({selectedCase.referrals.length})
                </span>
                <div className="space-y-2">
                  {selectedCase.referrals.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-slate-900 block font-semibold">{ref.organisationName}</strong>
                        <span className="text-slate-500 capitalize">{ref.category.replace('_', ' ')}</span>
                        {ref.completionNotes && (
                          <p className="text-slate-600 text-[11px] mt-1 italic">Notes: {ref.completionNotes}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          ref.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ref.status === 'Accepted'
                            ? 'bg-blue-100 text-blue-800'
                            : ref.status === 'In Progress'
                            ? 'bg-purple-100 text-purple-800'
                            : ref.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ref.status}
                        </span>

                        {ref.status !== 'Completed' && (
                          <button
                            onClick={() =>
                              updateReferralStatus(ref.id, 'Completed', `Verified delivery completed by ${currentUser.name}.`)
                            }
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Trail & Timeline */}
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <span className="font-bold text-slate-700 block text-xs">Case Activity Timeline</span>
                <div className="space-y-2">
                  {selectedCase.timeline.map((item) => (
                    <div key={item.id} className="text-[11px] border-l-2 border-udaan-blue pl-3 py-1 space-y-0.5">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-semibold text-slate-700">{item.actor}</span>
                        <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-600 font-medium">{item.action}</p>
                      {item.note && <p className="text-slate-500 italic">{item.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              Select a case from the queue to view complete file.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
