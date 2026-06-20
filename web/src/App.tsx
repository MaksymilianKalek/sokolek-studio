import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { CookieConsentBanner } from './components/cookie-consent-banner'
import { Footer } from './components/home/footer'
import { Hero } from './components/home/hero'
import { Philosophy } from './components/home/philosophy'
import { PortfolioPreview } from './components/home/portfolio-preview'
import { Services } from './components/home/services'
import { useCookieConsent } from './hooks/use-cookie-consent'
import { useSmoothScroll } from './hooks/use-smooth-scroll'

function App() {
  useSmoothScroll()

  const { acceptConsent, consent, rejectConsent } = useCookieConsent()
  const [portfolioThemeActive, setPortfolioThemeActive] = useState(false)
  const [isIntroTypingActive, setIsIntroTypingActive] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  const completeIntroTyping = useCallback(() => {
    setIsIntroComplete(true)
  }, [])

  useEffect(() => {
    const startTypingTimer = window.setTimeout(() => {
      setIsIntroTypingActive(true)
    }, 500)

    return () => {
      window.clearTimeout(startTypingTimer)
    }
  }, [])

  return (
    <main
      className={`site-shell min-h-dvh bg-paper text-ink antialiased ${
        portfolioThemeActive ? 'site-shell--portfolio' : ''
      }`}
    >
      <Hero
        isIntroActive={!isIntroComplete}
        isIntroComplete={isIntroComplete}
        onIntroTypingComplete={completeIntroTyping}
        startTyping={isIntroTypingActive}
      />
      <Services />
      <PortfolioPreview onActiveChange={setPortfolioThemeActive} />
      <Philosophy />
      <Footer />
      <AnimatePresence>
        {consent === 'pending' ? (
          <CookieConsentBanner onAccept={acceptConsent} onReject={rejectConsent} />
        ) : null}
      </AnimatePresence>
    </main>
  )
}

export default App
