import * as React from 'react';

import { CircleHelpIcon } from 'lucide-react';

import { Popover } from '#components';

/** Lets the pointer cross the gap between the icon and the description without closing it. */
const HOVER_CLOSE_DELAY_MS = 100;

const isMouse = (event: React.PointerEvent) => event.pointerType === 'mouse';

export const FieldGroupDescription: React.FC<{ description?: null | string }> = ({ description }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  if (!description) {
    return null;
  }

  const openOnHover = (event: React.PointerEvent) => {
    if (isMouse(event)) {
      clearTimeout(closeTimeoutRef.current);
      setIsOpen(true);
    }
  };

  const closeOnLeave = (event: React.PointerEvent) => {
    if (isMouse(event)) {
      closeTimeoutRef.current = setTimeout(() => setIsOpen(false), HOVER_CLOSE_DELAY_MS);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        data-testid="field-description-trigger"
        tabIndex={-1}
        // A mouse user has already opened it by hovering, so their click must not toggle it shut.
        onClick={(event) => isOpen && event.preventDefault()}
        onPointerEnter={openOnHover}
        onPointerLeave={closeOnLeave}
      >
        <CircleHelpIcon className="text-muted-foreground" />
      </Popover.Trigger>
      {/* Not focused on open, so hovering the icon cannot pull focus out of a field being typed in. */}
      <Popover.Content asChild autofocus={false} className="text-muted-foreground text-sm">
        <div onPointerEnter={openOnHover} onPointerLeave={closeOnLeave}>
          <p>{description}</p>
        </div>
      </Popover.Content>
    </Popover>
  );
};
