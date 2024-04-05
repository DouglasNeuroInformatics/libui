import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/hooks/useTheme';

import { Button, type ButtonProps } from '../Button';

export type ThemeToggleProps = {
  variant?: ButtonProps['variant'];
};

export const ThemeToggle = ({ variant = 'outline' }: ThemeToggleProps) => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button size="icon" variant={variant} onClick={toggleTheme}>
      <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
