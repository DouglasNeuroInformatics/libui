import type { FC, ReactNode } from 'react';

export const FieldGroupRoot: FC<{ children: ReactNode; name: string }> = ({ children, name }) => (
  <div className="@container flex flex-col gap-3" data-field-group={name}>
    {children}
  </div>
);
