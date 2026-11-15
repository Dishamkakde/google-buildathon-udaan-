import React, { useState } from 'react';
import {
  Sparkles,
  Utensils,
  Home,
  Stethoscope,
  FileText,
  Compass,
  Clock,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  ShieldCheck,
  Send
} from 'lucide-react';
import { AgentRecommendation, AIStructuredAssessment, AssistanceCase } from '../../types';
import { geminiService } from '../../services/geminiService';
import { useUDAAN } from '../../context/UDAANContext';

export const MultiAgentVisualizer: React.FC = () => {
  const { cases, resources, approveCase } = useUDAAN();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'agents' | 'orchestrator' | 'json'>('agents');

  const activeCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const agentIcons: Record<string, any> = {
    'Need Assessment Agent': Sparkles,
    'Food Assistance Agent': Utensils,
    'Shelter Coordination Agent': Home,
    'Healthcare Coordination Agent': Stethoscope,
    'Documentation Assistance Agent': FileText,
    'Rehabilitation Agent': Compass,
    'Follow-up Agent': Clock,
    'Orchestrator Agent': Cpu
  };

  const handleRunLiveAgents = async () => {
    if (!customPrompt.trim()) return;
    setIsProcessing(true);

    try {
      // Simulate live run
      await geminiService.analyzeNeed(customPrompt, 'en', 'Majestic');
      setTimeout(() => {
        setIsProcessing(false);
      }, 1200);
    } catch (e) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Case Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              System B
            </span>
            <h2 className="text-lg font-extrabold text-udaan-navy">
              AI Assistance Coordinator — 8-Agent Architecture
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Coordinating specialized humanitarian agents with human approval gating.
          </p>
        </div>

        {/* Case Selector Dropdown */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Active Case:</span>
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="w-full md:w-64 bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-udaan-navy focus:outline-none"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.beneficiary.identifierName} ({c.beneficiary.approximateLocation.zone.split('/')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('agents')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeTab === 'agents'
              ? 'border-udaan-blue text-udaan-blue'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Specialized Agents (8)
        </button>
        <button
          onClick={() => setActiveTab('orchestrator')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeTab === 'orchestrator'
              ? 'border-udaan-blue text-udaan-blue'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Orchestrator Synthesis & Timeline
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`pb-2.5 px-3 border-b-2 transition ${
            activeTab === 'json'
              ? 'border-udaan-blue text-udaan-blue'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Structured JSON Telemetry
        </button>
      </div>

      {/* TAB 1: 8 Agents Grid */}
      {activeTab === 'agents' && activeCase && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCase.agentRecommendations.map((agent) => {
            const Icon = agentIcons[agent.agentName] || Cpu;
            const isCompleted = agent.status === 'completed';

            return (
              <div
                key={agent.agentId}
                className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 flex flex-col justify-between space-y-3 hover:border-udaan-blue/40 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-udaan-blue-soft text-udaan-blue flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {agent.confidence}% Confidence
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-udaan-navy">{agent.agentName}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{agent.role}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-700 leading-snug">
                    <strong className="block text-udaan-navy mb-1 text-[11px]">Verdict:</strong>
                    {agent.verdict}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {agent.details}
                  </p>
                </div>

                {agent.suggestedSteps.length > 0 && (
                  <div className="border-t border-slate-100 pt-2 text-[10px] space-y-1 text-slate-600">
                    <strong className="block font-semibold text-slate-700">Action Recommendation:</strong>
                    {agent.suggestedSteps.map((st, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-udaan-teal shrink-0" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Orchestrator Pipeline */}
      {activeTab === 'orchestrator' && activeCase && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-udaan-teal" />
                <h3 className="font-bold text-base text-udaan-navy">
                  Orchestrator Agent Synthesis & Referral Gating
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Consolidates multiple domain evaluations into one human-reviewable humanitarian plan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Review Status:</span>
              <span className={`px-2.5 py-1 rounded-full font-bold uppercase ${
                activeCase.humanReviewApproved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {activeCase.humanReviewApproved ? 'Approved by Human Worker' : 'Pending Human Approval'}
              </span>
            </div>
          </div>

          {/* Action Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                Immediate Action (0 - 30 mins)
              </span>
              <strong className="block text-slate-800 text-xs">Food & Hydration Handover</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Provide hot nutritious meal packet and clean bottled water via nearest verified partner point.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                Short-term Action (30 - 90 mins)
              </span>
              <strong className="block text-slate-800 text-xs">Medical Evaluation & Shelter</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Direct to Bowring Hospital for leg wound dressing, then secure verified bed reservation at Samarthanam Shelter.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                Long-term Pathway (Month 1 - 6)
              </span>
              <strong className="block text-slate-800 text-xs">Social Security & Rehabilitation</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Aadhaar enrolment without address proof, Karnataka Sandhya Suraksha senior pension registration, day-care community.
              </p>
            </div>
          </div>

          {/* Human Review Approval Trigger */}
          {!activeCase.humanReviewApproved ? (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong className="text-amber-900 block text-sm">Human Approval Required to Dispatch Referrals</strong>
                  <p className="text-amber-800 text-xs">
                    Ethical safeguard: No automatic external agency dispatches occur without human sign-off.
                  </p>
                </div>
              </div>
              <button
                onClick={() => approveCase(activeCase.id, 'Kavitha Ramesh (MSW)')}
                className="w-full sm:w-auto px-5 py-2.5 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm shrink-0"
              >
                Approve & Dispatch Referrals
              </button>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-sm">Human Approval Authorized by {activeCase.approvedBy}</strong>
                <span>All partner referrals have been confirmed and active tracking is in progress.</span>
              </div>
            </div>
          )}

          {/* Referrals Status Table */}
          <div className="space-y-2">
            <span className="font-bold text-xs text-slate-700 block">Referral Routing & Partner Coordination</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold">
                  <tr>
                    <th className="p-2.5 rounded-l">Partner Organisation</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Urgency</th>
                    <th className="p-2.5">Approval Status</th>
                    <th className="p-2.5 rounded-r">Dispatch Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeCase.referrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50 transition">
                      <td className="p-2.5 font-bold text-slate-800">{ref.organisationName}</td>
                      <td className="p-2.5 capitalize text-slate-600">{ref.category.replace('_', ' ')}</td>
                      <td className="p-2.5 uppercase font-semibold text-udaan-red">{ref.urgency}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ref.approvedBySocialWorker ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {ref.approvedBySocialWorker ? 'Authorized' : 'Pending Sign-off'}
                        </span>
                      </td>
                      <td className="p-2.5 font-bold capitalize text-udaan-blue">{ref.status.replace('_', ' ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Structured JSON */}
      {activeTab === 'json' && activeCase && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 font-mono text-xs overflow-x-auto space-y-2 shadow-card">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>UDAAN Gemini Structured Need Assessment & Multi-Agent Payload</span>
            <span className="text-[10px] text-emerald-400">Schema: v1.0-humanitarian</span>
          </div>
          <pre>{JSON.stringify({
            caseId: activeCase.id,
            beneficiary: activeCase.beneficiary,
            aiStructuredAssessment: activeCase.aiAssessment,
            agentRecommendations: activeCase.agentRecommendations,
            referrals: activeCase.referrals,
            timeline: activeCase.timeline
          }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
