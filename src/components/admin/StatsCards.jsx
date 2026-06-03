import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, DollarSign, Clock, CheckCircle2, Heart, Eye, EyeOff, TrendingUp } from 'lucide-react';

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

export default function StatsCards({ cartinhas, gastos = [] }) {
  const [showLucro, setShowLucro] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const stats = useMemo(() => {
    const arrecadado = cartinhas.reduce((sum, c) => sum + (Number(c.valor) || 0), 0);
    const totalGastos = gastos.reduce((sum, g) => sum + (Number(g.valor) || 0), 0);
    const lucro = arrecadado - totalGastos;
    return {
      total: cartinhas.length,
      arrecadado,
      totalGastos,
      lucro,
      pendentes: cartinhas.filter((c) => !c.status || c.status === 'pending').length,
      entregues: cartinhas.filter((c) => c.status === 'delivered').length,
    };
  }, [cartinhas, gastos]);

  const cards = [
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

  return (
    <>
      {/* Cards normais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${card.color} ${card.border} transition-all duration-300 p-5 cursor-default`}
          >
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

      {/* Card Lucro Líquido — largura total, clicável */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        className="mb-8"
      >
        <div
          onClick={() => showLucro && setShowBreakdown(!showBreakdown)}
          className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 hover:border-emerald-200 transition-all duration-300 p-5 ${showLucro ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-current opacity-5" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-foreground leading-none mb-1 flex items-center gap-2">
                <span className={showLucro ? '' : 'blur-sm select-none'}>
                  <AnimatedNumber value={stats.lucro} prefix="R$ " decimals={2} />
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLucro(!showLucro);
                    if (showLucro) setShowBreakdown(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showLucro ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                Lucro Líquido
                {showLucro && (
                  <span className="text-emerald-600 ml-1">
                    — clique para {showBreakdown ? 'fechar' : 'ver detalhes'}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Breakdown detalhado */}
          <AnimatePresence>
            {showBreakdown && showLucro && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 pt-4 border-t border-border/50 space-y-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">✅ Total Recebido</span>
                  <span className="font-semibold text-foreground">
                    R$ {stats.arrecadado.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">🔴 Gastos</span>
                  <span className="font-semibold text-destructive">
                    − R$ {stats.totalGastos.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {gastos.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {gastos.map((g) => (
                      <div key={g.id} className="flex justify-between text-xs text-muted-foreground">
                        <span>{g.descricao}</span>
                        <span className="text-destructive">− R$ {Number(g.valor).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center text-sm pt-2 border-t border-border/50">
                  <span className="font-bold text-foreground">= Lucro Líquido</span>
                  <span className={`font-bold text-lg ${stats.lucro >= 0 ? 'text-emerald-600' : 'text-destructive'}`}>
                    R$ {stats.lucro.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
