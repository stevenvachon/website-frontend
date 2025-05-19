import { afterEach, beforeEach, expect, test as it, vi } from 'vitest';
import dateYear from './dateYear.js';

beforeEach(() => vi.stubEnv('TZ', 'UTC'));
afterEach(() => vi.unstubAllEnvs());

it('works', () => {
  expect(dateYear(new Date('2000-01-01'))).toBe('2000');
});
