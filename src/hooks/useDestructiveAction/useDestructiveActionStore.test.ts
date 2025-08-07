import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as zustand from 'zustand';

import { useDestructiveActionStore } from './useDestructiveActionStore';

import type { DestructiveAction } from './useDestructiveActionStore';

describe('useDestructiveActionStore', () => {
  beforeAll(() => {
    vi.spyOn(zustand, 'create');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render and return an object', () => {
    const { result } = renderHook(() => useDestructiveActionStore());
    expect(result.current).toBeTypeOf('object');
  });

  it('should have initial empty pendingDestructiveActions array', () => {
    const { result } = renderHook(() => useDestructiveActionStore());
    expect(result.current.pendingDestructiveActions).toEqual([]);
  });

  describe('addPendingDestructiveAction', () => {
    it('should add a single action to the array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction: DestructiveAction = vi.fn();
      act(() => {
        result.current.addPendingDestructiveAction(testAction);
      });
      expect(result.current.pendingDestructiveActions).toEqual([testAction]);
    });

    it('should add multiple actions to the array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction1: DestructiveAction = vi.fn();
      const testAction2: DestructiveAction = vi.fn();
      act(() => {
        result.current.addPendingDestructiveAction(testAction1);
        result.current.addPendingDestructiveAction(testAction2);
      });
      expect(result.current.pendingDestructiveActions).toEqual([testAction1, testAction2]);
    });
  });

  describe('deletePendingDestructiveAction', () => {
    it('should remove a specific action from the array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction1: DestructiveAction = vi.fn();
      const testAction2: DestructiveAction = vi.fn();
      const testAction3: DestructiveAction = vi.fn();

      act(() => {
        result.current.addPendingDestructiveAction(testAction1);
        result.current.addPendingDestructiveAction(testAction2);
        result.current.addPendingDestructiveAction(testAction3);
      });

      act(() => {
        result.current.deletePendingDestructiveAction(testAction2);
      });

      expect(result.current.pendingDestructiveActions).toEqual([testAction1, testAction3]);
    });

    it('should handle removing from empty array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction: DestructiveAction = vi.fn();
      act(() => {
        result.current.deletePendingDestructiveAction(testAction);
      });
      expect(result.current.pendingDestructiveActions).toEqual([]);
    });
  });
});
