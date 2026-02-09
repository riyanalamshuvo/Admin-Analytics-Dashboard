'use client';

import { memo } from 'react';
import { Dropdown, Button } from '@/components/ui';
import { useDashboardStore } from '@/store/useStore';
import { exportToCSV } from '@/data/mockData';
import { Download, RefreshCw } from 'lucide-react';
import type { DateRange, UserType } from '@/types';

const dateRangeOptions = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '12months', label: 'Last 12 months' },
];

const userTypeOptions = [
  { value: 'all', label: 'All Users' },
  { value: 'free', label: 'Free Users' },
  { value: 'premium', label: 'Premium Users' },
  { value: 'enterprise', label: 'Enterprise Users' },
];

function FilterSectionComponent() {
  const {
    dateRange,
    userType,
    setDateRange,
    setUserType,
    fetchData,
    isLoading,
    dashboardData,
  } = useDashboardStore();

  const handleExport = () => {
    if (dashboardData) {
      const filename = `dashboard-export-${dateRange}-${userType}-${new Date().toISOString().split('T')[0]}`;
      exportToCSV(dashboardData, filename);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Dropdown
          options={dateRangeOptions}
          value={dateRange}
          onChange={(value) => setDateRange(value as DateRange)}
          className="w-full sm:w-44"
          label="Date Range"
        />
        <Dropdown
          options={userTypeOptions}
          value={userType}
          onChange={(value) => setUserType(value as UserType)}
          className="w-full sm:w-44"
          label="User Type"
        />
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="md"
          onClick={fetchData}
          disabled={isLoading}
          className="flex-1 sm:flex-initial"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={handleExport}
          disabled={!dashboardData || isLoading}
          className="flex-1 sm:flex-initial"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}

export const FilterSection = memo(FilterSectionComponent);
