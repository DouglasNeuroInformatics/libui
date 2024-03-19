/* eslint-disable perfectionist/sort-objects */

import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Heading } from '../Heading';
import { Form } from './Form';

type ExampleFormData = {
  booleanCheck: boolean;
  booleanRadio: boolean;
  composite: {
    dynamicField?: string;
    showDynamicField?: boolean;
    stringInput?: string;
  }[];
  date: Date;
  dynamicField?: string;
  numberInput: number;
  numberRadio: number;
  numberSlider: number;
  setRadio: Set<'a' | 'b' | 'c' | 'd'>;
  setSelect: Set<'a' | 'b' | 'c' | 'd'>;
  showDynamicField?: boolean;
  stringInput: string;
  stringPassword: string;
  stringSelect: 'a' | 'b' | 'c';
  stringTextArea: string;
};

const meta: Meta<typeof Form> = {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container">
        <Heading className="mb-8 text-center" variant="h1">
          Example Form
        </Heading>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
};
export default meta;

export const Default: StoryObj<typeof Form<ExampleFormData>> = {
  args: {
    content: [
      {
        title: 'Boolean',
        description: "The following variants are available for 'boolean' fields",
        fields: {
          booleanRadio: {
            kind: 'boolean',
            label: 'Radio',
            variant: 'radio'
          },
          booleanCheck: {
            kind: 'boolean',
            label: 'Checkbox',
            variant: 'checkbox'
          }
        }
      },
      {
        title: 'Date',
        description: `The following variants are available for 'date' fields`,
        fields: {
          date: {
            kind: 'date',
            label: 'Datepicker (Default)'
          }
        }
      },
      {
        title: 'Date',
        description: `The following variants are available for 'number' fields`,
        fields: {
          numberInput: {
            description: 'This is a number field',
            kind: 'number',
            label: 'Input',
            max: 10,
            min: 0,
            variant: 'input'
          },
          numberRadio: {
            description: 'This is a number field',
            kind: 'number',
            variant: 'radio',
            label: 'Radio',
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
            label: 'Slider',
            max: 10,
            min: 0,
            variant: 'slider'
          }
        }
      },
      {
        title: 'Set',
        description: `The following variants are available for 'set' fields`,
        fields: {
          setRadio: {
            kind: 'set',
            label: 'Radio',
            options: {
              a: 'Option A',
              b: 'Option B',
              c: 'Option C',
              d: 'Option D'
            },
            variant: 'radio'
          },
          setSelect: {
            kind: 'set',
            label: 'Select',
            options: {
              a: 'Option A',
              b: 'Option B',
              c: 'Option C',
              d: 'Option D'
            },
            variant: 'select'
          }
        }
      },
      {
        title: 'String',
        description: `The following variants are available for 'string' fields`,
        fields: {
          stringSelect: {
            kind: 'string',
            label: 'Select',
            options: {
              a: 'Option A',
              b: 'Option B',
              c: 'Option C'
            },
            variant: 'select'
          },
          stringTextArea: {
            kind: 'string',
            label: 'Text Area',
            variant: 'textarea'
          },
          stringPassword: {
            kind: 'string',
            label: 'Password',
            variant: 'password'
          },
          stringInput: {
            description: 'This is a string field',
            kind: 'string',
            label: 'Input',
            variant: 'input'
          }
        }
      },
      {
        title: 'Dynamic',
        description: `A 'dynamic' field may be used with any data type. For a given data type T, a dynamic field must define a render method that returns either a scalar field for type T, or null to indicate the field should not be shown to the user. The render function receives as its first and only argument the current values in the form, unless it is in the context of a composite field, in which case it will receive the current value of the fieldset in which it is situated. To optimize performance, a dynamic field must specify an array of dependent fields, a change in which will trigger a rerender of the component.`,
        fields: {
          showDynamicField: {
            kind: 'boolean',
            label: 'Show Dynamic Field?',
            variant: 'checkbox'
          },
          dynamicField: {
            kind: 'dynamic',
            deps: ['showDynamicField'],
            render(data) {
              if (!data?.showDynamicField) {
                return null;
              }
              return {
                kind: 'string',
                label: 'Dynamic Field',
                variant: 'input'
              };
            }
          }
        }
      },
      {
        title: 'Composite',
        description: `A 'composite' field is composed of an array of given set of fields (referred to as a fieldset). A fieldset may include any number of fields, which can be any scalar kind. However, only one fieldset may be defined for a single composite field.`,
        fields: {
          composite: {
            description: 'This is a composite field',
            kind: 'composite',
            label: 'Composite',
            fieldset: {
              stringInput: {
                kind: 'string',
                label: 'String',
                variant: 'input'
              },
              showDynamicField: {
                kind: 'boolean',
                label: 'Show Dynamic Field',
                variant: 'checkbox'
              },
              dynamicField: {
                kind: 'dynamic',
                render(fieldset) {
                  if (!fieldset.showDynamicField) {
                    return null;
                  }
                  return {
                    kind: 'string',
                    label: 'Dynamic Field',
                    variant: 'input'
                  };
                }
              }
            }
          }
        }
      }
    ],
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : value), 2));
    },
    validationSchema: z.object({
      booleanCheck: z.boolean(),
      booleanRadio: z.boolean(),
      composite: z.array(
        z.object({
          stringInput: z.string().optional(),
          showDynamicField: z.boolean().optional(),
          dynamicField: z.string()
        })
      ),
      date: z.date(),
      numberInput: z.number(),
      numberSlider: z.number(),
      numberRadio: z.number().min(1).max(5).int(),
      stringSelect: z.enum(['a', 'b', 'c']),
      setRadio: z.set(z.enum(['a', 'b', 'c', 'd'])),
      setSelect: z.set(z.enum(['a', 'b', 'c', 'd'])),
      stringTextArea: z.string(),
      stringPassword: z.string(),
      stringInput: z.string()
    })
  }
};
