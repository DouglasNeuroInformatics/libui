import { renderHook } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { mockStorage } from '@/testing/mocks';

import { useSessionStorage } from './useSessionStorage';

mockStorage('sessionStorage');

vi.mock('@/utils', () => ({ isBrowser: vi.fn(() => true) }));

describe('useSessionStorage()', () => {
  it('should render', () => {
    renderHook(() => useSessionStorage('key', 'value'));
  });
});
