import React from 'react';
import { GraduationCap } from 'lucide-react';
import { BRAND } from '../lib/constants';

const styles = {
  loginBg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${BRAND.primary} 0%, #000D1F 50%, #001A3D 100%)`,
    backgroundImage: 'url(/broadcast-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  loginOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,27,61,0.88)',
    backdropFilter: 'blur(10px)',
  },
  loginCard: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: 440,
    padding: 48,
    borderRadius: 28,
    background: 'rgba(0,38,77,0.8)',
    border: `1px solid ${BRAND.border}`,
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
  },
  goldBtn: {
    background: `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)`,
    color: BRAND.primary,
    border: 'none',
    padding: '16px',
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    width: '100%',
    marginTop: 8,
    transition: 'all 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: `1px solid ${BRAND.border}`,
    background: 'rgba(0,27,61,0.6)',
    color: BRAND.cream,
    fontSize: 15,
    outline: 'none',
  }
};

export default function LoginView({ handleLogin, isLoading }) {
  return (
    <div style={styles.loginBg}>
      <div style={styles.loginOverlay}></div>
      <div style={styles.loginCard}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <GraduationCap size={32} color={BRAND.gold} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: BRAND.white, marginBottom: 8, letterSpacing: -0.5, fontFamily: "'Montserrat', 'Playfair Display', sans-serif" }}>
            MindHub Dynamics
          </h1>
          <p style={{ color: BRAND.muted, fontSize: 14 }}>
            Plataforma de Formación Ejecutiva
          </p>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: BRAND.gold, textTransform: 'uppercase', letterSpacing: 2, display: 'block', marginBottom: 8 }}>
              Email
            </label>
            <input 
              value="demo@mindhub.com" 
              disabled 
              style={styles.input}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: BRAND.gold, textTransform: 'uppercase', letterSpacing: 2, display: 'block', marginBottom: 8 }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value="********" 
              disabled 
              style={styles.input}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              ...styles.goldBtn,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Ingresando...' : 'Entrar al Campus'}
          </button>
        </form>
        <p style={{ color: BRAND.muted, fontSize: 12, textAlign: 'center', marginTop: 20 }}>
          © 2026 MindHub Dynamics · Formación Ejecutiva
        </p>
      </div>
    </div>
  );
}
