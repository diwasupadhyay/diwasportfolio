import { useState, useEffect, useRef, useCallback } from 'react';

const chars = '01!@#$%&*<>{}[]=/\\|_-+~^;:.,?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Text scramble/decode effect. When triggered, the text "decodes" from random
 * characters into the final value character by character.
 *
 * @param {string} text - The final text to reveal
 * @param {boolean} trigger - When true (and we haven't revealed yet), run the effect
 * @param {object} options - { speed, delay }
 */
export function useTextScramble(text, trigger, options = {}) {
  const { speed = 40, delay = 0 } = options;
  const [display, setDisplay] = useState(text);
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    let frame = 0;
    const totalFrames = text.length;
    const interval = setInterval(() => {
      const revealed = text.slice(0, frame);
      const scrambled = Array.from({ length: text.length - frame }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
      setDisplay(revealed + scrambled);
      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (trigger && !hasRun.current) {
      hasRun.current = true;
      const timeout = setTimeout(scramble, delay);
      return () => clearTimeout(timeout);
    }
  }, [trigger, scramble, delay]);

  return display;
}
