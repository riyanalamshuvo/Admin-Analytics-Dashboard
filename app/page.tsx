'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout';
import { KPISection } from '@/components/kpi';
import { RevenueChart, OrdersChart, UserDistributionChart, TrafficSourceChart } from '@/components/charts';
import { FilterSection } from '@/components/filters';
import { ErrorState } from '@/components/ui/ErrorState';
import { useDashboardStore } from '@/store/useStore';

export default function DashboardPage() {
  const { dashboardData, isLoading, error, fetchData, clearError } = useDashboardStore();

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    clearError();
    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fadeIn">
        {/* Filters Section */}
        <FilterSection />

        {/* Error State */}
        {error && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {/* KPI Section */}
        <KPISection
          stats={dashboardData?.stats ?? null}
          isLoading={isLoading}
        />

        {/* Charts Grid - Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart
            data={dashboardData?.revenueData ?? []}
            isLoading={isLoading}
          />
          <OrdersChart
            data={dashboardData?.orderData ?? []}
            isLoading={isLoading}
          />
        </div>

        {/* Charts Grid - Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserDistributionChart
            data={dashboardData?.userDistribution ?? []}
            isLoading={isLoading}
          />
          <TrafficSourceChart
            data={dashboardData?.trafficSources ?? []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
