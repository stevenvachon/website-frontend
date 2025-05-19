import { afterEach, beforeEach, expect, test as it, vi } from 'vitest';
import dateFull from './dateFull.js';

beforeEach(() => vi.stubEnv('TZ', 'UTC'));
afterEach(() => vi.unstubAllEnvs());

it('works', () => {
  expect(dateFull(new Date('2000-01-01'))).toBe('Saturday, January 1, 2000');
});
