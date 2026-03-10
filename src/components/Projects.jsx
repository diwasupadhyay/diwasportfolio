import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTextScramble } from '@/hooks/useTextScramble';

const featured = [
  {
    title: 'Crop Price Predictor',
    subtitle: 'ML-Powered Agriculture Tool',
    description:
      'Machine learning web app predicting crop prices using Random Forest algorithms. Helps farmers and traders make data-informed decisions based on market and environmental inputs.',
    tech: ['Python', 'Random Forest', 'React', 'ML', 'Netlify'],
    github: 'https://github.com/diwasupadhyay/test-crop-project-new',
    live: 'https://www.croppriceprediction.app',
    color: '#60a5fa',
  },
  {
    title: 'PChat',
    subtitle: 'Privacy-First Chat App',
    description:
      'Production-grade real-time chat with client-side AES-GCM encryption. Messages auto-delete after reading. Zero tracking. Features include friend system, ESC privacy mode, and full mobile responsiveness.',
    tech: ['React', 'Firebase', 'AES-GCM', 'Firestore', 'Netlify'],
    github: 'https://github.com/diwasupadhyay/pchat',
    live: 'https://pchats.me',
    color: '#60a5fa',
  },
  {
    title: 'Sales Intelligence',
    subtitle: 'Analytics Dashboard',
    description:
      'Full-stack sales analytics and reporting application providing business intelligence through visual dashboards, data aggregation, and actionable insights.',
    tech: ['JavaScript', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/diwasupadhyay/Vasus-Sales-Project',
    live: null,
    color: '#60a5fa',
  },
];

/* 3D Tilt Card wrapper */
const TiltCard = ({ children, className, style, ...rest }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.08 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transform,
        transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />
      {children}
    </div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const scrambledTitle = useTextScramble('Built', inView, { speed: 50, delay: 200 });

  return (
    <section id="projects" className="section-padding px-6 lg:px-0">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}>
            Projects
          </p>
          <h2 className="section-heading">
            Things I've <span style={{ color: '#60a5fa' }}>{scrambledTitle}</span>
          </h2>
          <hr className="section-line" />
        </motion.div>

        <div className="space-y-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
            >
              <TiltCard className="glass-card group relative overflow-hidden rounded-2xl">
                {/* Animated accent line */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] z-10"
                  style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                  initial={{ width: '0%' }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
                />

                {/* Corner glow on hover */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${p.color}08, transparent 70%)` }}
                />

              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs tracking-wider uppercase font-medium"
                      style={{ fontFamily: '"Fira Code", monospace', color: p.color }}
                    >
                      {p.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: '"Syne", sans-serif', color: '#ccd6f6' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 max-w-lg" style={{ color: '#8892b0' }}>
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px]"
                        style={{
                          fontFamily: '"Fira Code", monospace',
                          color: '#8892b0',
                          backgroundColor: 'rgba(96,165,250,0.04)',
                          border: '1px solid rgba(96,165,250,0.08)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 md:pt-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg transition-all duration-300"
                      style={{ color: '#6b7a99' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(96,165,250,0.08)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(96,165,250,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#6b7a99';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg transition-all duration-300"
                      style={{ color: '#6b7a99' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#60a5fa';
                        e.currentTarget.style.background = 'rgba(96,165,250,0.08)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(96,165,250,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#6b7a99';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
