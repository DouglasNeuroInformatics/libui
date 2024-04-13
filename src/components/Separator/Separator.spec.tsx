import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './Separator.js';

const TEST_ID = 'separator';

describe('Separator', () => {
  it('should render', () => {
    render(<Separator />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Separator className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
