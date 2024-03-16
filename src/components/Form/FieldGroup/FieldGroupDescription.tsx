import { CircleHelpIcon } from 'lucide-react';

import { Popover } from '@/components/Popover';

export const FieldGroupDescription: React.FC<{ description?: null | string }> = ({ description }) =>
  description ? (
    <Popover>
      <Popover.Trigger>
        <CircleHelpIcon className="text-muted-foreground" />
      </Popover.Trigger>
      <Popover.Content className="text-sm text-muted-foreground">
        <p>{description}</p>
      </Popover.Content>
    </Popover>
  ) : null;
