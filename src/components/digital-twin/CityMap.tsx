import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityZoneMetrics, UrgencyLevel } from '../../types';
import { useUDAAN } from '../../context/UDAANContext';

interface CityMapProps {
  onSelectZone: (zone: CityZoneMetrics) => void;
  selectedZoneId?: string;
  activeLayer: 'all' | 'shelter' | 'food' | 'healthcare' | 'documentation' | 'education' | 'shortages';
}

export const CityMap: React.FC<CityMapProps> = ({
  onSelectZone,
  selectedZoneId,
  activeLayer
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const { cityZones, resources } = useUDAAN();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map centered on Bengaluru [12.9716, 77.5946]
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [12.9750, 77.5850],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // CartoDB Positron / OpenStreetMap clean Humanitarian style tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup if needed
    };
  }, []);

  // Update markers and circles when zones, selection, or activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const currentLayerGroup = layerGroupRef.current;

    currentLayerGroup.clearLayers();

    cityZones.forEach((zone) => {
      const isSelected = zone.id === selectedZoneId;

      // Color selection based on urgency or active layer
      let circleColor = '#18A999'; // teal
      let fillColor = '#18A999';

      if (activeLayer === 'shortages') {
        const shelterDeficit = Math.max(0, zone.shelterDemand - zone.shelterCapacity);
        if (shelterDeficit > 30) circleColor = '#C94C4C';
        else if (shelterDeficit > 10) circleColor = '#E5A23C';
        else circleColor = '#18A999';
        fillColor = circleColor;
      } else if (activeLayer === 'food') {
        circleColor = '#E5A23C';
        fillColor = '#E5A23C';
      } else if (activeLayer === 'shelter') {
        circleColor = '#2463A6';
        fillColor = '#2463A6';
      } else if (activeLayer === 'healthcare') {
        circleColor = '#C94C4C';
        fillColor = '#C94C4C';
      } else if (activeLayer === 'documentation') {
        circleColor = '#8884D8';
        fillColor = '#8884D8';
      } else if (activeLayer === 'education') {
        circleColor = '#18A999';
        fillColor = '#18A999';
      } else {
        // Urgency color
        if (zone.outreachNeededUrgency === 'critical') {
          circleColor = '#C94C4C';
          fillColor = '#C94C4C';
        } else if (zone.outreachNeededUrgency === 'high') {
          circleColor = '#E5A23C';
          fillColor = '#E5A23C';
        } else {
          circleColor = '#2463A6';
          fillColor = '#2463A6';
        }
      }

      // Geo-circle radius representation
      const circle = L.circle(zone.coordinates, {
        color: circleColor,
        fillColor: fillColor,
        fillOpacity: isSelected ? 0.45 : 0.22,
        weight: isSelected ? 3 : 1.5,
        radius: zone.radius
      });

      // Custom HTML Marker Label
      const markerHtml = `
        <div style="
          background: #142D4E;
          color: white;
          border: 2px solid ${circleColor};
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          transform: translate(-50%, -50%);
        ">
          ${zone.name.split('/')[0]} <span style="color: ${circleColor}">(${zone.activeCases})</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-zone-marker',
        html: markerHtml,
        iconSize: [120, 24]
      });

      const marker = L.marker(zone.coordinates, { icon: customIcon });

      const clickHandler = () => {
        onSelectZone(zone);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo(zone.coordinates, { animate: true });
        }
      };

      circle.on('click', clickHandler);
      marker.on('click', clickHandler);

      circle.addTo(currentLayerGroup);
      marker.addTo(currentLayerGroup);
    });

    // Also add verified resource markers matching active layer
    const filteredMarkers = resources.filter(res => {
      if (activeLayer === 'all' || activeLayer === 'shortages') return true;
      if (activeLayer === 'shelter') return res.category === 'emergency_shelter';
      if (activeLayer === 'food') return res.category === 'food_water';
      if (activeLayer === 'healthcare') return res.category === 'medical_support';
      if (activeLayer === 'documentation') return res.category === 'identity_docs';
      if (activeLayer === 'education') return res.category === 'skill_development' || res.category === 'education';
      return true;
    });

    filteredMarkers.forEach((res) => {
      const resIconHtml = `
        <div style="
          background: #2463A6;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.25);
          font-size: 10px;
        " title="${res.name}">
          📍
        </div>
      `;

      const resMarker = L.marker([res.location.lat, res.location.lng], {
        icon: L.divIcon({
          className: 'res-marker',
          html: resIconHtml,
          iconSize: [22, 22]
        })
      });

      resMarker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px;">
          <strong style="color: #142D4E;">${res.name}</strong><br/>
          <span style="color: #666;">${res.organisationName}</span><br/>
          <span style="color: #18A999; font-weight: 600;">Available: ${res.availableCapacity} ${res.unit}</span>
        </div>
      `);

      resMarker.addTo(currentLayerGroup);
    });
  }, [cityZones, selectedZoneId, activeLayer, resources, onSelectZone]);

  return (
    <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-slate-200 shadow-card">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 pointer-events-auto">
        <span className="font-bold text-slate-800 text-[11px] block">Indicator Legend</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-udaan-red"></span>
          <span className="text-slate-600">Critical Shortage / High Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-udaan-amber"></span>
          <span className="text-slate-600">Moderate Shortage Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-udaan-teal"></span>
          <span className="text-slate-600">Stable Resource Coverage</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-udaan-blue"></span>
          <span className="text-slate-600">Verified Shelter / Kitchen Hub</span>
        </div>
      </div>
    </div>
  );
};
