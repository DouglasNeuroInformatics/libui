import { renderHook } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { mockStorage } from '#testing:mocks';

import { useLocalStorage } from './useLocalStorage.ts';

mockStorage('localStorage');

vi.mock('#utils', () => ({ isBrowser: vi.fn(() => true) }));

describe('useLocalStorage()', () => {
  it('should render', () => {
    renderHook(() => useLocalStorage('key', 'value'));
  });
});
