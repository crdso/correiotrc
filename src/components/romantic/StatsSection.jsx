import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Send, Smile, Star } from 'lucide-react';

const stats = [
  { icon: Send, label: 'Cartinhas enviadas', target: 2847, suffix: '+' },
  { icon: Heart, label: 'Corações flechados', target: 1923, suffix: '' },
  { icon: Smile, label: 'Sorrisos causados', target: 4210, suffix: '+' },
  { icon: Star, label: 'Avaliação média', target: 4.9, suffix: '⭐', isDecimal: true },
];

function AnimatedCounter({ target, suffix, isDecimal }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, isDecimal]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-foreground">
      {isDecimal ? count.toFixed(1) : count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/30 to-accent/5 border border-border/30 p-10 md:p-14"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <stat.icon size={22} className="text-primary mx-auto mb-3" />
                <AnimatedCounter target={stat.target} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}