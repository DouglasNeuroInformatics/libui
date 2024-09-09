import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { TextArea } from './TextArea';

const TEST_ID = 'text-area';

describe('TextArea ', () => {
  it('should render', () => {
    render(<TextArea />);
    const input = screen.getByTestId(TEST_ID);
    expect(input).toBeInTheDocument();
  });
  it('should allow typing', async () => {
    render(<TextArea />);
    const input = screen.getByTestId(TEST_ID);
    await userEvent.type(input, 'hello world');
    expect(input).toHaveDisplayValue('hello world');
  });
});
