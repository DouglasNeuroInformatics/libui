import { fireEvent, getByText, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DateTimeField } from './DateTimeField.tsx';

describe('DateTimeField', () => {
  const setError = vi.fn();
  const setValue = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2025, 0, 1, 22));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should render a date trigger with a placeholder and a time input with the default time', () => {
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    expect(screen.getByTestId('datetime-date-trigger')).toHaveTextContent('Select date');
    const input: HTMLInputElement = screen.getByTestId('datetime-time-input');
    expect(input.type).toBe('time');
    expect(input.value).toMatch(/^00:00(:00)?$/);
  });

  it('should not initially show the datepicker', () => {
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    expect(() => screen.getByTestId('datepicker')).toThrow();
  });

  it('should show the datepicker when the date trigger is clicked', async () => {
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    await userEvent.click(screen.getByTestId('datetime-date-trigger'));
    expect(screen.getByTestId('datepicker')).toBeInTheDocument();
  });

  it('should set the value to the selected date at the default time, and close the datepicker', async () => {
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    await userEvent.click(screen.getByTestId('datetime-date-trigger'));
    await userEvent.click(getByText(screen.getByTestId('datepicker'), '15'));
    expect(setValue).toHaveBeenCalledOnce();
    expect(setValue).toHaveBeenCalledWith(new Date(2025, 0, 15, 0, 0, 0));
    expect(() => screen.getByTestId('datepicker')).toThrow();
  });

  it('should use a time entered before a date is selected', async () => {
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    fireEvent.change(screen.getByTestId('datetime-time-input'), { target: { value: '14:30:15' } });
    expect(setValue).not.toHaveBeenCalled();
    await userEvent.click(screen.getByTestId('datetime-date-trigger'));
    await userEvent.click(getByText(screen.getByTestId('datepicker'), '15'));
    expect(setValue).toHaveBeenCalledWith(new Date(2025, 0, 15, 14, 30, 15));
  });

  it('should update the time of the current value when the time is changed', () => {
    const value = new Date(2025, 0, 15, 10, 30, 0);
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={value} />
    );
    fireEvent.change(screen.getByTestId('datetime-time-input'), { target: { value: '18:45:30' } });
    expect(setValue).toHaveBeenCalledWith(new Date(2025, 0, 15, 18, 45, 30));
  });

  it('should not set the value if the time is cleared', () => {
    const value = new Date(2025, 0, 15, 10, 30, 0);
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={value} />
    );
    fireEvent.change(screen.getByTestId('datetime-time-input'), { target: { value: '' } });
    expect(setValue).not.toHaveBeenCalled();
  });

  it('should render the value provided as a prop', () => {
    const value = new Date(2025, 0, 15, 10, 30, 5);
    render(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={value} />
    );
    expect(screen.getByTestId('datetime-date-trigger')).toHaveTextContent('2025-01-15');
    expect(screen.getByTestId<HTMLInputElement>('datetime-time-input').value).toBe('10:30:05');
  });

  it('should reset the inputs when the value is cleared', () => {
    const { rerender } = render(
      <DateTimeField
        label="Appointment"
        name="appointment"
        setError={setError}
        setValue={setValue}
        value={new Date(2025, 0, 15, 10, 30, 5)}
      />
    );
    rerender(
      <DateTimeField label="Appointment" name="appointment" setError={setError} setValue={setValue} value={undefined} />
    );
    expect(screen.getByTestId('datetime-date-trigger')).toHaveTextContent('Select date');
    expect(screen.getByTestId<HTMLInputElement>('datetime-time-input').value).toMatch(/^00:00(:00)?$/);
  });

  it('should disable both inputs when disabled', () => {
    render(
      <DateTimeField
        disabled
        label="Appointment"
        name="appointment"
        setError={setError}
        setValue={setValue}
        value={undefined}
      />
    );
    expect(screen.getByTestId('datetime-date-trigger')).toBeDisabled();
    expect(screen.getByTestId('datetime-time-input')).toBeDisabled();
  });
});
