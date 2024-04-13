import React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Popover } from './Popover.js';

const TestPopover = () => (
  <Popover>
    <Popover.Trigger>Open</Popover.Trigger>
    <Popover.Content>Place content for the popover here.</Popover.Content>
  </Popover>
);

describe('Popover', () => {
  it('should function correctly', async () => {
    render(<TestPopover />);
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(() => screen.getByText('Place content for the popover here.')).toThrow();
    await userEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Place content for the popover here.')).toBeInTheDocument();
  });
});
