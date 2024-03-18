/* eslint-disable perfectionist/sort-objects */

import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container">
        <h1 className="mb-3 text-center text-3xl">Example Form</h1>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
};
export default meta;

type BasicFormValues = {
  booleanCheck: boolean;
  booleanRadio: boolean;
  date: Date;
  enum: 'a' | 'b' | 'c';
  numberDefault: number;
  numberSlider: number;
  setDropdown: Set<'a' | 'b' | 'c' | 'd'>;
  textLong: string;
  textPassword: string;
  textShort: string;
};

export const BasicForm: StoryObj<typeof Form<BasicFormValues>> = {
  args: {
    content: {
      booleanCheck: {
        kind: 'boolean',
        label: 'Boolean',
        variant: 'checkbox'
      },
      booleanRadio: {
        kind: 'boolean',
        label: 'Boolean',
        variant: 'radio'
      },
      date: {
        kind: 'date',
        label: 'Date'
      },
      numberDefault: {
        description: 'This is a number field',
        kind: 'number',
        label: 'Number (Default)',
        max: 10,
        min: 0,
        variant: 'default'
      },
      numberSlider: {
        description: 'This is a number field',
        kind: 'number',
        label: 'Number (Slider)',
        max: 10,
        min: 0,
        variant: 'slider'
      },
      enum: {
        kind: 'enum',
        label: 'Enum',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C'
        }
      },
      textLong: {
        kind: 'text',
        label: 'Long Text',
        variant: 'long'
      },
      textPassword: {
        kind: 'text',
        label: 'Password',
        variant: 'password'
      },
      setDropdown: {
        kind: 'set',
        label: 'Set',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C',
          d: 'Option D'
        }
      },
      textShort: {
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae natus eaque dolor sequi qui dolore aut at amet fugit, porro, est et maiores, id esse! Esse doloribus laudantium laborum aperiam.',
        kind: 'text',
        label: 'Short Text',
        variant: 'short'
      }
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    validationSchema: z.object({
      booleanCheck: z.boolean(),
      booleanRadio: z.boolean(),
      date: z.date(),
      numberDefault: z.number(),
      numberSlider: z.number(),
      enum: z.enum(['a', 'b', 'c']),
      setDropdown: z.set(z.enum(['a', 'b', 'c', 'd'])),
      textLong: z.string(),
      textPassword: z.string(),
      textShort: z.string()
    })
  }
};

type CompositeFormValues = {
  composite: {
    dateOfDeath?: Date;
    isDead: boolean;
    patientName: string;
  }[];
  doctorName: string;
};

export const CompositeForm: StoryObj<typeof Form<CompositeFormValues>> = {
  args: {
    content: {
      composite: {
        deps: [],
        kind: 'dynamic',
        render: () => ({
          fieldset: {
            patientName: {
              kind: 'text',
              label: 'Patient Name',
              variant: 'short'
            },
            isDead: {
              kind: 'boolean',
              label: 'Is Dead?',
              options: {
                f: 'Not yet',
                t: 'Unfortunately'
              },
              variant: 'radio'
            },
            dateOfDeath: {
              kind: 'dynamic',
              render: (fieldset) => {
                if (!fieldset.isDead) {
                  return null;
                }
                return {
                  kind: 'date',
                  label: 'Date of Death'
                };
              }
            }
          },
          kind: 'composite',
          label: 'Patient'
        })
      },
      doctorName: {
        kind: 'text',
        label: 'Doctor Name',
        variant: 'short'
      }
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    validationSchema: z.object({
      composite: z.array(
        z.object({
          dateOfDeath: z.date().optional(),
          isDead: z.boolean(),
          patientName: z.string()
        })
      ),
      doctorName: z.string()
    })
  }
};

type GroupedFormValues = {
  f1: string;
  f2: string;
  f3: string;
  f4: string;
};

export const GroupedForm: StoryObj<typeof Form<GroupedFormValues>> = {
  args: {
    content: [
      {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam et ut aut. Assumenda facilis numquam cupiditate aut in magni quisquam et natus obcaecati dicta eum nulla ducimus, earum alias rerum.',
        fields: {
          f1: {
            kind: 'text',
            label: 'Field 1',
            variant: 'short'
          },
          f2: {
            kind: 'text',
            label: 'Field 2',
            variant: 'short'
          }
        },
        title: 'Group 1'
      },
      {
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae natus eaque dolor sequi qui dolore aut at amet fugit, porro, est et maiores, id esse! Esse doloribus laudantium laborum aperiam.',
        fields: {
          f3: {
            kind: 'text',
            label: 'Field 3',
            variant: 'short'
          },
          f4: {
            kind: 'text',
            label: 'Field 4',
            variant: 'short'
          }
        },
        title: 'Group 2'
      }
    ],
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    validationSchema: z.object({
      f1: z.string(),
      f2: z.string(),
      f3: z.string(),
      f4: z.string()
    })
  }
};

type DynamicFormValues = {
  a: boolean;
  b?: string;
};

export const DynamicForm: StoryObj<typeof Form<DynamicFormValues>> = {
  args: {
    content: {
      a: {
        kind: 'boolean',
        label: 'Should Show B?',
        variant: 'radio'
      },
      b: {
        deps: ['a'],
        kind: 'dynamic',
        render: (data) => {
          if (data?.a) {
            return {
              kind: 'text',
              label: 'Example',
              variant: 'short'
            };
          }
          return null;
        }
      }
    },
    validationSchema: z.object({
      a: z.boolean(),
      b: z.string().optional()
    }),
    onSubmit: (data) => {
      alert(JSON.stringify(data));
    }
  }
};
