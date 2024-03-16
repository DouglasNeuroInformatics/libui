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
  binaryCheck: boolean;
  binaryRadio: boolean;
  date: Date;
  numericDefault: number;
  numericSlider: number;
  options: 'a' | 'b' | 'c';
  textLong: string;
  textPassword: string;
  textShort: string;
};

export const BasicForm: StoryObj<typeof Form<BasicFormValues>> = {
  args: {
    content: {
      binaryCheck: {
        kind: 'binary',
        label: 'Binary',
        variant: 'checkbox'
      },
      binaryRadio: {
        kind: 'binary',
        label: 'Binary',
        variant: 'radio'
      },
      date: {
        kind: 'date',
        label: 'Date'
      },
      numericDefault: {
        description: 'This is a numeric field',
        kind: 'numeric',
        label: 'Numeric (Default)',
        max: 10,
        min: 0,
        variant: 'default'
      },
      numericSlider: {
        description: 'This is a numeric field',
        kind: 'numeric',
        label: 'Numeric (Slider)',
        max: 10,
        min: 0,
        variant: 'slider'
      },
      options: {
        kind: 'options',
        label: 'Options',
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
      binaryCheck: z.boolean(),
      binaryRadio: z.boolean(),
      date: z.date(),
      numericDefault: z.number(),
      numericSlider: z.number(),
      options: z.enum(['a', 'b', 'c']),
      textLong: z.string(),
      textPassword: z.string(),
      textShort: z.string()
    })
  }
};

type ArrayFormValues = {
  array: {
    dateOfDeath?: Date;
    isDead: boolean;
    patientName: string;
  }[];
  doctorName: string;
};

export const ArrayForm: StoryObj<typeof Form<ArrayFormValues>> = {
  args: {
    content: {
      array: {
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
              kind: 'binary',
              label: 'Is Dead?',
              options: {
                f: 'Not yet',
                t: 'Unfortunately'
              },
              variant: 'radio'
            },
            dateOfDeath: {
              kind: 'dynamic-fieldset',
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
          kind: 'array',
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
      array: z.array(
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
        kind: 'binary',
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
