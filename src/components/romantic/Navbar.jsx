import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Send, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, toggle } = useTheme();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Heart size={18} className="text-primary fill-primary" />
          </motion.div>
          <span className="text-xl font-heading font-bold text-foreground">
            Correio <span className="text-primary">Elegante</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Alternar tema"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
          </motion.button>

        <Link to={isHome ? '/envio' : '/'}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
          >
            {isHome ? (
              <>
                <Send size={14} />
                Enviar Cartinha
              </>
            ) : (
              <>
                <Heart size={14} />
                Início
              </>
            )}
          </motion.button>
        </Link>
        </div>
      </div>
    </motion.nav>
  );
}