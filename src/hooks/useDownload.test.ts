import React from 'react';

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDownload } from './useDownload';

const mockNotificationsStore = {
  addNotification: vi.fn()
};

vi.mock('./useNotificationsStore', () => ({
  useNotificationsStore: () => mockNotificationsStore
}));

describe('useDownload', () => {
  let download: ReturnType<typeof useDownload>;

  beforeEach(() => {
    vi.spyOn(document, 'createElement');
    vi.spyOn(React, 'useState');
    const { result } = renderHook(() => useDownload());
    download = result.current;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render', () => {
    expect(download).toBeDefined();
  });

  it('should invoke the fetch data function', async () => {
    const fetchData = vi.fn(() => 'hello world');
    await download('hello.txt', fetchData);
    expect(fetchData).toHaveBeenCalledOnce();
  });
  it('should attempt at add a notification if the fetch data function throws an error', async () => {
    await act(() =>
      download('hello.txt', () => {
        throw new Error('An error occurred!');
      })
    );
    expect(mockNotificationsStore.addNotification).toHaveBeenCalledOnce();
    expect(mockNotificationsStore.addNotification.mock.lastCall[0]).toMatchObject({ message: 'An error occurred!' });
  });
  it('should attempt at add a notification if the fetch data function throws a non-error', async () => {
    await act(() =>
      download('hello.txt', () => {
        throw NaN;
      })
    );
    expect(mockNotificationsStore.addNotification).toHaveBeenCalledOnce();
  });
  it('should attempt to create one anchor element', async () => {
    await act(() => download('hello.txt', () => 'hello world'));
    expect(document.createElement).toHaveBeenLastCalledWith('a');
  });
});
