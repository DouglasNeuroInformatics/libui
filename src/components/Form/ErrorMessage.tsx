import * as React from 'react';

import { CircleAlertIcon } from 'lucide-react';

import { cn } from '#utils';

export const ErrorMessage: React.FC<{ className?: string; error?: null | string[]; hideIconOnWrap?: boolean }> = ({
  className,
  error,
  hideIconOnWrap
}) => {
  if (!error) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1.5">
      {error.map((message) => (
        <div
          className={cn(
            'text-destructive flex w-full items-center text-sm font-medium',
            hideIconOnWrap && 'flex-wrap',
            className
          )}
          key={message}
        >
          <div className="@container/alert mr-1.5 flex min-w-4 shrink-0 flex-grow-[1] items-center justify-start">
            <div className="h-0 w-0" />
            <CircleAlertIcon
              className="@min-[24px]/alert:hidden"
              style={{ height: '16px', strokeWidth: '2px', width: '16px' }}
            />
          </div>
          <span className="flex-grow-[999]" data-testid="error-message-text">
            {message}
          </span>
        </div>
      ))}
    </div>
  );
};
