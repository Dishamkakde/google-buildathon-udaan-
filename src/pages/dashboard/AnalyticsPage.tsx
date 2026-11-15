import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useUDAAN } from '../../context/UDAANContext';
import { BarChart3, TrendingUp, ShieldCheck, Award, Users, AlertCircle } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { cityZones, cases } = useUDAAN();

  const categoryDistribution = [
    { name: 'Food & Nutrition', value: 42, color: '#E5A23C' },
    { name: 'Emergency Shelter', value: 35, color: '#2463A6' },
    { name: 'Medical / Wound Care', value: 24, color: '#C94C4C' },
    { name: 'Elderly Support', value: 18, color: '#18A999' },
    { name: 'Identity & Aadhaar', value: 14, color: '#8884d8' },
    { name: 'Child Protection', value: 8, color: '#ff7300' }
  ];

  const zoneDeficitData = cityZones.map((z) => ({
    name: z.name.split('/')[0].trim(),
    shelterShortage: Math.max(0, z.shelterDemand - z.shelterCapacity),
    foodShortage: Math.max(0, z.foodDemand - z.foodCapacity),
    activeCases: z.activeCases
  }));

  const timelinePerformance = [
    { hour: '00:00', intakeCount: 4, resolvedCount: 3 },
    { hour: '04:00', intakeCount: 7, resolvedCount: 5 },
    { hour: '08:00', intakeCount: 18, resolvedCount: 14 },
    { hour: '12:00', intakeCount: 32, resolvedCount: 29 },
    { hour: '16:00', intakeCount: 45, resolvedCount: 38 },
    { hour: '20:00', intakeCount: 62, resolvedCount: 56 }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-udaan-amber text-udaan-navy text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              DEMO DATA / SIMULATED ANALYTICS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy mt-1">
            Humanitarian Intelligence Analytics & Impact
          </h1>
          <p className="text-xs text-slate-500">
            System performance telemetry, resource bottlenecks, and multi-agent resolution metrics.
          </p>
        </div>
      </div>

      {/* Top 4 Impact KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Median Triage Time</span>
          <span className="text-2xl font-extrabold text-udaan-teal">1.4 min</span>
          <span className="text-[10px] text-slate-400">Gemini Multi-Agent execution</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Referral Acceptance Rate</span>
          <span className="text-2xl font-extrabold text-udaan-blue">94.2%</span>
          <span className="text-[10px] text-emerald-600">Verified by partner desks</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Identified Shelter Shortage</span>
          <span className="text-2xl font-extrabold text-udaan-red">145 beds</span>
          <span className="text-[10px] text-red-500">Peak demand near KSR Hub</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 block">Rehabilitation Retention</span>
          <span className="text-2xl font-extrabold text-emerald-700">88.6%</span>
          <span className="text-[10px] text-emerald-600">Stage 2 to 4 progression</span>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Assistance by Category (Pie Chart - 5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-udaan-navy">Assistance Requests by Need Category</h3>
            <p className="text-[11px] text-slate-500">Distribution of extracted humanitarian categories</p>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#142D4E',
                    borderColor: '#1C3E6B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            {categoryDistribution.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-600 truncate">{cat.name}:</span>
                <strong className="text-slate-800">{cat.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Zone Shortage Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-udaan-navy">Resource Deficit by Bengaluru Sector</h3>
            <p className="text-[11px] text-slate-500">Unmet shelter bed and food portion deficits</p>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneDeficitData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={35}
                  tick={{ fontSize: 10, fill: '#64748B' }}
                />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#142D4E',
                    borderColor: '#1C3E6B',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="shelterShortage" name="Shelter Deficit (Beds)" fill="#C94C4C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="foodShortage" name="Food Deficit (Meals)" fill="#E5A23C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3: Intake vs Resolution Performance Line Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
        <div className="space-y-0.5">
          <h3 className="font-bold text-sm text-udaan-navy">24-Hour Resolution Curve (Simulated Cycle)</h3>
          <p className="text-[11px] text-slate-500">Cumulative assistance intake vs verified fulfilled referrals</p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelinePerformance} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#142D4E',
                  borderColor: '#1C3E6B',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="intakeCount" name="Total Requests Logged" stroke="#2463A6" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="resolvedCount" name="Referrals Fulfilled" stroke="#18A999" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
