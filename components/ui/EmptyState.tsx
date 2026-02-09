'use client';

import { memo, ReactNode } from 'react';
import { FileQuestion } from 'lucide-react';
import { Card } from '@/components/ui';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

function EmptyStateComponent({
  title = 'No data available',
  description = 'There is no data to display at the moment.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          {icon || <FileQuestion className="w-8 h-8 text-gray-400" />}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
          {description}
        </p>
        {action}
      </div>
    </Card>
  );
}

export const EmptyState = memo(EmptyStateComponent);
