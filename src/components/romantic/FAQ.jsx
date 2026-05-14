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
    a: 'Somente se você quiser! Você pode deixar um contato opcional. Caso contrário, a entrega será totalmente anônima.',
  },
  {
    q: 'Como funciona a entrega?',
    a: 'Nossa equipe prepara sua cartinha com carinho e a entrega pessoalmente ao destinatário. Prazo de até 1 dia útil desde a confirmação de pagamento do seu pedido.',
  },
  {
    q: 'Posso personalizar a mensagem?',
    a: 'Sim! Você escreve a mensagem do seu jeito. Atente-se que bilhetes são pequenos, então temos um limite de palavras que pode ser escrito. Da mesma forma com a cartinha.',
  },
  {
    q: 'E se a pessoa não estiver na sala?',
    a: 'Tentamos a entrega em até 2 momentos. Caso seja um local (no campus) à desejo do remetente, pedimos que deixe esclarecido na caixinha de "Sua Mensagem" ao enviar o pedido.',
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