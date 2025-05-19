import { afterEach, beforeEach, expect, test as it, vi } from 'vitest';
import dateISO from './dateISO.js';

beforeEach(() => vi.stubEnv('TZ', 'UTC'));
afterEach(() => vi.unstubAllEnvs());

it(`doesn't remove times that are exactly midnight by default`, () => {
  const str = '2000-01-01T01:01:01.001Z';
  expect(dateISO(new Date(str))).toBe(str);
});

it('always removes times that are exactly midnight', () => {
  const str = '2000-01-01';
  expect(dateISO(new Date(str))).toBe(str);
});

it('optionally removes all times', () => {
  [
    { before: '2000-01-01T00:00:00.000Z', after: '2000-01-01' },
    { before: '2000-01-01T01:01:01.001Z', after: '2000-01-01' },
  ].forEach(({ before, after }) => {
    expect(dateISO(new Date(before), true)).toBe(after);
  });
});
