import { ErrorMessage } from '../ErrorMessage';
import { FieldGroupDescription } from './FieldGroupDescription';
import { FieldGroupRoot } from './FieldGroupRoot';
import { FieldGroupRow } from './FieldGroupRow';

export const FieldGroup = Object.assign(FieldGroupRoot, {
  Description: FieldGroupDescription,
  Error: ErrorMessage,
  Row: FieldGroupRow
});
