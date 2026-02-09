'use client';

import { memo, useMemo } from 'react';
import { KPICard } from './KPICard';
import { KPICardSkeleton, EmptyState, Card, CardContent } from '@/components/ui';
import { formatCurrency, formatNumber } from '@/lib/utils';
import type { DashboardStats } from '@/types';

interface KPISectionProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

function KPISectionComponent({ stats, isLoading }: KPISectionProps) {
  const kpiData = useMemo(() => {
    if (!stats) return [];

    return [
      {
        title: 'Total Revenue',
        value: formatCurrency(stats.totalRevenue),
        change: stats.revenueChange,
        trend: stats.revenueChange >= 0 ? 'up' : 'down',
        icon: 'revenue',
      },
      {
        title: 'Total Users',
        value: formatNumber(stats.totalUsers),
        change: stats.usersChange,
        trend: stats.usersChange >= 0 ? 'up' : 'down',
        icon: 'users',
      },
      {
        title: 'Orders',
        value: formatNumber(stats.totalOrders),
        change: stats.ordersChange,
        trend: stats.ordersChange >= 0 ? 'up' : 'down',
        icon: 'orders',
      },
      {
        title: 'Conversion Rate',
        value: `${stats.conversionRate}%`,
        change: stats.conversionChange,
        trend: stats.conversionChange >= 0 ? 'up' : 'down',
        icon: 'conversion',
      },
    ] as const;
  }, [stats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!stats || kpiData.length === 0) {
    return (
      <Card>
        <CardContent>
          <EmptyState
            title="No statistics available"
            description="KPI data will appear here once available."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {kpiData.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}

export const KPISection = memo(KPISectionComponent);
