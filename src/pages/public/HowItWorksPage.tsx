import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  Bot,
  MapPin,
  Sparkles,
  ShieldCheck,
  PlayCircle,
  ArrowRight,
  Utensils,
  Home,
  Stethoscope,
  FileText,
  Compass,
  Cpu
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';

export const HowItWorksPage: React.FC = () => {
  const { setGuidedDemoActive } = useUDAAN();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <span className="bg-udaan-blue-soft text-udaan-blue text-xs font-bold px-3 py-1 rounded-full inline-block">
          Architectural Blueprint
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-udaan-navy tracking-tight">
          How UDAAN Works
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed font-light">
          A unified humanitarian ecosystem powered by two interconnected intelligence systems: System A (The Humanitarian Digital Twin) and System B (The AI Assistance Coordinator).
        </p>

        <div className="pt-2">
          <button
            onClick={() => setGuidedDemoActive(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-udaan-teal to-udaan-blue text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-95 transition inline-flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Launch 8-Step Interactive Walkthrough</span>
          </button>
        </div>
      </div>

      {/* SYSTEM A vs SYSTEM B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* System A */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-udaan-blue-soft text-udaan-blue flex items-center justify-center font-bold">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-udaan-blue">Macro Level</span>
            <h3 className="text-xl font-bold text-udaan-navy">System A: Humanitarian Digital Twin</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            A city-level intelligence platform that continuously analyzes aggregated humanitarian demand and supply across municipal wards.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-blue" />
              <span>Monitors verified shelter bed availability in real time</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-blue" />
              <span>Calculates local meal deficits and food distribution schedules</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-blue" />
              <span>Simulates hypothetical resource scenarios ("What if +100 beds?")</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-blue" />
              <span>Identifies dark zones requiring proactive volunteer outreach</span>
            </li>
          </ul>
        </div>

        {/* System B */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-udaan-teal-soft text-udaan-teal flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-udaan-teal">Micro Level</span>
            <h3 className="text-xl font-bold text-udaan-navy">System B: AI Assistance Coordinator</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            A multi-agent agentic intelligence engine powered by Google Gemini that understands natural-language requests and coordinates care.
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-teal" />
              <span>Multilingual voice understanding (Kannada, Hindi, English)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-teal" />
              <span>Orchestrates 8 specialized humanitarian domain agents</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-teal" />
              <span>Gated by human social-worker approval before referral dispatch</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-udaan-teal" />
              <span>Tracks outcomes through a 6-stage long-term rehabilitation engine</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 8-AGENT SYSTEM EXPLANATION */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-udaan-navy" />
          <h2 className="text-lg font-bold text-udaan-navy">
            The 8 Specialized AI Agents (Section 7)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">1. Need Assessment Agent</strong>
            <p className="text-slate-600 text-[11px]">Understands spoken or written distress and extracts structured needs.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">2. Food Assistance Agent</strong>
            <p className="text-slate-600 text-[11px]">Locates verified meals and active evening distribution points.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">3. Shelter Coordination Agent</strong>
            <p className="text-slate-600 text-[11px]">Matches verified beds based on accessibility, age, and location.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">4. Healthcare Agent</strong>
            <p className="text-slate-600 text-[11px]">Routes to charitable hospital OPDs without diagnosing or prescribing.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">5. Documentation Agent</strong>
            <p className="text-slate-600 text-[11px]">Explains procedures for address-less Aadhaar and pension cards.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">6. Rehabilitation Agent</strong>
            <p className="text-slate-600 text-[11px]">Formulates personalized 6-stage social reintegration pathways.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">7. Follow-up Agent</strong>
            <p className="text-slate-600 text-[11px]">Monitors overdue check-ins and escalates unresolved cases.</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-udaan-navy block font-bold">8. Orchestrator Agent</strong>
            <p className="text-slate-600 text-[11px]">Synthesizes all agents and presents plan for human authorization.</p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-udaan-navy">Ready to See UDAAN in Action?</h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Explore the live interactive command center or submit a simulated assistance request in Kannada, Hindi, or English.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/get-help"
            className="px-6 py-2.5 bg-udaan-red text-white text-xs font-bold rounded-xl hover:bg-red-700 transition shadow-sm"
          >
            Beneficiary Request Portal
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2.5 bg-udaan-navy text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition shadow-sm"
          >
            Open Operations Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
