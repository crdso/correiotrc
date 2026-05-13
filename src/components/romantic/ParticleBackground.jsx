import React, { useEffect, useRef } from 'react';

const HEART_PATHS = [
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
];

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 12 + 6,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1,
      type: Math.random() > 0.5 ? 'heart' : 'circle',
    });

    for (let i = 0; i < 25; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particlesRef.current.push(p);
    }

    const drawHeart = (ctx, x, y, size, rotation, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(size / 24, size / 24);
      ctx.translate(-12, -12);
      ctx.globalAlpha = opacity;
      
      const path = new Path2D(HEART_PATHS[0]);
      ctx.fillStyle = '#D90429';
      ctx.fill(path);
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -30) {
          particlesRef.current[i] = createParticle();
          return;
        }

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.rotation, p.opacity);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}