import { Contact } from './components/home/contact'
import { Footer } from './components/home/footer'
import { Hero } from './components/home/hero'
import { Philosophy } from './components/home/philosophy'
import { PortfolioPreview } from './components/home/portfolio-preview'
import { Services } from './components/home/services'

function App() {
  return (
    <main className="min-h-dvh bg-paper text-ink antialiased">
      <Hero />
      <Services />
      <PortfolioPreview />
      <Philosophy />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
