import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { z } from 'zod/v4';

import { Form } from './Form.tsx';

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

  describe('inline block', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should render arbitrary JSX from a block inlined amongst groups', () => {
      render(
        <Form
          content={[
            {
              fields: {
                name: { kind: 'string', label: 'Name', variant: 'input' }
              },
              title: 'Group A'
            },
            {
              kind: 'block',
              render: () => <div data-testid="inline-block">Hello from a block</div>
            }
          ]}
          data-testid={testid}
          validationSchema={z.object({ name: z.string() })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      expect(screen.getByTestId('inline-block')).toHaveTextContent('Hello from a block');
    });

    it('should pass the current form values to the block render function', async () => {
      render(
        <Form
          content={[
            {
              fields: {
                name: { kind: 'string', label: 'Name', variant: 'input' }
              },
              title: 'Group A'
            },
            {
              kind: 'block',
              render: (data) => <div data-testid="inline-block">{data.name ?? '(empty)'}</div>
            }
          ]}
          data-testid={testid}
          validationSchema={z.object({ name: z.string() })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      expect(screen.getByTestId('inline-block')).toHaveTextContent('(empty)');
      await userEvent.type(screen.getByLabelText('Name'), 'Jane');
      expect(screen.getByTestId('inline-block')).toHaveTextContent('Jane');
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
  describe('reset button', () => {
    const renderForm = (props?: { preventResetValuesOnReset?: boolean; resetBtn?: boolean }) => {
      render(
        <Form
          content={{
            name: {
              kind: 'string',
              label: 'Name',
              variant: 'input'
            }
          }}
          data-testid={testid}
          validationSchema={z.object({
            name: z.string().min(3, 'Too short')
          })}
          onError={onError}
          onSubmit={onSubmit}
          {...props}
        />
      );
      return screen.getByLabelText<HTMLInputElement>('Name');
    };

    // The button is identified by its aria-label, so the query does not depend on the resolved
    // translation for the visible text.
    const getResetButton = () => screen.getByRole('button', { name: 'Reset' });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should not render the reset button unless resetBtn is set', () => {
      renderForm();
      expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
    });

    it('should render the reset button when resetBtn is set', () => {
      renderForm({ resetBtn: true });
      expect(getResetButton()).toBeInTheDocument();
    });

    it('should clear the values when the reset button is clicked', async () => {
      const name = renderForm({ resetBtn: true });
      await userEvent.type(name, 'Winston');
      expect(name.value).toBe('Winston');
      await userEvent.click(getResetButton());
      expect(name.value).toBe('');
    });

    it('should not submit the form when the reset button is clicked', async () => {
      const name = renderForm({ resetBtn: true });
      await userEvent.type(name, 'Winston');
      await userEvent.click(getResetButton());
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should clear the errors when the reset button is clicked', async () => {
      const name = renderForm({ resetBtn: true });
      await userEvent.type(name, 'ab');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() =>
        expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject(['Too short'])
      );
      await userEvent.click(getResetButton());
      expect(screen.queryAllByTestId('error-message-text')).toHaveLength(0);
    });

    it('should keep the values, but still clear the errors, when preventResetValuesOnReset is set', async () => {
      const name = renderForm({ preventResetValuesOnReset: true, resetBtn: true });
      await userEvent.type(name, 'ab');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() =>
        expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject(['Too short'])
      );
      await userEvent.click(getResetButton());
      expect(screen.queryAllByTestId('error-message-text')).toHaveLength(0);
      expect(name.value).toBe('ab');
    });

    it('should clear the values after a successful submit, even without the reset button', async () => {
      const name = renderForm();
      await userEvent.type(name, 'Winston');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      await waitFor(() => expect(name.value).toBe(''));
    });

    it('should keep the values after a successful submit when preventResetValuesOnReset is set', async () => {
      const name = renderForm({ preventResetValuesOnReset: true });
      await userEvent.type(name, 'Winston');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(name.value).toBe('Winston');
    });
  });

  describe('date fields', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should render the datetime field when the variant is 'datetime'", () => {
      render(
        <Form
          content={{ when: { kind: 'date', label: 'When', variant: 'datetime' } }}
          validationSchema={z.object({ when: z.date() })}
          onSubmit={onSubmit}
        />
      );
      expect(screen.getByTestId('datetime-date-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('datetime-time-input')).toBeInTheDocument();
      expect(screen.queryByTestId('date-input')).not.toBeInTheDocument();
    });

    it('should render the date-only field when no variant is given', () => {
      render(
        <Form
          content={{ when: { kind: 'date', label: 'When' } }}
          validationSchema={z.object({ when: z.date() })}
          onSubmit={onSubmit}
        />
      );
      expect(screen.getByTestId('date-input')).toBeInTheDocument();
      expect(screen.queryByTestId('datetime-date-trigger')).not.toBeInTheDocument();
      expect(screen.queryByTestId('datetime-time-input')).not.toBeInTheDocument();
    });
  });

  describe('set field exclusive options', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should pass exclusiveOptions from the content to the rendered field', async () => {
      render(
        <Form
          content={{
            symptoms: {
              exclusiveOptions: ['none'],
              kind: 'set',
              label: 'Symptoms',
              options: { headache: 'Headache', nausea: 'Nausea', none: 'None of the above' },
              variant: 'listbox'
            }
          }}
          data-testid={testid}
          validationSchema={z.object({ symptoms: z.set(z.enum(['headache', 'nausea', 'none'])) })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      const headache = screen.getByRole('checkbox', { name: 'Headache' });
      const none = screen.getByRole('checkbox', { name: 'None of the above' });
      await userEvent.click(headache);
      await userEvent.click(none);
      expect(headache).toHaveAttribute('data-state', 'unchecked');
      expect(headache).toBeDisabled();
      expect(screen.getByRole('checkbox', { name: 'Nausea' })).toBeDisabled();
      expect(none).toBeEnabled();
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit).toHaveBeenCalledWith({ symptoms: new Set(['none']) });
    });
  });

  describe('record array', () => {
    const renderForm = (itemSchema: z.ZodType<{ name?: string }>) => {
      render(
        <Form
          content={{
            items: {
              fieldset: { name: { kind: 'string', label: 'Name', variant: 'input' } },
              kind: 'record-array',
              label: 'Item'
            }
          }}
          data-testid={testid}
          validationSchema={z.object({ items: z.array(itemSchema).optional() })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      return screen.getByLabelText<HTMLInputElement>('Name');
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should submit an optional record array that was not filled in, although its fields are required', async () => {
      renderForm(z.object({ name: z.string().min(1) }));
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit.mock.lastCall?.[0]).toStrictEqual({});
      expect(onError).not.toHaveBeenCalled();
    });

    it('should not submit a record with all values empty in place of an omitted record array', async () => {
      renderForm(z.object({ name: z.string().optional() }));
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit.mock.lastCall?.[0]).toStrictEqual({});
    });

    it('should omit a record array where the only value was entered and then cleared', async () => {
      const name = renderForm(z.object({ name: z.string().min(1) }));
      await userEvent.type(name, 'a');
      await userEvent.clear(name);
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit.mock.lastCall?.[0]).toStrictEqual({});
    });

    it('should show the errors on the fields of the first record when the record array is required', async () => {
      render(
        <Form
          content={{
            items: {
              fieldset: { name: { kind: 'string', label: 'Name', variant: 'input' } },
              kind: 'record-array',
              label: 'Item'
            }
          }}
          data-testid={testid}
          validationSchema={z.object({ items: z.array(z.object({ name: z.string('Required') })) })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onError).toHaveBeenCalledOnce());
      expect(onError.mock.lastCall?.[0].issues[0].path).toStrictEqual(['items', 0, 'name']);
      expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject(['Required']);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should not show errors on an empty optional record array when a different field is invalid', async () => {
      render(
        <Form
          content={{
            items: {
              fieldset: { name: { kind: 'string', label: 'Name', variant: 'input' } },
              kind: 'record-array',
              label: 'Item'
            },
            title: { kind: 'string', label: 'Title', variant: 'input' }
          }}
          data-testid={testid}
          validationSchema={z.object({
            items: z.array(z.object({ name: z.string('Name required') })).optional(),
            title: z.string('Title required')
          })}
          onError={onError}
          onSubmit={onSubmit}
        />
      );
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onError).toHaveBeenCalledOnce());
      expect(screen.getAllByTestId('error-message-text').map((e) => e.innerHTML)).toMatchObject(['Title required']);
    });

    it('should submit the records when a value is set', async () => {
      const name = renderForm(z.object({ name: z.string().min(1) }));
      await userEvent.type(name, 'Jane');
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onSubmit).toHaveBeenCalledOnce());
      expect(onSubmit.mock.lastCall?.[0]).toStrictEqual({ items: [{ name: 'Jane' }] });
    });

    it('should continue to validate an empty record when another record has a value', async () => {
      const name = renderForm(z.object({ name: z.string().min(1) }));
      await userEvent.type(name, 'Jane');
      await userEvent.click(screen.getByRole('button', { name: 'Append' }));
      fireEvent.submit(screen.getByTestId(testid));
      await waitFor(() => expect(onError).toHaveBeenCalledOnce());
      expect(onError.mock.lastCall?.[0].issues[0].path).toStrictEqual(['items', 1, 'name']);
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
