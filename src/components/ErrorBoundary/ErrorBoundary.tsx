import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '../ErrorFallback/ErrorFallback.js';

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};
