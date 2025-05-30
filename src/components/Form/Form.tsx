import { useEffect, useState } from 'react';

import type {
  FormContent,
  FormDataType,
  FormFields,
  PartialFormDataType,
  PartialNullableFormDataType
} from '@douglasneuroinformatics/libui-form-types';
import { get, set } from 'lodash-es';
import { twMerge } from 'tailwind-merge';
import type { Promisable } from 'type-fest';

import { useTranslation } from '@/hooks';
import { cn } from '@/utils';

import { Button } from '../Button';
import { Heading } from '../Heading';
import { Separator } from '../Separator';
import { ErrorMessage } from './ErrorMessage';
import { FieldsComponent } from './FieldsComponent';
import { getInitialValues } from './utils';

import type { FormErrors, ZodErrorLike, ZodTypeLike } from './types';

type FormProps<TSchema extends ZodTypeLike<FormDataType>, TData extends TSchema['_input'] = TSchema['_input']> = {
  [key: `data-${string}`]: unknown;
  additionalButtons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  className?: string;
  content: FormContent<TData>;
  customStyles?: {
    resetBtn?: string;
    submitBtn?: string;
  };
  fieldsFooter?: React.ReactNode;
  id?: string;
  initialValues?: PartialNullableFormDataType<NoInfer<TData>>;
  onBeforeSubmit?:
    | ((data: NoInfer<TData>) => Promisable<{ errorMessage: string; success: false } | { success: true }>)
    | null;
  onError?: (error: ZodErrorLike) => void;
  onSubmit: (data: NoInfer<TData>) => Promisable<void>;
  preventResetValuesOnReset?: boolean;
  readOnly?: boolean;
  resetBtn?: boolean;
  revalidateOnBlur?: boolean;
  submitBtnLabel?: string;
  suspendWhileSubmitting?: boolean;
  validationSchema: ZodTypeLike<TData>;
};

const Form = <TSchema extends ZodTypeLike<FormDataType>, TData extends TSchema['_input'] = TSchema['_input']>({
  additionalButtons,
  className,
  content,
  customStyles,
  fieldsFooter,
  id,
  initialValues,
  onBeforeSubmit,
  onError,
  onSubmit,
  preventResetValuesOnReset,
  readOnly,
  resetBtn,
  revalidateOnBlur,
  submitBtnLabel,
  suspendWhileSubmitting,
  validationSchema,
  ...props
}: FormProps<TSchema, TData>) => {
  const { resolvedLanguage, t } = useTranslation('libui');
  const [rootErrors, setRootErrors] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors<TData>>({});
  const [values, setValues] = useState<PartialFormDataType<TData>>(
    initialValues ? getInitialValues(initialValues) : {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleError = (error: ZodErrorLike) => {
    const fieldErrors: FormErrors<TData> = {};
    const rootErrors: string[] = [];
    for (const issue of error.issues) {
      if (issue.path.length > 0) {
        const current = get(fieldErrors, issue.path) as string[] | undefined;
        if (current) {
          current.push(issue.message);
        } else {
          set(fieldErrors, issue.path, [issue.message]);
        }
      } else {
        rootErrors.push(issue.message);
      }
    }
    setErrors(fieldErrors);
    setRootErrors(rootErrors);
    if (onError) {
      onError(error);
    }
  };

  const reset = () => {
    setRootErrors([]);
    setErrors({});
    if (!preventResetValuesOnReset) {
      setValues({});
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await validationSchema.safeParseAsync(values);
    if (!result.success) {
      console.error(result.error.issues);
      handleError(result.error);
      return;
    }
    if (onBeforeSubmit) {
      const beforeSubmitResult = await onBeforeSubmit(result.data);
      if (!beforeSubmitResult.success) {
        setErrors({});
        setRootErrors([beforeSubmitResult.errorMessage]);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await Promise.all([
        onSubmit(result.data),
        new Promise<void>((resolve) => {
          return suspendWhileSubmitting ? setTimeout(resolve, 500) : resolve();
        })
      ]);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGrouped = Array.isArray(content);

  const revalidate = () => {
    const hasErrors = Object.keys(errors).length > 0 || rootErrors.length;
    if (hasErrors) {
      validationSchema
        .safeParseAsync(values)
        .then((result) => {
          if (!result.success) {
            handleError(result.error);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    setErrors({});
    setRootErrors([]);
  }, [resolvedLanguage]);

  const isSuspended = Boolean(suspendWhileSubmitting && isSubmitting);

  return (
    <form
      autoComplete="off"
      className={twMerge('relative flex w-full flex-col', !isGrouped && 'gap-6', className)}
      id={id}
      onBlur={revalidateOnBlur ? revalidate : undefined}
      onSubmit={(event) => void handleSubmit(event)}
      {...props}
    >
      {isSubmitting && <div className="absolute z-10 h-full w-full cursor-wait" />}
      {isGrouped ? (
        content.map((fieldGroup, i) => {
          return (
            <>
              <div className="flex flex-col gap-6 [&:not(:first-child)]:pt-8" key={i}>
                <div className="flex flex-col gap-1">
                  {fieldGroup.title && (
                    <Heading className="text-base" variant="h4">
                      {fieldGroup.title}
                    </Heading>
                  )}
                  {fieldGroup.description && (
                    <p className="text-muted-foreground text-sm leading-tight italic">{fieldGroup.description}</p>
                  )}
                </div>
                <FieldsComponent
                  errors={errors}
                  fields={fieldGroup.fields as FormFields<TData>}
                  readOnly={readOnly}
                  setErrors={setErrors}
                  setValues={setValues}
                  values={values}
                />
              </div>
              <Separator className="mt-8" />
            </>
          );
        })
      ) : (
        <FieldsComponent
          errors={errors}
          fields={content}
          readOnly={readOnly}
          setErrors={setErrors}
          setValues={setValues}
          values={values}
        />
      )}
      {Boolean(rootErrors.length) && <ErrorMessage className="-mt-3" error={rootErrors} />}
      {fieldsFooter}
      <div className="flex w-full gap-3">
        {additionalButtons?.left}
        {/** Note - aria-label is used for testing in downstream packages */}
        <Button
          aria-label="Submit"
          className={cn('flex w-full items-center justify-center gap-2', customStyles?.submitBtn)}
          disabled={readOnly || isSuspended}
          type="submit"
          variant="primary"
        >
          {submitBtnLabel ?? t('form.submit')}
          <svg
            className={cn('hidden h-4 w-4 animate-spin', isSuspended && 'block')}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </Button>
        {resetBtn && (
          <Button
            aria-label="Reset"
            className={cn('block w-full', customStyles?.resetBtn)}
            disabled={readOnly}
            type="button"
            variant="secondary"
            onClick={reset}
          >
            {t('form.reset')}
          </Button>
        )}
        {additionalButtons?.right}
      </div>
    </form>
  );
};

export { Form, type FormProps };
