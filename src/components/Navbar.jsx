import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ show }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  if (!show) return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.645, 0.045, 0.355, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[70px] px-6 lg:px-16 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(5, 13, 26, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(96,165,250,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <a href="#" className="relative z-10 group">
          <span
            className="text-xl font-bold tracking-tight transition-all duration-300 group-hover:tracking-wider"
            style={{ fontFamily: '"Syne", sans-serif' }}
          >
            <span style={{ color: '#60a5fa' }}>diwas</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="px-4 py-2 text-sm rounded-lg transition-all duration-300 relative group"
              style={{ fontFamily: '"Inter", sans-serif', color: '#8892b0', fontWeight: 500 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e6f1ff';
                e.currentTarget.style.backgroundColor = 'rgba(96,165,250,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8892b0';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="/diwasresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="ml-3 px-5 py-2 text-xs rounded-lg transition-all duration-300 animate-border-glow"
            style={{
              fontFamily: '"Fira Code", monospace',
              color: '#60a5fa',
              border: '1px solid rgba(96,165,250,0.3)',
              backgroundColor: 'rgba(96,165,250,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(96,165,250,0.15)';
              e.currentTarget.style.borderColor = '#60a5fa';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(96,165,250,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(96,165,250,0.05)';
              e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Resume
          </motion.a>
        </nav>

        <button
          className="md:hidden relative z-10 p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'rgba(96,165,250,0.05)', border: 'none', color: '#60a5fa' }}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center md:hidden"
            style={{ backgroundColor: 'rgba(5, 13, 26, 0.97)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.08 }}
                  className="text-2xl font-semibold"
                  style={{ color: '#60a5fa', fontFamily: '"Syne", sans-serif' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <a href="/diwasresume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4" onClick={() => setMenuOpen(false)}>
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
