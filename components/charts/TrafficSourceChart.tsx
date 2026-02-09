'use client';

import { memo, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, PieChartSkeleton, EmptyState } from '@/components/ui';
import type { TrafficSource } from '@/types';

interface TrafficSourceChartProps {
  data: TrafficSource[];
  isLoading: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      color: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.payload.color }}
          />
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.name}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {data.value}% of traffic
        </p>
      </div>
    );
  }
  return null;
};

function TrafficSourceChartComponent({ data, isLoading }: TrafficSourceChartProps) {
  // Memoize total for percentage calculations
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  if (isLoading) {
    return <PieChartSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No traffic data"
            description="Traffic source data will appear here once available."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {item.name}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export const TrafficSourceChart = memo(TrafficSourceChartComponent);
