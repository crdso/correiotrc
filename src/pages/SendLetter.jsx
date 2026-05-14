// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, ArrowLeft, AlertCircle, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { GIFT_OPTIONS } from '@/lib/pagamentos';
import Navbar from '../components/romantic/Navbar';
import ParticleBackground from '../components/romantic/ParticleBackground';
import FloatingHearts from '../components/romantic/FloatingHearts';
import GiftCard from '../components/romantic/GiftCard';
import ConfettiExplosion from '../components/romantic/ConfettiExplosion';
import Footer from '../components/romantic/Footer';

const SMALL_GIFT_IDS = ['bilhetinho_pirulito', 'bilhetinho_sonho'];

export default function SendLetter() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [senderName, setSenderName] = useState('');
  const [turma, setTurma] = useState('');
  const [otherTurma, setOtherTurma] = useState('');
  const [message, setMessage] = useState('');
  const [selectedGift, setSelectedGift] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [cartinhaId, setCartinhaId] = useState(null);

  const [errors, setErrors] = useState({
    senderName: null,
    turma: null,
    otherTurma: null,
    message: null,
    gift: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const maxChars = selectedGift && SMALL_GIFT_IDS.includes(selectedGift.id) ? 150 : 500;

  const TURMAS = [
    '1° Ano A', '1° Ano B', '1° Ano C', '1° Ano D', '1° Ano E', '1° Ano F', '1° Ano Redes',
    '2° Ano A', '2° Ano B', '2° Ano C', '2° Ano D', '2° Ano E', '2° Ano Redes',
    '3° Ano A', '3° Ano B', '3° Ano C', '3° Ano D', '3° Ano Redes', 'Outros'
  ];

const validate = () => {
  const newErrors = {};

  if (!senderName.trim()) newErrors.senderName = 'O nome é obrigatório';
  if (senderName.trim().length < 2) newErrors.senderName = 'Digite um nome válido';

  if (!turma) newErrors.turma = 'Selecione uma turma';
  if (turma === 'Outros' && !otherTurma.trim()) newErrors.otherTurma = 'Digite a turma';

  if (!message.trim()) {
    newErrors.message = 'A mensagem é obrigatória';
} else {
  const words = message.trim().split(/\s+/).filter(w => w.length > 1);
  const meaningfulWords = words.filter(w => w.length >= 2);
  const hasRepetition = /(.)\1{4,}/.test(message);
  const hasRealWords = meaningfulWords.some(w => /[aeiouáéíóúãõâêîôû]/i.test(w));
  const hasGibberish = words.some(w => /[^aeiouáéíóúãõâêîôû\s]{4,}/i.test(w));

  if (meaningfulWords.length < 3) newErrors.message = 'Escreva uma mensagem de verdade (mínimo 3 palavras)';
  else if (hasRepetition) newErrors.message = 'Mensagem inválida';
  else if (!hasRealWords) newErrors.message = 'Mensagem inválida';
  else if (hasGibberish) newErrors.message = 'Mensagem inválida';
  else if (message.length > maxChars) newErrors.message = 'Mensagem muito longa';
}

  if (!selectedGift) newErrors.gift = 'Escolha um tipo de cartinha';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!selectedGift) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from('cartinhas').insert({
        sender_name: senderName.trim(),
        contact: contact.trim() || null,
        turma: turma === "Outros" ? otherTurma.trim() : turma,
        message: message.trim(),
        gift_type: selectedGift.id,
        gift_label: selectedGift.nome,
        price: selectedGift.price,
        status: "pending",
      }).select('id').single();

      if (error) throw error;

      setCartinhaId(data.id);
      setSubmitted(true);
      setShowConfetti(true);

      if (selectedGift?.link) {
        window.open(selectedGift.link, "_blank");
      }

      toast.success("Cartinha salva! 💌 Link de pagamento aberto");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar cartinha. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenPayment = () => {
    if (selectedGift?.link) {
      window.open(selectedGift.link, "_blank");
      toast.info("Link de pagamento aberto em nova aba");
    }
  };

  const handleConfirmPayment = async () => {
    if (!cartinhaId) return;
    setIsConfirming(true);

    try {
      const { error } = await supabase
        .from('cartinhas')
        .update({ status: 'paid' })
        .eq('id', cartinhaId);

      if (error) throw error;

      navigate("/sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao confirmar pagamento. Tente novamente.");
    } finally {
      setIsConfirming(false);
    }
  };

  const progress = [!!senderName.trim(), !!turma, !!message.trim(), !!selectedGift];
  const progressPercent = (progress.filter(Boolean).length / progress.length) * 100;

  if (submitted) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <ParticleBackground />
        <FloatingHearts count={6} />
        <Navbar />
        {showConfetti && <ConfettiExplosion />}
 
        <div className="relative z-10 pt-28 pb-16 px-6">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div className="text-6xl mb-6">💌</div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Cartinha salva!
              </h2>
              <p className="text-muted-foreground mb-8">
                Sua cartinha foi registrada. Após o pagamento confirmado, sua cartinha será entregue em breve. 💌
              </p>
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenPayment}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-lg font-semibold shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                <ExternalLink size={20} />
                Abrir link de pagamento
              </motion.button>
 
              <p className="text-xs text-muted-foreground mt-4">
                Após o pagamento, sua cartinha será confirmada e entregue em breve. 💌
              </p>
            </motion.div>
          </div>
        </div>
 
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <FloatingHearts count={4} />
      <Navbar />

      <div className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-2xl mx-auto">

          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Voltar ao início</span>
            </motion.div>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              Escreva sua <span className="text-primary italic">cartinha</span> 💌
            </h1>
            <p className="text-muted-foreground mt-3">Preencha os campos abaixo e espalhe amor pelo mundo.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progresso</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          <div className="space-y-8">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Seu contato <span className="text-muted-foreground">(opcional)</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Instagram, WhatsApp ou outro contato"
                className="w-full px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted-foreground/60"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nome do crush <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => { setSenderName(e.target.value); if (errors.senderName) setErrors({ ...errors, senderName: null }); }}
                placeholder="Como se chama a pessoa que deverá ser enviada a carta?"
                className={`w-full px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border outline-none transition-all text-foreground placeholder:text-muted-foreground/60 ${errors.senderName ? 'border-destructive focus:ring-2 focus:ring-destructive/10' : 'border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'}`}
              />
              <AnimatePresence>
                {errors.senderName && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.senderName}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Turma do destinatário <span className="text-primary">*</span>
              </label>
              <select
                value={turma}
                onChange={(e) => { setTurma(e.target.value); if (errors.turma) setErrors({ ...errors, turma: null }); }}
                className={`w-full px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border outline-none transition-all text-foreground ${errors.turma ? 'border-destructive focus:ring-2 focus:ring-destructive/10' : 'border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'}`}
              >
                <option value="">Selecione a turma...</option>
                {TURMAS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <AnimatePresence>
                {turma === 'Outros' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      value={otherTurma}
                      onChange={(e) => {
                        setOtherTurma(e.target.value);
                        if (errors.otherTurma) {
                          setErrors({ ...errors, otherTurma: null });
                        }
                      }}
                      placeholder="Digite a turma..."
                      className={`w-full px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border outline-none transition-all text-foreground placeholder:text-muted-foreground/60 ${
                        errors.otherTurma
                          ? 'border-destructive focus:ring-2 focus:ring-destructive/10'
                          : 'border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'
                      }`}
                    />
                    {errors.otherTurma && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-destructive text-xs mt-2 flex items-center gap-1"
                      >
                        <AlertCircle size={12} />
                        {errors.otherTurma}
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {errors.turma && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.turma}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Seleção do tipo da cartinha */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium text-foreground mb-4">
                Tipo da cartinha <span className="text-primary">*</span>
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GIFT_OPTIONS.map((item) => (
                  <GiftCard
                    key={item.id}
                    item={item}
                    isSelected={selectedGift?.id === item.id}
                    onSelect={(gift) => {
                      setSelectedGift(gift);
                      if (errors?.gift) {
                        setErrors({ ...errors, gift: null });
                      }
                    }}
                  />
                ))}
              </div>

              <AnimatePresence>
                {errors?.gift && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-destructive text-xs mt-3 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.gift}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sua mensagem <span className="text-primary">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  const val = e.target.value;
                  // Allow editing/deleting freely; only block adding new chars beyond limit
                  if (val.length <= maxChars || val.length < message.length) {
                    setMessage(val);
                    if (errors.message) setErrors({ ...errors, message: null });
                  }
                }}
                placeholder="Escreva aqui o que seu coração quer dizer..."
                rows={5}
                className={`w-full px-5 py-4 rounded-2xl bg-card/60 backdrop-blur-sm border outline-none transition-all text-foreground placeholder:text-muted-foreground/60 resize-none ${errors.message ? 'border-destructive focus:ring-2 focus:ring-destructive/10' : 'border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10'}`}
              />
              <div className="flex justify-between items-center mt-2">
                <AnimatePresence>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-destructive text-xs flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                <span className={`text-xs ml-auto ${message.length > maxChars ? 'text-destructive font-bold' : message.length > maxChars * 0.9 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                  {message.length}/{maxChars}
                  {message.length > maxChars && ' — mensagem muito longa para esta opção'}
                </span>
              </div>
            </motion.div>

            {/* Resumo do pedido */}
            <AnimatePresence>
              {selectedGift && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Resumo do pedido</p>
                      <p className="font-heading font-bold text-foreground mt-1">{selectedGift.icon} {selectedGift.nome}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-heading font-bold text-primary">R$ {selectedGift.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão de redirecionamento */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-2">
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 20px 40px rgba(217, 4, 41, 0.25)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl text-lg font-semibold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" /> Salvando...</>
                ) : (
                  <><Heart size={20} className="fill-current" /> Finalizar e pagar <Send size={18} /></>
                )}
              </motion.button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Após salvar, você será direcionado para o pagamento
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
