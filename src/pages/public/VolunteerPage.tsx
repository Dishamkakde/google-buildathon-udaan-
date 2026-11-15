import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  UserCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUDAAN } from '../../context/UDAANContext';

export const VolunteerPage: React.FC = () => {
  const { switchRole } = useAuth();
  const { volunteers } = useUDAAN();

  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedZone, setSelectedZone] = useState('Majestic / KSR Hub');
  const [skills, setSkills] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="space-y-3 text-center sm:text-left">
        <span className="bg-udaan-teal-soft text-udaan-teal text-xs font-bold px-3 py-1 rounded-full inline-block">
          Volunteer Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-udaan-navy tracking-tight">
          Join the Ground Humanitarian Network
        </h1>
        <p className="text-base text-slate-600 max-w-2xl font-light leading-relaxed">
          UDAAN empowers volunteers with structured field intake tools, real-time crisis notifications, and verified service referrals.
        </p>

        {/* 1-Click Quick Login as Volunteer */}
        <div className="pt-2">
          <button
            onClick={() => switchRole('volunteer')}
            className="px-5 py-2.5 bg-udaan-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm inline-flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-udaan-teal" />
            <span>Switch to Volunteer Dashboard View (Demo)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-udaan-navy">Volunteer Application & Verification</h2>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Step 1 of 2</span>
          </div>

          {registeredSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-emerald-900">Application Received!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you, <strong>{name}</strong>. Your profile for <strong>{selectedZone}</strong> has been logged. Our Field Operations Coordinator will contact you for a brief orientation.
              </p>
              <Link
                to="/dashboard"
                onClick={() => switchRole('volunteer')}
                className="inline-block px-4 py-2 bg-udaan-navy text-white text-xs font-bold rounded-xl mt-2"
              >
                Access Volunteer Dashboard Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Full Name:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Deshpande"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Phone Number (SMS alerts):</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 XXXXX"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Email Address:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Primary Service Zone in Bengaluru:</label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                >
                  <option value="Majestic / KSR Hub">Majestic / KSR Hub</option>
                  <option value="Kalasipalya / KR Market">Kalasipalya / KR Market</option>
                  <option value="Shivajinagar / Cantonment">Shivajinagar / Cantonment</option>
                  <option value="Yeshwanthpur Junction">Yeshwanthpur Junction</option>
                  <option value="Koramangala / Dairy Circle">Koramangala / Dairy Circle</option>
                  <option value="Peenya Industrial Area">Peenya Industrial Area</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Skills / Languages / Certifications:</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Kannada, First Aid, Two-wheeler, Legal documentation"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 space-y-1">
                <strong className="text-slate-800 block text-[11px]">Volunteer Code of Conduct:</strong>
                <p className="text-[10px] leading-relaxed">
                  Volunteers agree to treat every beneficiary with dignity, maintain confidentiality, never solicit compensation, and immediately escalate physical danger to authorized emergency services.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-udaan-teal hover:bg-teal-700 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Submit Volunteer Registration</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Active Field Volunteers & Impact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-udaan-navy">Active Field Volunteers in Action</h3>
            <div className="space-y-3">
              {volunteers.map((vol) => (
                <div key={vol.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 block font-semibold">{vol.name}</strong>
                    <span className="text-[11px] text-slate-500">{vol.assignedZones.join(', ')}</span>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {vol.completedInterventions} Interventions
                    </span>
                    <span className="block text-[10px] text-slate-400 capitalize">{vol.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-udaan-navy to-udaan-navy-light text-white p-6 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-udaan-amber font-bold">
              <Award className="w-4 h-4" />
              <span>Certified Volunteer Badge System</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-light">
              Volunteers earn verified credentials for hours completed, first-aid interventions, and successful social reintegration milestones verified by licensed social workers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
