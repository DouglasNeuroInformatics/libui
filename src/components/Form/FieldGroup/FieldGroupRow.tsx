import type { FC, ReactNode } from 'react';

export const FieldGroupRow: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative flex items-center gap-2">{children}</div>
);
