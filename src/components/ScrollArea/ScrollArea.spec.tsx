import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from './ScrollArea.js';

const TEST_ID = 'scroll-area';

describe('ScrollArea', () => {
  it('should render', () => {
    render(<ScrollArea />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<ScrollArea className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
