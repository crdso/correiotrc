import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function FloatingHearts({ count = 8 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 6,
    size: Math.random() * 16 + 10,
    opacity: Math.random() * 0.15 + 0.05,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.x}%`, bottom: -30 }}
          animate={{
            y: [0, -window.innerHeight - 60],
            x: [0, Math.sin(heart.id) * 40, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          <Heart
            size={heart.size}
            className="text-primary fill-primary"
            style={{ opacity: heart.opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
}