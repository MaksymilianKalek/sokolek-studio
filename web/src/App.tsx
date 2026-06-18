import { useState } from 'react'
import { Contact } from './components/home/contact'
import { Footer } from './components/home/footer'
import { Hero } from './components/home/hero'
import { Philosophy } from './components/home/philosophy'
import { PortfolioPreview } from './components/home/portfolio-preview'
import { Services } from './components/home/services'

function App() {
  const [portfolioThemeActive, setPortfolioThemeActive] = useState(false)

  return (
    <main
      className={`site-shell min-h-dvh bg-paper text-ink antialiased ${
        portfolioThemeActive ? 'site-shell--portfolio' : ''
      }`}
    >
      <Hero />
      <Services />
      <PortfolioPreview onActiveChange={setPortfolioThemeActive} />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
