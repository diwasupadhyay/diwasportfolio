import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const socials = [
  { icon: FiGithub, href: 'https://github.com/diwasupadhyay', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/diwasupadhyay', label: 'LinkedIn' },
  { icon: FiMail, href: 'https://mail.google.com/mail/?view=cm&to=diwasupadhyay15@gmail.com&su=Hello%20Diwas', label: 'Email' },
];

const Sidebars = ({ show }) => {
  if (!show) return null;

  return (
    <>
      {/* Left — socials */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-0 left-8 z-30 hidden lg:flex flex-col items-center gap-4"
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
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
            <Icon size={18} />
          </a>
        ))}
        <div className="w-px h-20 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.3), transparent)' }} />
      </motion.div>

      {/* Right — email */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-0 right-8 z-30 hidden lg:flex flex-col items-center gap-4"
      >
        <a
          href="https://mail.google.com/mail/?view=cm&to=diwasupadhyay15@gmail.com&su=Hello%20Diwas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-[0.15em] transition-all duration-300 hover:-translate-y-1"
          style={{
            writingMode: 'vertical-rl',
            fontFamily: '"Fira Code", monospace',
            color: '#6b7a99',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#60a5fa';
            e.currentTarget.style.textShadow = '0 0 10px rgba(96,165,250,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6b7a99';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          diwasupadhyay15@gmail.com
        </a>
        <div className="w-px h-20 mt-2" style={{ background: 'linear-gradient(to bottom, rgba(96,165,250,0.3), transparent)' }} />
      </motion.div>
    </>
  );
};

export default Sidebars;
