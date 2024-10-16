import type { Theme } from '@/hooks';

export type ChartConfig = {
  [key: string]: {
    icon?: React.ComponentType;
    label?: React.ReactNode;
  } & (
    | {
        color?: never;
        theme: {
          [K in Theme]: string;
        };
      }
    | {
        color?: string;
        theme?: never;
      }
  );
};
