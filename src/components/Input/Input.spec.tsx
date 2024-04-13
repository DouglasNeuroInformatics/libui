import React from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Input } from './Input.js';

const TEST_ID = 'input';

describe('Input ', () => {
  it('should render', () => {
    render(<Input />);
    const input = screen.getByTestId(TEST_ID);
    expect(input).toBeInTheDocument();
  });
  it('should allow typing', async () => {
    render(<Input />);
    const input = screen.getByTestId(TEST_ID);
    await userEvent.type(input, 'hello world');
    expect(input).toHaveDisplayValue('hello world');
  });
});
