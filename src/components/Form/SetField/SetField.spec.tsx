import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SetField } from './SetField.tsx';

import type { SetFieldProps } from './SetField.tsx';

type Option = 'a' | 'b' | 'c' | 'd';

type TestSetFieldProps = Pick<SetFieldProps<Option>, 'disabled' | 'exclusiveOptions' | 'readOnly' | 'variant'> & {
  initialValue?: Option[];
};

const options: { [K in Option]: string } = { a: 'Option A', b: 'Option B', c: 'Option C', d: 'Option D' };

const TestSetField = ({ initialValue, ...props }: TestSetFieldProps) => {
  const [error, setError] = useState<string[] | undefined>();
  const [value, setValue] = useState<Set<Option> | undefined>(initialValue ? new Set(initialValue) : undefined);
  return (
    <>
      <SetField
        error={error}
        kind="set"
        label="set-field"
        name="set-field"
        options={options}
        setError={setError}
        setValue={setValue}
        value={value}
        {...props}
      />
      <output data-testid="value">
        {Array.from(value ?? [])
          .sort()
          .join(',')}
      </output>
    </>
  );
};

const expectValue = (expected: Option[]) => {
  expect(screen.getByTestId('value')).toHaveTextContent(new RegExp(`^${expected.join(',')}$`));
};

describe('SetField', () => {
  describe('listbox', () => {
    const getOption = (option: Option) => screen.getByRole('checkbox', { name: options[option] });

    it('should render a checkbox for each option', () => {
      render(<TestSetField variant="listbox" />);
      expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    });

    it('should allow selecting all options together if there are no exclusive options', async () => {
      render(<TestSetField variant="listbox" />);
      for (const option of ['a', 'b', 'c', 'd'] as const) {
        await userEvent.click(getOption(option));
        expect(getOption(option)).toBeEnabled();
      }
      expectValue(['a', 'b', 'c', 'd']);
    });

    it('should disable the other options when an exclusive option is selected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="listbox" />);
      await userEvent.click(getOption('c'));
      expect(getOption('c')).toBeEnabled();
      expect(getOption('a')).toBeDisabled();
      expect(getOption('b')).toBeDisabled();
      expect(getOption('d')).toBeDisabled();
      await userEvent.click(getOption('a'));
      expectValue(['c']);
    });

    it('should enable the other options when the exclusive option is deselected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="listbox" />);
      await userEvent.click(getOption('c'));
      await userEvent.click(getOption('c'));
      expect(getOption('a')).toBeEnabled();
      await userEvent.click(getOption('a'));
      expectValue(['a']);
    });

    it('should deselect the other options when an exclusive option is selected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="listbox" />);
      await userEvent.click(getOption('a'));
      await userEvent.click(getOption('b'));
      expectValue(['a', 'b']);
      await userEvent.click(getOption('c'));
      expectValue(['c']);
      expect(getOption('a')).toBeDisabled();
    });

    it('should make each exclusive option exclusive of the other exclusive options', async () => {
      render(<TestSetField exclusiveOptions={['c', 'd']} variant="listbox" />);
      await userEvent.click(getOption('c'));
      expect(getOption('d')).toBeDisabled();
      await userEvent.click(getOption('c'));
      await userEvent.click(getOption('d'));
      expectValue(['d']);
      expect(getOption('c')).toBeDisabled();
    });

    it('should not modify a value that already breaks the rule', async () => {
      render(<TestSetField exclusiveOptions={['c']} initialValue={['a', 'c']} variant="listbox" />);
      expectValue(['a', 'c']);
      expect(getOption('a')).toBeDisabled();
      expect(getOption('c')).toBeEnabled();
      await userEvent.click(getOption('c'));
      expectValue(['a']);
      expect(getOption('b')).toBeEnabled();
    });

    it('should allow deselecting exclusive options that were selected together', async () => {
      render(<TestSetField exclusiveOptions={['c', 'd']} initialValue={['c', 'd']} variant="listbox" />);
      expect(getOption('c')).toBeEnabled();
      expect(getOption('d')).toBeEnabled();
      await userEvent.click(getOption('c'));
      expectValue(['d']);
    });

    it.each(['disabled', 'readOnly'] as const)('should disable all options if the field is %s', (prop) => {
      render(<TestSetField exclusiveOptions={['c']} initialValue={['c']} variant="listbox" {...{ [prop]: true }} />);
      for (const checkbox of screen.getAllByRole('checkbox')) {
        expect(checkbox).toBeDisabled();
      }
    });
  });

  describe('select', () => {
    const openMenu = async () => {
      await userEvent.click(screen.getByRole('button'));
      return screen.findByRole('menu');
    };
    const getOption = (option: Option) => screen.getByRole('menuitemcheckbox', { name: options[option] });

    it('should render a menu item for each option', async () => {
      render(<TestSetField variant="select" />);
      await openMenu();
      expect(screen.getAllByRole('menuitemcheckbox')).toHaveLength(4);
    });

    it('should allow selecting all options together if there are no exclusive options', async () => {
      render(<TestSetField variant="select" />);
      await openMenu();
      for (const option of ['a', 'b', 'c', 'd'] as const) {
        await userEvent.click(getOption(option));
        expect(getOption(option)).not.toHaveAttribute('aria-disabled', 'true');
      }
      expectValue(['a', 'b', 'c', 'd']);
    });

    it('should disable the other options when an exclusive option is selected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="select" />);
      await openMenu();
      await userEvent.click(getOption('c'));
      expect(getOption('c')).not.toHaveAttribute('aria-disabled', 'true');
      expect(getOption('a')).toHaveAttribute('aria-disabled', 'true');
      expect(getOption('b')).toHaveAttribute('aria-disabled', 'true');
      expect(getOption('d')).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(getOption('a'), { pointerEventsCheck: 0 });
      expectValue(['c']);
    });

    it('should enable the other options when the exclusive option is deselected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="select" />);
      await openMenu();
      await userEvent.click(getOption('c'));
      await userEvent.click(getOption('c'));
      expect(getOption('a')).not.toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(getOption('a'));
      expectValue(['a']);
    });

    it('should deselect the other options when an exclusive option is selected', async () => {
      render(<TestSetField exclusiveOptions={['c']} variant="select" />);
      await openMenu();
      await userEvent.click(getOption('a'));
      await userEvent.click(getOption('b'));
      expectValue(['a', 'b']);
      await userEvent.click(getOption('c'));
      expectValue(['c']);
      expect(getOption('a')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should make each exclusive option exclusive of the other exclusive options', async () => {
      render(<TestSetField exclusiveOptions={['c', 'd']} variant="select" />);
      await openMenu();
      await userEvent.click(getOption('c'));
      expect(getOption('d')).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(getOption('c'));
      await userEvent.click(getOption('d'));
      expectValue(['d']);
      expect(getOption('c')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not modify a value that already breaks the rule', async () => {
      render(<TestSetField exclusiveOptions={['c']} initialValue={['a', 'c']} variant="select" />);
      await openMenu();
      expectValue(['a', 'c']);
      expect(getOption('a')).toHaveAttribute('aria-disabled', 'true');
      await userEvent.click(getOption('c'));
      expectValue(['a']);
      expect(getOption('b')).not.toHaveAttribute('aria-disabled', 'true');
    });

    it.each(['disabled', 'readOnly'] as const)('should disable the trigger if the field is %s', (prop) => {
      render(<TestSetField exclusiveOptions={['c']} initialValue={['c']} variant="select" {...{ [prop]: true }} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
