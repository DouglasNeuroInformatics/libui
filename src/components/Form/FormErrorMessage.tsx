import { CircleAlertIcon } from 'lucide-react';

export type FormErrorMessageProps = {
  message: string;
};

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => (
  <div className="mt-2 flex items-center gap-1 text-destructive">
    <CircleAlertIcon height={16} width={16} />
    <span>{message}</span>
  </div>
);
