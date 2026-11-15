import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Award
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';

export const OrganisationsPage: React.FC = () => {
  const { organisations } = useUDAAN();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = organisations.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.registrationNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
            Verified Partner Organisations & Shelters
          </h1>
          <p className="text-xs text-slate-500">
            Institutional directory of audited non-profits, municipal shelters, and charitable clinics.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
          {organisations.length} Registered Partners
        </span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by organisation name or registration number..."
            className="w-full text-xs pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Organisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4 hover:border-udaan-blue/50 transition text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] text-slate-400">{org.registrationNumber}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{org.verifiedStatus.toUpperCase()}</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-udaan-navy leading-snug">{org.name}</h3>
                <p className="text-slate-500 text-[11px] mt-0.5">Contact: {org.contactPerson}</p>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-udaan-blue shrink-0 mt-0.5" />
                  <span className="text-[11px]">{org.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{org.operatingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] font-mono">{org.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-udaan-blue">{org.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {org.serviceCategories.map((c) => (
                  <span key={c} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                    {c.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Referrals Stats Banner */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Referral Performance</span>
                <span className="text-sm font-extrabold text-udaan-navy">
                  {org.referralsFulfilled} / {org.referralsReceived}{' '}
                  <span className="text-[10px] text-emerald-600 font-normal">Fulfilled</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Rating</span>
                <span className="text-xs font-bold text-udaan-amber">★ {org.rating} / 5.0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
