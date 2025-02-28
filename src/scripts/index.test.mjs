import { beforeAll, beforeEach, expect, test as it, vi } from 'vitest';
import analytics from './analytics.mjs';

vi.mock('./analytics.mjs', async () => ({
  default: vi
    .fn()
    .mockImplementation((await vi.importActual('./analytics.mjs')).default),
}));

beforeAll(() => vi.stubGlobal('fetch', vi.fn()));
beforeEach(() => vi.clearAllMocks());

it('works', async () => {
  const errorSpy = vi.fn();
  const rejectionSpyDOM = vi.fn();
  const rejectionSpyNode = vi.fn();
  window.addEventListener('error', errorSpy);
  window.addEventListener('unhandledrejection', rejectionSpyDOM);
  process.on('unhandledRejection', rejectionSpyNode);
  await import('./index.mjs');
  await new Promise((resolve) => setTimeout(resolve, 0)); // Delay for execution
  expect(analytics).toHaveBeenCalledOnce();
  expect(errorSpy).not.toHaveBeenCalled();
  expect(rejectionSpyDOM).not.toHaveBeenCalled(); // This never seems to be called
  expect(rejectionSpyNode).not.toHaveBeenCalled();
});
