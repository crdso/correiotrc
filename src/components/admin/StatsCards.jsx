import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, DollarSign, Clock, CheckCircle2, Heart } from 'lucide-react';

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = 40;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(decimals ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value, decimals]);

  return (
    <span>
      {prefix}{decimals ? displayed.toFixed(decimals).replace('.', ',') : displayed.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

const cards = (stats) => [
  {
    icon: ShoppingBag,
    label: 'Total de Pedidos',
    value: stats.total,
    color: 'from-violet-500/10 to-violet-500/5',
    iconBg: 'bg-violet-100 text-violet-600',
    border: 'hover:border-violet-200',
    decimals: 0,
  },
  {
    icon: DollarSign,
    label: 'Total Arrecadado',
    value: stats.arrecadado,
    prefix: 'R$ ',
    color: 'from-emerald-500/10 to-emerald-500/5',
    iconBg: 'bg-emerald-100 text-emerald-600',
    border: 'hover:border-emerald-200',
    decimals: 2,
  },
  {
    icon: Clock,
    label: 'Pedidos Pendentes',
    value: stats.pendentes,
    color: 'from-amber-500/10 to-amber-500/5',
    iconBg: 'bg-amber-100 text-amber-600',
    border: 'hover:border-amber-200',
    decimals: 0,
  },
  {
    icon: CheckCircle2,
    label: 'Entregues',
    value: stats.entregues,
    color: 'from-green-500/10 to-green-500/5',
    iconBg: 'bg-green-100 text-green-600',
    border: 'hover:border-green-200',
    decimals: 0,
  },
  {
    icon: Heart,
    label: 'Taxa de Entrega',
    value: stats.total > 0 ? Math.round((stats.entregues / stats.total) * 100) : 0,
    suffix: '%',
    color: 'from-primary/10 to-primary/5',
    iconBg: 'bg-primary/10 text-primary',
    border: 'hover:border-primary/20',
    decimals: 0,
  },
];

export default function StatsCards({ cartinhas }) {
  const stats = useMemo(() => ({
    total: cartinhas.length,
    arrecadado: cartinhas.reduce((sum, c) => sum + (Number(c.valor) || 0), 0),
    pendentes: cartinhas.filter((c) => !c.status || c.status === 'pending').length,
    entregues: cartinhas.filter((c) => c.status === 'delivered').length,
  }), [cartinhas]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {cards(stats).map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${card.color} ${card.border} transition-all duration-300 p-5 cursor-default`}
        >
          {/* Background decoration */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-current opacity-5" />

          <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
            <card.icon size={18} />
          </div>

          <div className="text-2xl font-heading font-bold text-foreground leading-none mb-1">
            <AnimatedNumber
              value={card.value}
              prefix={card.prefix || ''}
              suffix={card.suffix || ''}
              decimals={card.decimals}
            />
          </div>
          <p className="text-xs text-muted-foreground font-medium mt-1">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
}