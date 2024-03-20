/* eslint-disable perfectionist/sort-objects */

import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Heading } from '../Heading';
import { Separator } from '../Separator';
import { Form } from './Form';

const $ExampleFormData = z.object({
  booleanCheck: z.boolean().optional(),
  booleanRadio: z.boolean().optional(),
  recordArray: z.array(
    z.object({
      recordArrayStringInput: z.string().optional(),
      showRecordArrayDynamicField: z.boolean().optional(),
      recordArrayDynamicField: z.string().optional()
    })
  ),
  date: z.date().optional(),
  numberInput: z.number().optional(),
  numberSlider: z.number().optional(),
  numberRecord: z.record(z.number()),
  numberRadio: z.number().min(1).max(5).int().optional(),
  stringSelect: z.enum(['a', 'b', 'c']).optional(),
  setListbox: z.set(z.enum(['a', 'b', 'c', 'd'])).optional(),
  setSelect: z.set(z.enum(['a', 'b', 'c', 'd'])).optional(),
  showDynamicField: z.boolean().optional(),
  dynamicField: z.string().optional(),
  stringTextArea: z.string().optional(),
  stringPassword: z.string().optional(),
  stringInput: z.string().optional(),
  stringRadio: z.enum(['a', 'b', 'c']).optional()
});
type ExampleFormSchemaType = typeof $ExampleFormData;

export default {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container mx-auto max-w-5xl">
        <Heading className="my-8 text-center" variant="h1">
          Example Form
        </Heading>
        <Separator />
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
} as Meta<typeof Form>;

export const Grouped: StoryObj<typeof Form<ExampleFormSchemaType>> = {
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
        title: 'Number',
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
          setListbox: {
            kind: 'set',
            label: 'Listbox',
            options: {
              a: 'Option A',
              b: 'Option B',
              c: 'Option C',
              d: 'Option D'
            },
            variant: 'listbox'
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
          },
          stringRadio: {
            kind: 'string',
            label: 'Radio',
            options: {
              a: 'Option A',
              b: 'Option B',
              c: 'Option C'
            },
            variant: 'radio'
          }
        }
      },
      {
        title: 'Dynamic',
        description: `A 'dynamic' field may be used with any data type. For a given data type T, a dynamic field must define a render method that returns either a scalar field for type T, or null to indicate the field should not be shown to the user. The render function receives as its first and only argument the current values in the form, unless it is in the context of a record-array field, in which case it will receive the current value of the fieldset in which it is situated. To optimize performance, a dynamic field must specify an array of dependent fields, a change in which will trigger a rerender of the component.`,
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
        title: 'Number Record',
        fields: {
          numberRecord: {
            kind: 'number-record',
            label: 'Number Record',
            entries: {
              q1: {
                label: 'Question 1'
              },
              q2: {
                label: 'Question 2'
              },
              q3: {
                label: 'Question 3'
              }
            },
            variant: 'likert'
          }
        }
      },
      {
        title: 'Record Array',
        description: `A 'record-array' field is composed of an array of given set of fields (referred to as a fieldset). A fieldset may include any number of fields, which can be any scalar kind. However, only one fieldset may be defined for a single fieldset array field.`,
        fields: {
          recordArray: {
            description: 'This is a record-array field',
            kind: 'record-array',
            label: 'Record Array',
            fieldset: {
              recordArrayStringInput: {
                kind: 'string',
                label: 'String',
                variant: 'input'
              },
              showRecordArrayDynamicField: {
                kind: 'boolean',
                label: 'Show Dynamic Field',
                variant: 'radio'
              },
              recordArrayDynamicField: {
                kind: 'dynamic',
                render(fieldset) {
                  if (!fieldset.showRecordArrayDynamicField) {
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
    validationSchema: $ExampleFormData
  }
};

export const Ungrouped: StoryObj<typeof Form<ExampleFormSchemaType>> = {
  args: {
    content: {
      booleanRadio: {
        kind: 'boolean',
        label: 'Radio',
        variant: 'radio'
      },
      booleanCheck: {
        kind: 'boolean',
        label: 'Checkbox',
        variant: 'checkbox'
      },
      date: {
        kind: 'date',
        label: 'Datepicker (Default)'
      },
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
      },
      numberRecord: {
        kind: 'number-record',
        label: 'Number Record',
        entries: {
          q1: {
            label: 'Question 1'
          },
          q2: {
            label: 'Question 2'
          },
          q3: {
            label: 'Question 3'
          }
        },
        variant: 'likert'
      },
      setListbox: {
        kind: 'set',
        label: 'Listbox',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C',
          d: 'Option D'
        },
        variant: 'listbox'
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
      },
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
      stringRadio: {
        kind: 'string',
        label: 'Radio',
        options: {
          a: 'Option A',
          b: 'Option B',
          c: 'Option C'
        },
        variant: 'radio'
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
      },
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
      },
      recordArray: {
        description: 'This is a record-array field',
        kind: 'record-array',
        label: 'Record Array',
        fieldset: {
          recordArrayStringInput: {
            kind: 'string',
            label: 'String',
            variant: 'input'
          },
          showRecordArrayDynamicField: {
            kind: 'boolean',
            label: 'Show Dynamic Field',
            variant: 'radio'
          },
          recordArrayDynamicField: {
            kind: 'dynamic',
            render(fieldset) {
              if (!fieldset.showRecordArrayDynamicField) {
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
    },
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : value), 2));
    },
    validationSchema: $ExampleFormData
  }
};
