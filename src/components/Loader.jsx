import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 40);

    const timer = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  const name = 'DIWAS';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050d1a' }}
      animate={phase === 'exit' ? { opacity: 0, scale: 1.05, filter: 'blur(10px)' } : {}}
      transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.15), transparent 60%)',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(96,165,250,0.12), transparent 60%)',
            bottom: '20%',
            right: '30%',
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(96,165,250,0.08)' }}
          initial={{ width: 60, height: 60, opacity: 0 }}
          animate={{ width: 250 + i * 140, height: 250 + i * 140, opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, delay: 0.2 + i * 0.3, ease: 'easeOut' }}
        />
      ))}

      {/* Letter reveal */}
      <div className="flex items-center gap-[3px] mb-6 relative z-10">
        {name.split('').map((char, i) => (
          <motion.span
            key={i}
            className="text-5xl sm:text-6xl font-extrabold inline-block"
            style={{ fontFamily: '"Syne", sans-serif' }}
            initial={{ opacity: 0, y: 50, rotateX: -90, filter: 'blur(8px)' }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              color: '#e6f1ff',
              textShadow: '0 0 30px rgba(96,165,250,0.3)',
            }}
            transition={{
              delay: 0.15 + i * 0.1,
              duration: 0.6,
              ease: [0.645, 0.045, 0.355, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          className="text-5xl sm:text-6xl font-extrabold inline-block"
          style={{ fontFamily: '"Syne", sans-serif' }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.15 + name.length * 0.1, duration: 0.4, type: 'spring', stiffness: 300 }}
        >
          .
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-40 h-[2px] bg-navy-700/50 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: '#60a5fa',
            width: `${Math.min(progress, 100)}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-[11px] tracking-[0.35em] uppercase relative z-10"
        style={{ fontFamily: '"Fira Code", monospace', color: '#4a5a7a' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        initializing
      </motion.p>
    </motion.div>
  );
};

export default Loader;
