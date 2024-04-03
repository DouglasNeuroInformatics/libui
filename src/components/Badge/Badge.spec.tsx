import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

const TEST_ID = 'badge';

describe('Badge', () => {
  it('should render', () => {
    render(<Badge />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Badge className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
