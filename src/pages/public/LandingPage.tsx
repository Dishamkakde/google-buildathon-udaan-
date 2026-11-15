import React from 'react';
import { Link } from 'react-router-dom';
import {
  LifeBuoy,
  ArrowRight,
  ShieldCheck,
  Compass,
  MapPin,
  Bot,
  Users,
  Building,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useLanguage } from '../../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { setGuidedDemoActive, cases, resources, organisations, rehabPlans } = useUDAAN();
  const { t } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-udaan-blue-soft/50 via-white to-udaan-offwhite pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-udaan-blue-soft text-udaan-blue px-3 py-1.5 rounded-full text-xs font-bold border border-udaan-blue/20 shadow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-udaan-teal" />
                <span>Humanitarian Intelligence Network</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-udaan-navy tracking-tight leading-[1.15]">
                Every Life Deserves a Chance. <br className="hidden sm:inline" />
                <span className="text-udaan-blue">Every Person Deserves Support.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-light">
                UDAAN brings people, NGOs, volunteers, shelters and healthcare services together through intelligent humanitarian coordination.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/get-help"
                  className="px-6 py-3.5 bg-udaan-red hover:bg-red-700 text-white font-bold text-sm rounded-xl transition shadow-elevated flex items-center gap-2"
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>GET HELP NOW</span>
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-udaan-navy hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition shadow-card flex items-center gap-2"
                >
                  <span>EXPLORE OUR MISSION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setGuidedDemoActive(true)}
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-udaan-blue font-bold text-sm rounded-xl border border-udaan-blue/30 transition shadow-subtle flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4 text-udaan-teal" />
                  <span>Watch End-to-End Demo</span>
                </button>
              </div>

              {/* Zero-barrier pledge badge */}
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-3">
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero Barrier: No Aadhaar, phone or documentation mandatory</span>
                </span>
                <span>•</span>
                <span>Kannada, Hindi & English</span>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white p-2">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
                    alt="Volunteers coordinating care and food assistance in Indian community"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-udaan-navy/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-udaan-teal-light">
                      Bengaluru Ground Coordination
                    </span>
                    <h3 className="font-bold text-sm">
                      KSR Station & KR Market Night Outreach
                    </h3>
                    <p className="text-[11px] text-slate-300 font-light mt-0.5">
                      Robin Hood Army, BOSCO & BBMP mobile night shelters synchronized via UDAAN.
                    </p>
                  </div>
                </div>

                {/* Floating Telemetry Badge */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-700">Digital Twin Telemetry</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      Live Simulation
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-medium">Active Wards Monitored:</span>
                    <span className="font-extrabold text-udaan-blue">8 Key Bengaluru Zones</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-medium">Verified Shelter Capacity:</span>
                    <span className="font-extrabold text-udaan-teal">265 Emergency Beds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT OVERVIEW (DEMO DATA LABELED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <span className="bg-udaan-amber text-udaan-navy font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                DEMO DATA / SIMULATED METRICS
              </span>
              <h2 className="text-xl font-bold text-udaan-navy mt-1">
                Ecosystem Operational Overview
              </h2>
              <p className="text-xs text-slate-500">
                Metrics aggregated from verified simulation seed records across Bengaluru city zones.
              </p>
            </div>

            <Link
              to="/dashboard/analytics"
              className="text-xs font-bold text-udaan-blue hover:underline flex items-center gap-1"
            >
              <span>Explore Analytics Command Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Assistance Requests</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-udaan-navy mt-1 block">189</span>
              <span className="text-[10px] text-slate-400">Received & triage-analyzed</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">People Connected</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-udaan-blue mt-1 block">174</span>
              <span className="text-[10px] text-slate-400">Immediate relief accessed</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Verified Partners</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-udaan-teal mt-1 block">18</span>
              <span className="text-[10px] text-slate-400">NGOs, shelters, clinics</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Completed Referrals</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 block">412</span>
              <span className="text-[10px] text-slate-400">Food, shelter & health</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Rehabilitation Journeys</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-udaan-amber mt-1 block">46</span>
              <span className="text-[10px] text-slate-400">Active 6-stage pathways</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW UDAAN WORKS: 6 STEPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-udaan-blue">
            Coordination Protocol
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-udaan-navy">
            How UDAAN Coordinates Care
          </h2>
          <p className="text-sm text-slate-600 font-light">
            Moving from fragmented charity hand-outs to a unified, verifiable humanitarian infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Identify a Person in Need',
              desc: 'Anyone can report via voice or simple guided form in Kannada, Hindi, or English. Authorized field volunteers can submit on behalf of individuals without phones.',
              icon: Eye
            },
            {
              num: '02',
              title: 'Understand Their Circumstances',
              desc: 'Natural language analysis parses spoken distress without requiring clinical terms, Aadhaar numbers, or email addresses.',
              icon: Bot
            },
            {
              num: '03',
              title: 'Assess Essential Needs',
              desc: 'Categorizes nutrition, shelter, medical wound care, elderly support, and child protection with strict human-review safeguards.',
              icon: ShieldCheck
            },
            {
              num: '04',
              title: 'Match Verified Resources',
              desc: 'Spatial algorithms match real-time verified shelter bed availability, active community kitchens, and hospital casualty desks.',
              icon: MapPin
            },
            {
              num: '05',
              title: 'Coordinate Assistance',
              desc: 'Dispatches referral tokens with human social-worker authorization. Partners accept referrals and volunteers verify ground execution.',
              icon: HeartHandshake
            },
            {
              num: '06',
              title: 'Support Long-term Independence',
              desc: 'A personalized 6-stage journey restoring legal identity, pension access, vocational skills, and sustainable independent living.',
              icon: Compass
            }
          ].map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-3 hover:border-udaan-blue transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-udaan-blue-soft text-udaan-blue flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold text-slate-300">{step.num}</span>
                </div>
                <h3 className="font-bold text-base text-udaan-navy">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="bg-udaan-navy text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-udaan-teal-light">
              Systemic Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Fragmented Humanitarian Services Fail
            </h2>
            <p className="text-sm text-slate-300 font-light leading-relaxed">
              Every day, food is wasted in one corner of the city while elderly individuals starve in another. Night shelters sit with empty beds because people on the street don't know they exist or cannot pass arbitrary documentation gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 text-udaan-amber font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>The Traditional Fragmentation</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Information silos:</strong> NGOs have no unified visibility into city-level shortages or real-time bed occupancy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Documentation barrier:</strong> Demanding Aadhaar cards or smartphones bars the most vulnerable from emergency shelter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span><strong>Short-term band-aids:</strong> Distributing a meal packet today without a rehabilitation pathway ensures someone is still on the pavement next month.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-udaan-teal/40 space-y-4">
              <div className="flex items-center gap-2 text-udaan-teal-light font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-udaan-teal" />
                <span>The UDAAN Intelligent Infrastructure</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Humanitarian Digital Twin:</strong> Aggregates demand vs supply in real time to show city administrators where resources are missing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>AI Multi-Agent Coordinator:</strong> Orchestrates shelter, food, healthcare, and paralegals simultaneously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Rehabilitation Engine:</strong> Connects emergency survival to pension access, health stabilization, and dignified living.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 6 MODULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-udaan-blue">
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-udaan-navy">
            Built for Real-World Field Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <Bot className="w-8 h-8 text-udaan-blue" />
            <h3 className="font-bold text-base text-udaan-navy">AI Need Assessment</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Gemini-powered multilingual extraction. Parses voice or text in Kannada, Hindi, and English into structured humanitarian categories.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <MapPin className="w-8 h-8 text-udaan-teal" />
            <h3 className="font-bold text-base text-udaan-navy">Humanitarian Digital Twin</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Geospatial city intelligence dashboard. Telemetry on shelter capacity, meal deficits, and hypothetical scenario simulations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <Sparkles className="w-8 h-8 text-udaan-amber" />
            <h3 className="font-bold text-base text-udaan-navy">Smart Resource Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Algorithmic proximity, accessibility, and capacity scoring. Ranks verified shelters and charitable healthcare desks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <LifeBuoy className="w-8 h-8 text-udaan-red" />
            <h3 className="font-bold text-base text-udaan-navy">Emergency Coordination</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Human-in-the-loop approval workflows. Social workers authorize referrals before partner dispatches take place.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <Users className="w-8 h-8 text-udaan-blue" />
            <h3 className="font-bold text-base text-udaan-navy">NGO & Volunteer Network</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Dedicated partner dashboards for updating bed availability, publishing food distribution schedules, and logging deliveries.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
            <Compass className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-base text-udaan-navy">Rehabilitation & Independence</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              6-stage longitudinal journey engine. Tracking senior pensions, identity recovery, and permanent assisted shelter.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-udaan-navy via-udaan-navy-light to-udaan-navy text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Help build a world where nobody is invisible.
            </h2>
            <p className="text-sm text-slate-300 font-light">
              Whether you are an individual needing help, a citizen reporting someone on the street, a volunteer responder, or an NGO shelter partner.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/get-help"
              className="px-6 py-3.5 bg-udaan-red hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Request Assistance</span>
            </Link>

            <Link
              to="/volunteer"
              className="px-6 py-3.5 bg-udaan-teal hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Join as Volunteer</span>
            </Link>

            <Link
              to="/partner-with-us"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-udaan-navy font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              <span>Become a Partner</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
