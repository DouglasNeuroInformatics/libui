import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DateField } from './DateField';

describe('DateField', () => {
  const setError = vi.fn();
  const setValue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render an input with an empty string value ', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement | null;
    expect(input).toBeInTheDocument();
    expect(input?.value).toBe('');
  });
  it('should allow typing arbitrary text while focused', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
  });
  it('should not initially show the datepicker', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    expect(() => screen.getByTestId('datepicker')).toThrow();
  });
  it('should show the datepicker when the input is clicked', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(() => screen.getByTestId('datepicker')).toThrow();
    await userEvent.click(input);
    expect(screen.getByTestId('datepicker')).toBeInTheDocument();
  });
  it('should discard invalid text when unfocused, once the date picker is closed', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
    const datepicker = screen.getByTestId('datepicker') as HTMLElement;
    await userEvent.click(datepicker);
    expect(datepicker).toBeInTheDocument();
    await userEvent.type(input, 'foo');
    await userEvent.click(screen.getByText('Date'));
    expect(() => screen.getByTestId('datepicker')).toThrow();
    expect(input.value).toBe('');
  });
  it('should not attempt to set the value if the date is invalid', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'foo');
    expect(input.value).toBe('foo');
    await userEvent.click(screen.getByText('Date'));
    expect(input.value).toBe('');
    expect(setValue).not.toHaveBeenCalled();
  });
  it('should attempt to set the value if the user enters a correct date', async () => {
    render(<DateField label="Date" name="date" setError={setError} setValue={setValue} value={undefined} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, '2000-01-01');
    await userEvent.click(screen.getByText('Date'));
    expect(input.value).toBe('2000-01-01');
    expect(setValue).toHaveBeenCalledOnce();
    expect(setValue).toHaveBeenCalledWith(new Date('2000-01-01'));
  });
});
