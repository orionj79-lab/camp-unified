import React from 'react';
import { BRAND } from '../../lib/constants';

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    background: 'rgba(0,27,61,0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${BRAND.border}`,
  }
};

export default function Header({ activeView, user }) {
  return (
    <header style={styles.header}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.white, textTransform: 'capitalize', margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
          {activeView === 'dashboard' ? `Bienvenida, ${user?.name || 'Alumna'}` : activeView}
        </h2>
        <p style={{ fontSize: 12, color: BRAND.muted, margin: 0 }}>Plataforma de Formación Ejecutiva</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          height: 42, width: 42, borderRadius: '50%',
          background: `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: BRAND.primary, fontWeight: 800, fontSize: 16,
        }}>
          {user?.name?.substring(0, 2).toUpperCase() || 'JS'}
        </div>
      </div>
    </header>
  );
}
