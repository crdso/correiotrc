import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-primary fill-primary" />
            <span className="font-heading font-bold text-foreground">
              Correio <span className="text-primary">Elegante</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/envio" className="hover:text-primary transition-colors">
              Enviar Cartinha
            </Link>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart size={12} className="text-primary fill-primary" /> e muito carinho
          </p>
        </div>
      </div>
    </footer>
  );
}