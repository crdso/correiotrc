import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

// ✏️ EDITE ESTE NÚMERO PARA ATUALIZAR AS ESTATÍSTICAS
const TOTAL_CARTINHAS = 127;

// Partículas flutuantes ao fundo
function Particle({ x, y, delay, size, opacity }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, opacity }}
      animate={{ y: [0, -30, 0], opacity: [opacity, opacity * 2, opacity] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

// Brilhos flutuantes
function Sparkle({ x, y, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-primary"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: 10 + Math.random() * 8 }}
      animate={{ scale: [0, 1, 0], opacity: [0, 0.6, 0], rotate: [0, 180] }}
      transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      ✦
    </motion.div>
  );
}

// Hook para contagem animada
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}


export default function Encerramento() {
  const count = useCountUp(TOTAL_CARTINHAS, 2200);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    size: 3 + Math.random() * 4,
    opacity: 0.06 + Math.random() * 0.1,
  }));

  const sparkles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    delay: Math.random() * 4,
  }));

  return (
    <div
      className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-6 py-20"
      style={{ userSelect: 'none' }}
    >
      {/* Partículas de fundo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => <Particle key={p.id} {...p} />)}
        {sparkles.map((s) => <Sparkle key={s.id} {...s} />)}
      </div>

      {/* Gradiente de fundo suave */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 max-w-2xl w-full mx-auto flex flex-col items-center gap-12 text-center">

        {/* Vídeo + Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
            💌 O Correio Elegante<br className="hidden md:block" />{' '}
            <span className="text-primary italic">chegou ao fim</span>
          </h1>
        </motion.div>

        {/* Subtítulo + Contagem inline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl space-y-3"
        >
          <p>
            Durante esse período,{' '}
            <span className="font-heading font-bold text-primary text-2xl md:text-3xl tabular-nums">
              {count.toLocaleString('pt-BR')}
            </span>{' '}
            mensagens foram enviadas.
          </p>
        </motion.div>

        {/* Banner pedido de rosa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl rounded-2xl border border-primary/20 p-6 flex flex-col items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, hsl(350 96% 43% / 0.06), hsl(38 47% 56% / 0.05))',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="text-2xl">🌹</p>
          <p className="text-foreground text-base md:text-lg font-medium text-center leading-relaxed">
            Ainda aceitamos pedidos de <span className="text-primary font-bold">carta rosa</span> até o dia{' '}
            <span className="text-primary font-bold">09 de junho</span>!
          </p>
          <p className="text-muted-foreground text-sm text-center">
            Aproveite e envie uma rosa para alguém especial antes que encerre de vez. 🌸
          </p>
          <Link to="/envio">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 16px 32px hsl(350 96% 43% / 0.25)' }}
              whileTap={{ scale: 0.97 }}
              className="mt-1 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Send size={15} />
              Enviar pedido de rosa
            </motion.button>
          </Link>
        </motion.div>

        {/* Texto de agradecimento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 max-w-xl"
        >
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Gostaríamos de agradecer a todos que participaram do projeto. Cada cartinha enviada ajudou a transformar a escola em um lugar mais divertido, emocionante e cheio de boas lembranças.
          </p>
          <p className="text-muted-foreground text-base md:text-lg font-medium">
            Obrigado por fazer parte dessa experiência.
          </p>
        </motion.div>

        {/* Divisor */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />

        {/* Frase final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <p className="font-heading italic text-xl md:text-2xl text-foreground/80 leading-relaxed">
            "Algumas mensagens terminam no papel.<br />
            Outras continuam para sempre na memória. ❤️"
          </p>
        </motion.div>

      </div>

      {/* Rodapé */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-20 mt-20 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground/50 text-sm">
          <Heart size={12} className="text-primary/40 fill-primary/40" />
          <span>Correio Elegante TRC • 2026</span>
          <span>dev: cardoso</span>
          <Heart size={12} className="text-primary/40 fill-primary/40" />
        </div>
      </motion.footer>
    </div>
  );
}
