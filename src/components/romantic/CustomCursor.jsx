import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => {
      setClicking(true);
      const id = Date.now();
      setHearts((prev) => [...prev, { id, x: pos.x, y: pos.y }]);
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 900);
    };
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [pos.x, pos.y]);

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: clicking ? 0.6 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.3 }}
      >
        <div className="w-3 h-3 rounded-full bg-primary/60" />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: clicking ? 1.4 : 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.5 }}
      >
        <div className="w-9 h-9 rounded-full border border-primary/20" />
      </motion.div>

      {/* Click hearts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="fixed pointer-events-none z-[9999] text-primary/60 text-xs select-none"
            initial={{ x: h.x - 6, y: h.y - 6, opacity: 1, scale: 1 }}
            animate={{ y: h.y - 40, opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}