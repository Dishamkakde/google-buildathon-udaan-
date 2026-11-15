import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Bot,
  Heart,
  FileText,
  LifeBuoy
} from 'lucide-react';
import { ConversationalAIAssistant } from '../../components/assistance/ConversationalAIAssistant';
import { CaseTrackerWidget } from '../../components/assistance/CaseTrackerWidget';
import { JourneyTimeline } from '../../components/rehabilitation/JourneyTimeline';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';

export const BeneficiaryDashboard: React.FC = () => {
  const { cases, resources, rehabPlans } = useUDAAN();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'request' | 'tracker' | 'services' | 'rehabilitation'>('request');

  // Ramesh Rao case or first case
  const myCase = cases[0];
  const myPlan = rehabPlans[0];

  return (
    <div className="space-y-6">
      {/* Role Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-red text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Role A
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              Beneficiary Support Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Welcome, <strong>{currentUser.name}</strong>. Submit requests using conversational voice/text AI, track active referrals, and follow your rehabilitation journey.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'request' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Request Assistant
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'tracker' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Track My Case
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'services' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Matched Services
          </button>
          <button
            onClick={() => setActiveTab('rehabilitation')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'rehabilitation' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rehabilitation Journey
          </button>
        </div>
      </div>

      {/* TAB 1: Conversational AI Request (Feature 1) */}
      {activeTab === 'request' && (
        <div className="space-y-4">
          <ConversationalAIAssistant onSuccess={(caseId) => setActiveTab('tracker')} />
        </div>
      )}

      {/* TAB 2: Case Tracker (Feature 4) */}
      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <CaseTrackerWidget initialCaseId={myCase?.id} />
        </div>
      )}

      {/* TAB 3: Matched Services Nearby (Feature 2) */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-udaan-navy">
                Verified Nearby Services Matched to Your Profile
              </h3>
              <p className="text-xs text-slate-500">
                Recommended by Smart Resource Matching Engine based on proximity and verified capacity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {resources.slice(0, 3).map((res) => (
                <div key={res.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                      {res.category.replace('_', ' ')}
                    </span>
                    <strong className="block text-slate-900 text-sm">{res.name}</strong>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{res.description}</p>
                    <div className="text-[11px] text-slate-500 pt-1 space-y-0.5">
                      <p>📍 {res.location.address || res.location.zone}</p>
                      <p>🕒 {res.operatingHours}</p>
                      <p>📞 {res.emergencyContact}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-emerald-700 font-bold text-[11px]">
                      {res.availableCapacity} {res.unit} open
                    </span>
                    <span className="text-[10px] text-slate-400">Verified Partner</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Rehabilitation Progress (Feature 5) */}
      {activeTab === 'rehabilitation' && myPlan && (
        <div className="space-y-4">
          <JourneyTimeline plan={myPlan} />
        </div>
      )}
    </div>
  );
};
