import { UAParser } from 'ua-parser-js';

// Exported for tests
export const API_URL = '//api.svachon.com/analytics';
export const INACTIVITY_TIMEOUT = 30 * 60 * 1_000; // 30 minutes
export const PAGE_LOAD_EVENT = 'PageLoad';
export const PAGE_UNLOAD_EVENT = 'PageUnload';
export const SESSION_ID_KEY = 'sessionId';
export const SESSION_START_EVENT = 'SessionStart';
export const SESSION_TIMEOUT_EVENT = 'SessionTimeout';

let sessionTimeout;

const isActiveSession = () => sessionStorage.getItem(SESSION_ID_KEY) !== null;

const send = (eventName, data) =>
  Promise.try(() => {
    const type = 'application/json';
    const body = JSON.stringify({
      event: eventName,
      session_id: sessionStorage.getItem(SESSION_ID_KEY),
      timestamp: Date.now(),
      ...data,
    });
    if (eventName === PAGE_UNLOAD_EVENT) {
      navigator.sendBeacon(API_URL, new Blob([body], { type }));
    } else {
      return fetch(API_URL, {
        body,
        headers: { 'Content-Type': type },
        method: 'POST',
      });
    }
  }).catch(console.error);

const sendPageLoad = () =>
  send(PAGE_LOAD_EVENT, {
    referrer: document.referrer || undefined,
    url: location.href,
  });

const sendStartSession = () =>
  Promise.try(() => {
    sessionStorage.setItem(SESSION_ID_KEY, crypto.randomUUID());
    const { browser, cpu, device, os } = UAParser(navigator.userAgent);
    return send(SESSION_START_EVENT, {
      browser_name: browser.name,
      browser_version_major: browser.major,
      browser_version: browser.version,
      cpu_arch: cpu.architecture,
      device_model: device.model,
      device_type: device.type,
      device_vendor: device.vendor,
      os_name: os.name,
      os_version: os.version,
      screen_resolution: `${screen.width}x${screen.height}`,
    });
  });

const updateActivity = () => {
  const lastActivityTime = Date.now();
  clearTimeout(sessionTimeout);
  if (!isActiveSession()) {
    sendStartSession();
    sendPageLoad();
  }
  sessionTimeout = setTimeout(() => {
    if (isActiveSession()) {
      send(SESSION_TIMEOUT_EVENT, { timestamp: lastActivityTime });
      sessionStorage.removeItem(SESSION_ID_KEY);
    }
  }, INACTIVITY_TIMEOUT);
};

export default () => {
  if (
    ['crawler', 'fetcher'].includes(UAParser(navigator.userAgent).browser.type)
  ) {
    return;
  }

  if (!isActiveSession()) {
    sendStartSession();
  }
  sendPageLoad();
  updateActivity();
  addEventListener('beforeunload', () => send(PAGE_UNLOAD_EVENT));

  ['click', 'keydown', 'mousemove', 'scroll'].forEach((event) =>
    addEventListener(event, updateActivity)
  );
};
