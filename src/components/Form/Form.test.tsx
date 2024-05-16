import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { Form } from './Form.js';

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
    it('should allow submitting the form if field A is not checked', () => {
      fireEvent.submit(screen.getByTestId(testid));
      expect(onError).not.toBeCalled();
      expect(onSubmit).toHaveBeenCalledOnce();
    });
    it('should not allow submitting the form if field A has been checked', () => {
      fireEvent.click(screen.getByLabelText('Field A'));
      fireEvent.submit(screen.getByTestId(testid));
      expect(onError).toHaveBeenCalledOnce();
      expect(onSubmit).not.toHaveBeenCalled();
    });
    it('should allow submitting the form if field A has been checked and then unchecked', () => {
      const a = screen.getByLabelText('Field A');
      expect(a).toHaveAttribute('data-state', 'unchecked');
      fireEvent.click(a);
      expect(a).toHaveAttribute('data-state', 'checked');
      fireEvent.click(a);
      expect(a).toHaveAttribute('data-state', 'unchecked');
      fireEvent.submit(screen.getByTestId(testid));
      expect(onError).not.toBeCalled();
      expect(onSubmit).toHaveBeenCalledOnce();
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
      expect(onSubmit).toHaveBeenCalledOnce();
      expect(onSubmit.mock.lastCall[0].b).toBeUndefined();
    });
  });
});
