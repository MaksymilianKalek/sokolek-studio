import { ReactLenis } from 'lenis/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Disciplines } from './components/Disciplines';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollDistortion } from './components/ScrollDistortion';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 1 }}>
      <main className="w-full min-h-screen text-[#FAFAFA] antialiased font-inter flex flex-col relative bg-[#050505]">
        {/* Cinematic Vignette */}
        <div
          className="pointer-events-none fixed inset-0 z-[998]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
          }}
          aria-hidden="true"
        />

        <CustomCursor />
        
        <ScrollDistortion>
          <Navigation />
          <Hero />
          <Disciplines />
          <Philosophy />
          <Contact />
          <Footer />
        </ScrollDistortion>
      </main>
    </ReactLenis>
  );
}

export default App;
