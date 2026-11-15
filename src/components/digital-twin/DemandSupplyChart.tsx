import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { CityZoneMetrics } from '../../types';

interface DemandSupplyChartProps {
  zones: CityZoneMetrics[];
  metricType: 'shelter' | 'food';
}

export const DemandSupplyChart: React.FC<DemandSupplyChartProps> = ({
  zones,
  metricType
}) => {
  const chartData = zones.map((z) => ({
    name: z.name.split('/')[0].trim(),
    demand: metricType === 'shelter' ? z.shelterDemand : z.foodDemand,
    capacity: metricType === 'shelter' ? z.shelterCapacity : z.foodCapacity,
    deficit: Math.max(
      0,
      (metricType === 'shelter' ? z.shelterDemand : z.foodDemand) -
      (metricType === 'shelter' ? z.shelterCapacity : z.foodCapacity)
    )
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="name"
            angle={-25}
            textAnchor="end"
            interval={0}
            height={40}
            tick={{ fontSize: 10, fill: '#64748B' }}
          />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#142D4E',
              borderColor: '#1C3E6B',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
          />
          <Bar
            dataKey="demand"
            name={metricType === 'shelter' ? 'Shelter Demand (Beds)' : 'Food Demand (Meals)'}
            fill="#E5A23C"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="capacity"
            name={metricType === 'shelter' ? 'Verified Capacity (Beds)' : 'Verified Capacity (Meals)'}
            fill="#18A999"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
