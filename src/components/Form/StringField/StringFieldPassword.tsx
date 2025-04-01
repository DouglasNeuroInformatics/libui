import { useEffect, useState } from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { cn } from '@/utils';

import { FieldGroup } from '../FieldGroup';

import type { BaseFieldComponentProps } from '../types';

export type PasswordStrengthValue = 0 | 1 | 2 | 3 | 4;

export type StringFieldPasswordProps = BaseFieldComponentProps<string> &
  Extract<StringFormField, { variant: 'password' }>;

export const StringFieldPassword = ({
  calculateStrength,
  description,
  disabled,
  error,
  label,
  name,
  readOnly,
  setValue,
  value
}: StringFieldPasswordProps) => {
  const [strength, setStrength] = useState<null | PasswordStrengthValue>(calculateStrength ? 0 : null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (calculateStrength) {
      setStrength(value ? calculateStrength(value) : 0);
    }
  }, [value]);

  return (
    <FieldGroup name={name}>
      <FieldGroup.Row>
        <Label htmlFor={name}>{label}</Label>
        <FieldGroup.Description description={description} />
      </FieldGroup.Row>
      <FieldGroup.Row>
        <Input
          disabled={disabled || readOnly}
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          value={value ?? ''}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          className="text-muted-foreground absolute right-0 flex h-full w-8 items-center justify-center"
          disabled={disabled || readOnly}
          tabIndex={-1}
          type="button"
          onClick={() => setShow(!show)}
        >
          <EyeIcon className={cn('absolute transition-all', show ? 'scale-0 -rotate-90' : 'scale-100 rotate-0')} />
          <EyeOffIcon className={cn('absolute transition-all', !show ? 'scale-0 rotate-90' : 'scale-100 rotate-0')} />
        </button>
      </FieldGroup.Row>
      {strength !== null && (
        <motion.div
          animate={{ width: `${Math.max(strength * 25, 5)}%` }}
          className="h-1 w-full overflow-hidden rounded-sm"
          initial={{ width: '5%' }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={cn(
              'bg-destructive h-full w-full transition-colors duration-500',
              strength === 2 && 'bg-yellow-500 dark:bg-yellow-700',
              strength === 3 && 'bg-sky-500 dark:bg-sky-700',
              strength === 4 && 'bg-green-500 dark:bg-green-700'
            )}
          />
        </motion.div>
      )}
      <FieldGroup.Error error={error} />
    </FieldGroup>
  );
};
