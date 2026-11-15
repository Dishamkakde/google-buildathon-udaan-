import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Clock,
  Layers,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUDAAN } from '../../context/UDAANContext';
import { AssistanceCategory } from '../../types';

export const PartnerWithUsPage: React.FC = () => {
  const { switchRole } = useAuth();
  const { organisations, addOrganisation } = useUDAAN();

  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedZones, setSelectedZones] = useState<string>('Majestic / KSR Hub');
  const [categories, setCategories] = useState<AssistanceCategory[]>(['emergency_shelter', 'food_water']);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addOrganisation({
      name: orgName,
      registrationNumber: regNo || `NGO-KA-${Date.now().toString().slice(-4)}`,
      serviceCategories: categories,
      coverageZones: [selectedZones],
      address: 'Bengaluru Office',
      contactPerson,
      email,
      phone,
      operatingHours: '24/7 Crisis Response',
      verifiedStatus: 'pending_verification',
      activeSheltersCount: 1,
      activeMealProgramsCount: 1,
      rating: 4.8,
      referralsReceived: 0,
      referralsFulfilled: 0
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="space-y-3 text-center sm:text-left">
        <span className="bg-udaan-blue-soft text-udaan-blue text-xs font-bold px-3 py-1 rounded-full inline-block">
          Institutional Partnership
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-udaan-navy tracking-tight">
          Partner With UDAAN as an NGO or Shelter
        </h1>
        <p className="text-base text-slate-600 max-w-2xl font-light leading-relaxed">
          Connect your shelter beds, community kitchens, charitable clinics, or legal aid desks to our intelligent humanitarian network.
        </p>

        {/* Quick Demo Switch */}
        <div className="pt-2">
          <button
            onClick={() => switchRole('ngo_partner')}
            className="px-5 py-2.5 bg-udaan-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm inline-flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-udaan-teal" />
            <span>Switch to NGO Partner Dashboard View (Demo)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Registration Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-udaan-navy">Organisation Registration & Onboarding</h2>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Verification Required</span>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-emerald-900">Partner Application Logged!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you, <strong>{orgName}</strong>. Your profile has been added with <code>pending_verification</code> status. An administrator will verify your NGO registration credentials before activating public referrals.
              </p>
              <Link
                to="/dashboard"
                onClick={() => switchRole('ngo_partner')}
                className="inline-block px-4 py-2 bg-udaan-navy text-white text-xs font-bold rounded-xl mt-2"
              >
                Go to NGO Partner Dashboard
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Organisation Name:</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Karunashraya Hospice & Elder Care Trust"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Registration / Darpan / 12A ID:</label>
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="e.g. NGO-KA-BLR-2021-XXXX"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Field Contact Person:</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Rajesh Sharma (Director)"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">Official Email:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="intake@organization.org"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 block">24/7 Helpline or Phone:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 80 2500 XXXX"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Primary Coverage Zone in Bengaluru:</label>
                <select
                  value={selectedZones}
                  onChange={(e) => setSelectedZones(e.target.value)}
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

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] space-y-1">
                <strong className="block font-semibold">Institutional Verification Notice (Section 11):</strong>
                <p>
                  To prevent fraudulent services, all partner facilities undergo physical audit by municipal social workers before being granted verified status on the Humanitarian Digital Twin.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-udaan-teal" />
                <span>Submit Partner Application</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Verified Partners Showcase */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-udaan-navy">Current Verified Network Partners</h3>
            <div className="space-y-3">
              {organisations.map((org) => (
                <div key={org.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-semibold">{org.name}</strong>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{org.verifiedStatus}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">{org.registrationNumber}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1">
                    <span>{org.coverageZones.join(', ')}</span>
                    <span className="font-bold text-udaan-blue">{org.referralsFulfilled} referrals fulfilled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
