import React from 'react';

export const FieldGroupRoot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-3.5 @container">{children}</div>
);
