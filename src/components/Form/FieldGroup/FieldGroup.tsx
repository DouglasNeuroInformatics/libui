import { FieldGroupDescription } from './FieldGroupDescription';
import { FieldGroupError } from './FieldGroupError';
import { FieldGroupRoot } from './FieldGroupRoot';
import { FieldGroupRow } from './FieldGroupRow';

export const FieldGroup = Object.assign(FieldGroupRoot, {
  Description: FieldGroupDescription,
  Error: FieldGroupError,
  Row: FieldGroupRow
});
