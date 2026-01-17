import { useEffect, useState } from 'react';

import { isBrowser } from '#utils';

/**
 * Get the result of an arbitrary CSS media query
 *
 * @param query - the CSS media query
 * @returns a boolean indicating the result of the query
 * @example
 * // true if the viewport is at least 768px wide
 * const matches = useMediaQuery('(min-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (isBrowser()) {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
