import React, { useState } from 'react';
import { JourneyTimeline } from '../../components/rehabilitation/JourneyTimeline';
import { useUDAAN } from '../../context/UDAANContext';
import { Compass, Users, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

export const RehabilitationPage: React.FC = () => {
  const { rehabPlans } = useUDAAN();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(rehabPlans[0]?.id || '');

  const activePlan = rehabPlans.find(p => p.id === selectedPlanId) || rehabPlans[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-udaan-teal" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              Rehabilitation & Independence Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            A 6-stage longitudinal support pathway restoring dignity, legal identity, pensions, and housing.
          </p>
        </div>

        {/* Beneficiary Selector */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto">
          <span className="text-slate-500 font-semibold whitespace-nowrap">Beneficiary Journey:</span>
          <select
            value={selectedPlanId}
            onChange={(e) => setSelectedPlanId(e.target.value)}
            className="w-full md:w-64 bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-udaan-navy focus:outline-none"
          >
            {rehabPlans.map(p => (
              <option key={p.id} value={p.id}>
                {p.beneficiaryName} (Stage {p.currentStage})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Journey Timeline */}
      {activePlan ? (
        <JourneyTimeline plan={activePlan} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          No rehabilitation journey records found.
        </div>
      )}
    </div>
  );
};
