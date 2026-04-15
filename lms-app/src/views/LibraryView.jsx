import React from 'react';
import { Book } from 'lucide-react';
import { BRAND } from '../lib/constants';

export default function LibraryView() {
  return (
    <div style={{ maxWidth: 700, margin: '80px auto', textAlign: 'center' }}>
      <div style={{ 
        width: 80, height: 80, borderRadius: 24,
        background: 'rgba(249,217,118,0.12)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <Book size={36} color={BRAND.gold} />
      </div>
      <h3 style={{ fontSize: 30, fontWeight: 800, color: BRAND.white, marginBottom: 12 }}>Mi Biblioteca</h3>
      <p style={{ color: BRAND.muted, fontSize: 16, lineHeight: 1.6 }}>
        Aquí podrás leer tus libros digitales y descargar los materiales exclusivos del ecosistema MindHub.
      </p>
    </div>
  );
}
