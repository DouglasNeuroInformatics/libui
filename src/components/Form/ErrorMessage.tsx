import { CircleAlertIcon } from 'lucide-react';

export type ErrorMessageProps = {
  /** The error message to display */
  children: string;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <div className="flex items-center text-sm font-medium text-destructive">
    <CircleAlertIcon className="mr-1" style={{ strokeWidth: '2px' }} />
    <span>{children}</span>
  </div>
);
