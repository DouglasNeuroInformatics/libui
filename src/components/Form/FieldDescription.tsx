import { CircleHelpIcon } from 'lucide-react';

import { Popover } from '../Popover';

export type FieldDescriptionProps = {
  /** The description to display */
  children: string;
};

export const FieldDescription = ({ children }: FieldDescriptionProps) => (
  <Popover>
    <Popover.Trigger>
      <CircleHelpIcon className="text-muted-foreground" />
    </Popover.Trigger>
    <Popover.Content className="text-sm text-muted-foreground">
      <p>{children}</p>
    </Popover.Content>
  </Popover>
);
