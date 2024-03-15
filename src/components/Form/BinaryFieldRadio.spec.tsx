import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BinaryFieldRadio } from './BinaryFieldRadio';

const TestBinaryFieldRadio = () => {
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<boolean | undefined>();
  return (
    <BinaryFieldRadio
      error={error}
      kind="binary"
      label="Radio Field"
      name="radio-field"
      setError={setError}
      setValue={setValue}
      value={value}
      variant="radio"
    />
  );
};

describe('BinaryFieldRadio', () => {
  it('should render', async () => {
    render(<TestBinaryFieldRadio />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
