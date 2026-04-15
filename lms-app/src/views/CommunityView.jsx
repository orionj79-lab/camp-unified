import React from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { BRAND } from '../lib/constants';

const styles = {
  goldBtn: {
    background: '#25D366',
    color: '#fff',
    border: 'none',
    padding: '16px 32px',
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
  }
};

export default function CommunityView() {
  return (
    <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center' }}>
      <div style={{ 
        width: 80, height: 80, borderRadius: 24,
        background: 'rgba(249,217,118,0.12)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <MessageSquare size={36} color={BRAND.gold} />
      </div>
      <h3 style={{ fontSize: 30, fontWeight: 800, color: BRAND.white, marginBottom: 12 }}>Comunidad MindHub</h3>
      <p style={{ color: BRAND.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
        Conecta con otros emprendedores que están transformando su liderazgo a través de la inteligencia emocional.
      </p>
      <button 
        style={styles.goldBtn}
        onClick={() => window.open('https://wa.me/', '_blank')}
      >
        <Users size={20} /> Únete al grupo de WhatsApp
      </button>
    </div>
  );
}
