import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox.js';

const TEST_ID = 'checkbox';

describe('Checkbox', () => {
  it('should render', () => {
    render(<Checkbox />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Checkbox className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
  it('should function correctly', async () => {
    const handleCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={handleCheckedChange} />);
    await userEvent.click(screen.getByTestId(TEST_ID));
    expect(handleCheckedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(screen.getByTestId(TEST_ID));
    expect(handleCheckedChange).toHaveBeenLastCalledWith(false);
  });
});
