import React, { useMemo } from 'react';

import { ChevronUpIcon } from 'lucide-react';
import type { Simplify } from 'type-fest';

import { cn } from '../../utils.js';
import { Button, type ButtonProps } from '../Button/Button.js';

export type ArrowToggleProps = Simplify<
  React.HTMLAttributes<HTMLButtonElement> & {
    /** Whether or not the arrow is currently toggled */
    isToggled?: boolean;

    /** The starting position of the arrow (i.e., which direction does it point to) */
    position: 'down' | 'left' | 'right' | 'up';

    /** The clockwise rotation of the arrow when toggled (e.g., if the position is 'right' and rotation is 90, the arrow will point down) */
    rotation?: number;

    size?: ButtonProps['size'];

    /** The variant of button to use */
    variant?: Extract<ButtonProps['variant'], 'ghost' | 'outline'>;
  }
>;

export const ArrowToggle = React.forwardRef<HTMLButtonElement, ArrowToggleProps>(function ArrowToggle(
  { children, className, isToggled, position, rotation = 0, size = 'icon', variant = 'ghost', ...props },
  ref
) {
  const computedRotation = useMemo(() => {
    const toggleRotation = isToggled ? rotation : 0;
    switch (position) {
      case 'up':
        return 0 + toggleRotation;
      case 'right':
        return 90 + toggleRotation;
      case 'down':
        return 180 + toggleRotation;
      case 'left':
        return 270 + toggleRotation;
    }
  }, [position, rotation, isToggled]);

  return (
    <Button
      className={cn(size === 'icon' && 'h-6 w-6', className)}
      data-testid="arrow-toggle"
      ref={ref}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      <ChevronUpIcon
        className="transform-gpu transition-transform"
        data-testid="arrow-up-icon"
        style={{ transform: `rotate(${computedRotation}deg)` }}
      />
      {children}
    </Button>
  );
});
