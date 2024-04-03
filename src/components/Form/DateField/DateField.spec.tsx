import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DateField } from './DateField';

describe('DateField', () => {
  const setError = vi.fn();
  const setValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render an input with an empty string value ', () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });
  it('should allow typing arbitrary text while focused', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
  });
  it('should not initially show the datepicker', () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    expect(() => screen.getByTestId('datepicker')).toThrow();
  });
  it('should show the datepicker when the input is clicked', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox');
    expect(() => screen.getByTestId('datepicker')).toThrow();
    await userEvent.click(input);
    expect(screen.getByTestId('datepicker')).toBeInTheDocument();
  });
  it('should discard invalid text when unfocused, once the date picker is closed', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
    const datepicker = screen.getByTestId('datepicker');
    await userEvent.click(datepicker);
    expect(datepicker).toBeInTheDocument();
    await userEvent.type(input, 'foo');
    await userEvent.click(screen.getByText('Date'));
    expect(() => screen.getByTestId('datepicker')).toThrow();
    expect(input.value).toBe('');
  });
  it('should not attempt to set the value if the date is invalid', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
    await userEvent.click(screen.getByText('Date'));
    expect(input.value).toBe('');
    expect(setValue).not.toHaveBeenCalled();
  });
  it('should attempt to set the value if the user enters a correct date', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    await userEvent.type(input, '2000-01-01');
    await userEvent.click(screen.getByText('Date'));
    expect(input.value).toBe('2000-01-01');
    expect(setValue).toHaveBeenCalledOnce();
    expect(setValue).toHaveBeenCalledWith(new Date('2000-01-01'));
  });
  it('should allow setting the date using the date picker', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    let datepicker: HTMLElement;
    let expectedDate: Date;
    let expectedDateString: string;

    await userEvent.click(input);
    datepicker = screen.getByTestId('datepicker');
    await userEvent.click(getByText(datepicker, '1'));
    expectedDate = new Date(new Date().setDate(1));
    expectedDateString = toBasicISOString(expectedDate);
    expect(toBasicISOString(setValue.mock.lastCall[0])).toBe(expectedDateString);

    await userEvent.click(input);
    datepicker = screen.getByTestId('datepicker');
    await userEvent.click(getByText(datepicker, '2'));
    expectedDate = new Date(new Date().setDate(2));
    expectedDateString = toBasicISOString(expectedDate);
    expect(toBasicISOString(setValue.mock.lastCall[0])).toBe(expectedDateString);
  });
  it('should render the value provided as a prop', () => {
    const today = new Date();
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={today} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe(toBasicISOString(today));
  });
});
