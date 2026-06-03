import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function GastoManager({ onGastosChange }) {
  const [gastos, setGastos] = useState([]);
  const [open, setOpen] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');

  // Carrega gastos do Supabase
  async function fetchGastos() {
    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setGastos(data);
      onGastosChange?.(data);
    }
  }

  useEffect(() => {
    fetchGastos();
  }, []);

  async function handleAdd() {
    const valorNum = parseFloat(valor.replace(',', '.'));
    if (!descricao.trim()) return setError('Informe a descrição.');
    if (isNaN(valorNum) || valorNum <= 0) return setError('Valor inválido.');
    setError('');
    setLoading(true);
    const { data, error } = await supabase
      .from('gastos')
      .insert([{ descricao: descricao.trim(), valor: valorNum }])
      .select();
    setLoading(false);
    if (error) return setError('Erro ao salvar. Tente novamente.');
    const updated = [data[0], ...gastos];
    setGastos(updated);
    onGastosChange?.(updated);
    setDescricao('');
    setValor('');
  }

  async function handleDelete(id) {
    setDeleting(id);
    await supabase.from('gastos').delete().eq('id', id);
    const updated = gastos.filter((g) => g.id !== id);
    setGastos(updated);
    onGastosChange?.(updated);
    setDeleting(null);
  }

  return (
    <div className="mb-4">
      {/* Botão para abrir/fechar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/60 hover:border-border rounded-xl px-4 py-2"
      >
        {open ? <X size={15} /> : <Plus size={15} />}
        {open ? 'Fechar gastos' : 'Gerenciar gastos'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4">
              {/* Formulário de adição */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Descrição (ex: papel, ink...)"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  className="flex-1 text-sm rounded-xl border border-border/60 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50 transition"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="R$ 0,00"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  className="w-28 text-sm rounded-xl border border-border/60 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50 transition"
                />
                <button
                  onClick={handleAdd}
                  disabled={loading}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl px-4 py-2 hover:opacity-90 active:scale-95 transition disabled:opacity-50"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Adicionar
                </button>
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              {/* Lista de gastos */}
              {gastos.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Nenhum gasto cadastrado ainda.
                </p>
              ) : (
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {gastos.map((g) => (
                      <motion.li
                        key={g.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-between text-sm rounded-xl border border-border/40 bg-muted/30 px-3 py-2"
                      >
                        <span className="text-foreground">{g.descricao}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-destructive font-medium">
                            − R$ {Number(g.valor).toFixed(2).replace('.', ',')}
                          </span>
                          <button
                            onClick={() => handleDelete(g.id)}
                            disabled={deleting === g.id}
                            className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40"
                          >
                            {deleting === g.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
