import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

const TEST_ID = 'card';

describe('Card', () => {
  it('should render', () => {
    render(<Card />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Card className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
