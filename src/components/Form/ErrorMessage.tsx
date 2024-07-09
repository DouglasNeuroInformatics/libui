import React from 'react';

import { CircleAlertIcon } from 'lucide-react';

export const ErrorMessage: React.FC<{ error?: null | string[] }> = ({ error }) => {
  return error ? (
    <div className="space-y-1.5">
      {error.map((message) => (
        <div className="flex w-full items-center text-sm font-medium text-destructive" key={message}>
          <CircleAlertIcon className="mr-1" style={{ strokeWidth: '2px' }} />
          <span>{message}</span>
        </div>
      )) ?? null}
    </div>
  ) : null;
};
