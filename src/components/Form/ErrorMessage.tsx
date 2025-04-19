import * as React from 'react';

import { CircleAlertIcon } from 'lucide-react';

import { cn } from '@/utils';

export const ErrorMessage: React.FC<{ className?: string; error?: null | string[] }> = ({ className, error }) => {
  return error ? (
    <div className="space-y-1.5">
      {error.map((message) => (
        <div className={cn('text-destructive flex w-full items-center text-sm font-medium', className)} key={message}>
          <CircleAlertIcon className="mr-1" style={{ strokeWidth: '2px' }} />
          <span>{message}</span>
        </div>
      )) ?? null}
    </div>
  ) : null;
};
