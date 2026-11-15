import React from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  FileText,
  Briefcase,
  Home,
  HeartHandshake,
  Shield,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { RehabilitationPlan, RehabilitationStage } from '../../types';
import { useUDAAN } from '../../context/UDAANContext';

interface JourneyTimelineProps {
  plan: RehabilitationPlan;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ plan }) => {
  const { updateMilestone } = useUDAAN();

  const stageIcons = [
    Shield, // Stage 1: Immediate Safety
    Home, // Stage 2: Food & Shelter
    FileText, // Stage 3: Docs & Health
    Sparkles, // Stage 4: Education & Skills
    Briefcase, // Stage 5: Employment / Housing
    HeartHandshake // Stage 6: Independent Living
  ];

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-teal text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Rehabilitation Engine
            </span>
            <h2 className="text-lg font-extrabold text-udaan-navy">
              Long-Term Support Journey: {plan.beneficiaryName}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Assigned Caseworker: <strong className="text-slate-800">{plan.assignedCaseworker || plan.assignedSocialWorker}</strong> | Started: {new Date(plan.startedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-500">Current Phase:</span>
          <span className="font-extrabold text-udaan-blue">
            Stage {plan.currentStage} of 6
          </span>
        </div>
      </div>

      {/* Outcome Indicators (Actual Outcomes instead of arbitrary percentages) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-slate-800">
            Realized Humanitarian Outcomes (Outcome-based Measurement)
          </span>
          <span className="text-[11px] text-slate-400">Section 13 Compliance</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.healthStabilized ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Health Stabilized</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.shelterSecured ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Shelter Secured</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.identityRestored ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Identity Restored</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.skillCertified ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Skills Certified</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.employedOrSelfSufficient ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Self-Sufficient</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            plan.outcomeIndicators.independentHousing ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold text-[11px]">Long-Term Home</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Timeline */}
      <div className="space-y-4">
        {plan.stages.map((stage, idx) => {
          const Icon = stageIcons[idx] || Shield;
          const isDone = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <div
              key={stage.stageNumber}
              className={`bg-white rounded-2xl border transition shadow-card overflow-hidden ${
                isCurrent
                  ? 'border-udaan-blue ring-2 ring-udaan-blue/20'
                  : isDone
                  ? 'border-emerald-200'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Stage Header */}
              <div className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b ${
                isCurrent ? 'bg-udaan-blue-soft/60 border-udaan-blue/20' : isDone ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-udaan-blue text-white' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : stage.stageNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-udaan-navy">
                      Stage {stage.stageNumber}: {stage.title}
                    </h3>
                    <p className="text-xs text-slate-600">{stage.description}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isDone ? 'bg-emerald-100 text-emerald-800' : isCurrent ? 'bg-udaan-blue text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {stage.status}
                </span>
              </div>

              {/* Milestones Checklist */}
              <div className="p-5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Actionable Milestones
                </span>
                <div className="space-y-2">
                  {stage.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-200 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={milestone.completed}
                          onChange={(e) =>
                            updateMilestone(plan.id, stage.stageNumber, milestone.id, e.target.checked)
                          }
                          className="w-4 h-4 rounded text-udaan-teal focus:ring-0 cursor-pointer mt-0.5"
                        />
                        <div>
                          <span className={`font-semibold ${milestone.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {milestone.title}
                          </span>
                          {milestone.notes && (
                            <p className="text-slate-500 text-[11px] mt-0.5 italic">
                              Note: {milestone.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {milestone.completedAt && (
                        <span className="text-[10px] text-emerald-700 font-semibold whitespace-nowrap bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Verified {new Date(milestone.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Next Steps & Social Worker Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-udaan-navy font-bold">
            <Sparkles className="w-4 h-4 text-udaan-teal" />
            <span>AI Suggested Next Steps (Awaiting Worker Sign-off)</span>
          </div>
          <ul className="space-y-2 text-slate-600">
            {plan.aiNextStepRecommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-udaan-teal font-bold shrink-0">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-udaan-navy font-bold">
            <UserCheck className="w-4 h-4 text-udaan-blue" />
            <span>Caseworker Progress Notes</span>
          </div>
          <ul className="space-y-2 text-slate-600">
            {(plan.caseworkerNotes || plan.socialWorkerNotes || []).map((note: string, i: number) => (
              <li key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 italic">
                "{note}"
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
