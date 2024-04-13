import { ErrorMessage } from '../ErrorMessage.js';
import { FieldGroupDescription } from './FieldGroupDescription.js';
import { FieldGroupRoot } from './FieldGroupRoot.js';
import { FieldGroupRow } from './FieldGroupRow.js';

export const FieldGroup = Object.assign(FieldGroupRoot, {
  Description: FieldGroupDescription,
  Error: ErrorMessage,
  Row: FieldGroupRow
});
