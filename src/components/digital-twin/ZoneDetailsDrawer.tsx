import React from 'react';
import { X, MapPin, Users, Home, Utensils, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';
import { CityZoneMetrics, ResourceItem, Organisation, AssistanceCase } from '../../types';
import { useUDAAN } from '../../context/UDAANContext';

interface ZoneDetailsDrawerProps {
  zone: CityZoneMetrics | null;
  onClose: () => void;
}

export const ZoneDetailsDrawer: React.FC<ZoneDetailsDrawerProps> = ({ zone, onClose }) => {
  const { resources, organisations, cases } = useUDAAN();

  if (!zone) return null;

  // Filter resources and cases in this zone
  const zoneResources = resources.filter(
    r => r.location.zone === zone.name || zone.name.includes(r.location.zone)
  );

  const zoneCases = cases.filter(
    c => c.beneficiary.approximateLocation.zone === zone.name
  );

  const shelterDeficit = Math.max(0, zone.shelterDemand - zone.shelterCapacity);
  const foodDeficit = Math.max(0, zone.foodDemand - zone.foodCapacity);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-elevated p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-udaan-blue-soft text-udaan-blue flex items-center justify-center font-bold">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-udaan-navy">{zone.name}</h3>
            <span className="text-xs text-slate-500">Zone Humanitarian Telemetry</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px]">Active Cases</span>
          <span className="text-base font-extrabold text-udaan-navy">{zone.activeCases}</span>
        </div>
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px]">Unresolved Requests</span>
          <span className="text-base font-extrabold text-udaan-red">{zone.unresolvedRequests}</span>
        </div>
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px]">Shelter Deficit</span>
          <span className="text-base font-extrabold text-udaan-amber">{shelterDeficit} beds</span>
        </div>
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-slate-500 block text-[10px]">Food Deficit</span>
          <span className="text-base font-extrabold text-udaan-amber">{foodDeficit} meals</span>
        </div>
      </div>

      {/* Shortage Summary */}
      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-red-800">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>Reported Resource Shortage:</span>
        </div>
        <p className="text-red-900 leading-relaxed font-medium">
          {zone.shortageSummary}
        </p>
      </div>

      {/* Verified Resources in Zone */}
      <div className="space-y-2 text-xs">
        <span className="font-bold text-slate-800 text-xs block">
          Verified Resources in Sector ({zoneResources.length})
        </span>
        {zoneResources.length === 0 ? (
          <p className="text-slate-400 italic">No direct shelter/kitchen facility registered directly within this radius.</p>
        ) : (
          <div className="space-y-2">
            {zoneResources.map((res) => (
              <div key={res.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block text-xs">{res.name}</strong>
                  <span className="text-[11px] text-slate-500">{res.organisationName}</span>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                    {res.availableCapacity} {res.unit}
                  </span>
                  <span className="block text-[10px] text-slate-400">Available</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Pending Cases in Zone */}
      {zoneCases.length > 0 && (
        <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
          <span className="font-bold text-slate-800 block text-xs">
            Active Assistance Requests in this Zone ({zoneCases.length})
          </span>
          <div className="space-y-2">
            {zoneCases.map((c) => (
              <div key={c.id} className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-200/80 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800">{c.beneficiary.identifierName || 'Beneficiary'}</strong>
                  <p className="text-[11px] text-slate-600 truncate max-w-[280px]">{c.beneficiary.description}</p>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {c.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
