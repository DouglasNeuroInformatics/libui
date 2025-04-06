import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorFallback } from './ErrorFallback';

const TEST_ID = 'error-fallback';

describe('ErrorFallback', () => {
  it('should render', () => {
    const error = new Error('Something went wrong');
    render(<ErrorFallback error={error} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
