import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ActionDropdown } from './ActionDropdown.tsx';

type Props = React.ComponentPropsWithoutRef<typeof ActionDropdown>;

const TEST_ID = 'ActionDropdown';

const TestActionDropdown: React.FC<Partial<Props>> = (props) => {
  return (
    <ActionDropdown
      data-testid={TEST_ID}
      options={['Option 1', 'Option 2']}
      title="Action Dropdown"
      onSelection={vi.fn()}
      {...props}
    />
  );
};

describe('ActionDropdown', () => {
  it('should render', () => {
    render(<TestActionDropdown />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should include custom data attributes', () => {
    render(<TestActionDropdown data-foo="bar" />);
    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('data-foo', 'bar');
  });
  it('should contain a custom class name', () => {
    render(<TestActionDropdown className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
