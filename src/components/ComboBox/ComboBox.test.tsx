import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ComboBox } from './ComboBox.tsx';

describe('ComboBox', () => {
  const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

  const setup = ({ allowCustomValue = false, onValueChange = vi.fn() } = {}) => {
    render(
      <div>
        <ComboBox allowCustomValue={allowCustomValue} items={frameworks} onValueChange={onValueChange}>
          <ComboBox.Input data-testid="input" />
          <ComboBox.Content>
            <ComboBox.List>
              {(item: string) => (
                <ComboBox.Item key={item} value={item}>
                  {item}
                </ComboBox.Item>
              )}
            </ComboBox.List>
          </ComboBox.Content>
        </ComboBox>
        <button type="button">Outside</button>
      </div>
    );
    return {
      input: screen.getByTestId<HTMLInputElement>('input'),
      onValueChange,
      outside: screen.getByRole('button', { name: 'Outside' })
    };
  };

  it('should discard text that does not match an item by default', async () => {
    const { input, onValueChange, outside } = setup();
    await userEvent.type(input, 'Qwik');
    await userEvent.click(outside);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
    expect(onValueChange).not.toHaveBeenCalledWith('Qwik', expect.anything());
  });

  it('should keep text that does not match an item when allowCustomValue is set', async () => {
    const { input, onValueChange, outside } = setup({ allowCustomValue: true });
    await userEvent.type(input, 'Qwik');
    await userEvent.click(outside);
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('Qwik', expect.anything());
    });
    expect(input).toHaveValue('Qwik');
  });

  it('should keep custom text typed while the popup is still closed', async () => {
    const { input, onValueChange, outside } = setup({ allowCustomValue: true });
    // Typing without clicking first (e.g. after tabbing in) is what opens the popup.
    input.focus();
    await userEvent.keyboard('Q');
    await userEvent.click(outside);
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('Q', expect.anything());
    });
    expect(input).toHaveValue('Q');
  });

  it('should select the matching item when the custom text is an exact match', async () => {
    const { input, onValueChange, outside } = setup({ allowCustomValue: true });
    await userEvent.type(input, 'astro');
    await userEvent.click(outside);
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('Astro', expect.anything());
    });
    expect(input).toHaveValue('Astro');
  });

  it('should discard custom text when the user presses escape', async () => {
    const { input, onValueChange } = setup({ allowCustomValue: true });
    await userEvent.type(input, 'Qwik');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
    expect(onValueChange).not.toHaveBeenCalledWith('Qwik', expect.anything());
  });

  it('should select an item without creating a custom value', async () => {
    const { input, onValueChange } = setup({ allowCustomValue: true });
    await userEvent.type(input, 'Rem');
    await userEvent.click(await screen.findByRole('option', { name: 'Remix' }));
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('Remix', expect.anything());
    });
    expect(input).toHaveValue('Remix');
  });
});
