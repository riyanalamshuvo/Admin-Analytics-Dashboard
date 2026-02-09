'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Percent } from 'lucide-react';
import { Card } from '@/components/ui';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: 'revenue' | 'users' | 'orders' | 'conversion';
}

const iconMap = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  conversion: Percent,
};

const iconColorMap = {
  revenue: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  users: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  orders: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  conversion: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
};

function KPICardComponent({ title, value, change, trend, icon }: KPICardProps) {
  const Icon = iconMap[icon];
  const isPositive = trend === 'up';

  return (
    <Card hover className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              vs last period
            </span>
          </div>
        </div>
        <div className={cn('p-3 rounded-xl', iconColorMap[icon])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}

export const KPICard = memo(KPICardComponent);
