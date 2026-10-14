import { useCallback, useEffect, useState } from 'react'
import { enableAnalytics } from '../lib/analytics'

const COOKIE_CONSENT_STORAGE_KEY = 'sokolek-cookie-consent'

type CookieConsent = 'accepted' | 'rejected' | null

function readCookieConsent(): CookieConsent {
  try {
    const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)

    if (storedConsent === 'accepted' || storedConsent === 'rejected') {
      return storedConsent
    }
  } catch (error) {
    console.error('Failed to read cookie consent preference.', error)
  }

  return null
}

function storeCookieConsent(consent: Exclude<CookieConsent, null>) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent)
  } catch (error) {
    console.error('Failed to store cookie consent preference.', error)
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(readCookieConsent)

  useEffect(() => {
    if (consent === 'accepted') {
      enableAnalytics()
    }
  }, [consent])

  const acceptAnalytics = useCallback(() => {
    storeCookieConsent('accepted')
    setConsent('accepted')
  }, [])

  const rejectAnalytics = useCallback(() => {
    storeCookieConsent('rejected')
    setConsent('rejected')
  }, [])

  return {
    acceptAnalytics,
    rejectAnalytics,
    shouldShowNotice: consent === null,
  }
}
