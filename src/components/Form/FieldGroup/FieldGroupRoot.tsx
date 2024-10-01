import * as React from 'react';

export const FieldGroupRoot: React.FC<{ children: React.ReactNode; name: string }> = ({ children, name }) => (
  <div className="flex flex-col gap-3 @container" data-field-group={name}>
    {children}
  </div>
);
