import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { FieldGroupDescription } from './FieldGroupDescription.tsx';

const DESCRIPTION = 'Explains what this field is for.';

describe('FieldGroupDescription', () => {
  it('should render nothing without a description', () => {
    render(<FieldGroupDescription description={null} />);
    expect(screen.queryByTestId('field-description-trigger')).not.toBeInTheDocument();
  });

  it('should show the description when the mouse hovers the icon, without needing a click', async () => {
    render(<FieldGroupDescription description={DESCRIPTION} />);
    await userEvent.hover(screen.getByTestId('field-description-trigger'));
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should hide the description once the mouse leaves the icon', async () => {
    render(<FieldGroupDescription description={DESCRIPTION} />);
    const trigger = screen.getByTestId('field-description-trigger');
    await userEvent.hover(trigger);
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByText(DESCRIPTION)).not.toBeInTheDocument());
  });

  it('should stay open while the mouse moves from the icon onto the description', async () => {
    render(<FieldGroupDescription description={DESCRIPTION} />);
    await userEvent.hover(screen.getByTestId('field-description-trigger'));
    await userEvent.hover(screen.getByText(DESCRIPTION));
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should not take focus from the field being typed in when it opens on hover', async () => {
    render(
      <>
        <input aria-label="field" />
        <FieldGroupDescription description={DESCRIPTION} />
      </>
    );
    const input = screen.getByLabelText('field');
    input.focus();
    await userEvent.hover(screen.getByTestId('field-description-trigger'));
    expect(input).toHaveFocus();
  });

  it('should keep the description open when a hovering mouse also clicks the icon', async () => {
    render(<FieldGroupDescription description={DESCRIPTION} />);
    await userEvent.click(screen.getByTestId('field-description-trigger'));
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should still open on a tap, since touch screens cannot hover', async () => {
    const user = userEvent.setup();
    render(<FieldGroupDescription description={DESCRIPTION} />);
    await user.pointer({
      keys: '[TouchA]',
      pointerName: 'touch',
      target: screen.getByTestId('field-description-trigger')
    });
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
});
