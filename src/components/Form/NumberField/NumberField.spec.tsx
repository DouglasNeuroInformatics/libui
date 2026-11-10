import { useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NumberField } from './NumberField.tsx';

import type { NumberFieldSliderProps } from './NumberFieldSlider.tsx';

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

const TestNumberFieldSlider = (
  props: Partial<Pick<NumberFieldSliderProps, 'defaultValue' | 'marks' | 'max' | 'min' | 'showRange'>>
) => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <>
      <NumberField
        kind="number"
        label="number-field"
        max={10}
        min={0}
        name="number-field"
        setError={() => undefined}
        setValue={setValue}
        value={value}
        variant="slider"
        {...props}
      />
      <button type="button" onClick={() => setValue(undefined)}>
        clear
      </button>
    </>
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

  describe('slider variant', () => {
    const getThumbPosition = () => screen.getByRole('slider').getAttribute('aria-valuenow');
    const getDisplayedValue = () => screen.getByTestId('slider-value').textContent;

    it('should render no annotations by default', () => {
      render(<TestNumberFieldSlider />);
      expect(screen.queryByTestId('slider-annotations')).not.toBeInTheDocument();
    });

    it('should display a dimmed thumb at the midpoint when there is no value', () => {
      render(<TestNumberFieldSlider max={20} min={10} />);
      expect(getThumbPosition()).toBe('15');
      expect(getDisplayedValue()).toBe('NA');
      expect(screen.getByTestId('slider-thumb').closest('[data-unset]')).toBeInTheDocument();
    });

    it('should select the midpoint when the user presses the slider without a value', () => {
      render(<TestNumberFieldSlider />);
      // happy-dom does not implement pointer capture, which the slider uses when it is pressed
      screen.getByTestId('slider-thumb').setPointerCapture = () => undefined;
      fireEvent.pointerDown(screen.getByTestId('slider-thumb'));
      expect(getDisplayedValue()).toBe('5');
      expect(screen.getByTestId('slider-thumb').closest('[data-unset]')).not.toBeInTheDocument();
    });

    it('should select a value with the keyboard when there is no value', () => {
      render(<TestNumberFieldSlider />);
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(getDisplayedValue()).toBe('6');
    });

    it('should set the default value as a real value that is visible', () => {
      render(<TestNumberFieldSlider defaultValue={3} />);
      expect(getDisplayedValue()).toBe('3');
      expect(getThumbPosition()).toBe('3');
      expect(screen.getByTestId('slider-thumb').closest('[data-unset]')).not.toBeInTheDocument();
    });

    it('should set the default value again when the value is cleared', () => {
      render(<TestNumberFieldSlider defaultValue={3} />);
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(getDisplayedValue()).toBe('4');
      fireEvent.click(screen.getByText('clear'));
      expect(getDisplayedValue()).toBe('3');
    });

    it('should display the minimum and maximum when showRange is set', () => {
      render(<TestNumberFieldSlider showRange max={20} min={10} />);
      expect(screen.getByTestId('slider-range')).toHaveTextContent('1020');
      expect(screen.queryByTestId('slider-marks')).not.toBeInTheDocument();
    });

    it('should display the marks in order at the position of their value', () => {
      render(<TestNumberFieldSlider marks={{ 0: 'Not at all', 5: 'Moderately', 10: 'Extremely' }} />);
      const marks = [...screen.getByTestId('slider-marks').querySelectorAll<HTMLElement>('[data-mark-value]')];
      expect(marks.map((mark) => mark.textContent)).toStrictEqual(['Not at all', 'Moderately', 'Extremely']);
      expect(marks.map((mark) => mark.style.marginLeft)).toStrictEqual(['0%', '50%', '100%']);
      expect(screen.queryByTestId('slider-range')).not.toBeInTheDocument();
    });

    it('should not display a mark that is outside of the range', () => {
      render(<TestNumberFieldSlider marks={{ 5: 'Moderately', 11: 'Too high' }} />);
      expect(screen.getByTestId('slider-marks')).toHaveTextContent('Moderately');
      expect(screen.queryByText('Too high')).not.toBeInTheDocument();
    });
  });
});
