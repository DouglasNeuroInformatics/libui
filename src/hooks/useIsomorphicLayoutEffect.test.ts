// @vitest-environment node

import { useEffect, useLayoutEffect } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useIsomorphicLayoutEffect', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });
  describe('browser', () => {
    it('should return useLayoutEffect', async () => {
      vi.stubGlobal('window', {});
      const { useIsomorphicLayoutEffect } = await import('./useIsomorphicLayoutEffect');
      expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
    });
  });
  describe('server', () => {
    it('should be useEffect', async () => {
      const { useIsomorphicLayoutEffect } = await import('./useIsomorphicLayoutEffect');
      expect(useIsomorphicLayoutEffect).toBe(useEffect);
    });
  });
});
