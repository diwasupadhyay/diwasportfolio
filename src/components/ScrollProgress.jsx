import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

/* Cat SVG with multiple poses */
const CatWalking = ({ frame }) => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.5))' }}>
    <ellipse cx="14" cy="12" rx="8" ry="5" fill="#60a5fa" opacity="0.9" />
    <circle cx="22" cy="8" r="4.5" fill="#60a5fa" />
    <polygon points="19,4 20,0 22,4" fill="#60a5fa" />
    <polygon points="23,4 25,0 26,4" fill="#60a5fa" />
    <circle cx="21" cy="7" r="0.9" fill="#050d1a" />
    <circle cx="24" cy="7" r="0.9" fill="#050d1a" />
    <circle cx="22.5" cy="9" r="0.5" fill="#050d1a" />
    <path d="M6 10 Q2 4 4 1" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
    {frame === 0 ? (
      <>
        <line x1="10" y1="16" x2="8" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="16.5" x2="14" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="16.5" x2="15" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="16" x2="21" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <>
        <line x1="10" y1="16" x2="11" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="16.5" x2="11" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="16.5" x2="18" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="16" x2="18" y2="20" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
    <line x1="25" y1="8" x2="28" y2="7" stroke="#60a5fa" strokeWidth="0.5" opacity="0.6" />
    <line x1="25" y1="9" x2="28" y2="9.5" stroke="#60a5fa" strokeWidth="0.5" opacity="0.6" />
  </svg>
);

/* Sitting cat - legs tucked, tail wrapped */
const CatSitting = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.5))' }}>
    <ellipse cx="14" cy="14" rx="7" ry="5" fill="#60a5fa" opacity="0.9" />
    <circle cx="20" cy="7" r="5" fill="#60a5fa" />
    <polygon points="17,3 18,-2 20,3" fill="#60a5fa" />
    <polygon points="21,3 23,-2 24,3" fill="#60a5fa" />
    <circle cx="19" cy="6" r="0.9" fill="#050d1a" />
    <circle cx="22" cy="6" r="0.9" fill="#050d1a" />
    <circle cx="20.5" cy="8" r="0.5" fill="#050d1a" />
    {/* Tucked paws */}
    <ellipse cx="10" cy="18" rx="2.5" ry="1.5" fill="#60a5fa" />
    <ellipse cx="18" cy="18" rx="2.5" ry="1.5" fill="#60a5fa" />
    {/* Wrapped tail */}
    <path d="M7 16 Q3 18 6 20 Q10 21 14 19" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
    <line x1="23" y1="7" x2="26" y2="6" stroke="#60a5fa" strokeWidth="0.5" opacity="0.6" />
    <line x1="23" y1="8" x2="26" y2="8.5" stroke="#60a5fa" strokeWidth="0.5" opacity="0.6" />
  </svg>
);

/* Licking cat - paw up to face */
const CatLicking = ({ frame }) => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.5))' }}>
    <ellipse cx="14" cy="14" rx="7" ry="5" fill="#60a5fa" opacity="0.9" />
    <circle cx="20" cy="7" r="5" fill="#60a5fa" />
    <polygon points="17,3 18,-2 20,3" fill="#60a5fa" />
    <polygon points="21,3 23,-2 24,3" fill="#60a5fa" />
    {/* Closed happy eyes */}
    <path d="M18 6 Q19 4.5 20 6" stroke="#050d1a" strokeWidth="0.8" fill="none" />
    <path d="M21 6 Q22 4.5 23 6" stroke="#050d1a" strokeWidth="0.8" fill="none" />
    <circle cx="20.5" cy="8" r="0.5" fill="#050d1a" />
    {/* Paw near face */}
    <ellipse cx={frame === 0 ? 23 : 24} cy={frame === 0 ? 10 : 9} rx="2" ry="1.5" fill="#60a5fa" />
    {/* Other paw tucked */}
    <ellipse cx="10" cy="18" rx="2.5" ry="1.5" fill="#60a5fa" />
    <ellipse cx="18" cy="18" rx="2.5" ry="1.5" fill="#60a5fa" />
    {/* Tail */}
    <path d="M7 16 Q3 18 6 20 Q10 21 14 19" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

/* Sleeping cat - curled up with zzz */
const CatSleeping = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.5))' }}>
    <ellipse cx="14" cy="14" rx="8" ry="5" fill="#60a5fa" opacity="0.9" />
    {/* Head resting on paws */}
    <circle cx="10" cy="10" r="4.5" fill="#60a5fa" />
    <polygon points="7,6 7.5,1 10,6" fill="#60a5fa" />
    <polygon points="11,6 12.5,1 14,6" fill="#60a5fa" />
    {/* Closed eyes */}
    <line x1="8" y1="9.5" x2="10.5" y2="9.5" stroke="#050d1a" strokeWidth="0.8" strokeLinecap="round" />
    <line x1="11" y1="9.5" x2="13" y2="9.5" stroke="#050d1a" strokeWidth="0.8" strokeLinecap="round" />
    {/* Little smile */}
    <path d="M9.5 11.5 Q10.5 12.5 11.5 11.5" stroke="#050d1a" strokeWidth="0.5" fill="none" />
    {/* Curled tail */}
    <path d="M22 13 Q26 10 24 7 Q22 5 20 7" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Tucked paws */}
    <ellipse cx="7" cy="14" rx="2" ry="1.2" fill="#60a5fa" />
    {/* zzz */}
    <text x="18" y="4" fill="#60a5fa" fontSize="5" fontFamily="monospace" opacity="0.6">z</text>
    <text x="22" y="2" fill="#60a5fa" fontSize="6" fontFamily="monospace" opacity="0.4">z</text>
    <text x="26" y="0" fill="#60a5fa" fontSize="7" fontFamily="monospace" opacity="0.25">z</text>
  </svg>
);

