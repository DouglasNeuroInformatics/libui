import { useState } from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { cn } from '@/utils';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type StringFieldPasswordProps = BaseFieldComponentProps<string> & StringFormField;

export const StringFieldPassword = ({ description, error, label, name, setValue, value }: StringFieldPasswordProps) => {
  const [show, setShow] = useState(false);
  return (
    <FieldGroup>
      <FieldGroup.Row>
        <Label>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Input
          name={name}
          type={show ? 'text' : 'password'}
          value={value ?? ''}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          className="absolute right-0 flex h-full w-8 items-center justify-center text-muted-foreground"
          type="button"
          onClick={() => setShow(!show)}
        >
          <EyeIcon className={cn('absolute transition-all', show ? '-rotate-90 scale-0' : 'rotate-0 scale-100')} />
          <EyeOffIcon className={cn('absolute transition-all', !show ? 'rotate-90 scale-0' : 'rotate-0 scale-100')} />
        </button>
      </FieldGroup.Row>
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
