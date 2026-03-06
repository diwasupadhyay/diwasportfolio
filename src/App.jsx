import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Sidebars from './components/Sidebars';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import { Contact, Footer } from './components/Contact';
import KonamiCatShower from './components/KonamiCatShower';
import ScrollProgress from './components/ScrollProgress';

/* Mouse spotlight that follows cursor */
const Spotlight = () => {
  const spotRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (spotRef.current) {
        spotRef.current.style.setProperty('--mx', `${e.clientX}px`);
        spotRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.045), transparent 40%)',
      }}
    />
  );
};

/* Floating particles background */
const Particles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      peakOpacity: Math.random() * 0.4 + 0.1,
    })), []);

  return (
    <div className="particles-bg">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--peak-opacity': p.peakOpacity,
          }}
        />
      ))}
    </div>
  );
};

/* Aurora gradient blobs */
const Aurora = () => (
  <div className="aurora-bg">
    <div
      className="aurora-blob"
      style={{
        width: 500,
        height: 500,
        top: '10%',
        left: '60%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.04), transparent 60%)',
        animationDelay: '0s',
      }}
    />
    <div
      className="aurora-blob"
      style={{
        width: 400,
        height: 400,
        top: '50%',
        left: '20%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.03), transparent 60%)',
        animationDelay: '4s',
      }}
    />
    <div
      className="aurora-blob"
      style={{
        width: 350,
        height: 350,
        top: '70%',
        right: '10%',
        background: 'radial-gradient(circle, rgba(96,165,250,0.025), transparent 60%)',
        animationDelay: '8s',
      }}
    />
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
    requestAnimationFrame(() => setShowContent(true));
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader onComplete={handleLoaderComplete} />}</AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
          className="scan-lines"
        >
          <ScrollProgress />
          <Spotlight />
          <Particles />
          <Aurora />
          <Navbar show={showContent} />
          <Sidebars show={showContent} />

          <main className="relative z-10">
            <Hero show={showContent} />
            <hr className="section-divider" />
            <Skills />
            <hr className="section-divider" />
            <Projects />
            <hr className="section-divider" />
            <Education />
            <hr className="section-divider" />
            <Contact />
          </main>

          <Footer />
          <KonamiCatShower />
        </motion.div>
      )}
    </>
  );
}

export default App;
