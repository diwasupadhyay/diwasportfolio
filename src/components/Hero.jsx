import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const Hero = ({ show }) => {
  if (!show) return null;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.645, 0.045, 0.355, 1] } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[70px]">
      {/* Animated aurora blobs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.08), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.06), transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[60%] right-[40%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.04), transparent 60%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text content */}
          <motion.div
            className="order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs mb-1 tracking-[0.25em] uppercase"
              style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-extrabold leading-[1.05] mb-2"
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: 'clamp(44px, 8vw, 76px)',
                color: '#e6f1ff',
                letterSpacing: '-0.03em',
                marginLeft: '-3px',
              }}
            >
              Diwas
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.2] mb-6"
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: 'clamp(20px, 3.5vw, 36px)',
                color: '#4a5a7a',
                letterSpacing: '-0.01em',
              }}
            >
              Full-Stack Developer &amp; Data Engineer
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg mb-6 max-w-[520px] leading-relaxed"
              style={{ color: '#8892b0' }}
            >
              Software engineer student who loves turning complex problems into
              clean, efficient solutions. I work across the full stack
              crafting intuitive interfaces, building robust APIs,
              and designing data pipelines that actually scale.
              Always learning, always shipping.
            </motion.p>

            <motion.div variants={fadeUp} className="mb-8">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] tracking-wider uppercase animate-border-glow"
                style={{
                  fontFamily: '"Fira Code", monospace',
                  color: '#60a5fa',
                  border: '1px solid rgba(96,165,250,0.2)',
                  backgroundColor: 'rgba(96,165,250,0.04)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: '#60a5fa',
                    boxShadow: '0 0 8px #60a5fa, 0 0 16px rgba(96,165,250,0.4)',
                    animation: 'glowPulse 2s ease-in-out infinite',
                  }}
                />
                Open to opportunities
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View Projects
                <FiArrowDown size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Profile image with RevealWaveImage */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
          >
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden group">
              {/* Animated glow behind */}
              <motion.div
                className="absolute -inset-1 rounded-2xl"
                style={{ background: '#60a5fa' }}
                animate={{ opacity: [0.12, 0.2, 0.12] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="absolute -inset-1 rounded-2xl blur-2xl opacity-15"
                style={{ background: '#60a5fa' }}
              />
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(96,165,250,0.15)' }}
              >
                <img
                  src="/diwas.jpeg"
                  alt="Diwas Upadhyay"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full flex items-start justify-center p-1"
          style={{ border: '1px solid rgba(96,165,250,0.2)' }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: '#60a5fa' }}
            animate={{ opacity: [0.3, 1, 0.3], height: ['6px', '10px', '6px'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
