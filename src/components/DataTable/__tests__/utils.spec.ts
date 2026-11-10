import { describe, expect, it } from 'vitest';

import { getSizeVariableName } from '../utils.tsx';

describe('getSizeVariableName', () => {
  it('should not change an ID that contains only letters, digits, and hyphens', () => {
    expect(getSizeVariableName('col', 'first-name1')).toBe('--col-first-name1-size');
    expect(getSizeVariableName('header', 'email')).toBe('--header-email-size');
  });
  it('should return a valid CSS variable name for an ID that contains spaces', () => {
    expect(getSizeVariableName('col', 'First Name')).toMatch(/^--[a-zA-Z0-9_-]+$/);
  });
  it('should return different names for IDs that differ only in special characters', () => {
    const names = ['a b', 'a_b', 'a.b', 'a_20_b', 'ab'].map((id) => getSizeVariableName('col', id));
    expect(new Set(names).size).toBe(names.length);
  });
});
