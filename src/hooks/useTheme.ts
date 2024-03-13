import { useCallback, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type UpdateTheme = (theme: Theme) => void;

const THEME_ATTRIBUTE = 'data-mode';
const THEME_KEY = 'theme';

/**
 * Returns the current theme and a function to update the current theme
 *
 * The reason the implementation of this hook is rather convoluted is for
 * cases where the theme is updated outside this hook
 */
function useTheme(): readonly [Theme, UpdateTheme] {
  // Initial theme value is based on the value saved in local storage or the system theme
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    let initialTheme: Theme;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme;
    } else {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute(THEME_ATTRIBUTE, initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === THEME_ATTRIBUTE) {
          const updatedTheme = (mutation.target as HTMLHtmlElement).getAttribute(THEME_ATTRIBUTE);
          if (updatedTheme === 'light' || updatedTheme === 'dark') {
            window.localStorage.setItem(THEME_KEY, updatedTheme);
            setTheme(updatedTheme);
          } else {
            console.error(`Unexpected value for 'data-mode' attribute: ${updatedTheme}`);
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true
    });
    return () => observer.disconnect();
  }, []);

  // When the user wants to change the theme
  const updateTheme = useCallback(
    (theme: Theme) => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    },
    [document.documentElement]
  );

  return [theme, updateTheme] as const;
}

export { type Theme, useTheme };
