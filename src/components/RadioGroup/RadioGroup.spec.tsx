import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Label } from '../Label/Label.tsx';
import { RadioGroup } from './RadioGroup.tsx';

import type { RadioGroupProps } from './RadioGroup.tsx';

const TEST_ID = 'radio-group';

const TestRadioGroup = (props: RadioGroupProps) => (
  <RadioGroup {...props}>
    <div className="flex items-center space-x-2">
      <RadioGroup.Item id="option-one" value="option-one" />
      <Label htmlFor="option-one">Option One</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroup.Item id="option-two" value="option-two" />
      <Label htmlFor="option-two">Option Two</Label>
    </div>
  </RadioGroup>
);

describe('RadioGroup', () => {
  it('should render', () => {
    render(<TestRadioGroup />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<TestRadioGroup className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
  it('should function correctly', async () => {
    const handleValueChange = vi.fn();
    render(<TestRadioGroup onValueChange={handleValueChange} />);
    await userEvent.click(screen.getByText('Option One'));
    expect(handleValueChange).toHaveBeenLastCalledWith('option-one');
    await userEvent.click(screen.getByText('Option Two'));
    expect(handleValueChange).toHaveBeenLastCalledWith('option-two');
  });
});
