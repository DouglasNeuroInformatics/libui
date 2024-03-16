import type { DateFormField } from '@douglasneuroinformatics/libui-form-types';

import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { Popover } from '@/components/Popover';

import { FieldGroup } from '../FieldGroup';
import { type BaseFieldComponentProps } from '../types';

export type DateFieldProps = BaseFieldComponentProps<Date> & DateFormField;

export const DateField = ({ error, label, name }: DateFieldProps) => {
  return (
    <FieldGroup>
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <Popover.Trigger asChild>
          <Input />
        </Popover.Trigger>
        <Popover.Content asChild align="start" className="w-auto">
          <DatePicker
            onSelection={(value) => {
              // eslint-disable-next-line no-alert
              alert(value);
            }}
          />
        </Popover.Content>
      </Popover>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
