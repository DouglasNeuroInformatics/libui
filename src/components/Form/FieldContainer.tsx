import React from 'react';

import { ErrorMessage } from './ErrorMessage';
import { FieldDescription } from './FieldDescription';

export type FieldContainerProps = {
  children: React.ReactNode;
  description?: string;
  error?: string;
};

export const FieldContainer = ({ children, description, error }: FieldContainerProps) => {
  return (
    <div className="space-y-1 border">
      <div className="flex w-full">
        <div className="flex flex-grow flex-col">{children}</div>
        {description && <FieldDescription>{description}</FieldDescription>}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
