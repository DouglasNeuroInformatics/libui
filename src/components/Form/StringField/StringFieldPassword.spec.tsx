import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { StringFieldPassword } from './StringFieldPassword.tsx';

import type { StringFieldPasswordProps } from './StringFieldPassword.tsx';

const TestStringFieldPassword = ({
  generatePassphrase,
  readOnly
}: Pick<StringFieldPasswordProps, 'generatePassphrase' | 'readOnly'>) => {
  const [error, setError] = useState<string[] | undefined>();
  const [value, setValue] = useState<string | undefined>();
  return (
    <StringFieldPassword
      error={error}
      generatePassphrase={generatePassphrase}
      kind="string"
      label="password-field"
      name="password-field"
      readOnly={readOnly}
      setError={setError}
      setValue={setValue}
      value={value}
      variant="password"
    />
  );
};

describe('StringFieldPassword', () => {
  const getInput = () => screen.getByLabelText<HTMLInputElement>('password-field');
  const getGenerateButton = () => screen.getByRole('button', { name: 'Generate Passphrase' });

  it('should not render the generate button when generatePassphrase is not provided', () => {
    render(<TestStringFieldPassword />);
    expect(() => getGenerateButton()).toThrow();
  });

  it('should fill the field with the generated passphrase when the button is clicked', async () => {
    render(<TestStringFieldPassword generatePassphrase={() => 'hunter2'} />);
    await userEvent.click(getGenerateButton());
    expect(getInput()).toHaveValue('hunter2');
  });

  it('should reveal the generated passphrase', async () => {
    render(<TestStringFieldPassword generatePassphrase={() => 'hunter2'} />);
    expect(getInput()).toHaveAttribute('type', 'password');
    await userEvent.click(getGenerateButton());
    expect(getInput()).toHaveAttribute('type', 'text');
  });

  it('should allow reaching the generate button with the keyboard', async () => {
    render(<TestStringFieldPassword generatePassphrase={() => 'hunter2'} />);
    getInput().focus();
    await userEvent.tab();
    expect(getGenerateButton()).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(getInput()).toHaveValue('hunter2');
  });

  it('should disable the generate button when the field is read-only', () => {
    render(<TestStringFieldPassword readOnly generatePassphrase={() => 'hunter2'} />);
    expect(getGenerateButton()).toBeDisabled();
  });
});
