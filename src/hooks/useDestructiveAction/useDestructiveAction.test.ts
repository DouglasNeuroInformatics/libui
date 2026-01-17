import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDestructiveAction } from './useDestructiveAction.ts';
import { useDestructiveActionStore } from './useDestructiveActionStore.ts';

import type {
  DestructiveAction,
  DestructiveActionOptions,
  DestructiveActionParams
} from './useDestructiveActionStore.ts';

vi.mock('./useDestructiveActionStore', () => ({
  useDestructiveActionStore: vi.fn()
}));

describe('useDestructiveAction', () => {
  const mockAddPendingDestructiveAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDestructiveActionStore as any).mockImplementation((selector: any) => {
      const store = {
        addPendingDestructiveAction: mockAddPendingDestructiveAction
      };
      return selector(store);
    });
  });

  describe('useDestructiveAction()', () => {
    it('should return a function that accepts action and options', () => {
      const { result } = renderHook(() => useDestructiveAction());
      expect(typeof result.current).toBe('function');
    });

    it('should call addPendingDestructiveAction with action only', () => {
      const { result } = renderHook(() => useDestructiveAction());
      const testAction: DestructiveAction = vi.fn();

      act(() => {
        result.current(testAction);
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(testAction, undefined);
    });

    it('should call addPendingDestructiveAction with action and options', () => {
      const { result } = renderHook(() => useDestructiveAction());
      const testAction: DestructiveAction = vi.fn();
      const options: DestructiveActionOptions = {
        description: 'This is a test',
        title: 'Test Action'
      };

      act(() => {
        result.current(testAction, options);
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(testAction, options);
    });
  });

  describe('useDestructiveAction(action)', () => {
    it('should return a function that calls the action with provided args', () => {
      const testAction = vi.fn();
      const { result } = renderHook(() => useDestructiveAction(testAction));

      const arg1 = 'test';
      const arg2 = 123;

      act(() => {
        result.current(arg1, arg2);
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(expect.any(Function), {});

      // Test that the wrapped function calls the original action with args
      const wrappedAction = mockAddPendingDestructiveAction.mock.calls[0]![0];
      wrappedAction();
      expect(testAction).toHaveBeenCalledWith(arg1, arg2);
    });

    it('should work with no arguments', () => {
      const testAction = vi.fn();
      const { result } = renderHook(() => useDestructiveAction(testAction));

      act(() => {
        result.current();
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(expect.any(Function), {});

      const wrappedAction = mockAddPendingDestructiveAction.mock.calls[0]![0];
      wrappedAction();
      expect(testAction).toHaveBeenCalledWith();
    });
  });

  describe('useDestructiveAction(params)', () => {
    it('should return a function that calls the action with provided args and passes options', () => {
      const testAction = vi.fn();
      const params: DestructiveActionParams<[string, number]> = {
        action: testAction,
        description: 'This is a test',
        title: 'Test Action'
      };
      const { result } = renderHook(() => useDestructiveAction(params));

      const arg1 = 'test';
      const arg2 = 123;

      act(() => {
        result.current(arg1, arg2);
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(expect.any(Function), {
        description: 'This is a test',
        title: 'Test Action'
      });

      // test that the wrapped function calls the original action with args
      const wrappedAction = mockAddPendingDestructiveAction.mock.calls[0]![0];
      wrappedAction();
      expect(testAction).toHaveBeenCalledWith(arg1, arg2);
    });

    it('should work with only action in params', () => {
      const testAction = vi.fn();
      const params: DestructiveActionParams<[]> = {
        action: testAction
      };
      const { result } = renderHook(() => useDestructiveAction(params));

      act(() => {
        result.current();
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(expect.any(Function), {});

      const wrappedAction = mockAddPendingDestructiveAction.mock.calls[0]![0];
      wrappedAction();
      expect(testAction).toHaveBeenCalledWith();
    });

    it('should work with partial options in params', () => {
      const testAction = vi.fn();
      const params: DestructiveActionParams<[string]> = {
        action: testAction,
        title: 'Only Title'
      };
      const { result } = renderHook(() => useDestructiveAction(params));

      act(() => {
        result.current('test');
      });

      expect(mockAddPendingDestructiveAction).toHaveBeenCalledWith(expect.any(Function), {
        title: 'Only Title'
      });
    });
  });

  describe('callback stability', () => {
    it('should return the same callback function when dependencies do not change', () => {
      const testAction = vi.fn();
      const { rerender, result } = renderHook(() => useDestructiveAction(testAction));

      const firstCallback = result.current;
      rerender();
      const secondCallback = result.current;

      expect(firstCallback).toBe(secondCallback);
    });

    it('should return a new callback function when action changes', () => {
      const testAction1 = vi.fn();
      const testAction2 = vi.fn();
      let action = testAction1;

      const { rerender, result } = renderHook(() => useDestructiveAction(action));

      const firstCallback = result.current;

      action = testAction2;
      rerender();

      const secondCallback = result.current;

      expect(firstCallback).not.toBe(secondCallback);
    });

    it('should return a new callback function when params change', () => {
      const testAction = vi.fn();
      let params: DestructiveActionParams<[]> = { action: testAction, title: 'First' };

      const { rerender, result } = renderHook(() => useDestructiveAction(params));

      const firstCallback = result.current;

      params = { action: testAction, title: 'Second' };
      rerender();

      const secondCallback = result.current;

      expect(firstCallback).not.toBe(secondCallback);
    });
  });

  describe('store integration', () => {
    it('should call useDestructiveActionStore with correct selector', () => {
      renderHook(() => useDestructiveAction());

      expect(useDestructiveActionStore).toHaveBeenCalledWith(expect.any(Function));

      // Test the selector function
      const selector = (useDestructiveActionStore as any).mock.calls[0][0];
      const mockStore = {
        addPendingDestructiveAction: mockAddPendingDestructiveAction,
        otherProperty: 'should not be selected'
      };

      expect(selector(mockStore)).toBe(mockAddPendingDestructiveAction);
    });
  });
});
