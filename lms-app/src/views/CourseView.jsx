import React from 'react';
import { CheckCircle2, Lock, Search, PlayCircle, CreditCard } from 'lucide-react';
import { BRAND } from '../lib/constants';

function StatusBadge({ status }) {
  if (status === 'completed') return (
    <span style={{ background: '#10B981', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      Completado
    </span>
  );
  if (status === 'current') return (
    <span style={{ background: BRAND.goldClassic, color: BRAND.white, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      En curso
    </span>
  );
  return (
    <span style={{ background: 'rgba(255,255,255,0.1)', color: BRAND.muted, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
      Bloqueado
    </span>
  );
}

const styles = {
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
  moduleCard: (locked) => ({
    background: locked ? 'rgba(0,27,61,0.4)' : 'rgba(0,38,77,0.7)',
    border: `1px solid ${locked ? 'rgba(255,255,255,0.05)' : BRAND.border}`,
    borderRadius: 20,
    padding: 28,
    transition: 'all 0.3s ease',
    cursor: locked ? 'default' : 'pointer',
  }),
  statCard: {
    background: BRAND.glassBg,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 20,
    padding: 28,
  },
  resourceItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 16px',
    borderRadius: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'rgba(0,38,77,0.5)',
    border: `1px solid ${BRAND.border}`,
  },
};

const resources = [
  { title: 'Guía del participante', type: 'PDF', icon: 'FileText' }, // Placeholder icons
  { title: 'Calendario de sesiones en vivo', type: 'Agenda', icon: 'CalendarDays' },
  { title: 'Plantillas descargables', type: 'Recursos', icon: 'BookOpen' },
  { title: 'Constancia y seguimiento', type: 'Académico', icon: 'Award' },
];

export default function CourseView({ isPaid, setIsPaid, search, setSearch, filteredModules }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      
      {/* Status Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 28px',
        borderRadius: 20,
        background: isPaid 
          ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))' 
          : `linear-gradient(135deg, rgba(249,217,118,0.15), rgba(249,217,118,0.05))`,
        border: `1px solid ${isPaid ? 'rgba(16,185,129,0.3)' : 'rgba(249,217,118,0.3)'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {isPaid ? <CheckCircle2 size={24} color="#10B981" /> : <Lock size={24} color={BRAND.gold} />}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: BRAND.white, margin: 0 }}>
              {isPaid ? 'Inscripción Activa' : 'Acceso Restringido'}
            </h4>
            <p style={{ fontSize: 13, color: BRAND.muted, margin: 0 }}>
              {isPaid ? 'Tienes acceso a todos los módulos liberados.' : 'Realiza tu pago para desbloquear el contenido.'}
            </p>
          </div>
        </div>
        {!isPaid && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button 
              style={styles.goldBtn}
              onClick={() => window.open('https://buy.stripe.com/4gMaEZ1NQb5o3F95fH77O02', '_blank')}
            >
              <CreditCard size={16} /> Inscribirme
            </button>
            <button 
              style={{ ...styles.goldBtn, background: 'rgba(255,255,255,0.1)', color: BRAND.cream, boxShadow: 'none', border: `1px solid rgba(255,255,255,0.15)` }}
              onClick={() => setIsPaid(true)}
            >
              Demo
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: BRAND.white, margin: 0 }}>
          Contenido del Curso
        </h3>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: BRAND.muted }} />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Buscar semana o tema..."
            style={{
              paddingLeft: 38, padding: '10px 16px 10px 38px',
              borderRadius: 12,
              border: `1px solid ${BRAND.border}`,
              background: 'rgba(0,38,77,0.6)',
              color: BRAND.cream,
              fontSize: 14,
              width: 260,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Modules + Resources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredModules.map((module, index) => {
            const status = module.status || (index === 0 ? 'current' : 'locked');
            const progress = module.progress || 0;
            const locked = !isPaid || status === 'locked';
            return (
              <div key={module.id} style={styles.moduleCard(locked)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{
                        background: 'rgba(249,217,118,0.15)',
                        color: BRAND.gold,
                        padding: '4px 12px',
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}>
                        {module.week}
                      </span>
                      <StatusBadge status={locked ? 'locked' : status} />
                    </div>
                    <h4 style={{ fontSize: 18, fontWeight: 700, color: BRAND.white, margin: 0, marginBottom: 12 }}>
                      {module.title}
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {module.lessons.map(lesson => (
                        <li key={lesson} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: locked ? BRAND.muted : 'rgba(255,255,255,0.8)' }}>
                          {locked ? <Lock size={13} color="#F9D976" /> : <PlayCircle size={13} color={BRAND.gold} />}
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    width: 200,
                    background: 'rgba(0,27,61,0.5)',
                    padding: 20,
                    borderRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: BRAND.muted, marginBottom: 8 }}>
                        <span>PROGRESO</span>
                        <span>{locked ? '0%' : `${progress}%`}</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 3, width: `${locked ? 0 : progress}%`, background: `linear-gradient(90deg, ${BRAND.cyan}, #00B8D4)`, transition: 'width 0.5s ease' }}></div>
                      </div>
                    </div>
                    <button 
                      style={{
                        ...styles.goldBtn,
                        width: '100%',
                        justifyContent: 'center',
                        padding: '12px',
                        fontSize: 13,
                        marginTop: 16,
                        opacity: locked ? 0.4 : 1,
                        cursor: locked ? 'not-allowed' : 'pointer',
                        background: locked ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)`,
                        color: locked ? BRAND.muted : BRAND.primary,
                        boxShadow: locked ? 'none' : '0 4px 20px rgba(249,217,118,0.3)',
                      }}
                      disabled={locked}
                    >
                      {locked ? 'Bloqueado' : 'Continuar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...styles.statCard, textAlign: 'left' }}>
            <h5 style={{ fontSize: 15, fontWeight: 700, color: BRAND.gold, margin: 0, marginBottom: 16, letterSpacing: 1 }}>
              RECURSOS
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resources.map(res => (
                <div key={res.title} style={styles.resourceItem}>
                  <div style={{ padding: 8, background: 'rgba(249,217,118,0.12)', borderRadius: 10 }}>
                    {/* Simplified icon logic for now */}
                    <div style={{ width: 16, height: 16, background: BRAND.gold, borderRadius: 4 }}></div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.cream }}>{res.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
