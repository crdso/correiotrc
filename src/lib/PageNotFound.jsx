import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl"
        >
          💔
        </motion.div>
        <h1 className="text-5xl font-heading font-bold text-foreground">
          Ops, caminho errado!
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Parece que essa flecha errou o alvo. Vamos te levar de volta para o caminho do amor.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}