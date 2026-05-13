import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function GiftCard({ item, isSelected, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(item)}
      className={`cursor-pointer relative p-6 rounded-3xl border-2 transition-all duration-500 ${
        isSelected
          ? 'border-primary bg-card shadow-2xl shadow-primary/10'
          : 'border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
      }`}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
        >
          <Check size={14} className="text-primary-foreground" />
        </motion.div>
      )}

      {/* Glow effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-3xl bg-primary/5 animate-pulse-glow pointer-events-none" />
      )}

      <div className="text-center space-y-3 relative z-10">
        <motion.span
          className="text-4xl block"
          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {item.icon}
        </motion.span>
        <h3 className="font-heading font-bold text-foreground text-sm leading-tight">
          {item.name}
        </h3>
        <div className={`text-lg font-bold ${isSelected ? 'text-primary' : 'text-accent'}`}>
          R$ {item.price.toFixed(2).replace('.', ',')}
        </div>
      </div>
    </motion.div>
  );
}