import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Minha identidade será revelada?',
    a: 'Somente se você quiser! Você pode deixar um contato opcional. Caso contrário, a entrega será totalmente anônima e misteriosa. 💌',
  },
  {
    q: 'Como funciona a entrega?',
    a: 'Após o pagamento confirmado, nossa equipe prepara sua cartinha com carinho e a entrega pessoalmente ao destinatário no local combinado.',
  },
  {
    q: 'Posso personalizar a mensagem?',
    a: 'Sim! Você escreve a mensagem do seu jeito. Nós apenas transcrevemos com uma caligrafia bonita na cartinha física.',
  },
  {
    q: 'O pagamento é seguro?',
    a: 'Totalmente! Usamos o Mercado Pago, uma das plataformas mais seguras do Brasil, para processar todos os pagamentos.',
  },
  {
    q: 'E se a pessoa não estiver no local?',
    a: 'Tentamos a entrega em até 2 momentos. Caso não consigamos, entramos em contato com você para remarcar.',
  },
  {
    q: 'Posso enviar mais de uma cartinha?',
    a: 'Claro! Envie quantas quiser. Cada cartinha é única e especial. Afinal, amor nunca é demais! 💕',
  },
];

export default function FAQ() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-accent font-medium text-sm tracking-widest uppercase">
            Dúvidas?
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 bg-card/40 backdrop-blur-sm hover:border-primary/20 transition-colors data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}