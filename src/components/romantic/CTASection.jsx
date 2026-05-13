import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Send } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,210,225,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(197,160,89,0.1),transparent_50%)]" />

          <div className="relative z-10 p-12 md:p-16 text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              💌
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Seu crush merece saber
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-8 leading-relaxed">
              Não deixe esse sentimento guardado. Envie uma cartinha anônima e faça alguém sorrir hoje.
            </p>

            <Link to="/envio">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-primary rounded-full text-lg font-bold shadow-xl flex items-center gap-3 mx-auto"
              >
                <Send size={18} />
                Enviar cartinha agora
                <Heart size={16} className="fill-current" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}