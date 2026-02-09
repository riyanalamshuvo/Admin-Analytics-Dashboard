'use client';

import { memo, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, PieChartSkeleton, EmptyState } from '@/components/ui';
import type { UserDistribution } from '@/types';

interface UserDistributionChartProps {
  data: UserDistribution[];
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
          {data.value.toLocaleString()} users
        </p>
      </div>
    );
  }
  return null;
};

interface CustomLegendProps {
  payload?: Array<{
    value: string;
    color: string;
    payload: {
      value: number;
    };
  }>;
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload) return null;

  const total = payload.reduce((sum, entry) => sum + entry.payload.value, 0);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {payload.map((entry, index) => {
        const percentage = ((entry.payload.value / total) * 100).toFixed(1);
        return (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {entry.value}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {entry.payload.value.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                {percentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function UserDistributionChartComponent({ data, isLoading }: UserDistributionChartProps) {
  // Memoize legend payload to prevent recalculation on every render
  const legendPayload = useMemo(
    () => data.map((d) => ({
      value: d.name,
      color: d.color,
      payload: { value: d.value },
    })),
    [data]
  );

  if (isLoading) {
    return <PieChartSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No user data"
            description="User distribution will appear here once available."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
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
        <CustomLegend payload={legendPayload} />
      </CardContent>
    </Card>
  );
}

export const UserDistributionChart = memo(UserDistributionChartComponent);
