import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '#hooks';

import { Button } from '../Button/Button.tsx';

import type { ButtonProps } from '../Button/Button.tsx';

export type ThemeToggleProps = Omit<ButtonProps, 'children' | 'size'>;

export const ThemeToggle = ({ onClick, variant = 'outline', ...props }: ThemeToggleProps) => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      size="icon"
      variant={variant}
      onClick={(event) => {
        toggleTheme();
        onClick?.(event);
      }}
      {...props}
    >
      <SunIcon className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
};
