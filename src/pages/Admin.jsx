// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, CheckCircle, Filter, LogOut, Heart, RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import StatsCards from '@/components/admin/StatsCards';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const STATUS_LABELS = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: 'Pago', color: 'bg-blue-100 text-blue-700' },
  delivered: { label: 'Entregue', color: 'bg-green-100 text-green-700' },
};

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [cartinhas, setCartinhas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast.error('Senha incorreta 🔒');
    }
  };

  const fetchCartinhas = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cartinhas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCartinhas(data || []);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao carregar cartinhas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchCartinhas();
  }, [authenticated, fetchCartinhas]);

  useEffect(() => {
    if (!authenticated) return;

    const channel = supabase
      .channel('cartinhas-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cartinhas' },
        () => {
          fetchCartinhas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authenticated, fetchCartinhas]);

  const handleMarkDelivered = async (id) => {
    try {
      const { error } = await supabase
        .from('cartinhas')
        .update({ status: 'delivered' })
        .eq('id', id);

      if (error) throw error;

      setCartinhas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'delivered' } : c))
      );
      toast.success('Marcada como entregue! 💌');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta cartinha?')) return;
    try {
      const { error } = await supabase
        .from('cartinhas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCartinhas((prev) => prev.filter((c) => c.id !== id));
      toast.success('Excluída com sucesso');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao excluir cartinha');
    }
  };

  const filtered = cartinhas.filter((c) => {
    const matchSearch = !search ||
      c.sender_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.message?.toLowerCase().includes(search.toLowerCase()) ||
      c.gift_type?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const cartinhasForStats = cartinhas.map((c) => ({
    ...c,
    nomeRemetente: c.sender_name,
    mensagem: c.message,
    tipo: c.gift_type,
    valor: c.price,
    contato: c.contact,
    createdAt: c.created_at || c.created_date,
  }));

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Heart size={32} className="text-primary fill-primary mx-auto mb-3" />
            <h1 className="text-2xl font-heading font-bold">Painel Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Correio Elegante</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full px-5 py-4 rounded-2xl bg-card border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-foreground"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/20"
            >
              Entrar
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-primary fill-primary" />
            <h1 className="font-heading font-bold text-lg">Painel Admin</h1>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {filtered.length} cartinha{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchCartinhas}
              disabled={loading}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={15} /> Sair
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <StatsCards cartinhas={cartinhasForStats} />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, mensagem ou tipo..."
              className="w-full pl-11 pr-5 py-3 rounded-2xl bg-card border border-border/50 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-card border border-border/50 text-sm outline-none focus:border-primary/30 cursor-pointer"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="delivered">Entregue</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
            Carregando...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Heart size={32} className="mx-auto mb-3 opacity-30" />
            <p>Nenhuma cartinha encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((c, i) => {
                const st = STATUS_LABELS[c.status] || STATUS_LABELS.pending;
                const isExpanded = expandedId === c.id;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                  >
                    <div className="p-5 flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">{c.sender_name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>{st.label}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            {c.gift_label || c.gift_type?.replace(/_/g, ' ')}
                          </span>
                          {c.turma && (
                            <span className="text-xs text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full">
                              🏫 {c.turma}
                            </span>
                          )}
                          <span className="text-xs font-bold text-primary ml-auto">
                            R$ {Number(c.price || 0).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <p className={`text-sm text-muted-foreground ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {c.message}
                        </p>
                        {c.ler_para_sala && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            🔊 Ler para sala
                          </span>
                        )}
                        {c.contact && (
                          <p className="text-xs text-accent mt-1">📱 {c.contact}</p>
                        )}
                        <p className="text-xs text-muted-foreground/60 mt-2">
                          {c.created_at ? new Date(c.created_at).toLocaleString('pt-BR') : '—'}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpandedId(isExpanded ? null : c.id)}
                          className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                          title="Ver mensagem completa"
                        >
                          <Eye size={15} />
                        </motion.button>
                        {c.status !== 'delivered' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleMarkDelivered(c.id)}
                            className="p-2 rounded-xl hover:bg-green-50 transition-colors text-green-600"
                            title="Marcar como entregue"
                          >
                            <CheckCircle size={15} />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(c.id)}
                          className="p-2 rounded-xl hover:bg-red-50 transition-colors text-destructive"
                          title="Excluir"
                        >
                          <Trash2 size={15} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
