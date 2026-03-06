import { useState, useEffect, useCallback, useRef } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
];

const captions = [
  "git commit -m 'meow'",
  'knocks your code off the desk',
  '404: sleep not found',
  'npm install catnip',
  'sudo rm -rf /hairball',
  'console.log("purrrr")',
  'while(true) { nap(); }',
  'segfault: belly rub overflow',
  'cat /dev/random',
  ':wq! *knocks laptop*',
  'docker run --rm cat',
  'curl localhost:3000/fish',
];

const SPLAT_COUNT = 15;
const DISPLAY_TIME = 12000;

const getCatUrl = (i) => `https://cataas.com/cat?width=200&height=200&t=${i}`;

/* Pick a random off-screen origin edge */
const getThrowOrigin = () => {
  const edge = Math.floor(Math.random() * 4);
  switch (edge) {
    case 0: return { ox: `${20 + Math.random() * 60}vw`, oy: '-20vh' };   // top
    case 1: return { ox: '120vw', oy: `${20 + Math.random() * 60}vh` };   // right
    case 2: return { ox: `${20 + Math.random() * 60}vw`, oy: '120vh' };   // bottom
    default: return { ox: '-20vw', oy: `${20 + Math.random() * 60}vh` };  // left
  }
};

const generateSplats = (ts) =>
  Array.from({ length: SPLAT_COUNT }, (_, i) => {
    const { ox, oy } = getThrowOrigin();
    return {
      id: `${ts}-${i}`,
      url: getCatUrl(`${ts}-${i}`),
      x: 5 + Math.random() * 85,
      y: 5 + Math.random() * 80,
      ox, oy,
      rotation: -35 + Math.random() * 70,
      spinFrom: Math.random() * 720 - 360,
      size: 100 + Math.random() * 80,
      delay: i * 100,
      caption: Math.random() < 0.4
        ? captions[Math.floor(Math.random() * captions.length)]
        : null,
    };
  });

const KonamiCatShower = () => {
  const [active, setActive] = useState(false);
  const [landed, setLanded] = useState(false);
  const [splats, setSplats] = useState([]);
  const bufferRef = useRef([]);
  const lockRef = useRef(false);
  const timerRef = useRef(null);

  const spawn = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;

    const generated = generateSplats(Date.now());
    setSplats(generated);
    setLanded(false);
    setActive(true);

    // After all cats have landed (last delay + travel time)
    setTimeout(() => setLanded(true), SPLAT_COUNT * 100 + 600);

    timerRef.current = setTimeout(() => {
      setActive(false);
      setTimeout(() => {
        setSplats([]);
        setLanded(false);
        lockRef.current = false;
      }, 800);
    }, DISPLAY_TIME);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      bufferRef.current.push(e.key);
      if (bufferRef.current.length > KONAMI.length) {
        bufferRef.current = bufferRef.current.slice(-KONAMI.length);
      }
      if (
        bufferRef.current.length === KONAMI.length &&
        bufferRef.current.every((k, i) => k === KONAMI[i])
      ) {
        bufferRef.current = [];
        spawn();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [spawn]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (splats.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        pointerEvents: active ? 'auto' : 'none',
        cursor: active ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (active) {
          if (timerRef.current) clearTimeout(timerRef.current);
          setActive(false);
          setTimeout(() => { setSplats([]); setLanded(false); lockRef.current = false; }, 800);
        }
      }}
    >
      {/* Dim overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: active ? 'rgba(5,13,26,0.55)' : 'rgba(5,13,26,0)',
          transition: 'background 0.6s ease',
          zIndex: -1,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'fixed',
          top: 30,
          left: '50%',
          transform: `translateX(-50%) translateY(${active ? '0' : '-40px'})`,
          opacity: active ? 1 : 0,
          transition: 'all 0.5s ease 0.3s',
          fontFamily: '"Fira Code", monospace',
          fontSize: 20,
          color: '#60a5fa',
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(96,165,250,0.5)',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        🐱 meow! you found the secret!
      </div>

      {/* Splat cats — thrown from edges */}
      {splats.map((splat) => {
        const animName = `throw-${splat.id}`;
        return (
          <div key={splat.id}>
            <style>{`
              @keyframes ${CSS.escape(animName)} {
                0% {
                  left: ${splat.ox};
                  top: ${splat.oy};
                  transform: rotate(${splat.spinFrom}deg) scale(0.5);
                  opacity: 1;
                }
                70% {
                  transform: rotate(${splat.rotation + 10}deg) scale(1.1);
                }
                100% {
                  left: ${splat.x}%;
                  top: ${splat.y}%;
                  transform: rotate(${splat.rotation}deg) scale(1);
                  opacity: 1;
                }
              }
            `}</style>
            <div
              style={{
                position: 'fixed',
                left: active ? `${splat.x}%` : splat.ox,
                top: active ? `${splat.y}%` : splat.oy,
                opacity: active ? 1 : 0,
                transform: `rotate(${splat.rotation}deg) scale(1)`,
                animation: active
                  ? `${animName} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${splat.delay}ms both`
                  : 'none',
                transition: active ? 'none' : 'opacity 0.6s ease',
                zIndex: 1,
              }}
            >
              {/* Paint splatter glow */}
              {landed && (
                <div
                  style={{
                    position: 'absolute',
                    inset: -14,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(96,165,250,0.15) 30%, transparent 70%)',
                    filter: 'blur(10px)',
                    animation: 'splatPulse 3s ease-in-out infinite',
                  }}
                />
              )}
              <img
                src={splat.url}
                alt="cat"
                loading="eager"
                onError={(e) => {
                  if (!e.target.dataset.retried) {
                    e.target.dataset.retried = '1';
                    e.target.src = `https://placekitten.com/${140 + (parseInt(splat.id.split('-')[1]) || 0) * 5}/${140}`;
                  }
                }}
                style={{
                  width: splat.size,
                  height: splat.size,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid rgba(96,165,250,0.25)',
                  boxShadow: '0 0 20px rgba(96,165,250,0.25), 0 8px 32px rgba(0,0,0,0.5)',
                  position: 'relative',
                }}
              />
              {splat.caption && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -22,
                    left: '50%',
                    transform: `translateX(-50%) rotate(${-splat.rotation}deg)`,
                    fontFamily: '"Fira Code", monospace',
                    fontSize: 10,
                    color: '#60a5fa',
                    background: 'rgba(5,13,26,0.95)',
                    padding: '3px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(96,165,250,0.15)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    opacity: landed ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {splat.caption}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Dismiss hint */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: active ? 0.5 : 0,
          transition: 'opacity 0.5s ease 2s',
          fontFamily: '"Fira Code", monospace',
          fontSize: 11,
          color: '#8892b0',
          letterSpacing: '0.05em',
          zIndex: 2,
        }}
      >
        click anywhere to dismiss
      </div>
    </div>
  );
};

export default KonamiCatShower;
