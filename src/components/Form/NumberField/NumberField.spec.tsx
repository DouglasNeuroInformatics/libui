import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NumberField } from './NumberField.tsx';

const TestNumberFieldRadio = ({ options }: { options: { [key: number]: string } }) => {
  const [error, setError] = useState<string[] | undefined>();
  const [value, setValue] = useState<number | undefined>();
  return (
    <NumberField
      error={error}
      kind="number"
      label="number-field"
      name="number-field"
      options={options}
      setError={setError}
      setValue={setValue}
      value={value}
      variant="radio"
    />
  );
};

const TWO_OPTIONS = { 0: 'The first in the morning', 1: 'Any other' };
const THREE_OPTIONS = { 1: 'Never', 2: 'Sometimes', 3: 'Always' };
const FIVE_OPTIONS = { 1: 'Very Low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Very High' };

describe('NumberField', () => {
  describe('radio variant', () => {
    it('should render one radio per option', () => {
      render(<TestNumberFieldRadio options={FIVE_OPTIONS} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getAllByRole('radio')).toHaveLength(5);
    });
    it('should stack two options vertically', () => {
      render(<TestNumberFieldRadio options={TWO_OPTIONS} />);
      const radioGroup = screen.getByTestId('radio-group');
      expect(radioGroup).not.toHaveClass('justify-between');
      expect(radioGroup.style.gridTemplateColumns).toBe('');
    });
    it('should stack three options vertically', () => {
      render(<TestNumberFieldRadio options={THREE_OPTIONS} />);
      const radioGroup = screen.getByTestId('radio-group');
      expect(radioGroup).not.toHaveClass('justify-between');
      expect(radioGroup.style.gridTemplateColumns).toBe('');
    });
    it('should spread four or more options horizontally', () => {
      render(<TestNumberFieldRadio options={FIVE_OPTIONS} />);
      const radioGroup = screen.getByTestId('radio-group');
      expect(radioGroup).toHaveClass('justify-between');
      expect(radioGroup.style.gridTemplateColumns).toBe('repeat(5, auto)');
    });
  });
});
