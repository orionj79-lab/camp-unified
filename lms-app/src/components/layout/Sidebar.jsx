import React from 'react';
import { 
  Menu, X, LayoutDashboard, Book, GraduationCap, 
  Wrench, MessageSquare, Settings, GraduationCap as GraduationCapIcon 
} from 'lucide-react';
import { BRAND } from '../../lib/constants';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'biblioteca', label: 'Mi Biblioteca', icon: Book },
  { id: 'diplomado', label: 'Diplomado', icon: GraduationCap },
  { id: 'herramientas', label: 'Herramientas', icon: Wrench },
  { id: 'comunidad', label: 'Comunidad', icon: MessageSquare },
];

const styles = {
  sidebar: (isOpen) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    width: isOpen ? 260 : 80,
    background: `linear-gradient(180deg, ${BRAND.primary} 0%, #001029 100%)`,
    borderRight: `1px solid ${BRAND.border}`,
    transition: 'width 0.3s ease',
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    padding: '0 20px',
    borderBottom: `1px solid ${BRAND.border}`,
  },
  navBtn: (isActive) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: 12,
    padding: '14px 18px',
    borderRadius: 14,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    background: isActive 
      ? `linear-gradient(135deg, ${BRAND.gold}, #E6C24D)` 
      : 'transparent',
    color: isActive ? BRAND.primary : BRAND.muted,
    fontWeight: isActive ? 700 : 500,
    fontSize: 14,
    textAlign: 'left',
  }),
  bottomArea: {
    padding: '16px 12px',
    borderTop: `1px solid ${BRAND.border}`,
  }
};

export default function Sidebar({ activeView, setActiveView, isSidebarOpen, setSidebarOpen, handleLogout }) {
  return (
    <aside style={styles.sidebar(isSidebarOpen)}>
      <div style={styles.header}>
        {isSidebarOpen && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GraduationCapIcon size={24} color={BRAND.gold} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.white, letterSpacing: 1, fontFamily: "'Montserrat', sans-serif" }}>MINDHUB</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: BRAND.cyan, letterSpacing: 3 }}>DYNAMICS</div>
            </div>
          </div>
        )}
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: BRAND.muted, padding: 4 }}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={styles.navBtn(isActive)}
            >
              <Icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={styles.bottomArea}>
        <button 
          onClick={handleLogout}
          style={{
            ...styles.navBtn(false),
            color: '#EF4444',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Settings size={20} />
          {isSidebarOpen && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}
