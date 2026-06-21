import { useCallback, useState } from 'react';

const COOKIE_NOTICE_STORAGE_KEY = 'sokolek-cookie-notice-dismissed';

function readNoticeDismissed() {
  try {
    return window.localStorage.getItem(COOKIE_NOTICE_STORAGE_KEY) === 'true';
  } catch (error) {
    console.error('Failed to read cookie notice preference.', error);
  }

  return false;
}

function storeNoticeDismissed() {
  try {
    window.localStorage.setItem(COOKIE_NOTICE_STORAGE_KEY, 'true');
  } catch (error) {
    console.error('Failed to store cookie notice preference.', error);
  }
}

export function useCookieConsent() {
  const [isNoticeDismissed, setIsNoticeDismissed] = useState(readNoticeDismissed);


  const dismissNotice = useCallback(() => {
    storeNoticeDismissed();
    setIsNoticeDismissed(true);
  }, []);

  return {
    dismissNotice,
    shouldShowNotice: !isNoticeDismissed,
  };
}
