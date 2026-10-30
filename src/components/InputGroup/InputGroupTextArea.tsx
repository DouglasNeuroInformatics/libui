import * as React from 'react';

import { cn } from '#utils';

import { TextArea } from '../TextArea/TextArea.tsx';

const InputGroupTextArea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <TextArea
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
        className
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
};

export { InputGroupTextArea };
