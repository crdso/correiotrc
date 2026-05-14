import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Home, Send } from 'lucide-react';
import ConfettiExplosion from '../components/romantic/ConfettiExplosion';
import FloatingHearts from '../components/romantic/FloatingHearts';
import ParticleBackground from '../components/romantic/ParticleBackground';

export default function Sucesso() {
  useEffect(() => {
    document.title = 'Cartinha enviada!';
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center px-6">
      <ParticleBackground />
      <FloatingHearts count={10} />
      <ConfettiExplosion />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
        className="relative z-10 text-center max-w-lg mx-auto"
      >
        {/* Glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl scale-150" />

        {/* Ícone animado */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-6 block"
        >
          💌
        </motion.div>

        {/* Corações orbitando */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: '10%', left: '50%' }}
            animate={{
              rotate: [i * 120, i * 120 + 360],
              x: [Math.cos((i * 120 * Math.PI) / 180) * 80, Math.cos(((i * 120 + 360) * Math.PI) / 180) * 80],
              y: [Math.sin((i * 120 * Math.PI) / 180) * 80, Math.sin(((i * 120 + 360) * Math.PI) / 180) * 80],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear' }}
          >
            <Heart size={10 + i * 4} className="text-primary/40 fill-primary/20" />
          </motion.div>
        ))}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
        >
          Seu correio do amor
          <br />
          <span className="text-primary italic">foi enviado!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-muted-foreground text-lg leading-relaxed mb-8"
        >
          Após a confirmação do pagamento, sua cartinha será preparada com todo carinho e entregue pessoalmente. 🫶
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 16px 32px rgba(217,4,41,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Home size={16} />
              Voltar ao início
            </motion.button>
          </Link>
          <Link to="/envio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-accent/40 text-accent rounded-full font-medium flex items-center gap-2 hover:bg-accent/5 transition-colors"
            >
              <Send size={16} />
              Enviar outra cartinha
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
