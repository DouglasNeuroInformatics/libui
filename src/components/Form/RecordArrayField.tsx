import { memo, useEffect } from 'react';

import type { RecordArrayFieldValue, RecordArrayFormField } from '@douglasneuroinformatics/libui-form-types';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Simplify } from 'type-fest';

import { Button } from '../Button';
import { Heading } from '../Heading';
import { Label } from '../Label';
import { ScalarField } from './ScalarField';

import type { BaseFieldComponentProps } from './types';

export type RecordArrayFieldProps = Simplify<BaseFieldComponentProps<RecordArrayFieldValue> & RecordArrayFormField>;

export const RecordArrayField = memo(function RecordArrayField({
  error: arrayError,
  fieldset,
  label,
  setError: setArrayError,
  setValue: setArrayValue,
  value: arrayValue
}: RecordArrayFieldProps) {
  const { t } = useTranslation('libui');

  const createNewRecord = () => Object.fromEntries(Object.keys(fieldset).map((fieldName) => [fieldName, undefined]));

  useEffect(() => {
    setArrayValue([createNewRecord()]);
  }, [fieldset]);

  if (!arrayValue) {
    return null;
  }

  // Creates a new object with all values mapped to null and appends it to the previous arrayValue
  const appendField = () => {
    setArrayValue([...arrayValue, createNewRecord()]);
  };

  const removeField = () => {
    if (arrayValue.length > 1) {
      setArrayValue(arrayValue.slice(0, arrayValue.length - 1));
    }
  };

  return (
    <div className="space-y-4">
      <Heading variant="h5">{label}</Heading>
      <div className="space-y-6">
        {arrayValue.map((fields, i) => (
          <div className="space-y-4" key={i}>
            <Label className="font-semibold italic">{label + ' ' + (i + 1)}</Label>
            {Object.keys(fields).map((name) => {
              const field = fieldset[name];
              const fieldProps = field?.kind === 'dynamic' ? field.render(fields) : field;
              if (!fieldProps) {
                return null;
              }
              return (
                <ScalarField
                  error={arrayError?.[i]?.[name]}
                  field={fieldProps}
                  key={name}
                  name={name}
                  setError={(error) => {
                    const newArrayError = arrayError ? [...arrayError] : [];
                    if (!newArrayError[i]) {
                      newArrayError[i] = {};
                    }
                    newArrayError[i][name] = error;
                    setArrayError(newArrayError);
                  }}
                  setValue={(value) => {
                    const newArrayValue = [...arrayValue];
                    newArrayValue[i][name] = value;
                    setArrayValue(newArrayValue);
                  }}
                  value={arrayValue?.[i]?.[name]}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={appendField}>
          {t('form.append')}
          <PlusCircleIcon className="ml-2" />
        </Button>
        <Button type="button" variant="outline" onClick={removeField}>
          {t('form.remove')}
          <MinusCircleIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
});
