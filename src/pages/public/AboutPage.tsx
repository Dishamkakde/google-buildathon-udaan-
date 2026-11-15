import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Heart,
  Award,
  Lock,
  Compass,
  ArrowRight,
  Sparkles,
  Users2,
  FileText
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-udaan-blue-soft text-udaan-blue px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-udaan-teal" />
          <span>Our Humanitarian Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-udaan-navy tracking-tight">
          "No One Should Be Left Behind."
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed font-light">
          UDAAN is not an ordinary NGO directory or a donation crowdfunding site. It is an intelligent humanitarian infrastructure platform connecting vulnerable individuals with food, shelter, healthcare, identity documentation, and long-term independence through one coordinated ecosystem.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-udaan-blue-soft text-udaan-blue flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-udaan-navy">Dignity First</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            Every human life is invaluable. We eliminate dehumanizing verification barriers. Possession of a smartphone, email address, or identity document is never a prerequisite for emergency food or shelter.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-udaan-teal-soft text-udaan-teal flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-udaan-navy">Beyond Crisis to Autonomy</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            Feeding someone today is essential, but leaving them on the street tomorrow is unacceptable. Our 6-stage rehabilitation engine guides beneficiaries all the way from immediate crisis stabilization to independent housing.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-udaan-amber flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-udaan-navy">Ethical AI Collaboration</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-light">
            AI must assist human workers, not replace their empathy or judgment. Gemini provides triage synthesis, but verified human social workers hold final authorization over dispatches and referrals.
          </p>
        </div>
      </div>

      {/* Ethical Safeguard Charter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-udaan-navy" />
          <h2 className="text-lg font-bold text-udaan-navy">
            Our Strict Ethical & Privacy Safeguards (Section 16)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">1. Zero Automated Denial of Care:</strong>
            <p className="text-slate-600 leading-relaxed">
              No AI algorithm is permitted to reject or deny an assistance request. Denials can only be issued by registered organizations with written human explanations.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">2. No Facial Recognition:</strong>
            <p className="text-slate-600 leading-relaxed">
              We strictly prohibit facial recognition or biometric profiling of homeless or vulnerable individuals.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">3. Privacy & Location Masking:</strong>
            <p className="text-slate-600 leading-relaxed">
              Exact sleeping locations and personal health records are strictly masked and accessible only to authorized field responders.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-semibold">4. Child Protection Referral Protocol:</strong>
            <p className="text-slate-600 leading-relaxed">
              All cases involving minors or runaway youth are routed directly to authorized Child Welfare Committees (CWCs) under the Juvenile Justice Act 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Google Cloud AI Architecture Note */}
      <div className="bg-gradient-to-r from-udaan-navy to-udaan-navy-light text-white p-6 sm:p-8 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-udaan-teal-light uppercase tracking-wider">
          Technology Infrastructure
        </span>
        <h3 className="text-xl font-bold">Built on the Google Cloud & Gemini Ecosystem</h3>
        <p className="text-xs text-slate-300 leading-relaxed font-light">
          UDAAN uses Google Gemini 1.5 Flash structured function calling for multilingual need parsing, CartoDB/Leaflet geospatial intelligence for citywide digital twin modeling, and role-based operational command dashboards for NGO and volunteer coordination.
        </p>
        <div className="pt-2">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-udaan-teal-light hover:underline"
          >
            <span>Read full technical architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
