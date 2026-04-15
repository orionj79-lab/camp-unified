import React from 'react';
import { Wrench, FileText } from 'lucide-react';
import { BRAND } from '../lib/constants';

const styles = {
  statCard: {
    background: BRAND.glassBg,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 20,
    padding: 28,
  },
  goldBtn: {
    background: `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)`,
    color: BRAND.primary,
    border: 'none',
    padding: '8px 20px',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 12,
    cursor: 'pointer',
    marginTop: 14,
  }
};

export default function ToolsView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {[
        { icon: Wrench, title: 'Calculadora de Impacto', desc: 'Mide el retorno de tus decisiones ejecutivas con herramientas estratégicas.', color: BRAND.gold, link: '/sistema-seguimiento/' },
        { icon: FileText, title: 'Plantillas Ejecutivas', desc: 'Descarga plantillas profesionales para tus presentaciones de negocio.', color: '#60A5FA', link: '#' },
      ].map((tool, i) => {
        const Icon = tool.icon;
        return (
          <div key={i} style={{ ...styles.statCard, textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 20, cursor: 'pointer' }}>
            <div style={{ padding: 14, background: 'rgba(249,217,118,0.12)', borderRadius: 16, flexShrink: 0 }}>
              <Icon size={24} color={tool.color} />
            </div>
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: BRAND.white, margin: 0, marginBottom: 6 }}>{tool.title}</h4>
              <p style={{ color: BRAND.muted, fontSize: 13, margin: 0 }}>{tool.desc}</p>
              <button 
                style={styles.goldBtn}
                onClick={() => tool.link !== '#' && window.open(tool.link, '_blank')}
              >
                Abrir Herramienta
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
