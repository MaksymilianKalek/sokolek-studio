import { ReactLenis } from 'lenis/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Disciplines } from './components/Disciplines';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 1 }}>
      <main className="w-full min-h-screen bg-transparent text-[#3E3A35] antialiased font-inter flex flex-col relative">
        {/* Noise Texture */}
        <div
          className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cinematic Vignette */}
        <div
          className="pointer-events-none fixed inset-0 z-[998]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(60, 52, 42, 0.04) 100%)',
          }}
        />

        <CustomCursor />
        <Navigation />
        <Hero />
        <Disciplines />
        <Philosophy />
        <Contact />
        <Footer />
      </main>
    </ReactLenis>
  );
}

export default App;
