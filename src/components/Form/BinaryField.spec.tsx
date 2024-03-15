import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BinaryField, type BinaryFieldProps } from './BinaryField';

const TestBinaryField = ({ variant }: Pick<BinaryFieldProps, 'variant'>) => {
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<boolean | undefined>();
  return (
    <BinaryField
      error={error}
      kind="binary"
      label="binary-field"
      name="binary-field"
      setError={setError}
      setValue={setValue}
      value={value}
      variant={variant}
    />
  );
};

describe('BinaryField', () => {
  it('should render a checkbox field', async () => {
    render(<TestBinaryField variant="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(() => screen.getByRole('radiogroup')).toThrow();
  });
  it('should render a radio field', async () => {
    render(<TestBinaryField variant="radio" />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(() => screen.getByRole('checkbox')).toThrow();
  });
});
