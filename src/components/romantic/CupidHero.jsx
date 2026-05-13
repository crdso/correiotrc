import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

function ArrowProjectile({ onComplete }) {
  return (
    <motion.div
      className="absolute z-20"
      initial={{ left: '30%', top: '40%', opacity: 1, rotate: 15 }}
      animate={{ left: '110%', top: '60%', opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeIn' }}
      onAnimationComplete={onComplete}
    >
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
        <line x1="0" y1="10" x2="50" y2="10" stroke="#C5A059" strokeWidth="2" />
        <polygon points="50,5 60,10 50,15" fill="#C5A059" />
        <line x1="5" y1="5" x2="0" y2="10" stroke="#C5A059" strokeWidth="1.5" />
        <line x1="5" y1="15" x2="0" y2="10" stroke="#C5A059" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}

function HeartExplosion() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    distance: 40 + Math.random() * 60,
  }));

  return (
    <div className="absolute right-0 top-1/2 z-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Heart size={14} className="text-primary fill-primary" />
        </motion.div>
      ))}
    </div>
  );
}

export default function CupidHero() {
  const [showArrow, setShowArrow] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const shootArrow = () => {
      setShowArrow(true);
      setTimeout(() => setShowExplosion(true), 900);
      setTimeout(() => {
        setShowArrow(false);
        setShowExplosion(false);
      }, 2500);
    };

    const interval = setInterval(shootArrow, 5000);
    const timeout = setTimeout(shootArrow, 1500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind cupid */}
      <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute w-48 h-48 rounded-full bg-secondary blur-2xl" />

      {/* Cupid character */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative">
          {/* Wings */}
          <motion.div
            className="absolute -left-12 top-4"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path
                d="M55 40C55 20 35 5 15 15C-5 25 5 55 15 60C25 65 55 60 55 40Z"
                fill="url(#wingGradL)"
                opacity="0.8"
              />
              <defs>
                <linearGradient id="wingGradL" x1="0" y1="0" x2="55" y2="80">
                  <stop stopColor="#C5A059" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#FAD2E1" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <motion.div
            className="absolute -right-12 top-4"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
              <path
                d="M5 40C5 20 25 5 45 15C65 25 55 55 45 60C35 65 5 60 5 40Z"
                fill="url(#wingGradR)"
                opacity="0.8"
              />
              <defs>
                <linearGradient id="wingGradR" x1="60" y1="0" x2="5" y2="80">
                  <stop stopColor="#C5A059" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#FAD2E1" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Body */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg shadow-primary/10 border-2 border-white/60">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-4xl">
              💘
            </div>
          </div>

          {/* Halo */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-16 h-4 rounded-full border-2 border-accent/60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Arrow and Explosion */}
      <AnimatePresence>
        {showArrow && <ArrowProjectile onComplete={() => {}} />}
      </AnimatePresence>
      <AnimatePresence>
        {showExplosion && <HeartExplosion />}
      </AnimatePresence>

      {/* Floating mini hearts around cupid */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${30 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
          }}
        >
          <Heart size={12 + i * 4} className="text-primary/40 fill-primary/20" />
        </motion.div>
      ))}
    </div>
  );
}