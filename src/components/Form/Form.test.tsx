import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { z } from 'zod';

import { Form } from './Form';

describe('Form', () => {
  const testid = 'test-form';
  const onError = vi.fn();
  const onSubmit = vi.fn();

  describe('conditional rendering', () => {
    beforeEach(() => {
      render(
        <Form
          content={{
            a: {
              kind: 'boolean',
              label: 'Field A',
              variant: 'checkbox'
            },
            b: {
              deps: ['a'],
              kind: 'dynamic',
              render: (data) => {
                if (!data?.a) {
                  return null;
                }
                return {
                  kind: 'string',
                  label: 'Field B',
                  variant: 'input'
                };
              }
            }
          }}
          data-testid={testid}
          validationSchema={z
            .object({
              a: z.boolean().default(false),
              b: z.string().optional()
            })
            .refine((data) => !data.a || data.b)}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should render', () => {
      expect(screen.getByTestId(testid)).toBeInTheDocument();
    });

    it('should initially display field a, but not field b', () => {
      expect(screen.getByLabelText('Field A')).toBeInTheDocument();
      expect(() => screen.getByLabelText('Field B')).toThrow();
    });

    it('should display field b after checking field a, then remove field b when a is unchecked', () => {
      const a = screen.getByLabelText('Field A');
      expect(a).toHaveAttribute('data-state', 'unchecked');
      fireEvent.click(a);
      expect(a).toHaveAttribute('data-state', 'checked');
      expect(screen.getByLabelText('Field B')).toBeInTheDocument();
      fireEvent.click(a);
      expect(() => screen.getByLabelText('Field B')).toThrow();
    });

    it('should allow submitting the form if field A is not checked', async () => {
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onError).not.toBeCalled();
    });

    it('should not allow submitting the form if field A has been checked', async () => {
      fireEvent.click(screen.getByLabelText('Field A'));
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onError).toHaveBeenCalledOnce());
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should allow submitting the form if field A has been checked and then unchecked', async () => {
      const a = screen.getByLabelText('Field A');
      expect(a).toHaveAttribute('data-state', 'unchecked');
      fireEvent.click(a);
      expect(a).toHaveAttribute('data-state', 'checked');
      fireEvent.click(a);
      expect(a).toHaveAttribute('data-state', 'unchecked');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onError).not.toBeCalled();
    });

    it('should delete the data associated when field b when it is removed from the DOM', async () => {
      const a = screen.getByLabelText('Field A');
      fireEvent.click(a);
      let b: HTMLInputElement = screen.getByLabelText('Field B');
      await userEvent.type(b, 'TEST');
      expect(b.value).toBe('TEST');
      fireEvent.click(a);
      expect(b).not.toBeInTheDocument();
      fireEvent.click(a);
      b = screen.getByLabelText('Field B');
      expect(b).toBeInTheDocument();
      expect(b.value).toBe('');
      fireEvent.click(a);
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit.mock.lastCall?.[0].b).toBeUndefined();
    });
  });

  describe('custom onBeforeSubmit error', () => {
    let onBeforeSubmit: Mock;

    beforeEach(() => {
      onBeforeSubmit = vi.fn();
      render(
        <Form
          content={{
            value: {
              kind: 'number',
              label: 'Value',
              variant: 'input'
            }
          }}
          data-testid={testid}
          validationSchema={z.object({
            value: z.number({ message: 'Please enter a number' })
          })}
          onBeforeSubmit={onBeforeSubmit}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should render', () => {
      expect(screen.getByTestId(testid)).toBeInTheDocument();
    });

    it('should not allow submitting the form with a zod error', async () => {
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() =>
        expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject([
          'Please enter a number'
        ])
      );
      expect(onBeforeSubmit).not.toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not allow submitting the form with the onBeforeSubmit error', async () => {
      onBeforeSubmit.mockResolvedValueOnce({ errorMessage: 'Invalid!', success: false });
      const field: HTMLInputElement = screen.getByLabelText('Value');
      await userEvent.type(field, '-1');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() =>
        expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject(['Invalid!'])
      );
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should allow submitting the form if onBeforeSubmit returns true', async () => {
      onBeforeSubmit.mockResolvedValueOnce({ success: true });
      const field: HTMLInputElement = screen.getByLabelText('Value');
      await userEvent.type(field, '-1');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
    });
  });
});
