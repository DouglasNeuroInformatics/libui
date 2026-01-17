import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button.tsx';

describe('Button', () => {
  it('should render', () => {
    render(<Button>My Button</Button>);
    expect(screen.getByText('My Button')).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Button className="foo">My Button</Button>);
    expect(screen.getByText('My Button')).toHaveClass('foo');
  });
  it('should render a custom class name within a child element, if asChild is set to true', () => {
    render(
      <Button asChild className="foo">
        <a data-testid="link" href="https://google.com">
          My Link
        </a>
      </Button>
    );
    expect(screen.getByTestId('link')).toHaveClass('foo');
  });
});
