import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockMatchMedia, mockStorage } from '@/testing/mocks';
import { isBrowser } from '@/utils';

import { DEFAULT_THEME, SYS_DARK_MEDIA_QUERY, THEME_KEY, useTheme } from './useTheme';

mockStorage('localStorage');

vi.mock('@/utils', () => ({ isBrowser: vi.fn(() => true) }));

describe('useTheme', () => {
  beforeEach(() => {
    vi.spyOn(window, 'matchMedia');
  });
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });
  it('should return the default theme if running on the server', () => {
    vi.mocked(isBrowser).mockReturnValue(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe(DEFAULT_THEME);
  });
  it('should return the saved light theme if it exists', () => {
    window.localStorage.setItem(THEME_KEY, 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('light');
  });
  it('should return the saved dark theme if it exists', () => {
    window.localStorage.setItem(THEME_KEY, 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('dark');
  });
  it('should return the result of the media query (dark) if there is no saved theme', () => {
    mockMatchMedia((query) => query === SYS_DARK_MEDIA_QUERY);
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('dark');
  });
  it('should return the result of the media query (light) if there is no saved theme', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe('light');
  });

  it('should change the theme when updated', async () => {
    window.localStorage.setItem(THEME_KEY, 'light');
    const { result } = renderHook(() => useTheme());
    await act(() => {
      result.current[1]('dark');
    });
    expect(result.current[0]).toBe('dark');
  });

  it('should save the theme to localStorage', async () => {
    window.localStorage.setItem(THEME_KEY, 'light');
    const { result } = renderHook(() => useTheme());
    await act(() => {
      result.current[1]('dark');
    });
    expect(window.localStorage.getItem(THEME_KEY)).toBe('dark');
  });
});
