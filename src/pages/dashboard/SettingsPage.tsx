import React, { useState } from 'react';
import {
  Settings,
  Key,
  ShieldCheck,
  RotateCcw,
  Globe,
  Bell,
  CheckCircle2,
  AlertCircle,
  FileDown
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useLanguage } from '../../context/LanguageContext';
import { geminiService } from '../../services/geminiService';

export const SettingsPage: React.FC = () => {
  const { resetToDefaultData, demoMode, setDemoMode, cases } = useUDAAN();
  const { currentLanguage, setLanguage } = useLanguage();

  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [keySaved, setKeySaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    geminiService.setApiKey(apiKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handleReset = () => {
    resetToDefaultData();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  const handleExportAuditLogs = () => {
    const logs = cases.flatMap(c => c.auditLogs.map(l => ({ caseId: c.id, ...l })));
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `udaan-audit-logs-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
          System Configuration & Settings
        </h1>
        <p className="text-xs text-slate-500">
          Manage Gemini AI connectivity, platform language defaults, audit trails, and demo data state.
        </p>
      </div>

      {/* Gemini API Key Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="w-4 h-4 text-udaan-blue" />
          <h2 className="text-sm font-bold text-udaan-navy">Google Gemini API Configuration</h2>
        </div>

        <p className="text-slate-600 leading-relaxed font-light">
          UDAAN runs fully offline out-of-the-box using its built-in high-fidelity multi-agent simulation engine. If you provide a Google Gemini API Key, live multilingual LLM function calls will be executed directly.
        </p>

        <form onSubmit={handleSaveApiKey} className="space-y-3">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">Gemini API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-xs focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${apiKey.length > 5 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-slate-500">
                {apiKey.length > 5 ? 'Custom API Key Configured' : 'Using Built-in Gemini Simulator'}
              </span>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition"
            >
              {keySaved ? 'Saved Successfully ✓' : 'Save Key'}
            </button>
          </div>
        </form>
      </div>

      {/* Language Default Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-4 h-4 text-udaan-teal" />
          <h2 className="text-sm font-bold text-udaan-navy">Default Interface Language</h2>
        </div>

        <div className="flex gap-3">
          {[
            { code: 'en' as const, label: 'English' },
            { code: 'kn' as const, label: 'ಕನ್ನಡ (Kannada)' },
            { code: 'hi' as const, label: 'हिन्दी (Hindi)' }
          ].map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition ${
                currentLanguage === lang.code
                  ? 'bg-udaan-navy text-white border-udaan-navy shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs & Security Export */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-udaan-navy">Audit Trail & Compliance Export</h2>
        </div>

        <p className="text-slate-600 leading-relaxed font-light">
          Section 15 compliance: In accordance with privacy and accountability standards, every case creation, multi-agent synthesis, and human approval sign-off is logged into an immutable audit stream.
        </p>

        <button
          onClick={handleExportAuditLogs}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-300 transition flex items-center gap-2"
        >
          <FileDown className="w-4 h-4 text-slate-500" />
          <span>Export System Audit Logs (.JSON)</span>
        </button>
      </div>

      {/* Demo State Reset */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-card p-6 space-y-4 text-xs bg-red-50/20">
        <div className="flex items-center gap-2 border-b border-red-100 pb-3">
          <RotateCcw className="w-4 h-4 text-udaan-red" />
          <h2 className="text-sm font-bold text-red-900">Reset Demo Data</h2>
        </div>

        <p className="text-slate-600 leading-relaxed font-light">
          Restores Bengaluru seed records, Ramesh Rao case file, verified shelter capacities, and sample volunteer accounts back to factory demonstration state.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-udaan-red hover:bg-red-700 text-white font-bold rounded-xl transition shadow-sm"
          >
            {resetDone ? 'Reset Completed ✓' : 'Reset Simulated Dataset'}
          </button>
        </div>
      </div>
    </div>
  );
};
