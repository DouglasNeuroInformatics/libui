import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

const TEST_ID = 'avatar';

const TestAvatar = (props: Record<string, any>) => (
  <Avatar {...props}>
    <Avatar.Image alt="@shadcn" src="https://github.com/shadcn.png" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar>
);

describe('Avatar', () => {
  it('should render', async () => {
    render(<TestAvatar />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Avatar className="foo" />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
});
