import { beforeAll, beforeEach, expect, test as it, vi } from 'vitest';
import analytics from './analytics.js';
import effects from './effects.js';
import textEffects from './textEffects.js';

vi.mock('./analytics.js', async () => ({
  default: vi
    .fn()
    .mockImplementation((await vi.importActual('./analytics.js')).default),
}));

vi.mock('./effects.js', async () => ({
  default: vi
    .fn()
    .mockImplementation((await vi.importActual('./effects.js')).default),
}));

vi.mock('./textEffects.js', async () => ({
  default: vi
    .fn()
    .mockImplementation((await vi.importActual('./textEffects.js')).default),
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
  await import('./index.js');
  await new Promise((resolve) => setTimeout(resolve, 0)); // Delay for execution
  expect(analytics).toHaveBeenCalledOnce();
  expect(effects).toHaveBeenCalledOnce();
  expect(textEffects).toHaveBeenCalledOnce();
  expect(errorSpy).not.toHaveBeenCalled();
  expect(rejectionSpyDOM).not.toHaveBeenCalled(); // This never seems to be called
  expect(rejectionSpyNode).not.toHaveBeenCalled();
});
