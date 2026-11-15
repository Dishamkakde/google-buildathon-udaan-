import React, { useState } from 'react';
import { CityMap } from '../../components/digital-twin/CityMap';
import { DemandSupplyChart } from '../../components/digital-twin/DemandSupplyChart';
import { ScenarioSimulator } from '../../components/digital-twin/ScenarioSimulator';
import { ZoneDetailsDrawer } from '../../components/digital-twin/ZoneDetailsDrawer';
import { CityZoneMetrics } from '../../types';
import { useUDAAN } from '../../context/UDAANContext';
import { Globe2, Layers, Sliders, BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react';

export const CityIntelligencePage: React.FC = () => {
  const { cityZones } = useUDAAN();
  const [selectedZone, setSelectedZone] = useState<CityZoneMetrics | null>(cityZones[0]);
  const [activeLayer, setActiveLayer] = useState<'all' | 'shelter' | 'food' | 'healthcare' | 'shortages'>('all');
  const [chartMetric, setChartMetric] = useState<'shelter' | 'food'>('shelter');

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              System A
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              Humanitarian Digital Twin — Bengaluru Telemetry
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Real-time macro-intelligence tracking aggregated shelter deficits, food capacity, and outreach priorities.
          </p>
        </div>

        {/* Layer Selector */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-slate-400 ml-2" />
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeLayer === 'all' ? 'bg-udaan-navy text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Indicators
          </button>
          <button
            onClick={() => setActiveLayer('shelter')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeLayer === 'shelter' ? 'bg-udaan-blue text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shelter Capacity
          </button>
          <button
            onClick={() => setActiveLayer('food')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeLayer === 'food' ? 'bg-udaan-amber text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Food Distribution
          </button>
          <button
            onClick={() => setActiveLayer('shortages')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeLayer === 'shortages' ? 'bg-udaan-red text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shortage Zones
          </button>
        </div>
      </div>

      {/* Main Map & Zone Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Map (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          <CityMap
            onSelectZone={(zone) => setSelectedZone(zone)}
            selectedZoneId={selectedZone?.id}
            activeLayer={activeLayer}
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Click any sector circle or resource pin to view real-time ground capacity</span>
            <span className="font-semibold text-udaan-navy">Coordinates: Bengaluru, Karnataka</span>
          </div>
        </div>

        {/* Selected Zone Details Drawer (4/5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <ZoneDetailsDrawer
            zone={selectedZone}
            onClose={() => setSelectedZone(null)}
          />
        </div>
      </div>

      {/* Demand vs Supply Comparison Analytics */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-udaan-navy">
              Demand versus Supply Analytics (Citywide Zones)
            </h3>
            <p className="text-xs text-slate-500">
              Comparing verified provider capacity against active humanitarian assistance requests.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setChartMetric('shelter')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                chartMetric === 'shelter'
                  ? 'bg-udaan-blue text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Shelter Beds Demand vs Capacity
            </button>
            <button
              onClick={() => setChartMetric('food')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                chartMetric === 'food'
                  ? 'bg-udaan-teal text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Daily Meals Demand vs Capacity
            </button>
          </div>
        </div>

        <DemandSupplyChart zones={cityZones} metricType={chartMetric} />
      </div>

      {/* Scenario Simulator (Section 8) */}
      <ScenarioSimulator />
    </div>
  );
};
