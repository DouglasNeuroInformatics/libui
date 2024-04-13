import React from 'react';

export const FieldGroupRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative flex items-center gap-2">{children}</div>
);
