import React from 'react';
import { PlayCircle, Trophy, Clock, Star, Award, Book, Users } from 'lucide-react';
import { BRAND } from '../lib/constants';

const styles = {
  heroCard: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    minHeight: 360,
    display: 'flex',
    alignItems: 'flex-end',
    backgroundImage: 'url(/broadcast-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,27,61,0.95) 0%, rgba(0,27,61,0.4) 50%, transparent 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    padding: 40,
    width: '100%',
  },
  goldBtn: {
    background: `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)`,
    color: BRAND.primary,
    border: 'none',
    padding: '14px 28px',
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(249,217,118,0.3)',
  },
  statCard: {
    background: BRAND.glassBg,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 20,
    padding: 28,
    textAlign: 'center',
  },
};

export default function DashboardView({ isPaid, setActiveView }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      
      {/* Hero con portada */}
      <div style={styles.heroCard}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <span style={{
            background: 'rgba(249,217,118,0.2)',
            color: BRAND.gold,
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            border: `1px solid rgba(249,217,118,0.3)`,
            display: 'inline-block',
            marginBottom: 16,
          }}>
            DIPLOMADO EN INTELIGENCIA EMOCIONAL
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: BRAND.white, margin: 0, marginBottom: 10, lineHeight: 1.15 }}>
            Inteligencia Emocional<br />para el Emprendimiento
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 500, marginBottom: 24 }}>
            Transforma tu liderazgo con herramientas de regulación emocional, empatía estratégica y habilidades sociales.
          </p>
          <button 
            style={styles.goldBtn}
            onClick={() => setActiveView('diplomado')}
          >
            <PlayCircle size={18} /> Ir al Diplomado
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { icon: Trophy, label: 'Módulos', value: '7', sub: 'semanas' },
          { icon: Clock, label: 'Duración', value: '49', sub: 'horas' },
          { icon: Star, label: 'Progreso', value: isPaid ? '14%' : '0%', sub: 'completado' },
          { icon: Award, label: 'Certificado', value: isPaid ? 'Activo' : 'Pendiente', sub: 'digital' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={styles.statCard}>
              <Icon size={28} color={BRAND.gold} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 28, fontWeight: 800, color: BRAND.white }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: BRAND.muted, marginTop: 4 }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div 
          style={{ ...styles.statCard, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 20 }}
          onClick={() => setActiveView('biblioteca')}
        >
          <div style={{ padding: 14, background: 'rgba(249,217,118,0.15)', borderRadius: 16 }}>
            <Book size={28} color={BRAND.gold} />
          </div>
          <div>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: BRAND.white, margin: 0, marginBottom: 4 }}>Mi Biblioteca</h4>
            <p style={{ color: BRAND.muted, fontSize: 13, margin: 0 }}>Accede a tus libros digitales y materiales exclusivos.</p>
          </div>
        </div>
        <div 
          style={{ ...styles.statCard, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 20 }}
          onClick={() => setActiveView('comunidad')}
        >
          <div style={{ padding: 14, background: 'rgba(249,217,118,0.15)', borderRadius: 16 }}>
            <Users size={28} color={BRAND.gold} />
          </div>
          <div>
            <h4 style={{ fontSize: 18, fontWeight: 700, color: BRAND.white, margin: 0, marginBottom: 4 }}>Comunidad</h4>
            <p style={{ color: BRAND.muted, fontSize: 13, margin: 0 }}>Conecta con otros alumnos y facilitadores del diplomado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
