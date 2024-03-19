import { useEffect } from 'react';

import { P, match } from 'ts-pattern';

import { SetFieldSelect, type SetFieldSelectProps } from './SetFieldSelect';

export type SetFieldProps<T extends string = string> = SetFieldSelectProps<T>;

export const SetField = <T extends string = string>(props: SetFieldProps<T>) => {
  useEffect(() => {
    if (!props.value) {
      props.setValue(new Set([]));
    }
  }, [props.value]);

  props.value;

  return match(props)
    .with({ value: P.instanceOf(Set), variant: 'select' }, (props) => <SetFieldSelect {...props} />)
    .otherwise(() => null);
};
