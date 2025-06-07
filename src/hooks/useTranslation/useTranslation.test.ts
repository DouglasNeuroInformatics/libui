import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Translator } from '@/i18n/translator';

import { useTranslation } from './useTranslation';

describe('useTranslation', () => {
  it('should return a Translator', () => {
    const { result } = renderHook(() => useTranslation());
    expect(result.current).toBeInstanceOf(Translator);
  });
});
