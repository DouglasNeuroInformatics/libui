import React from 'react';

export const FieldGroupRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-2">{children}</div>
);
