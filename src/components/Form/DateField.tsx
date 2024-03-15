import type { DateFormField } from '@douglasneuroinformatics/libui-form-types';

import { Input } from '../Input';
import { Label } from '../Label';
import { Popover } from '../Popover';
import { FieldContainer } from './FieldContainer';
import { type BaseFieldComponentProps } from './types';

export type DateFieldProps = BaseFieldComponentProps<Date> & DateFormField;

export const DateField = ({ description, error, label, name }: DateFieldProps) => {
  return (
    <FieldContainer description={description} error={error}>
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <Popover.Trigger asChild>
          <Input />
        </Popover.Trigger>
        <Popover.Content className="w-min whitespace-nowrap text-sm">Hello World</Popover.Content>
      </Popover>
    </FieldContainer>
  );
};
