import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as zustand from 'zustand';

import { useDestructiveActionStore } from './useDestructiveActionStore';

import type { DestructiveAction, DestructiveActionOptions } from './useDestructiveActionStore';

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
      expect(result.current.pendingDestructiveActions).toHaveLength(1);
      expect(result.current.pendingDestructiveActions[0]!.action).toBe(testAction);
      expect(result.current.pendingDestructiveActions[0]!.id).toBeDefined();
    });

    it('should add multiple actions to the array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction1: DestructiveAction = vi.fn();
      const testAction2: DestructiveAction = vi.fn();
      act(() => {
        result.current.addPendingDestructiveAction(testAction1);
        result.current.addPendingDestructiveAction(testAction2);
      });
      expect(result.current.pendingDestructiveActions).toHaveLength(2);
      expect(result.current.pendingDestructiveActions[0]!.action).toBe(testAction1);
      expect(result.current.pendingDestructiveActions[1]!.action).toBe(testAction2);
    });

    it('should add action with options', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      const testAction: DestructiveAction = vi.fn();
      const options: DestructiveActionOptions = {
        description: 'This is a test action',
        title: 'Test Action'
      };
      act(() => {
        result.current.addPendingDestructiveAction(testAction, options);
      });
      expect(result.current.pendingDestructiveActions).toHaveLength(1);
      expect(result.current.pendingDestructiveActions[0]!.action).toBe(testAction);
      expect(result.current.pendingDestructiveActions[0]!.title).toBe('Test Action');
      expect(result.current.pendingDestructiveActions[0]!.description).toBe('This is a test action');
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

      const idToDelete = result.current.pendingDestructiveActions[1]!.id;

      act(() => {
        result.current.deletePendingDestructiveAction(idToDelete);
      });

      expect(result.current.pendingDestructiveActions).toHaveLength(2);
      expect(result.current.pendingDestructiveActions[0]!.action).toBe(testAction1);
      expect(result.current.pendingDestructiveActions[1]!.action).toBe(testAction3);
    });

    it('should handle removing from empty array', () => {
      const { result } = renderHook(() => useDestructiveActionStore());
      act(() => {
        result.current.deletePendingDestructiveAction('non-existent-id');
      });
      expect(result.current.pendingDestructiveActions).toEqual([]);
    });
  });
});
