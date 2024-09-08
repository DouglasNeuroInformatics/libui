import { useEffect, useLayoutEffect } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const isBrowser = vi.fn();

vi.mock('@/utils', () => ({ isBrowser }));

describe('useIsomorphicLayoutEffect', () => {
  beforeEach(() => {
    vi.resetModules();
  });
  describe('browser', () => {
    it('should return useLayoutEffect', async () => {
      isBrowser.mockReturnValueOnce(true);
      const { useIsomorphicLayoutEffect } = await import('./useIsomorphicLayoutEffect.js');
      expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
    });
  });
  describe('server', () => {
    it('should be useEffect', async () => {
      isBrowser.mockReturnValueOnce(false);
      const { useIsomorphicLayoutEffect } = await import('./useIsomorphicLayoutEffect.js');
      expect(useIsomorphicLayoutEffect).toBe(useEffect);
    });
  });
});
