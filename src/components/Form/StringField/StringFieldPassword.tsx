import { useEffect, useState } from 'react';

import type { StringFormField } from '@douglasneuroinformatics/libui-form-types';
import { EyeIcon, EyeOffIcon, SparklesIcon } from 'lucide-react';
import { motion } from 'motion/react';

import { Input, Label, Tooltip } from '#components';
import { useTranslation } from '#hooks';
import { cn } from '#utils';

import { FieldGroup } from '../FieldGroup/FieldGroup.tsx';

import type { BaseFieldComponentProps } from '../types.ts';

export type PasswordStrengthValue = 0 | 1 | 2 | 3 | 4;

export type StringFieldPasswordProps = BaseFieldComponentProps<string> &
  Extract<StringFormField, { variant: 'password' }> & {
    /**
     * A function used to generate a password for this field. When provided, a button is rendered in
     * the input that fills the field with the returned value and reveals it.
     *
     * Declared here rather than coming from `StringFormField`, and should be removed once the
     * form types package publishes it on the password variant.
     */
    generatePassword?: (this: void) => string;
  };

export const StringFieldPassword = ({
  calculateStrength,
  description,
  disabled,
  error,
  generatePassword,
  label,
  name,
  readOnly,
  setValue,
  value
}: StringFieldPasswordProps) => {
  const [strength, setStrength] = useState<null | PasswordStrengthValue>(calculateStrength ? 0 : null);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
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
          className={cn(generatePassword ? 'pr-10' : 'pr-8')}
          disabled={disabled || readOnly}
          id={name}
          name={name}
          type={show ? 'text' : 'password'}
          value={value ?? ''}
          onChange={(event) => setValue(event.target.value)}
        />
        {generatePassword && (
          <Tooltip>
            <Tooltip.Trigger
              aria-label={t({ en: 'Generate Password', fr: 'Générer un mot de passe' })}
              // `p-0` neutralizes the padding the button size variant adds, so the geometry matches
              // the adjacent toggle rather than squeezing the icon inside the fixed width.
              className="text-muted-foreground absolute right-8 flex h-full w-8 items-center justify-center p-0"
              disabled={disabled || readOnly}
              type="button"
              variant="ghost"
              onClick={() => {
                setValue(generatePassword());
                // A generated password the user cannot read is of little use, so reveal it.
                setShow(true);
              }}
            >
              <SparklesIcon />
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>{t({ en: 'Generate a password', fr: 'Générer un mot de passe' })}</p>
            </Tooltip.Content>
          </Tooltip>
        )}
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
