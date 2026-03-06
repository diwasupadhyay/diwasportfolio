import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTextScramble } from '@/hooks/useTextScramble';

const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Specialization in Big Data Engineering",
    school: "NIIT University, Neemrana",
    period: "2023 - 2027",
  },
];

const extracurricular = [
  {
    role: "Design Core",
    org: "ingeNUity — NIIT University Cultural Fest",
    period: "2025 - 2026",
    description: "Crafted visual branding, social-media assets, and promotional material for the university cultural fest.",
  },
];

const certifications = [
  { name: "Software Engineering", issuer: "JPMorgan Chase & Co.", year: "2024", color: "#60a5fa" },
  { name: "React Development", issuer: "GeeksforGeeks", year: "2024", color: "#60a5fa" },
  { name: "Python Bootcamp", issuer: "Udemy", year: "2023", color: "#60a5fa" },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrambledTitle = useTextScramble('Education', inView, { speed: 50, delay: 200 });

  return (
    <section id="education" className="section-padding px-6 lg:px-0">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}>
            Education
          </p>
          <h2 className="section-heading">
            <span style={{ color: '#60a5fa' }}>{scrambledTitle}</span> & More
          </h2>
          <hr className="section-line" />
        </motion.div>

        {/* Education */}
        <div className="space-y-5 mb-14">
          {education.map((ed, i) => (
            <motion.div
              key={ed.school}
              className="glass-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
            >
              {/* Left accent */}
              <div
                className="absolute top-0 left-0 w-[3px] h-full"
                style={{ background: 'linear-gradient(to bottom, #60a5fa, transparent)' }}
              />
              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }}
              />
              <div className="pl-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-base font-semibold" style={{ color: '#ccd6f6' }}>
                    {ed.degree}
                  </h3>
                  <span
                    className="text-xs tracking-wider shrink-0 px-2 py-0.5 rounded"
                    style={{
                      fontFamily: '"Fira Code", monospace',
                      color: '#60a5fa',
                      backgroundColor: 'rgba(96,165,250,0.06)',
                      border: '1px solid rgba(96,165,250,0.1)',
                    }}
                  >
                    {ed.period}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#60a5fa', fontWeight: 500 }}>{ed.specialization}</p>
                <p className="text-sm mt-1" style={{ color: '#8892b0' }}>{ed.school}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extracurricular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-14"
        >
          <h3
            className="text-sm font-semibold mb-5 flex items-center gap-3 uppercase tracking-[0.15em]"
            style={{ color: '#8892b0', fontFamily: '"Fira Code", monospace' }}
          >
            <span className="w-6 h-[1px]" style={{ background: '#60a5fa' }} />
            Extracurricular
          </h3>
          {extracurricular.map((ec, i) => (
            <motion.div
              key={ec.role}
              className="glass-card p-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)' }}
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <h4 className="text-sm font-semibold" style={{ color: '#ccd6f6' }}>
                  {ec.role}
                </h4>
                <span
                  className="text-xs tracking-wider shrink-0"
                  style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}
                >
                  {ec.period}
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: '#60a5fa' }}>{ec.org}</p>
              <p className="text-sm" style={{ color: '#8892b0' }}>{ec.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h3
            className="text-sm font-semibold mb-5 flex items-center gap-3 uppercase tracking-[0.15em]"
            style={{ color: '#8892b0', fontFamily: '"Fira Code", monospace' }}
          >
            <span className="w-6 h-[1px]" style={{ background: '#60a5fa' }} />
            Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="glass-card p-5 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
                />
                <p className="text-sm font-semibold mb-1" style={{ color: '#ccd6f6' }}>
                  {cert.name}
                </p>
                <p className="text-xs" style={{ color: '#8892b0' }}>
                  {cert.issuer}
                </p>
                <span
                  className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded"
                  style={{
                    fontFamily: '"Fira Code", monospace',
                    color: cert.color,
                    backgroundColor: `${cert.color}08`,
                    border: `1px solid ${cert.color}15`,
                  }}
                >
                  {cert.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
