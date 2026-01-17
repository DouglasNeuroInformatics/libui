import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockMatchMedia } from '#testing:mocks';
import { isBrowser } from '#utils';

import { useMediaQuery } from './useMediaQuery.ts';

vi.mock('#utils', () => ({ isBrowser: vi.fn(() => true) }));

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.spyOn(window, 'matchMedia');
    vi.restoreAllMocks();
  });

  it('should return false if running on the server', () => {
    vi.mocked(isBrowser).mockReturnValue(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('should return false if running in the browser, if the media query is false', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('should return true if running in the browser, if the media query is true', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });
});
