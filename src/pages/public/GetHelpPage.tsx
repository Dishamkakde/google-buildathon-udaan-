import React, { useState } from 'react';
import { RequestHelpForm } from '../../components/assistance/RequestHelpForm';
import { ConversationalAIAssistant } from '../../components/assistance/ConversationalAIAssistant';
import { CaseTrackerWidget } from '../../components/assistance/CaseTrackerWidget';
import { LifeBuoy, Sparkles, Search, FileText, PhoneCall, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const GetHelpPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'ai' | 'tracker' | 'form'>('ai');
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const handleSubmitted = (caseId: string) => {
    setLastSubmittedId(caseId);
    setActiveTab('tracker');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-100 text-udaan-red px-3 py-1 rounded-full text-xs font-bold">
          <LifeBuoy className="w-4 h-4" />
          <span>{t.getHelpNow}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-udaan-navy tracking-tight">
          "No One Should Be Left Behind."
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          UDAAN connects people in need with food, emergency shelter, medical care, identity-card assistance, and rehabilitation through AI-coordinated human services.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center">
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'ai'
                ? 'bg-udaan-navy text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-udaan-teal" />
            <span>AI Voice & Conversational Intake (Feature 1)</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'tracker'
                ? 'bg-udaan-navy text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4 text-udaan-blue" />
            <span>Track Assistance Request (Feature 4)</span>
          </button>

          <button
            onClick={() => setActiveTab('form')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'form'
                ? 'bg-udaan-navy text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Standard Request Form</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-udaan-navy-soft to-udaan-blue-soft/30 border border-slate-200 p-4 rounded-2xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <strong className="text-udaan-navy font-bold block">
                Conversational AI Assistant (Kannada / Hindi / English)
              </strong>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Speak or type in your language. The AI extracts urgent needs, headcounts, and location to coordinate immediate relief.
              </p>
            </div>
            <span className="text-[10px] font-bold bg-white text-udaan-navy px-2.5 py-1 rounded-lg border border-slate-200 shrink-0">
              Web Speech API Enabled
            </span>
          </div>

          <ConversationalAIAssistant onSuccess={handleSubmitted} />
        </div>
      )}

      {activeTab === 'tracker' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs flex items-center justify-between">
            <div>
              <strong className="text-udaan-blue font-bold block">
                Live Case Tracking & Beneficiary Status
              </strong>
              <p className="text-blue-900/80 text-[11px] mt-0.5">
                Enter your Case ID (e.g. <span className="font-mono font-bold">CASE-2026-0891</span>) to view real-time coordination and referral progress.
              </p>
            </div>
            <span className="text-[10px] font-bold bg-white text-blue-800 px-2.5 py-1 rounded-lg border border-blue-200 shrink-0">
              Feature 4 Case Lifecycle
            </span>
          </div>

          <CaseTrackerWidget initialCaseId={lastSubmittedId || undefined} />
        </div>
      )}

      {activeTab === 'form' && (
        <div className="space-y-4">
          <RequestHelpForm defaultRole="self" onSuccess={handleSubmitted} />
        </div>
      )}

      {/* Emergency Helpline Footer Note */}
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-udaan-red" />
          <span>
            Immediate life-threatening medical emergency? Call <strong>108 (Ambulance)</strong> or <strong>112 (Emergency)</strong> immediately.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacy-protected humanitarian intake</span>
        </div>
      </div>
    </div>
  );
};
