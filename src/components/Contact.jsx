import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ======================== CONTACT ======================== */
const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className="section-padding px-6 lg:px-0 pb-8 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent 60%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-[520px] mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase mb-3"
            style={{ fontFamily: '"Fira Code", monospace', color: '#60a5fa' }}
          >
            Contact
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: '"Syne", sans-serif', color: '#ccd6f6' }}
          >
            Let's Build Something{' '}
            <span style={{ color: '#60a5fa' }}>Together</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: '#8892b0' }}>
            I'm currently open to internship and freelance opportunities. Whether you have a question,
            a project idea, or just want to say hi — my inbox is always open.
          </p>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&to=diwasupadhyay15@gmail.com&su=Hello%20Diwas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

/* ======================== CAT WOOL GAME ======================== */
const CatWoolGame = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const catPos = useRef({ x: 100, y: 100 });
  const catVel = useRef({ vx: 0, vy: 0 });
  const woolPos = useRef({ x: 240, y: 100 });
  const woolVel = useRef({ vx: 0, vy: 0 });
  const dragging = useRef(false);
  const mousePos = useRef({ x: 240, y: 100 });
  const animRef = useRef(null);
  const trail = useRef([]);
  const lastBat = useRef(0);
  const petting = useRef({ active: false, timer: 0 });
  const idleState = useRef({ action: 'none', timer: 0, next: 3000 + Math.random() * 4000 });
  const walkPhase = useRef(0);
  const lastFrame = useRef(Date.now());

  const W = 380, H = 200;

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (dragging.current) {
      woolPos.current.x = Math.min(Math.max(mousePos.current.x, 15), W - 15);
      woolPos.current.y = Math.min(Math.max(mousePos.current.y, 15), H - 25);
      woolVel.current.vx = 0;
      woolVel.current.vy = 0;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    mousePos.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    if (dragging.current) {
      woolPos.current.x = Math.min(Math.max(mousePos.current.x, 15), W - 15);
      woolPos.current.y = Math.min(Math.max(mousePos.current.y, 15), H - 25);
    }
  }, []);

  const handleDown = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    // Check yarn first
    if (Math.hypot(mx - woolPos.current.x, my - woolPos.current.y) < 25) {
      dragging.current = true;
      return;
    }
    // Check cat — pet it!
    const cat = catPos.current;
    if (Math.hypot(mx - cat.x, my - cat.y) < 35) {
      petting.current = { active: true, timer: Date.now() };
    }
  }, []);

  const handleUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      woolVel.current.vx = (Math.random() - 0.5) * 5;
      woolVel.current.vy = (Math.random() - 0.5) * 4;
    }
    petting.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawCat = (x, y, facing, speed, dist, isPetted, idle, dt) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(facing, 1);

      const t = Date.now();
      const isMoving = speed > 0.3;
      const isReaching = dist < 40 && !isPetted;

      // -- Animations -- (walk phase accumulated smoothly)
      if (isMoving) walkPhase.current += dt * 0.008 * Math.min(speed, 3);
      const runCycle = isMoving ? Math.sin(walkPhase.current) : 0;
      const bob = isMoving ? runCycle * Math.min(speed, 2) * 1.2 : 0;
      const bodyTilt = isMoving ? Math.sin(walkPhase.current * 0.5) * 0.03 : 0;
      const breathe = Math.sin(t / 800) * 0.5;
      const tailSpeed = isReaching ? 150 : isPetted ? 120 : 350;
      const tailSwing = Math.sin(t / tailSpeed) * (isReaching ? 18 : isPetted ? 20 : 10);
      const tailCurl = Math.cos(t / (tailSpeed * 1.3)) * 5;
      const blink = Math.sin(t / 3000) > 0.92;
      const earTwitch = Math.sin(t / 1800) > 0.9 ? Math.sin(t / 60) * 2 : 0;

      // Petting squish
      const petSquish = isPetted ? 1 + Math.sin(t / 100) * 0.04 : 1;
      const headTiltPet = isPetted ? Math.sin(t / 200) * 0.15 : 0;

      // Idle behaviors
      const isYawning = idle === 'yawn';
      const isStretching = idle === 'stretch';
      const isHeadTilt = idle === 'tilt';
      const idleHeadTilt = isHeadTilt ? Math.sin(t / 300) * 0.2 : 0;

      ctx.translate(0, bob);
      ctx.rotate(bodyTilt);

      // Ground shadow
      ctx.fillStyle = 'rgba(96,165,250,0.07)';
      ctx.beginPath();
      ctx.ellipse(2, 27 - bob, 18, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail — smooth bezier
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-13, 4);
      ctx.bezierCurveTo(
        -22, -4 + tailSwing * 0.3,
        -28 + tailCurl, -16 + tailSwing * 0.7,
        -20 + tailCurl * 0.5, -24 + tailSwing
      );
      ctx.stroke();
      ctx.fillStyle = 'rgba(96,165,250,0.4)';
      ctx.beginPath();
      ctx.arc(-20 + tailCurl * 0.5, -24 + tailSwing, 2, 0, Math.PI * 2);
      ctx.fill();

      // -- LEGS --
      const stride = isMoving ? Math.min(speed, 2.5) : 0;
      const wp = walkPhase.current;
      const legFL = Math.sin(wp) * stride * 3;
      const legFR = Math.sin(wp + Math.PI) * stride * 3;
      const legBL = Math.sin(wp + Math.PI) * stride * 2.5;
      const legBR = Math.sin(wp) * stride * 2.5;

      // Stretching: front legs forward, back arched
      const stretchOff = isStretching ? Math.sin(t / 400) * 4 : 0;

      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      // Back legs
      ctx.beginPath();
      ctx.moveTo(-5, 15);
      ctx.quadraticCurveTo(-7 + legBL * 0.3, 20 - Math.max(0, -legBL) * 1.5, -6 + legBL, 25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 15);
      ctx.quadraticCurveTo(2 + legBR * 0.3, 20 - Math.max(0, -legBR) * 1.5, 1 + legBR, 25);
      ctx.stroke();
      // Back paws
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.ellipse(-6 + legBL, 25.5, 3, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(1 + legBR, 25.5, 3, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.shadowColor = 'rgba(96,165,250,0.15)';
      ctx.shadowBlur = 12;
      const bodyGrad = ctx.createRadialGradient(3, 5, 4, 3, 5, 17);
      bodyGrad.addColorStop(0, 'rgba(120,180,255,0.92)');
      bodyGrad.addColorStop(0.6, 'rgba(96,165,250,0.88)');
      bodyGrad.addColorStop(1, 'rgba(59,130,246,0.65)');
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(3, 6 + breathe - stretchOff * 0.3, 15 * petSquish, (11 + breathe) / petSquish, isStretching ? -0.1 : -0.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Belly highlight
      ctx.fillStyle = 'rgba(186,220,255,0.2)';
      ctx.beginPath();
      ctx.ellipse(6, 9, 6, 5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Front legs — right leg reaches toward yarn when close
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2.5;
      if (isReaching) {
        // Left front leg stays planted
        ctx.beginPath();
        ctx.moveTo(10, 14);
        ctx.quadraticCurveTo(9, 19, 9, 25);
        ctx.stroke();
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.ellipse(9, 25.5, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Right front leg reaches forward and up
        const reachAnim = Math.sin(t / 120) * 3;
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(14, 13);
        ctx.quadraticCurveTo(22, 6 + reachAnim, 28, 4 + reachAnim);
        ctx.stroke();
        // Paw at end of reach
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.ellipse(28, 4 + reachAnim, 3.5, 2.5, 0.4, 0, Math.PI * 2);
        ctx.fill();
        // Toe beans
        ctx.fillStyle = 'rgba(191,219,254,0.5)';
        ctx.beginPath(); ctx.arc(29, 2.5 + reachAnim, 0.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(30.5, 3.5 + reachAnim, 0.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(29.5, 5.5 + reachAnim, 0.8, 0, Math.PI * 2); ctx.fill();
      } else {
        // Normal walking front legs
        ctx.beginPath();
        ctx.moveTo(10, 14);
        ctx.quadraticCurveTo(9 + legFL * 0.3, 19 - Math.max(0, -legFL) * 1.5, 9 + legFL + stretchOff, 25);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(14, 13);
        ctx.quadraticCurveTo(15 + legFR * 0.3, 18 - Math.max(0, -legFR) * 1.5, 15 + legFR + stretchOff, 25);
        ctx.stroke();
        // Front paws
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.ellipse(9 + legFL + stretchOff, 25.5, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(15 + legFR + stretchOff, 25.5, 3, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Head
      ctx.save();
      ctx.translate(20, -4);
      ctx.rotate(headTiltPet + idleHeadTilt);
      ctx.translate(-20, 4);

      ctx.shadowColor = 'rgba(96,165,250,0.3)';
      ctx.shadowBlur = 8;
      const headGrad = ctx.createRadialGradient(20, -5, 3, 20, -3, 11);
      headGrad.addColorStop(0, '#a5d0ff');
      headGrad.addColorStop(0.5, '#78b4ff');
      headGrad.addColorStop(1, '#60a5fa');
      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.ellipse(20, -4, 10, 9.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cheek blush when petted
      if (isPetted) {
        ctx.fillStyle = 'rgba(244,114,182,0.15)';
        ctx.beginPath();
        ctx.ellipse(13, 0, 3.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(27, 0, 3.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Normal cheek puffs
        ctx.fillStyle = 'rgba(186,220,255,0.15)';
        ctx.beginPath();
        ctx.ellipse(13, -1, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(27, -1, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ears
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.moveTo(13, -10);
      ctx.lineTo(13 + earTwitch * 0.5, -22 + earTwitch);
      ctx.lineTo(20, -11);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(22, -11);
      ctx.lineTo(27 - earTwitch * 0.3, -22 + earTwitch * 0.6);
      ctx.lineTo(28, -10);
      ctx.closePath();
      ctx.fill();
      // Inner ears
      ctx.fillStyle = 'rgba(186,220,255,0.4)';
      ctx.beginPath();
      ctx.moveTo(15, -11);
      ctx.lineTo(15 + earTwitch * 0.4, -19 + earTwitch);
      ctx.lineTo(19, -11.5);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(23, -11.5);
      ctx.lineTo(26 - earTwitch * 0.2, -19 + earTwitch * 0.6);
      ctx.lineTo(27, -11);
      ctx.closePath();
      ctx.fill();

      // Eyes
      if (isPetted) {
        // Happy squint eyes ^_^
        ctx.strokeStyle = '#dbeafe';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(16, -5, 2.5, Math.PI + 0.3, -0.3);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(24, -5, 2.5, Math.PI + 0.3, -0.3);
        ctx.stroke();
      } else if (blink || isYawning) {
        ctx.strokeStyle = '#dbeafe';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(16, -5, 2.5, 0.2, Math.PI - 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(24, -5, 2.5, 0.2, Math.PI - 0.2);
        ctx.stroke();
      } else {
        // Open eyes
        ctx.fillStyle = '#e8f4ff';
        ctx.beginPath(); ctx.ellipse(16, -5, 3.5, 3.8, -0.05, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(24, -5, 3.5, 3.8, 0.05, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1e3a5f';
        ctx.beginPath(); ctx.ellipse(16.5, -4.8, 2.2, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(24.5, -4.8, 2.2, 3, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#020817';
        ctx.beginPath(); ctx.ellipse(16.5, -4.8, 1, 2.4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(24.5, -4.8, 1, 2.4, 0, 0, Math.PI * 2); ctx.fill();
        // Sparkles
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.beginPath(); ctx.arc(15.3, -6.5, 1.3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(23.3, -6.5, 1.3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath(); ctx.arc(17.8, -3, 0.7, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(25.8, -3, 0.7, 0, Math.PI * 2); ctx.fill();
      }

      // Nose
      ctx.fillStyle = '#bfdbfe';
      ctx.beginPath();
      ctx.moveTo(20.5, -0.5);
      ctx.quadraticCurveTo(19, 1.5, 18.5, 0.8);
      ctx.quadraticCurveTo(20.5, 0.2, 22, 0.8);
      ctx.quadraticCurveTo(21.5, 1.5, 20.5, -0.5);
      ctx.fill();

      // Mouth
      if (isYawning) {
        // Open yawn mouth
        ctx.fillStyle = 'rgba(191,219,254,0.25)';
        const yawnOpen = Math.sin(t / 300) * 1.5 + 2;
        ctx.beginPath();
        ctx.ellipse(20.5, 2.5 + yawnOpen * 0.3, 3, yawnOpen, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tiny tongue
        ctx.fillStyle = 'rgba(244,114,182,0.4)';
        ctx.beginPath();
        ctx.ellipse(20.5, 3 + yawnOpen * 0.5, 1.5, 1, 0, 0, Math.PI);
        ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(191,219,254,0.5)';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(20.5, 1.2); ctx.lineTo(20.5, 2.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20.5, 2.5); ctx.quadraticCurveTo(18, 4, 16.5, 2.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20.5, 2.5); ctx.quadraticCurveTo(23, 4, 24.5, 2.5); ctx.stroke();
      }

      // Whiskers
      ctx.strokeStyle = 'rgba(191,219,254,0.3)';
      ctx.lineWidth = 0.6;
      const wh = [[-1, -0.6], [0, 0.4], [1, 1.4]];
      for (const [i, dy] of wh) {
        ctx.beginPath();
        ctx.moveTo(27.5, 0.5 + i * 2.8);
        ctx.quadraticCurveTo(32, dy + i * 2.2, 37, -0.5 + i * 3.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(13, 0.5 + i * 2.8);
        ctx.quadraticCurveTo(8, dy + i * 2.2, 3, -0.5 + i * 3.2);
        ctx.stroke();
      }

      ctx.restore(); // head tilt
      ctx.restore(); // main cat transform

      // Petting effects — drawn in world space so text isn't mirrored
      if (isPetted) {
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#f472b6';
        const drawHeart = (hx, hy, s) => {
          ctx.beginPath();
          ctx.moveTo(hx, hy + s);
          ctx.bezierCurveTo(hx - s, hy - s * 0.5, hx - s * 0.2, hy - s * 1.5, hx, hy - s * 0.6);
          ctx.bezierCurveTo(hx + s * 0.2, hy - s * 1.5, hx + s, hy - s * 0.5, hx, hy + s);
          ctx.fill();
        };
        const pt = (t - petting.current.timer) / 400;
        drawHeart(5, -22 - Math.min(pt * 8, 20) + Math.sin(t / 200) * 2, 3.5);
        drawHeart(-10, -18 - Math.min(pt * 6, 15) + Math.cos(t / 250) * 2, 2.5);
        if (pt > 1) drawHeart(15, -15 - Math.min((pt - 1) * 7, 18) + Math.sin(t / 180) * 2, 3);
        ctx.globalAlpha = 1;

        // "purr~" text — always readable
        ctx.fillStyle = 'rgba(244,114,182,0.5)';
        ctx.font = '9px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('purr~', 0, -35 - Math.sin(t / 300) * 3);
        ctx.restore();
      }

      // Hearts when catching yarn (not petted)
      if (dist < 20 && !isPetted) {
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#f472b6';
        const drawHeart = (hx, hy, s) => {
          ctx.beginPath();
          ctx.moveTo(hx, hy + s);
          ctx.bezierCurveTo(hx - s, hy - s * 0.5, hx - s * 0.2, hy - s * 1.5, hx, hy - s * 0.6);
          ctx.bezierCurveTo(hx + s * 0.2, hy - s * 1.5, hx + s, hy - s * 0.5, hx, hy + s);
          ctx.fill();
        };
        drawHeart(8, -20 + Math.sin(t / 200) * 3, 3.5);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    };

    /* Draw yarn ball */
    const drawYarn = (x, y) => {
      ctx.save();
      ctx.translate(x, y);

      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.beginPath();
      ctx.ellipse(1, 12, 10, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      const r = 10;
      const grad = ctx.createRadialGradient(-2, -3, 2, 0, 0, r);
      grad.addColorStop(0, '#ff8fa0');
      grad.addColorStop(0.5, '#e8607a');
      grad.addColorStop(1, '#c44060');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,200,210,0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const a = (Date.now() / 600 + i * 1.2) % (Math.PI * 2);
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.65, a, a + 0.9);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(255,180,190,0.3)';
      for (let i = 0; i < 3; i++) {
        const a = (Date.now() / 900 + i * 2) % (Math.PI * 2);
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.4, a, a + 1.5);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.beginPath();
      ctx.arc(-3, -4, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      const cat = catPos.current;
      const cv = catVel.current;
      const wool = woolPos.current;
      const wv = woolVel.current;
      const now = Date.now();
      const dt = now - lastFrame.current;
      lastFrame.current = now;
      const isPetted = petting.current.active;

      // Wool physics
      if (!dragging.current) {
        wv.vx *= 0.985;
        wv.vy *= 0.985;
        wool.x += wv.vx;
        wool.y += wv.vy;
        if (wool.x < 15) { wool.x = 15; wv.vx *= -0.5; }
        if (wool.x > W - 15) { wool.x = W - 15; wv.vx *= -0.5; }
        if (wool.y < 20) { wool.y = 20; wv.vy *= -0.5; }
        if (wool.y > H - 25) { wool.y = H - 25; wv.vy *= -0.5; }
      }

      // Trail
      trail.current.push({ x: wool.x, y: wool.y });
      if (trail.current.length > 30) trail.current.shift();

      if (trail.current.length > 1) {
        const pts = trail.current;
        ctx.strokeStyle = 'rgba(232,96,122,0.15)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }

      // Cat movement — pauses when petted
      const dx = wool.x - cat.x;
      const dy = wool.y - cat.y;
      const dist = Math.hypot(dx, dy);

      if (!isPetted) {
        const chaseForce = dist > 80 ? 0.08 : dist > 30 ? 0.04 : 0.008;
        const nd = dist > 0.1 ? 1 / dist : 0;
        cv.vx += dx * nd * chaseForce * dist * 0.03;
        cv.vy += dy * nd * chaseForce * dist * 0.03;
        const friction = dist < 30 ? 0.88 : 0.93;
        cv.vx *= friction;
        cv.vy *= friction;
      } else {
        cv.vx *= 0.8;
        cv.vy *= 0.8;
      }
      cat.x += cv.vx;
      cat.y += cv.vy;
      cat.x = Math.max(30, Math.min(W - 30, cat.x));
      cat.y = Math.max(30, Math.min(H - 30, cat.y));

      const catSpeed = Math.hypot(cv.vx, cv.vy);
      const facing = dx > 0 ? 1 : -1;

      // Bat wool
      if (dist < 30 && !dragging.current && !isPetted && now - lastBat.current > 500) {
        lastBat.current = now;
        wv.vx += (Math.random() - 0.5) * 6;
        wv.vy += (Math.random() - 0.5) * 4 - 1;
      }

      // Idle behavior when not moving and not petted
      const idle = idleState.current;
      if (catSpeed < 0.3 && !isPetted) {
        idle.timer += 16;
        if (idle.timer > idle.next && idle.action === 'none') {
          const actions = ['yawn', 'stretch', 'tilt', 'tilt'];
          idle.action = actions[Math.floor(Math.random() * actions.length)];
          idle.timer = 0;
          idle.next = 1500 + Math.random() * 1000;
        } else if (idle.timer > idle.next && idle.action !== 'none') {
          idle.action = 'none';
          idle.timer = 0;
          idle.next = 3000 + Math.random() * 4000;
        }
      } else {
        idle.action = 'none';
        idle.timer = 0;
      }

      // Draw
      drawYarn(wool.x, wool.y);
      drawCat(cat.x, cat.y, facing, catSpeed, dist, isPetted, idle.action, dt);

      // Instruction text
      ctx.fillStyle = 'rgba(96,165,250,0.18)';
      ctx.font = '10px "Fira Code", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(isPetted ? 'purr purr purr...' : 'drag the yarn \u2022 click the cat to pet', W / 2, H - 6);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto mb-6 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{
        width: W,
        height: H,
        position: 'relative',
        border: '1px solid rgba(96,165,250,0.1)',
        background: 'rgba(5,13,26,0.6)',
        touchAction: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleDown}
      onTouchEnd={handleUp}
    >
      <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block' }} />
    </div>
  );
};

/* ======================== FOOTER ======================== */
const Footer = () => (
  <footer className="pb-10 pt-20 text-center">
    <CatWoolGame />
    <p
      className="select-none cursor-default"
      style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '11px',
        color: '#2a3f5f',
        letterSpacing: '2px',
        transition: 'color 0.5s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#2a3f5f')}
      title="try pressing these arrow keys..."
    >
      psst... try pressing ↑ ↑ ↓ ↓ ← → ← → for a surprise
    </p>
  </footer>
);

export { Contact, Footer };
