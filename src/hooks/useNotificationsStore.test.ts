import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import * as zustand from 'zustand';

import { useNotificationsStore } from './useNotificationsStore';

describe('useNotificationsStore', () => {
  beforeAll(() => {
    vi.spyOn(zustand, 'create');
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render and return an object', () => {
    const { result } = renderHook(() => useNotificationsStore());
    expect(result.current).toBeTypeOf('object');
  });
  it('should add and dismiss notifications', () => {
    const { result } = renderHook(() => useNotificationsStore());
    act(() => {
      result.current.addNotification({ message: 'test', type: 'info' });
    });
    expect(result.current.notifications.length).toBe(1);
    expect(result.current.notifications[0]).toMatchObject({ message: 'test' });
    act(() => {
      result.current.dismissNotification(result.current.notifications[0].id);
    });
    expect(result.current.notifications.length).toBe(0);
  });
});
