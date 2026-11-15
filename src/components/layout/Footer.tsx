import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Phone, Building, ExternalLink, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-udaan-navy text-white pt-14 pb-8 border-t border-udaan-navy-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand Vision */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <path d="M12 28C14 20 20 14 36 12C36 12 30 20 28 26C26 32 20 34 16 34C13 34 12 31 12 28Z" fill="#18A999"/>
                  <path d="M14 34C18 28 24 24 38 18C38 18 31 27 28 32C25 37 20 38 17 38C15 38 14 36 14 34Z" fill="#2463A6"/>
                  <circle cx="34" cy="14" r="3.5" fill="#E5A23C"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight">UDAAN</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Humanitarian Intelligence Network. An intelligent humanitarian coordination platform ensuring that homeless people, abandoned elderly, vulnerable children and underserved individuals are connected with food, shelter, healthcare, and long-term independence.
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-udaan-teal/20 text-udaan-teal-light text-[11px] font-semibold border border-udaan-teal/40">
                Tagline: "No One Should Be Left Behind"
              </span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Humanitarian Mission</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">How UDAAN Coordinates Care</Link>
              </li>
              <li>
                <Link to="/dashboard/city-intelligence" className="hover:text-white transition-colors">Humanitarian Digital Twin</Link>
              </li>
              <li>
                <Link to="/dashboard/ai-coordinator" className="hover:text-white transition-colors">Multi-Agent AI Coordinator</Link>
              </li>
              <li>
                <Link to="/find-resources" className="hover:text-white transition-colors">Verified Shelter & Food Directory</Link>
              </li>
              <li>
                <Link to="/dashboard/rehabilitation" className="hover:text-white transition-colors">6-Stage Rehabilitation Engine</Link>
              </li>
            </ul>
          </div>

          {/* Portals & Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/get-help" className="hover:text-white transition-colors text-udaan-amber font-medium">Beneficiary Assistance Portal</Link>
              </li>
              <li>
                <Link to="/report-need" className="hover:text-white transition-colors">Report Person in Need</Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-white transition-colors">Volunteer Responder Portal</Link>
              </li>
              <li>
                <Link to="/partner-with-us" className="hover:text-white transition-colors">NGO & Shelter Partner Registration</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">City Operations Command Centre</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Staff & Partner Sign In</Link>
              </li>
            </ul>
          </div>

          {/* Ethics & Emergency */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Emergency & Ethics</h4>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-2">
              <div className="flex items-center gap-2 text-udaan-amber font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>Govt Emergency Helplines (India)</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Childline: <strong>1098</strong> | Senior Helpline: <strong>14567</strong> | Emergency: <strong>112</strong>
              </p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-udaan-teal-light font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ethical AI Safeguard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                No automated denial of care. Medical advice is routed to verified clinicians. Privacy & consent strictly protected.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Built With */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} UDAAN – Humanitarian Intelligence Network. Built with Google Cloud AI & Gemini.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <Award className="w-3.5 h-3.5 text-udaan-amber" />
              <span>Google Hackathon 2026 Submission</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">Bengaluru Demonstration Instance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