const IDLE_ACTIONS = ['sit', 'lick', 'meow', 'sleep', 'look'];

const ScrollProgress = () => {
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const catLeft = useTransform(smoothProgress, (v) => `calc(${v * 100}% - 14px)`);
  const [dir, setDir] = useState(1);
  const [frame, setFrame] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [idleAction, setIdleAction] = useState('sit');
  const [showHint, setShowHint] = useState(false);
  const lastScrollRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const idleTimerRef = useRef(null);
  const hintTimeout = useRef(null);
  const idleIndexRef = useRef(0);

  const handleCatClick = useCallback(() => {
    setShowHint(true);
    clearTimeout(hintTimeout.current);
    hintTimeout.current = setTimeout(() => setShowHint(false), 3500);
  }, []);

  // Track scrolling state
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      rawProgress.set(pct);

      const scrollDelta = scrollTop - lastScrollRef.current;
      if (Math.abs(scrollDelta) > 2) {
        setIsScrolling(true);
        setDir(scrollDelta > 0 ? 1 : -1);
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 400);
      }
      lastScrollRef.current = scrollTop;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [rawProgress]);

  // Walk animation only while scrolling
  useEffect(() => {
    if (!isScrolling) return;
    const iv = setInterval(() => setFrame((f) => (f + 1) % 2), 150);
    return () => clearInterval(iv);
  }, [isScrolling]);

  // Cycle idle actions when not scrolling
  useEffect(() => {
    if (isScrolling) {
      clearTimeout(idleTimerRef.current);
      return;
    }
    const cycle = () => {
      idleIndexRef.current = (idleIndexRef.current + 1) % IDLE_ACTIONS.length;
      const action = IDLE_ACTIONS[idleIndexRef.current];
      setIdleAction(action);
      const dur = (action === 'meow' || action === 'look') ? 3000 : 2500 + Math.random() * 1500;
      idleTimerRef.current = setTimeout(cycle, dur);
    };
    idleTimerRef.current = setTimeout(cycle, 1200);
    return () => clearTimeout(idleTimerRef.current);
  }, [isScrolling]);

  // Idle licking animation
  useEffect(() => {
    if (isScrolling || idleAction !== 'lick') return;
    const iv = setInterval(() => setFrame((f) => (f + 1) % 2), 300);
    return () => clearInterval(iv);
  }, [isScrolling, idleAction]);

  const renderCat = () => {
    if (isScrolling) return <CatWalking frame={frame} />;
    switch (idleAction) {
      case 'lick': return <CatLicking frame={frame} />;
      case 'sleep': return <CatSleeping />;
      default: return <CatSitting />;
    }
  };

  const renderBubble = () => {
    if (isScrolling) return null;
    if (idleAction === 'meow') {
      return (
        <motion.div
          key="meow"
          initial={{ opacity: 0, scale: 0.5, y: 2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute pointer-events-none"
          style={{
            top: -18,
            left: 10,
            fontSize: 9,
            fontFamily: '"Fira Code", monospace',
            color: '#60a5fa',
            background: 'rgba(10,22,40,0.9)',
            border: '1px solid rgba(96,165,250,0.3)',
            borderRadius: 6,
            padding: '1px 5px',
            whiteSpace: 'nowrap',
          }}
        >
          meow!
        </motion.div>
      );
    }
    if (idleAction === 'look') {
      return (
        <motion.div
          key="look"
          initial={{ opacity: 0, scale: 0.5, y: 2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute pointer-events-none"
          style={{
            top: -18,
            left: 6,
            fontSize: 9,
            fontFamily: '"Fira Code", monospace',
            color: '#60a5fa',
            background: 'rgba(10,22,40,0.9)',
            border: '1px solid rgba(96,165,250,0.3)',
            borderRadius: 6,
            padding: '1px 5px',
            whiteSpace: 'nowrap',
          }}
        >
          (=^・ω・^=)
        </motion.div>
      );
    }
    return null;
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #60a5fa, rgba(96,165,250,0.4))',
          boxShadow: '0 0 8px rgba(96,165,250,0.4)',
        }}
      />

      <motion.div
        className="fixed z-[10000] cursor-pointer"
        style={{
          top: -4,
          left: catLeft,
          transform: `scaleX(${dir})`,
        }}
        onClick={handleCatClick}
        title="Pet me!"
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            {renderBubble()}
          </AnimatePresence>
          <div style={{ transition: 'opacity 0.15s' }}>
            {renderCat()}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -10, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 z-[10001] px-4 py-2 rounded-lg text-xs"
            style={{
              fontFamily: '"Fira Code", monospace',
              color: '#e6f1ff',
              background: 'rgba(10, 22, 40, 0.95)',
              border: '1px solid rgba(96,165,250,0.3)',
              boxShadow: '0 4px 20px rgba(96,165,250,0.15)',
              backdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap',
            }}
          >
            🐱 Try pressing{' '}
            <span style={{ color: '#60a5fa' }}>↑ ↑ ↓ ↓ ← → ← →</span>
            {' '}for a surprise!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
