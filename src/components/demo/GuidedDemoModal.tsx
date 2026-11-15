import React from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Utensils,
  Home,
  Stethoscope,
  FileText,
  UserCheck,
  Clock,
  Compass,
  Play
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';

export const GuidedDemoModal: React.FC = () => {
  const {
    guidedDemoActive,
    setGuidedDemoActive,
    activeDemoStep,
    nextDemoStep,
    prevDemoStep,
    cases,
    approveCase,
    updateReferralStatus,
    updateMilestone,
    rehabPlans
  } = useUDAAN();

  const { switchRole } = useAuth();

  if (!guidedDemoActive) return null;

  // Primary demo case: Ramesh Rao
  const demoCase = cases.find(c => c.id === 'case-2026-0891') || cases[0];
  const demoPlan = rehabPlans.find(p => p.caseId === demoCase?.id) || rehabPlans[0];

  const steps = [
    {
      num: 1,
      title: 'Volunteer Intake & Multilingual Voice/Text',
      tagline: 'Field volunteer reports elderly homeless individual near Majestic station',
      role: 'volunteer' as const,
      roleName: 'Field Volunteer (Ananya Deshpande)'
    },
    {
      num: 2,
      title: 'Multilingual AI Need Assessment',
      tagline: 'Gemini NLP extracts structured categories and flags urgency',
      role: 'administrator' as const,
      roleName: 'AI Processing Engine'
    },
    {
      num: 3,
      title: 'Multi-Agent Coordinated Intelligence',
      tagline: '8 specialized domain agents analyze and formulate recommendations',
      role: 'administrator' as const,
      roleName: 'Multi-Agent System'
    },
    {
      num: 4,
      title: 'Smart Proximity & Capacity Matching',
      tagline: 'Matching verified beds, meals, and wound care in real time',
      role: 'administrator' as const,
      roleName: 'Resource Matching Engine'
    },
    {
      num: 5,
      title: 'Human-in-the-Loop Approval Gate',
      tagline: 'Social worker verifies consent & authorizes referrals',
      role: 'social_worker' as const,
      roleName: 'Social Worker (Kavitha Ramesh)'
    },
    {
      num: 6,
      title: 'Referral Creation & Partner Dispatch',
      tagline: 'Instant web & SMS dispatch to Samarthanam, Bowring & RHA',
      role: 'ngo_partner' as const,
      roleName: 'Verified Partner Network'
    },
    {
      num: 7,
      title: 'Intervention Execution & Verification',
      tagline: 'Volunteer hands over hot meal; medical team dresses infected wound',
      role: 'volunteer' as const,
      roleName: 'Field Responders'
    },
    {
      num: 8,
      title: 'Long-Term 6-Stage Rehabilitation Engine',
      tagline: 'Senior citizen pension, Aadhaar restoration, and independent living',
      role: 'social_worker' as const,
      roleName: 'Rehabilitation Team'
    }
  ];

  const currentStepInfo = steps[activeDemoStep - 1];

  const handleStepAction = () => {
    if (activeDemoStep === 5) {
      // Approve case
      approveCase(demoCase.id, 'Kavitha Ramesh (MSW)');
      nextDemoStep();
    } else if (activeDemoStep === 6) {
      // Accept referrals
      if (demoCase.referrals[1]) {
        updateReferralStatus(demoCase.referrals[1].id, 'Accepted', 'Bowring Hospital OPD Casualty Desk accepted referral.');
      }
      nextDemoStep();
    } else if (activeDemoStep === 7) {
      // Mark wound dressing milestone done
      updateMilestone(demoPlan.id, 1, 'm-1-2', true);
      if (demoCase.referrals[1]) {
        updateReferralStatus(demoCase.referrals[1].id, 'Completed', 'Leg wound cleaned, dressed, tetanus shot given.');
      }
      nextDemoStep();
    } else {
      nextDemoStep();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-udaan-navy text-white px-6 py-4 flex items-center justify-between border-b border-udaan-navy-light">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-udaan-teal flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">Interactive End-to-End Case Demonstration</span>
                <span className="bg-udaan-amber text-udaan-navy text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Step {activeDemoStep} of 8
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Demonstrating: Elderly homeless assistance in Bengaluru (Ramesh Rao, 68)
              </p>
            </div>
          </div>
          <button
            onClick={() => setGuidedDemoActive(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px]">
            {steps.map((st) => {
              const isPast = st.num < activeDemoStep;
              const isCurrent = st.num === activeDemoStep;
              return (
                <div key={st.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isPast
                          ? 'bg-udaan-teal text-white'
                          : isCurrent
                          ? 'bg-udaan-blue text-white ring-4 ring-udaan-blue/20'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-medium whitespace-nowrap">
                      Step {st.num}
                    </span>
                  </div>
                  {st.num < 8 && (
                    <div
                      className={`h-0.5 w-10 sm:w-14 mx-1 transition-colors ${
                        st.num < activeDemoStep ? 'bg-udaan-teal' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body: Active Step Detail */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm flex-1">
          {/* Active Step Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-udaan-blue-soft/50 rounded-xl border border-udaan-blue/20">
            <div>
              <h3 className="font-bold text-base text-udaan-navy">{currentStepInfo.title}</h3>
              <p className="text-xs text-slate-600">{currentStepInfo.tagline}</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500">Perspective:</span>
              <span className="font-semibold text-udaan-blue">{currentStepInfo.roleName}</span>
            </div>
          </div>

          {/* STEP 1: Volunteer Report */}
          {activeDemoStep === 1 && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Intake Location: <strong>Majestic KSR Railway Underpass</strong></span>
                  <span>Reported By: <strong>Volunteer Ananya Deshpande</strong></span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Original Volunteer Notes (Kannada & English input):</p>
                  <p className="text-slate-800 italic text-sm">
                    "Senior citizen (~68 yrs, named Ramesh Rao) sitting on sidewalk. Has not eaten in ~24 hours. Swollen right lower leg with infected laceration. Unable to walk comfortably. Speaks Kannada. Needs food, shelter, and doctor visit."
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">Food Deprivation</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-medium">Infected Leg Injury</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">Unsheltered</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Consent Granted</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p>
                  <strong>No Aadhaar or smartphone barrier:</strong> UDAAN intake registered this request immediately without requiring permanent address proof or smartphone ownership from the beneficiary.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Multilingual AI Need Assessment */}
          {activeDemoStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
                  <span className="text-slate-400">// Gemini Structured Need Assessment JSON</span>
                  <pre>{JSON.stringify({
                    food_assistance: "required",
                    shelter: "required",
                    medical_evaluation: "required",
                    elderly_care: "required",
                    urgency: "high",
                    human_review: true,
                    safety_alert: "Infected leg laceration in elderly individual requires urgent clinical wound dressing to prevent systemic sepsis."
                  }, null, 2)}</pre>
                </div>

                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-xs">
                    <span className="font-bold text-red-700 block mb-1">Safety Alert Detected:</span>
                    <p className="text-red-900 leading-relaxed">
                      {demoCase.aiAssessment.safety_alert}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-slate-700 block">Identified Action Sequence:</span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-600">
                      <li>Immediate warm nutritional meal & hydration (30m)</li>
                      <li>Clinical wound evaluation & tetanus dressing (90m)</li>
                      <li>Accessible night shelter intake with bed reservation (2-4h)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <strong>Ethical Safeguard Guarantee:</strong> UDAAN AI generates triage suggestions only. It explicitly avoids diagnosing clinical conditions and marks <code>human_review: true</code> for all high urgency cases.
              </div>
            </div>
          )}

          {/* STEP 3: Multi-Agent Coordinated Intelligence */}
          {activeDemoStep === 3 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                The Orchestrator Agent launched 5 specialized domain agents in parallel to formulate a comprehensive response:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {demoCase.agentRecommendations.slice(0, 4).map((ag) => (
                  <div key={ag.agentId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-udaan-navy">{ag.agentName}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {ag.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-slate-700 text-[11px]">{ag.verdict}</p>
                    <p className="text-slate-500 text-[10px]">{ag.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Smart Matching */}
          {activeDemoStep === 4 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                The smart matching engine evaluated distance, verified capacity, operating hours, and accessibility:
              </p>
              <div className="space-y-2.5">
                {demoCase.matchedResources.map((mr) => (
                  <div key={mr.resource.id} className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{mr.resource.name}</span>
                        <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {mr.proximityKm} km away
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {mr.resource.availableCapacity} {mr.resource.unit} open
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-1">{mr.resource.organisationName}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {mr.matchReasons.map((r, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded">
                            ✓ {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-extrabold text-udaan-teal">{mr.matchScore}%</span>
                      <span className="block text-[10px] text-slate-400">Match Score</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Human Approval Gate */}
          {activeDemoStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Mandatory Human Review Required</span>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  As an ethical humanitarian network, UDAAN does not automatically dispatch medical referrals or alter institutional rosters without a human social worker's sign-off.
                </p>
                <div className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-600">Reviewing Social Worker:</span>
                    <strong className="block text-slate-800">Kavitha Ramesh (MSW, License #SW-KA-092)</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[11px]">Case Status:</span>
                    <span className="block font-bold text-amber-700 uppercase">
                      {demoCase.humanReviewApproved ? 'Approved ✓' : 'Pending Authorization'}
                    </span>
                  </div>
                </div>
              </div>

              {!demoCase.humanReviewApproved ? (
                <button
                  onClick={handleStepAction}
                  className="w-full py-3 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Authorize Referrals & Dispatch Providers (Human Sign-off)</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 font-medium text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Case approved by Social Worker Kavitha Ramesh. Proceeding to referral dispatch.</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Referral Dispatch */}
          {activeDemoStep === 6 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Authorized referrals have been pushed to partner service desks with real-time acknowledgment:
              </p>
              <div className="space-y-2 text-xs">
                {demoCase.referrals.map((ref) => (
                  <div key={ref.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{ref.organisationName}</span>
                      <p className="text-slate-500 text-[11px] capitalize">Category: {ref.category.replace('_', ' ')}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      ref.status === 'Accepted' || ref.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ref.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Intervention Execution */}
          {activeDemoStep === 7 && (
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <span className="font-bold text-slate-800 block text-sm">Real-time Ground Interventions:</span>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                    <Utensils className="w-4 h-4 text-udaan-amber mt-0.5" />
                    <div>
                      <strong className="text-slate-800">1. Robin Hood Army Evening Distribution:</strong>
                      <p className="text-slate-600 text-[11px]">Delivered hot dal khichdi and potable water at 17:42. Recipient ate completely and was comforted.</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">✓ Completed & Verified</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                    <Stethoscope className="w-4 h-4 text-udaan-red mt-0.5" />
                    <div>
                      <strong className="text-slate-800">2. Bowring Hospital Community Health Desk:</strong>
                      <p className="text-slate-600 text-[11px]">Beneficiary arrived via field transport. Wound debrided, dressed, tetanus toxoid administered, antibiotic course prescribed.</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">✓ Completed & Verified</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-start gap-2.5">
                    <Home className="w-4 h-4 text-udaan-blue mt-0.5" />
                    <div>
                      <strong className="text-slate-800">3. Samarthanam Elderly Shelter Intake:</strong>
                      <p className="text-slate-600 text-[11px]">Bed reserved in geriatric wing. Warm clothes provided for overnight stay.</p>
                      <span className="text-[10px] text-blue-600 font-semibold">→ In Progress (Intake Tonight)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Long-Term Rehabilitation Engine */}
          {activeDemoStep === 8 && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-udaan-navy to-udaan-navy-light text-white p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-udaan-teal-light font-bold">
                  <Compass className="w-4 h-4" />
                  <span>The Critical Differentiator: Beyond Emergency Relief to Independence</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-light">
                  UDAAN does not stop when the hot meal is eaten. It creates a personalized 6-stage rehabilitation journey to restore dignity, welfare entitlements, and long-term security.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {demoPlan.stages.map((st) => (
                  <div
                    key={st.stageNumber}
                    className={`p-3 rounded-xl border transition-colors ${
                      st.stageNumber === 1
                        ? 'bg-emerald-50 border-emerald-300'
                        : st.stageNumber === 2
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-udaan-blue/20'
                        : 'bg-slate-50 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700">Stage {st.stageNumber}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        st.stageNumber === 1 ? 'text-emerald-700 bg-emerald-100' : st.stageNumber === 2 ? 'text-blue-700 bg-blue-100' : 'text-slate-500'
                      }`}>
                        {st.status}
                      </span>
                    </div>
                    <strong className="block text-slate-900 text-[11px] leading-tight mb-1">{st.title}</strong>
                    <p className="text-slate-500 text-[10px] line-clamp-2">{st.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <strong>Next Scheduled AI Pathway Milestone:</strong>
                <p className="text-[11px] text-slate-600">
                  Day 3: Hasiru Dala legal aid volunteer visits Samarthanam shelter to begin biometric Aadhaar retrieval & Karnataka Sandhya Suraksha senior pension registration.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={prevDemoStep}
            disabled={activeDemoStep === 1}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none px-3 py-2 rounded-lg border border-slate-300 bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-3">
            {activeDemoStep < 8 ? (
              <button
                onClick={handleStepAction}
                className="flex items-center gap-2 bg-udaan-blue hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                <span>Proceed to Step {activeDemoStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setGuidedDemoActive(false)}
                className="flex items-center gap-2 bg-udaan-teal hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Demo & Explore Platform</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
