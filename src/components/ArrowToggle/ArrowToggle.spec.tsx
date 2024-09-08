import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ArrowToggle, type ArrowToggleProps } from './ArrowToggle.js';

const TestArrowToggle = ({ onClick, ...props }: Omit<ArrowToggleProps, 'isToggled'>) => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <ArrowToggle
      isToggled={isToggled}
      onClick={(event) => {
        setIsToggled(!isToggled);
        onClick?.(event);
      }}
      {...props}
    />
  );
};

describe('ArrowToggle', () => {
  it('renders with default props', () => {
    render(<TestArrowToggle position="up" rotation={90} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with a custom class', () => {
    render(<TestArrowToggle className="custom-class" position="down" rotation={90} />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('toggles rotation on click', () => {
    render(<TestArrowToggle position="right" rotation={90} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByTestId('arrow-up-icon')).toHaveStyle('transform: rotate(180deg)');
    fireEvent.click(button);
    expect(screen.getByTestId('arrow-up-icon')).toHaveStyle('transform: rotate(90deg)');
  });

  it('handles custom onClick', () => {
    const handleClick = vi.fn();
    render(<TestArrowToggle position="up" rotation={90} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
