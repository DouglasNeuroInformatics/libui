import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label.js';

describe('Label', () => {
  it('should render', () => {
    render(<Label>My Label</Label>);
    expect(screen.getByText('My Label')).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<Label className="foo">My Label</Label>);
    expect(screen.getByText('My Label')).toHaveClass('foo');
  });
});
