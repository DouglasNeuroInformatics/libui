import { CircleAlertIcon } from 'lucide-react';

export const FieldGroupError: React.FC<{ error?: null | string }> = ({ error }) =>
  error ? (
    <div className="flex w-full items-center text-sm font-medium text-destructive">
      <CircleAlertIcon className="mr-1" style={{ strokeWidth: '2px' }} />
      <span>{error}</span>
    </div>
  ) : null;
