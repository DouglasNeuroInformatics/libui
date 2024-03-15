import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BinaryFieldCheckbox } from './BinaryFieldCheckbox';

const TestBinaryFieldCheckbox = () => {
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<boolean | undefined>();
  return (
    <BinaryFieldCheckbox
      error={error}
      kind="binary"
      label="Checkbox Field"
      name="checkbox-field"
      setError={setError}
      setValue={setValue}
      value={value}
      variant="checkbox"
    />
  );
};

describe('BinaryFieldCheckbox', () => {
  it('should render', async () => {
    render(<TestBinaryFieldCheckbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
