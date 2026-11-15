import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, AlertCircle, TrendingUp, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';

export const ScenarioSimulator: React.FC = () => {
  const { cityZones, runScenarioSimulation } = useUDAAN();

  const [additionalBeds, setAdditionalBeds] = useState<number>(50);
  const [additionalMeals, setAdditionalMeals] = useState<number>(100);
  const [demandSurgePercent, setDemandSurgePercent] = useState<number>(30); // Default to prompt's 30%
  const [targetZoneId, setTargetZoneId] = useState<string>('');
  const [simulationResult, setSimulationResult] = useState<any>(() => {
    // Run default 30% surge simulation on load
    return runScenarioSimulation(50, 100, undefined, 30);
  });

  const handleSimulate = () => {
    const res = runScenarioSimulation(
      additionalBeds,
      additionalMeals,
      targetZoneId || undefined,
      demandSurgePercent
    );
    setSimulationResult(res);
  };

  const handleApplyPreset30Percent = () => {
    setDemandSurgePercent(30);
    setAdditionalBeds(0);
    setAdditionalMeals(0);
    setTargetZoneId('');
    const res = runScenarioSimulation(0, 0, undefined, 30);
    setSimulationResult(res);
  };

  const handleReset = () => {
    setAdditionalBeds(50);
    setAdditionalMeals(100);
    setDemandSurgePercent(0);
    setTargetZoneId('');
    const res = runScenarioSimulation(50, 100, undefined, 0);
    setSimulationResult(res);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-udaan-navy text-white flex items-center justify-center">
            <Sliders className="w-4 h-4 text-udaan-teal" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-udaan-navy">
              Digital Twin What-If Scenario Simulator (Feature 3)
            </h3>
            <p className="text-xs text-slate-500">
              Hypothetical stress-testing: e.g. "What happens if shelter demand increases by 30%?"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyPreset30Percent}
            className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition"
          >
            Run Prompt Scenario: +30% Demand Surge
          </button>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded">
            DEMO DATA / SIMULATION
          </span>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {/* Demand Surge Slider (Prompt Requirement) */}
        <div className="space-y-1.5 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
          <div className="flex justify-between font-semibold">
            <span className="text-amber-900">Shelter Demand Surge (%):</span>
            <span className="text-red-700 font-bold">+{demandSurgePercent}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={demandSurgePercent}
            onChange={(e) => setDemandSurgePercent(Number(e.target.value))}
            className="w-full accent-red-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-amber-700">
            <span>Normal (0%)</span>
            <span>+30% (Scenario)</span>
            <span>+100% (Crisis)</span>
          </div>
        </div>

        {/* Additional Beds Slider */}
        <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex justify-between font-semibold">
            <span className="text-slate-700">Intervention: New Shelter Beds</span>
            <span className="text-udaan-blue font-bold">+{additionalBeds} beds</span>
          </div>
          <input
            type="range"
            min={0}
            max={300}
            step={10}
            value={additionalBeds}
            onChange={(e) => setAdditionalBeds(Number(e.target.value))}
            className="w-full accent-udaan-blue cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0</span>
            <span>150</span>
            <span>300</span>
          </div>
        </div>

        {/* Target Zone Filter */}
        <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="font-semibold text-slate-700 block">Target Sector Allocation:</span>
          <select
            value={targetZoneId}
            onChange={(e) => setTargetZoneId(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          >
            <option value="">Optimal Deficit-Weighted Allocation</option>
            {cityZones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400 block">
            Directly tests intervention impact on targeted sector
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSimulate}
          className="flex items-center gap-2 bg-udaan-navy hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
        >
          <Play className="w-3.5 h-3.5 text-udaan-teal" />
          <span>Recalculate Area Resource Gaps</span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-2 border border-slate-200 rounded-xl bg-slate-50"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset to Baseline</span>
        </button>
      </div>

      {/* Simulation Results Display */}
      {simulationResult && (
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 animate-in fade-in duration-300 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <span className="font-bold text-xs text-udaan-navy block">
                Impact on Area-Wise Resource Gaps
              </span>
              <span className="text-slate-500 text-[11px]">
                Demand Surge: <strong>+{simulationResult.demandSurgePercent}%</strong> | Added Capacity: <strong>+{simulationResult.additionalBeds} beds</strong>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Citywide Net Shelter Gap:</span>
              <span className="text-base font-extrabold text-red-600">
                {simulationResult.remainingCitywideShelterShortage} beds
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200">
            "{simulationResult.suggestedAllocationStrategy}"
          </p>

          {/* Area-Wise Resource Gaps Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-200/70 text-slate-700 font-bold">
                <tr>
                  <th className="p-2 rounded-l">Bengaluru Sector</th>
                  <th className="p-2">Adjusted Shelter Demand</th>
                  <th className="p-2">Verified Bed Capacity</th>
                  <th className="p-2">Estimated Shelter Gap</th>
                  <th className="p-2">Food Deficit</th>
                  <th className="p-2 rounded-r">Relieved Cases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {simulationResult.improvedZones.map((row: any, i: number) => {
                  const hasShortage = row.newShelterShortage > 0;
                  return (
                    <tr key={i} className="hover:bg-white transition-colors">
                      <td className="p-2 font-medium text-slate-800">{row.zoneName}</td>
                      <td className="p-2 font-semibold text-slate-700">
                        {Math.round(row.priorShelterShortage * (1 + (simulationResult.demandSurgePercent || 0) / 100))} requests
                      </td>
                      <td className="p-2 text-udaan-blue font-semibold">
                        Verified
                      </td>
                      <td className="p-2">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          hasShortage ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {row.newShelterShortage} bed deficit
                        </span>
                      </td>
                      <td className="p-2 text-amber-700 font-semibold">{row.newFoodShortage} meals</td>
                      <td className="p-2 text-emerald-700 font-bold">+{row.casesPositivelyImpacted}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 bg-amber-50 text-amber-800 rounded-lg text-[11px] border border-amber-200 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical Notice:</strong> What-if simulations provide stress-testing insights for city planners and NGOs. All metrics are labeled as <strong>DEMO DATA</strong>.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
