/* eslint-disable perfectionist/sort-objects */

import { useEffect, useState } from 'react';

import type { FormFields } from '@douglasneuroinformatics/libui-form-types';
import type FormTypes from '@douglasneuroinformatics/libui-form-types';
import type { Meta, StoryObj } from '@storybook/react';
import type { IntRange } from 'type-fest';
import { z } from 'zod';

import { Heading } from '../Heading';
import { Form } from './Form';

const DISABLED = false;

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
  numberSelect: z.number().min(1).max(5).int().optional(),
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
type ExampleFormData = z.TypeOf<typeof $ExampleFormData>;

export default {
  component: Form,
  decorators: [
    (Story) => (
      <div className="container mx-auto max-w-5xl">
        <Heading className="my-8 text-center" variant="h1">
          Example Form
        </Heading>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
} as Meta<typeof Form>;

const booleanFields: FormFields<Pick<ExampleFormData, 'booleanCheck' | 'booleanRadio'>> = {
  booleanRadio: {
    disabled: DISABLED,
    kind: 'boolean',
    label: 'Radio',
    variant: 'radio'
  },
  booleanCheck: {
    disabled: DISABLED,
    kind: 'boolean',
    label: 'Checkbox',
    variant: 'checkbox'
  }
};

const dateFields: FormFields<Pick<ExampleFormData, 'date'>> = {
  date: {
    disabled: DISABLED,
    kind: 'date',
    label: 'Datepicker (Default)'
  }
};

const numberFields: FormFields<Pick<ExampleFormData, 'numberInput' | 'numberRadio' | 'numberSelect' | 'numberSlider'>> =
  {
    numberInput: {
      disabled: DISABLED,
      description: 'This is a number field',
      kind: 'number',
      label: 'Number Input',
      variant: 'input'
    },
    numberRadio: {
      disabled: DISABLED,
      description: 'This is a number field',
      kind: 'number',
      variant: 'radio',
      label: 'Radio',
      options: {
        1: 'Very Low',
        2: 'Low',
        3: 'Medium',
        4: 'High',
        5: 'Very High'
      }
    },
    numberSlider: {
      disabled: DISABLED,
      description: 'This is a number field',
      kind: 'number',
      label: 'Slider',
      max: 10,
      min: 0,
      variant: 'slider'
    },
    numberSelect: {
      description: 'This is a number field',
      disabled: DISABLED,
      kind: 'number',
      variant: 'select',
      label: 'Number Select',
      options: {
        1: 'Very Low',
        2: 'Low',
        3: 'Medium',
        4: 'High',
        5: 'Very High'
      }
    }
  };

const setFields: FormFields<Pick<ExampleFormData, 'setListbox' | 'setSelect'>> = {
  setListbox: {
    disabled: DISABLED,
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
    disabled: DISABLED,
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
};

const stringFields: FormFields<
  Pick<ExampleFormData, 'stringInput' | 'stringPassword' | 'stringRadio' | 'stringSelect' | 'stringTextArea'>
> = {
  stringSelect: {
    disabled: DISABLED,
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
    disabled: DISABLED,
    kind: 'string',
    placeholder: 'This is a text area...',
    label: 'Text Area',
    variant: 'textarea'
  },
  stringPassword: {
    disabled: DISABLED,
    kind: 'string',
    label: 'Password',
    variant: 'password',
    calculateStrength: (password: string) => {
      return Math.min(password.length, 4) as IntRange<0, 5>;
    }
  },
  stringInput: {
    disabled: DISABLED,
    description: 'This is a string field',
    kind: 'string',
    label: 'Input',
    placeholder: 'This in an input field...',
    variant: 'input'
  },
  stringRadio: {
    disabled: DISABLED,
    kind: 'string',
    label: 'Radio',
    options: {
      a: 'Option A',
      b: 'Option B',
      c: 'Option C'
    },
    variant: 'radio'
  }
};

const dynamicFields: FormFields<Pick<ExampleFormData, 'dynamicField' | 'showDynamicField'>> = {
  showDynamicField: {
    disabled: DISABLED,
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
        disabled: DISABLED,
        kind: 'string',
        label: 'Dynamic Field',
        variant: 'input'
      };
    }
  }
};

const numberRecordFields: FormFields<Pick<ExampleFormData, 'numberRecord'>> = {
  numberRecord: {
    disabled: DISABLED,
    kind: 'number-record',
    label: 'Number Record',
    items: {
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
    options: {
      1: 'Very Low',
      2: 'Low',
      3: 'Medium',
      4: 'High',
      5: 'Very High'
    },
    variant: 'likert'
  }
};

const recordArrayFields: FormFields<Pick<ExampleFormData, 'recordArray'>> = {
  recordArray: {
    disabled: DISABLED,
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
};

const ungroupedContent = {
  ...booleanFields,
  ...dateFields,
  ...numberFields,
  ...setFields,
  ...stringFields,
  ...dynamicFields,
  ...numberRecordFields,
  ...recordArrayFields
} as const;

export const Grouped: StoryObj<typeof Form<ExampleFormSchemaType>> = {
  args: {
    content: [
      {
        title: 'Boolean',
        description: "The following variants are available for 'boolean' fields",
        fields: booleanFields
      },
      {
        title: 'Date',
        description: `The following variants are available for 'date' fields`,
        fields: dateFields
      },
      {
        title: 'Number',
        description: `The following variants are available for 'number' fields`,
        fields: numberFields
      },
      {
        title: 'Set',
        description: `The following variants are available for 'set' fields`,
        fields: setFields
      },
      {
        title: 'String',
        description: `The following variants are available for 'string' fields`,
        fields: stringFields
      },
      {
        title: 'Dynamic',
        description: `A 'dynamic' field may be used with any data type. For a given data type T, a dynamic field must define a render method that returns either a scalar field for type T, or null to indicate the field should not be shown to the user. The render function receives as its first and only argument the current values in the form, unless it is in the context of a record-array field, in which case it will receive the current value of the fieldset in which it is situated. To optimize performance, a dynamic field must specify an array of dependent fields, a change in which will trigger a rerender of the component.`,
        fields: dynamicFields
      },
      {
        title: 'Number Record',
        fields: numberRecordFields
      },
      {
        title: 'Record Array',
        description: `A 'record-array' field is composed of an array of given set of fields (referred to as a fieldset). A fieldset may include any number of fields, which can be any scalar kind. However, only one fieldset may be defined for a single fieldset array field.`,
        fields: recordArrayFields
      }
    ],
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : (value as unknown)), 2));
    },
    validationSchema: $ExampleFormData
  }
};

