import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTextScramble } from '@/hooks/useTextScramble';

const categories = [
  {
    title: 'Languages',
    items: ['JavaScript', 'Python', 'Java', 'SQL'],
    icon: '{ }',
    color: '#60a5fa',
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    icon: '</>',
    color: '#60a5fa',
  },
  {
    title: 'Backend & DB',
    items: ['Node.js', 'Express.js', 'Firebase', 'MongoDB', 'MySQL'],
    icon: '>>>',
    color: '#60a5fa',
  },
  {
    title: 'DevOps & Tools',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'Postman'],
    icon: '$ _',
    color: '#60a5fa',
  },
  {
    title: 'Big Data',
    items: ['Apache Spark', 'Hadoop', 'Apache Hive', 'Pandas', 'NumPy'],
    icon: '[ ]',
    color: '#60a5fa',
  },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrambledTitle = useTextScramble('Skills', inView, { speed: 50, delay: 200 });

  return (
    <section id="skills" className="section-padding px-6 lg:px-0">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}>
            Skills
          </p>
          <h2 className="section-heading">
            Technical <span style={{ color: '#60a5fa' }}>{scrambledTitle}</span>
          </h2>
          <hr className="section-line" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="glass-card p-6 group relative"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
            >
              {/* Top accent glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
              />

              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{
                    fontFamily: '"Fira Code", monospace',
                    color: cat.color,
                    backgroundColor: `${cat.color}10`,
                    border: `1px solid ${cat.color}20`,
                  }}
                >
                  {cat.icon}
                </span>
                <h3 className="text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: '"Fira Code", monospace', color: '#ccd6f6' }}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs cursor-default"
                    style={{
                      fontFamily: '"Fira Code", monospace',
                      color: '#ccd6f6',
                      backgroundColor: 'rgba(96,165,250,0.04)',
                      border: '1px solid rgba(96,165,250,0.08)',
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: ci * 0.1 + si * 0.05, type: 'spring', stiffness: 200 }}
                    whileHover={{
                      borderColor: cat.color + '60',
                      backgroundColor: cat.color + '12',
                      color: cat.color,
                      boxShadow: `0 0 15px ${cat.color}15`,
                      y: -3,
                      scale: 1.08,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
