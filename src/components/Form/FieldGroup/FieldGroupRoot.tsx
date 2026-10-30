import * as React from 'react';

export const FieldGroupRoot: React.FC<{ children: React.ReactNode; name: string }> = ({ children, name }) => (
  <div className="@container flex flex-col gap-3" data-field-group={name}>
    {children}
  </div>
);
