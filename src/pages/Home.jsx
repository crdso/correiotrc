import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Heart, Sparkles } from 'lucide-react';
import Navbar from '../components/romantic/Navbar';
import CupidHero from '../components/romantic/CupidHero';
import ParticleBackground from '../components/romantic/ParticleBackground';
import FloatingHearts from '../components/romantic/FloatingHearts';
import HowItWorks from '../components/romantic/HowItWorks';
import FAQ from '../components/romantic/FAQ';
import CTASection from '../components/romantic/CTASection';
import Footer from '../components/romantic/Footer';

const textReveal = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

function HeroSection() {
  const words = 'Envie uma cartinha para seu crush'.split(' ');

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-primary/10 mb-8"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium text-foreground/70 tracking-wide uppercase">
              Correio Elegante Digital
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                className={
                  word === 'crush'
                    ? 'text-primary italic'
                    : 'text-foreground'
                }
              >
                {word}{' '}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              💌
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-md leading-relaxed"
          >
            Envie uma mensagem secreta para quem faz seu coração bater mais forte. 
            Simples, lúdico e <span className="text-primary font-medium">inesquecível</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/envio">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(217, 4, 41, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold shadow-xl shadow-primary/20 flex items-center gap-3 animate-pulse-glow"
              >
                <Send size={18} />
                Enviar agora
              </motion.button>
            </Link>
            <motion.a
              href="#como-funciona"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-accent/40 text-accent rounded-full text-lg font-medium hover:bg-accent/5 transition-colors flex items-center gap-2"
            >
              <Heart size={16} />
              Saiba mais
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Cupid Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-[400px] md:h-[500px] lg:h-[550px] hidden md:block"
        >
          <CupidHero />
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <FloatingHearts count={6} />
      <Navbar />
      <HeroSection />
      <div id="como-funciona">
        <HowItWorks />
      </div>
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}