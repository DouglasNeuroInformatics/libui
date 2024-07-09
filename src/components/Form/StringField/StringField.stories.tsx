import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { StringField } from './StringField.js';

import type { PasswordStrengthValue } from './StringFieldPassword.js';

type Story = StoryObj<typeof StringField>;

export default { component: StringField } as Meta<typeof StringField>;

export const Short: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Short Text Field',
            name: 'text',
            setValue,
            value,
            variant: 'input'
          }}
        />
      );
    }
  ]
};

export const TextArea: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Text Area',
            name: 'text',
            setValue,
            value,
            variant: 'textarea'
          }}
        />
      );
    }
  ]
};

export const Password: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Password',
            name: 'text',
            setValue,
            value,
            variant: 'password'
          }}
        />
      );
    }
  ]
};

export const PasswordWithStrength: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            calculateStrength: (password: string) => {
              return Math.min(password.length, 4) as PasswordStrengthValue;
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Password',
            name: 'text',
            setValue,
            value,
            variant: 'password'
          }}
        />
      );
    }
  ]
};

export const Select: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            label: 'Favorite Fruit',
            name: 'fruit',
            options: {
              apple: 'Apple',
              banana: 'Banana',
              blueberry: 'Blueberry',
              mango: 'Mango'
            },
            setValue,
            value
          }}
        />
      );
    }
  ]
};
