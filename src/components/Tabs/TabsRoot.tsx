import { Root } from '@radix-ui/react-tabs';

export const TabsRoot = ({ ref, ...props }: React.ComponentProps<typeof Root>) => {
  return <Root ref={ref} {...props} />;
};
