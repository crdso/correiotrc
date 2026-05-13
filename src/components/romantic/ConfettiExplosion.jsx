import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiExplosion() {
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#D90429', '#FAD2E1', '#C5A059', '#ff6b81', '#ffeaa7'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}