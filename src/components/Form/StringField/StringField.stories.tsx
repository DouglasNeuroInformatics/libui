import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { StringField } from './StringField.tsx';

import type { StringFieldComboBoxProps } from './StringFieldComboBox.tsx';
import type { PasswordStrengthValue, StringFieldPasswordProps } from './StringFieldPassword.tsx';

type Story = StoryObj<typeof StringField>;

/** Typed to the combobox props so `allowCustomValue`, which the other variants lack, is readable in the decorator */
type ComboBoxStory = StoryObj<StringFieldComboBoxProps>;

/** Typed to the password props so `generatePassword`, which the other variants lack, may be passed */
type PasswordStory = StoryObj<StringFieldPasswordProps>;

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
            placeholder: 'This is a text area...',
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

export const PasswordWithGenerate: PasswordStory = {
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
            generatePassword: () => Math.random().toString(36).slice(2, 12),
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
            value,
            variant: 'select'
          }}
        />
      );
    }
  ]
};

export const ComboBox: ComboBoxStory = {
  args: {
    allowCustomValue: true
  },
  argTypes: {
    allowCustomValue: {
      control: 'boolean',
      description: 'Whether text that does not match any option may be entered'
    }
  },
  decorators: [
    // The args passed here override the story args, so the toggled value must be read from context.
    (Story, { args }) => {
      const [value, setValue] = useState<string | undefined>();
      return (
        <Story
          args={{
            allowCustomValue: args.allowCustomValue,
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
            value,
            variant: 'combobox'
          }}
        />
      );
    }
  ]
};
