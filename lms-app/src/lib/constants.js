export const BRAND = {
  primary:    '#001B3D',   // Azul de Fondo Profundo
  gold:       '#F9D976',   // Dorado Brillante (Highlights)
  goldClassic:'#D4AF37',   // Dorado Clásico (Módulos activos)
  cyan:       '#00E5FF',   // Electric Cyan (Progreso)
  cream:      '#F4F4F4',   // Blanco Crema
  black:      '#000000',   // Negro Azabache
  white:      '#FFFFFF',
  darkBlue:   '#00264D',
  lightGold:  '#FFF4CC',
  muted:      '#8899AA',
  border:     'rgba(249,217,118,0.15)',
  cardBg:     'rgba(0,27,61,0.6)',
  glassBg:    'rgba(0,38,77,0.85)',
};

export const COMMON_STYLES = {
  glassCard: {
    background: BRAND.glassBg,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 20,
    padding: 28,
    backdropFilter: 'blur(20px)',
  }
};
