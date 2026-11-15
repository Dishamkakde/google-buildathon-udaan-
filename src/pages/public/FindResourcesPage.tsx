import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Building, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { AssistanceCategory } from '../../types';

export const FindResourcesPage: React.FC = () => {
  const { resources, organisations } = useUDAAN();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.organisationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || res.category === selectedCategory;

    const matchesZone =
      selectedZone === 'all' || res.location.zone === selectedZone;

    return matchesSearch && matchesCategory && matchesZone;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="bg-udaan-blue-soft text-udaan-blue text-xs font-bold px-3 py-1 rounded-full inline-block">
          Verified Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-udaan-navy tracking-tight">
          Verified Shelters, Food Points & Healthcare
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl font-light">
          Real-time directory of verified humanitarian partners in Bengaluru with active bed capacity, meal schedules, and medical desks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 sm:p-5 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by facility name, NGO partner, or services..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Service Categories</option>
          <option value="emergency_shelter">Emergency Night Shelter</option>
          <option value="food_water">Food & Drinking Water</option>
          <option value="medical_support">Medical & Wound Care</option>
          <option value="identity_docs">Legal Documentation & Aadhaar</option>
          <option value="child_protection">Child Protection Referral</option>
          <option value="skill_development">Livelihood & Skills</option>
        </select>

        {/* Zone Filter */}
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Bengaluru Zones</option>
          <option value="Majestic / KSR Hub">Majestic / KSR Hub</option>
          <option value="Kalasipalya / KR Market">Kalasipalya / KR Market</option>
          <option value="Shivajinagar / Cantonment">Shivajinagar / Cantonment</option>
          <option value="Yeshwanthpur Junction">Yeshwanthpur Junction</option>
          <option value="Koramangala / Dairy Circle">Koramangala / Dairy Circle</option>
          <option value="Peenya Industrial Area">Peenya Industrial Area</option>
        </select>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4 hover:border-udaan-blue/50 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider capitalize">
                  {res.category.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-udaan-navy leading-snug">{res.name}</h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{res.organisationName}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                {res.description}
              </p>

              {/* Location & Hours */}
              <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-udaan-blue shrink-0 mt-0.5" />
                  <span className="text-[11px]">{res.location.address || res.location.zone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px]">{res.operatingHours}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] font-mono">{res.emergencyContact}</span>
                </div>
              </div>

              {/* Accessibility tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {res.accessibilityFeatures.slice(0, 2).map((feat, i) => (
                  <span key={i} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Capacity Banner */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Available Capacity</span>
                <span className="text-sm font-extrabold text-udaan-teal">
                  {res.availableCapacity} / {res.totalCapacity} {res.unit}
                </span>
              </div>

              <Link
                to={`/get-help`}
                className="px-3 py-1.5 bg-udaan-navy text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
              >
                Request Intake
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
