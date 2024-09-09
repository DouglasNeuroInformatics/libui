import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BooleanField, type BooleanFieldProps } from './BooleanField';

const TestBooleanField = ({ variant }: Pick<BooleanFieldProps, 'variant'>) => {
  const [error, setError] = useState<string[] | undefined>();
  const [value, setValue] = useState<boolean | undefined>();
  return (
    <BooleanField
      error={error}
      label="boolean-field"
      name="boolean-field"
      setError={setError}
      setValue={setValue}
      value={value}
      variant={variant}
    />
  );
};

describe('BooleanField', () => {
  it('should render a checkbox field', () => {
    render(<TestBooleanField variant="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(() => screen.getByRole('radiogroup')).toThrow();
  });
  it('should render a radio field', () => {
    render(<TestBooleanField variant="radio" />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(() => screen.getByRole('checkbox')).toThrow();
  });
});
