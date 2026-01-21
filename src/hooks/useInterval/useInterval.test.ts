import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useInterval } from './useInterval.ts';

describe('useInterval()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it('should fire the callback function (1)', () => {
    const timeout = 500;
    const callback = vi.fn();
    renderHook(() => {
      useInterval(callback, timeout);
    });
    vi.advanceTimersByTime(timeout);
  });

  it('should fire the callback function (2)', () => {
    const timeout = 500;
    const earlyTimeout = 400;
    const callback = vi.fn();
    renderHook(() => {
      useInterval(callback, timeout);
    });
    vi.advanceTimersByTime(earlyTimeout);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call set interval on start', () => {
    mockSetInterval();
    const timeout = 1200;
    const callback = vi.fn();
    renderHook(() => {
      useInterval(callback, timeout);
    });
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  it('should call clearTimeout on unmount', () => {
    mockClearInterval();
    const callback = vi.fn();
    const { unmount } = renderHook(() => {
      useInterval(callback, 1200);
    });
    unmount();
  });
});

function mockSetInterval() {
  vi.spyOn(global, 'setInterval');
}

function mockClearInterval() {
  vi.spyOn(global, 'clearInterval');
}
