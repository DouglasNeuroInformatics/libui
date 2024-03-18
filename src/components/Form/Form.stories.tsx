/* eslint-disable perfectionist/sort-objects */

import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container">
        <h1 className="string-center string-3xl mb-3">Example Form</h1>
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
  numberInput: number;
  numberRadio: number;
  numberSlider: number;
  setSelect: Set<'a' | 'b' | 'c' | 'd'>;
  stringInput: string;
  stringPassword: string;
  stringSelect: 'a' | 'b' | 'c';
  stringTextArea: string;
};

export const BasicForm: StoryObj<typeof Form<BasicFormValues>> = {
  args: {
    content: {
      booleanCheck: {
        kind: 'boolean',
        label: 'Checkbox (Boolean)',
        variant: 'checkbox'
      },
      booleanRadio: {
        kind: 'boolean',
        label: 'Radio (Boolean)',
        variant: 'radio'
      },
      date: {
        kind: 'date',
        label: 'Date'
      },
      numberInput: {
        description: 'This is a number field',
        kind: 'number',
        label: 'Input (Number)',
        max: 10,
        min: 0,
        variant: 'input'
      },
      numberRadio: {
        description: 'This is a number field',
        kind: 'number',
        variant: 'radio',
        label: 'Radio (Number)',
        options: {
          1: '1 - Very Low',
          2: '2 - Low',
          3: '3 - Medium',
          4: '4 - High',
          5: '5 - Very High'
        }
      },
      numberSlider: {
        description: 'This is a number field',
        kind: 'number',
        label: 'Slider (Number)',
        max: 10,
        min: 0,
        variant: 'slider'
      },
      setSelect: {
        kind: 'set',
        label: 'Select (Set)',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C',
          d: 'Option D'
        }
      },
      stringSelect: {
        kind: 'string',
        label: 'Select (String)',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C'
        },
        variant: 'select'
      },
      stringTextArea: {
        kind: 'string',
        label: 'Text Area (String)',
        variant: 'textarea'
      },
      stringPassword: {
        kind: 'string',
        label: 'Password (String)',
        variant: 'password'
      },
      stringInput: {
        description: 'This is a string field',
        kind: 'string',
        label: 'Input (String)',
        variant: 'input'
      }
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    validationSchema: z.object({
      booleanCheck: z.boolean(),
      booleanRadio: z.boolean(),
      date: z.date(),
      numberInput: z.number(),
      numberSlider: z.number(),
      numberRadio: z.number().min(1).max(5).int(),
      stringSelect: z.enum(['a', 'b', 'c']),
      setSelect: z.set(z.enum(['a', 'b', 'c', 'd'])),
      stringTextArea: z.string(),
      stringPassword: z.string(),
      stringInput: z.string()
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
              kind: 'string',
              label: 'Patient Name',
              variant: 'input'
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
        kind: 'string',
        label: 'Doctor Name',
        variant: 'input'
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
            kind: 'string',
            label: 'Field 1',
            variant: 'input'
          },
          f2: {
            kind: 'string',
            label: 'Field 2',
            variant: 'input'
          }
        },
        title: 'Group 1'
      },
      {
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae natus eaque dolor sequi qui dolore aut at amet fugit, porro, est et maiores, id esse! Esse doloribus laudantium laborum aperiam.',
        fields: {
          f3: {
            kind: 'string',
            label: 'Field 3',
            variant: 'input'
          },
          f4: {
            kind: 'string',
            label: 'Field 4',
            variant: 'input'
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
              kind: 'string',
              label: 'Example',
              variant: 'input'
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
