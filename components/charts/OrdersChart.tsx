'use client';

import { memo, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, ChartSkeleton, EmptyState } from '@/components/ui';
import type { OrderData } from '@/types';

interface OrdersChartProps {
  data: OrderData[];
  isLoading: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          Orders: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function OrdersChartComponent({ data, isLoading }: OrdersChartProps) {
  // Memoize max value for gradient effect
  const maxOrders = useMemo(() => Math.max(...data.map(d => d.orders)), [data]);

  // Memoize cell colors based on data
  const cellColors = useMemo(
    () => data.map((entry) => `rgba(139, 92, 246, ${0.4 + (entry.orders / maxOrders) * 0.6})`),
    [data, maxOrders]
  );

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orders Per Month</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No order data"
            description="Order data will appear here once available."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Per Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                className="dark:stroke-gray-700"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
              <Bar
                dataKey="orders"
                radius={[6, 6, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={cellColors[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export const OrdersChart = memo(OrdersChartComponent);
