import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Gift, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Escreva sua mensagem',
    description: 'Coloque em palavras o que seu coração sente. Pode ser doce, engraçado ou apaixonado.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Gift,
    title: 'Escolha o presente',
    description: 'Selecione o tipo de cartinha e o mimo que acompanha: de um BIS a uma rosa real.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: CreditCard,
    title: 'Faça o pagamento',
    description: 'Pagamento rápido e seguro. Sua identidade permanece em segredo.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Truck,
    title: 'Nós entregamos',
    description: 'Sua cartinha é entregue com carinho. O crush vai amar a surpresa!',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm tracking-widest uppercase">
            Simples & Mágico
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3">
            Como funciona?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Em apenas 4 passos, sua mensagem secreta chega ao coração de alguém especial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 h-full">
                {/* Step number */}
                <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/20">
                  {index + 1}
                </div>

                <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-5`}>
                  <step.icon size={24} className={step.color} />
                </div>

                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}