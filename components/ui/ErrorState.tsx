'use client';

import { memo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button, Card } from '@/components/ui';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

function ErrorStateComponent({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
          {message}
        </p>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}

export const ErrorState = memo(ErrorStateComponent);
