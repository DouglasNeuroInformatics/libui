import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { ArrowToggle } from './ArrowToggle';

type Story = StoryObj<typeof ArrowToggle>;

export default { component: ArrowToggle, tags: ['autodocs'] } as Meta<typeof ArrowToggle>;

export const UpToDown: Story = {
  decorators: [
    (Story) => {
      const [isToggled, setIsToggled] = useState(false);
      return <Story args={{ isToggled, onClick: () => setIsToggled(!isToggled), position: 'up', rotation: 180 }} />;
    }
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('arrow-toggle');
    const icon = canvas.getByTestId('arrow-up-icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    expect(button.getAttribute('data-toggled')).toBe('false');
    expect(icon.style.transform).toBe('rotate(0deg)');

    await step('click button', async () => {
      await userEvent.click(button);
    });

    expect(button.getAttribute('data-toggled')).toBe('true');
    expect(icon.style.transform).toBe('rotate(180deg)');
  }
};

export const LeftToDown: Story = {
  decorators: [
    (Story) => {
      const [isToggled, setIsToggled] = useState(false);
      return <Story args={{ isToggled, onClick: () => setIsToggled(!isToggled), position: 'left', rotation: -90 }} />;
    }
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('arrow-toggle');
    const icon = canvas.getByTestId('arrow-up-icon');

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    expect(button.getAttribute('data-toggled')).toBe('false');
    expect(icon.style.transform).toBe('rotate(270deg)');

    await step('click button', async () => {
      await userEvent.click(button);
    });

    expect(button.getAttribute('data-toggled')).toBe('true');
    expect(icon.style.transform).toBe('rotate(180deg)');
  }
};
