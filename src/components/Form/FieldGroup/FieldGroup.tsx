import { ErrorMessage } from '../ErrorMessage.tsx';
import { FieldGroupDescription } from './FieldGroupDescription.tsx';
import { FieldGroupRoot } from './FieldGroupRoot.tsx';
import { FieldGroupRow } from './FieldGroupRow.tsx';

export const FieldGroup = Object.assign(FieldGroupRoot, {
  Description: FieldGroupDescription,
  Error: ErrorMessage,
  Row: FieldGroupRow
});