export const Ungrouped: StoryObj<typeof Form<ExampleFormSchemaType>> = {
  args: {
    content: ungroupedContent,
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : (value as unknown)), 2));
    },
    validationSchema: $ExampleFormData
  }
};

export const WithRequiredFields: StoryObj<typeof Form<ExampleFormSchemaType>> = {
  args: {
    content: ungroupedContent,
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : (value as unknown)), 2));
    },
    revalidateOnBlur: true,
    validationSchema: $ExampleFormData.required()
  }
};

export const ReadOnly: StoryObj<typeof Form<ExampleFormSchemaType>> = {
  args: {
    content: ungroupedContent,
    readOnly: true,
    onSubmit: (data) => {
      alert(JSON.stringify(data, (_key, value) => (value instanceof Set ? [...value] : (value as unknown)), 2));
    },
    validationSchema: $ExampleFormData
  }
};

export const WithInitialValues: StoryObj<typeof Form> = {
  decorators: [
    (Story) => {
      const [initialValues, setInitialValues] = useState<FormTypes.PartialNullableData<ExampleFormData>>({});

      useEffect(() => {
        setTimeout(() => {
          setInitialValues({
            booleanCheck: true,
            booleanRadio: true,
            recordArray: [
              {
                recordArrayStringInput: 'Value 1',
                showRecordArrayDynamicField: true,
                recordArrayDynamicField: 'Value 2'
              }
            ],
            date: new Date(),
            numberInput: 44,
            numberSlider: 45,
            numberRecord: {
              v1: 1,
              v2: 2
            },
            numberRadio: 3,
            numberSelect: 4,
            stringSelect: 'a',
            setListbox: new Set(['a', 'b']),
            setSelect: new Set(['c', 'd']),
            showDynamicField: true,
            dynamicField: 'Foo',
            stringTextArea: 'Lorem ipsum',
            stringPassword: 'Password',
            stringInput: 'Input',
            stringRadio: 'b'
          } satisfies ExampleFormData);
        }, 50);
      }, []);

      return (
        <Story
          args={{
            content: ungroupedContent,
            initialValues,
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
            validationSchema: $ExampleFormData
          }}
        />
      );
    }
  ]
};
