import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test as it,
  vi,
} from 'vitest';
import analytics, {
  API_URL,
  INACTIVITY_TIMEOUT,
  PAGE_LOAD_EVENT,
  PAGE_UNLOAD_EVENT,
  SESSION_ID_KEY,
  SESSION_START_EVENT,
  SESSION_TIMEOUT_EVENT,
} from './analytics.mjs';

describe('Humans', () => {
  const MESSAGE_METADATA = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  };
  const STUBBED_LOCATION = 'http://domain/';
  const STUBBED_REFERRER = 'http://another-domain/';
  const STUBBED_TIMESTAMP = Date.now();
  const STUBBED_USERAGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
  const STUBBED_UUID = '647ca8f2-3ae4-4e24-b8c4-497203818371';

  beforeEach(() => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(STUBBED_UUID);
    vi.spyOn(Date, 'now').mockReturnValue(STUBBED_TIMESTAMP);
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('location', new URL(STUBBED_LOCATION));
    vi.stubGlobal('navigator', {
      ...navigator,
      sendBeacon: vi.fn(),
      userAgent: STUBBED_USERAGENT,
    });
    vi.stubGlobal('screen', {
      ...screen,
      height: 2160,
      width: 3840,
    });
  });

  afterEach(() => sessionStorage.removeItem(SESSION_ID_KEY));
  afterAll(() => vi.unstubAllGlobals());

  describe('New session', () => {
    const ORIGINAL_REFERRER = document.referrer;

    afterEach(() =>
      Object.defineProperty(document, 'referrer', {
        configurable: true,
        get: () => ORIGINAL_REFERRER,
      })
    );

    it('stores an id in sessionStorage', () => {
      expect(sessionStorage.getItem(SESSION_ID_KEY)).toBe(null);
      analytics();
      expect(sessionStorage.getItem(SESSION_ID_KEY)).toBe(STUBBED_UUID);
    });

    it(`sends a "${SESSION_START_EVENT}" event`, () => {
      analytics();
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(1, API_URL, {
        body: JSON.stringify({
          event: SESSION_START_EVENT,
          session_id: STUBBED_UUID,
          timestamp: STUBBED_TIMESTAMP,
          // Ordered the same as in the source file
          browser_name: 'Chrome',
          browser_version_major: '134',
          browser_version: '134.0.0.0',
          device_model: 'Macintosh',
          device_vendor: 'Apple',
          os_name: 'macOS',
          os_version: '10.15.7',
          screen_resolution: '3840x2160',
        }),
        ...MESSAGE_METADATA,
      });
    });

    it(`sends a "${PAGE_LOAD_EVENT}" event`, () => {
      analytics();
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(2, API_URL, {
        body: JSON.stringify({
          event: PAGE_LOAD_EVENT,
          session_id: STUBBED_UUID,
          timestamp: STUBBED_TIMESTAMP,
          url: STUBBED_LOCATION,
        }),
        ...MESSAGE_METADATA,
      });
    });

    it(`can also include a referrer in the "${PAGE_LOAD_EVENT}" event`, () => {
      Object.defineProperty(document, 'referrer', {
        configurable: true,
        get: () => STUBBED_REFERRER,
      });
      analytics();
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(2, API_URL, {
        body: JSON.stringify({
          event: PAGE_LOAD_EVENT,
          session_id: STUBBED_UUID,
          timestamp: STUBBED_TIMESTAMP,
          // Ordered the same as in the source file
          referrer: STUBBED_REFERRER,
          url: STUBBED_LOCATION,
        }),
        ...MESSAGE_METADATA,
      });
    });

    it(`sends a "${PAGE_UNLOAD_EVENT}" when leaving the page`, async () => {
      analytics();
      dispatchEvent(new Event('beforeunload'));
      expect(vi.mocked(navigator.sendBeacon)).toHaveBeenCalled();
      const args = vi.mocked(navigator.sendBeacon).mock.lastCall;
      expect(args[0]).toBe(API_URL);
      expect(args[1]).toBeInstanceOf(Blob);
      expect(args[1]).toHaveProperty('type', 'application/json');
      await expect(args[1].text()).resolves.toBe(
        JSON.stringify({
          event: PAGE_UNLOAD_EVENT,
          session_id: STUBBED_UUID,
          timestamp: STUBBED_TIMESTAMP,
        })
      );
    });
  });

  describe('Existing session', () => {
    const STUBBED_UUID_UNUSED = '043f18e8-9cf6-4440-81b1-cd13e4902e28';

    beforeAll(() =>
      vi.spyOn(crypto, 'randomUUID').mockReturnValue(STUBBED_UUID_UNUSED)
    );
    beforeEach(() => sessionStorage.setItem(SESSION_ID_KEY, STUBBED_UUID));
    afterAll(() => vi.mocked(crypto.randomUUID).mockRestore()); // Revert to previous spy

    it('reuses the stored id', () => {
      analytics();
      expect(sessionStorage.getItem(SESSION_ID_KEY)).not.toBe(
        STUBBED_UUID_UNUSED
      );
      expect(sessionStorage.getItem(SESSION_ID_KEY)).toBe(STUBBED_UUID);
    });

    it(`does not send a "${SESSION_START_EVENT}" event`, () => {
      analytics();
      expect(vi.mocked(fetch)).not.toHaveBeenCalledWith(API_URL, {
        body: expect.stringContaining(SESSION_START_EVENT),
        headers: expect.any(Object),
        method: expect.any(String),
      });
    });

    it(`sends a "${PAGE_LOAD_EVENT}" event`, () => {
      analytics();
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(1, API_URL, {
        body: expect.stringContaining(PAGE_LOAD_EVENT),
        headers: expect.any(Object),
        method: expect.any(String),
      });
    });
  });

  describe('Session timeout & restart', () => {
    const ANY_SESSION_TIMEOUT_ARGS = [
      API_URL,
      {
        body: expect.stringContaining(SESSION_TIMEOUT_EVENT),
        headers: expect.any(Object),
        method: expect.any(String),
      },
    ];

    const create_SESSION_TIMEOUT_ARGS = (timestamp) => [
      API_URL,
      {
        body: JSON.stringify({
          event: SESSION_TIMEOUT_EVENT,
          session_id: STUBBED_UUID,
          timestamp,
        }),
        ...MESSAGE_METADATA,
      },
    ];

    beforeEach(() => {
      vi.mocked(Date.now).mockRestore(); // Revert to native implementation
      vi.useFakeTimers();
    });

    afterEach(() => vi.useRealTimers());

    it(`sends a "${SESSION_TIMEOUT_EVENT}" event after prolonged user inactivity`, () => {
      analytics();
      const LAST_ACTIVITY_TIMESTAMP = Date.now();
      vi.advanceTimersByTime(INACTIVITY_TIMEOUT - 1);
      expect(vi.mocked(fetch)).not.toHaveBeenCalledWith(
        ...ANY_SESSION_TIMEOUT_ARGS
      );
      vi.advanceTimersByTime(1);
      expect(vi.mocked(fetch)).toHaveBeenLastCalledWith(
        ...create_SESSION_TIMEOUT_ARGS(LAST_ACTIVITY_TIMESTAMP)
      );
    });

    it('removes the stored id', () => {
      analytics();
      expect(sessionStorage.getItem(SESSION_ID_KEY)).toBe(STUBBED_UUID);
      vi.advanceTimersByTime(INACTIVITY_TIMEOUT);
      expect(sessionStorage.getItem(SESSION_ID_KEY)).toBe(null);
    });

    it('resets the timeout upon user activity', () => {
      analytics();
      for (const event of ['click', 'keydown', 'mousemove', 'scroll']) {
        vi.advanceTimersByTime(INACTIVITY_TIMEOUT - 1);
        expect(vi.mocked(fetch)).not.toHaveBeenCalledWith(
          ...ANY_SESSION_TIMEOUT_ARGS
        );
        dispatchEvent(new Event(event));
        vi.advanceTimersByTime(1);
        expect(vi.mocked(fetch)).not.toHaveBeenCalledWith(
          ...ANY_SESSION_TIMEOUT_ARGS
        );
        // Reset timeout for next iteration (and after the last one)
        dispatchEvent(new Event(event));
      }
      const LAST_ACTIVITY_TIMESTAMP = Date.now();
      vi.advanceTimersByTime(INACTIVITY_TIMEOUT);
      expect(vi.mocked(fetch)).toHaveBeenLastCalledWith(
        ...create_SESSION_TIMEOUT_ARGS(LAST_ACTIVITY_TIMESTAMP)
      );
    });

    it('starts a new session after timeout upon user activity', () => {
      analytics();
      vi.advanceTimersByTime(INACTIVITY_TIMEOUT);
      dispatchEvent(new Event('click'));
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(1, API_URL, {
        body: expect.stringContaining(SESSION_START_EVENT),
        headers: expect.any(Object),
        method: expect.any(String),
      });
      expect(vi.mocked(fetch)).toHaveBeenNthCalledWith(2, API_URL, {
        body: expect.stringContaining(PAGE_LOAD_EVENT),
        headers: expect.any(Object),
        method: expect.any(String),
      });
    });
  });
});
