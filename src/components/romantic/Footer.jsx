import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-1">
            <Heart size={18} className="text-primary fill-primary" />
            <span className="font-heading font-bold text-foreground">
              Correio <span className="text-primary">Elegante</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground flex-1 justify-center">
            <Link to="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/envio" className="hover:text-primary transition-colors">
              Enviar Cartinha
            </Link>
          </div>

          {/* Texto */}
          <div className="flex flex-col items-end flex-1">
            <p className="text-sm text-muted-foreground">
              dev: cardoso
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}