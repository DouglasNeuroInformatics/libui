import * as React from 'react';

import { cn } from '#utils';

import { Input } from '../Input/Input.tsx';

const InputGroupInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <Input
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
};

export { InputGroupInput };
