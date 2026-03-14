// ============================================================
//  CAMP — DATA LAYER
//  Mock data for Leads, Conferences, Sales, Leaders, Reports
// ============================================================

const CAMP = {

  // ---- LEADS ------------------------------------------------
  leads: [
    { id: 1, name: 'María González', phone: '+52 55 1234-5678', email: 'maria.g@email.com', source: 'Conferencia Monterrey', segment: 'Caliente', status: 'Seguimiento', score: 92, date: '2026-03-01', notes: 'Muy interesada. Pidió cita para esta semana.', operator: 'Ana Rodríguez', tag: 'VIP' },
    { id: 2, name: 'Carlos Méndez', phone: '+52 81 9876-5432', email: 'carlos.m@email.com', source: 'Instagram', segment: 'Tibio', status: 'Nuevo', score: 64, date: '2026-03-02', notes: 'Siguió en IG, descargó el PDF.', operator: 'Luis Martínez', tag: '' },
    { id: 3, name: 'Patricia Vidal', phone: '+52 33 5555-1234', email: 'patricia.v@email.com', source: 'Referido', segment: 'Caliente', status: 'Cita Agendada', score: 88, date: '2026-03-03', notes: 'Referida por María González.', operator: 'Ana Rodríguez', tag: 'VIP' },
    { id: 4, name: 'Roberto Suárez', phone: '+52 55 7777-8888', email: 'roberto.s@email.com', source: 'Facebook Ad', segment: 'Frío', status: 'Inactivo', score: 28, date: '2026-02-20', notes: 'No responde desde hace 10 días.', operator: 'Luis Martínez', tag: '' },
    { id: 5, name: 'Sofía Herrera', phone: '+52 81 2222-3333', email: 'sofia.h@email.com', source: 'Conferencia CDMX', segment: 'Caliente', status: 'Convertido', score: 95, date: '2026-02-28', notes: 'Compró diplomado y 3 libros.', operator: 'Jorge Ramírez', tag: 'Comprador' },
    { id: 6, name: 'Alejandro Flores', phone: '+52 33 4444-5555', email: 'ale.f@email.com', source: 'WhatsApp Orgánico', segment: 'Tibio', status: 'Seguimiento', score: 57, date: '2026-03-04', notes: 'Pide más información sobre el diplomado.', operator: 'Ana Rodríguez', tag: '' },
    { id: 7, name: 'Laura Castillo', phone: '+52 55 6666-7777', email: 'laura.c@email.com', source: 'YouTube', segment: 'Frío', status: 'Nuevo', score: 35, date: '2026-03-05', notes: 'Vio el webinar completo.', operator: 'Jorge Ramírez', tag: '' },
    { id: 8, name: 'Miguel Torres', phone: '+52 81 8888-9999', email: 'miguel.t@email.com', source: 'Conferencia Guadalajara', segment: 'Caliente', status: 'Cita Agendada', score: 82, date: '2026-03-05', notes: 'Empresario, quiere adquirir paquete corporativo.', operator: 'Ana Rodríguez', tag: 'Corporativo' },
    { id: 9, name: 'Isabel Moreno', phone: '+52 55 1111-2222', email: 'isabel.m@email.com', source: 'Referido', segment: 'Caliente', status: 'Seguimiento', score: 79, date: '2026-03-06', notes: 'Referida por Roberto. Interesada en liderazgo.', operator: 'Luis Martínez', tag: '' },
    { id: 10, name: 'David Ramírez', phone: '+52 33 3333-4444', email: 'david.r@email.com', source: 'TikTok', segment: 'Tibio', status: 'Nuevo', score: 48, date: '2026-03-07', notes: 'Ve contenido constantemente en TikTok.', operator: 'Jorge Ramírez', tag: '' },
    { id: 11, name: 'Fernanda López', phone: '+52 55 5050-5050', email: 'fer.l@email.com', source: 'Facebook Ad', segment: 'Caliente', status: 'Convertido', score: 91, date: '2026-02-25', notes: 'Compró libro y está en lista de espera para diplomado.', operator: 'Ana Rodríguez', tag: 'Comprador' },
    { id: 12, name: 'Andrés Vargas', phone: '+52 81 7070-8080', email: 'andres.v@email.com', source: 'Instagram', segment: 'Frío', status: 'Inactivo', score: 22, date: '2026-02-15', notes: 'Solicitó info, no volvió a contactar.', operator: 'Luis Martínez', tag: '' },
  ],

  // ---- CONFERENCES ------------------------------------------
  conferences: [
    { id: 1, name: 'Conferencia Monterrey', city: 'Monterrey, NL', date: '2026-02-15', attendees: 320, leads: 87, conversions: 24, revenue: 145000, status: 'Completada', organizer: 'Ana Rodríguez', notes: 'Gran respuesta del público. Muchas preguntas sobre el diplomado.' },
    { id: 2, name: 'Conferencia CDMX — Palacio Bellas Artes', city: 'Ciudad de México', date: '2026-02-22', attendees: 510, leads: 142, conversions: 38, revenue: 230000, status: 'Completada', organizer: 'Jorge Ramírez', notes: 'Evento más grande hasta la fecha. Patrocinio de editorial.' },
    { id: 3, name: 'Conferencia Guadalajara', city: 'Guadalajara, JAL', date: '2026-03-08', attendees: 210, leads: 61, conversions: 15, revenue: 89000, status: 'En Curso', organizer: 'Luis Martínez', notes: 'Público muy receptivo, segmento de negocios.' },
    { id: 4, name: 'Conferencia Tijuana', city: 'Tijuana, BC', date: '2026-03-15', attendees: 0, leads: 0, conversions: 0, revenue: 0, status: 'Programada', organizer: 'Ana Rodríguez', notes: 'Pre-inscripciones: 180 personas.' },
    { id: 5, name: 'Webinar Online — Fe & Emprendimiento', city: 'Online', date: '2026-03-20', attendees: 0, leads: 0, conversions: 0, revenue: 0, status: 'Programada', organizer: 'Jorge Ramírez', notes: 'Capacidad: 1000 asistentes. Registro activo.' },
    { id: 6, name: 'Conferencia Puebla', city: 'Puebla, PUE', date: '2026-04-05', attendees: 0, leads: 0, conversions: 0, revenue: 0, status: 'Programada', organizer: 'Luis Martínez', notes: 'Coordinación con iglesia local.' },
  ],

  // ---- SALES -----------------------------------------------
  sales: [
    { id: 1, product: 'Libro Físico', buyer: 'Sofía Herrera', amount: 350, date: '2026-02-28', channel: 'Conferencia', operator: 'Jorge Ramírez' },
    { id: 2, product: 'Diplomado Completo', buyer: 'Sofía Herrera', amount: 8500, date: '2026-02-28', channel: 'Conferencia', operator: 'Jorge Ramírez' },
    { id: 3, product: 'Libro Físico x3', buyer: 'Fernanda López', amount: 1050, date: '2026-02-25', channel: 'Online', operator: 'Ana Rodríguez' },
    { id: 4, product: 'Libro Digital PDF', buyer: 'Carlos Méndez', amount: 180, date: '2026-03-02', channel: 'WhatsApp', operator: 'Luis Martínez' },
    { id: 5, product: 'Diplomado Completo', buyer: 'María González', amount: 8500, date: '2026-03-03', channel: 'Conferencia', operator: 'Ana Rodríguez' },
    { id: 6, product: 'Paquete Corporativo x10', buyer: 'Miguel Torres', amount: 28000, date: '2026-03-06', channel: 'Cita Directa', operator: 'Ana Rodríguez' },
    { id: 7, product: 'Libro Físico', buyer: 'Isabel Moreno', amount: 350, date: '2026-03-06', channel: 'WhatsApp', operator: 'Luis Martínez' },
    { id: 8, product: 'Audiolibro', buyer: 'David Ramírez', amount: 220, date: '2026-03-07', channel: 'Online', operator: 'Jorge Ramírez' },
    { id: 9, product: 'Diplomado Completo', buyer: 'Patricia Vidal', amount: 8500, date: '2026-03-07', channel: 'Referido', operator: 'Ana Rodríguez' },
    { id: 10, product: 'Libro Físico x5', buyer: 'Librería Gandhi', amount: 1500, date: '2026-03-05', channel: 'Distribuidor', operator: 'Luis Martínez' },
  ],

  // ---- DIPLOMADO MODULES -----------------------------------
  diplomadoModules: [
    { id: 1, name: 'Módulo 1: El asedio interior', enrolled: 156, completed: 89, rating: 4.8 },
    { id: 2, name: 'Módulo 2: La fe activa', enrolled: 156, completed: 72, rating: 4.9 },
    { id: 3, name: 'Módulo 3: Esperanza que transforma', enrolled: 156, completed: 58, rating: 4.7 },
    { id: 4, name: 'Módulo 4: Liderazgo espiritual', enrolled: 156, completed: 41, rating: 4.8 },
    { id: 5, name: 'Módulo 5: El memorial de los milagros', enrolled: 156, completed: 24, rating: 0 },
    { id: 6, name: 'Módulo 6: Vivir el epílogo', enrolled: 156, completed: 8, rating: 0 },
  ],

  // ---- LEADERS (Alta probabilidad de conversión VIP) --------
  leaders: [
    { id: 1, name: 'Empresario Carlos Fuentes', company: 'Grupo Fuentes SA', city: 'Monterrey', value: 85000, probability: 95, stage: 'Propuesta Enviada', contact: '+52 81 9000-1111', lastContact: '2026-03-06', notes: 'Quiere paquete empresarial de 50 diplomados para su equipo de líderes.', assigned: 'Ana Rodríguez' },
    { id: 2, name: 'Pastora Rosa Ibáñez', company: 'Red de Iglesias Norte', city: 'Chihuahua', value: 42000, probability: 88, stage: 'Negociación', contact: '+52 61 8000-2222', lastContact: '2026-03-05', notes: 'Interesa distribuir 100 libros entre la comunidad. Requiere descuento especial.', assigned: 'Jorge Ramírez' },
    { id: 3, name: 'Coach Sandra Reyna', company: 'Reyna Coaching', city: 'CDMX', value: 28000, probability: 82, stage: 'Demo/Reunión', contact: '+52 55 7000-3333', lastContact: '2026-03-07', notes: 'Quiere ser revendedora oficial del libro y el diplomado en su comunidad.', assigned: 'Ana Rodríguez' },
    { id: 4, name: 'Editorial Vida Nueva', company: 'Editorial Vida Nueva', city: 'Guadalajara', value: 120000, probability: 70, stage: 'Primer Contacto', contact: '+52 33 6000-4444', lastContact: '2026-03-04', notes: 'Interesada en acuerdo de distribución nacional. Reunión pendiente.', assigned: 'Luis Martínez' },
    { id: 5, name: 'Dr. Marcos Peña', company: 'Clínica Esperanza', city: 'Querétaro', value: 18500, probability: 76, stage: 'Seguimiento', contact: '+52 44 5000-5555', lastContact: '2026-03-03', notes: 'Médico que quiere donar libros a pacientes en recuperación.', assigned: 'Jorge Ramírez' },
  ],

  // ---- OPERATORS -------------------------------------------
  operators: [
    { name: 'Ana Rodríguez', role: 'Líder de Ventas', leads: 42, conversions: 18, revenue: 98500, avatar: 'AR' },
    { name: 'Luis Martínez', role: 'Embudo Orgánico', leads: 28, conversions: 9, revenue: 34200, avatar: 'LM' },
    { name: 'Jorge Ramírez', role: 'Eventos & Conferencias', leads: 35, conversions: 14, revenue: 76800, avatar: 'JR' },
  ],

  // ---- WEEKLY METRICS (for charts) --------------------------
  weeklyLeads: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    values: [12, 19, 8, 24, 17, 32, 9],
  },

  monthlyRevenue: {
    labels: ['Ene', 'Feb', 'Mar'],
    values: [180000, 320000, 290000],
  },

  conversionFunnel: {
    stages: ['Nuevos', 'Contactados', 'Calificados', 'Cita', 'Convertidos'],
    values: [180, 120, 80, 48, 32],
  },

  sourceBreakdown: {
    labels: ['Conferencia', 'Instagram', 'Facebook Ad', 'Referido', 'WhatsApp', 'YouTube', 'TikTok'],
    values: [38, 22, 18, 12, 6, 2, 2],
    colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#f87171', '#a78bfa'],
  },

  productRevenue: {
    labels: ['Diplomado', 'Libro Físico', 'Paquete Corp.', 'Libro Digital', 'Audiolibro'],
    values: [25500, 5250, 28000, 180, 220],
    colors: ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'],
  },

  // ---- AUTOMATION FLOWS ------------------------------------
  flows: [
    { id: 1, name: 'Bienvenida Nuevo Lead', trigger: 'Lead registrado', steps: 5, sent: 342, opened: 287, converted: 48, active: true },
    { id: 2, name: 'Seguimiento Post-Conferencia', trigger: 'Asistió a conferencia', steps: 7, sent: 510, opened: 412, converted: 76, active: true },
    { id: 3, name: 'Reactivación Leads Fríos', trigger: '14 días sin respuesta', steps: 3, sent: 89, opened: 34, converted: 8, active: true },
    { id: 4, name: 'Onboarding Diplomado', trigger: 'Compra diplomado', steps: 12, sent: 156, opened: 148, converted: 0, active: true },
    { id: 5, name: 'Reporte Semanal VIP', trigger: 'Cada lunes 8am', steps: 1, sent: 24, opened: 22, converted: 0, active: true },
  ],

  // ---- ACTIVITY FEED --------------------------------------
  activities: [
    { time: 'Hace 5 min', text: '<strong>María González</strong> agendó cita para mañana 10am', color: '#8b5cf6', type: 'cita' },
    { time: 'Hace 18 min', text: '<strong>Miguel Torres</strong> firmó contrato corporativo — $28,000 MXN', color: '#10b981', type: 'venta' },
    { time: 'Hace 1 hora', text: 'Nuevo lead: <strong>David Ramírez</strong> vía TikTok', color: '#06b6d4', type: 'lead' },
    { time: 'Hace 2 horas', text: '<strong>Patricia Vidal</strong> completó Módulo 2 del Diplomado', color: '#ec4899', type: 'diplomado' },
    { time: 'Hace 3 horas', text: 'Flow <strong>Reactivación Leads Fríos</strong> envió 12 mensajes', color: '#f59e0b', type: 'flow' },
    { time: 'Ayer 15:30', text: '<strong>Editorial Vida Nueva</strong> solicitó reunión de negociación', color: '#a78bfa', type: 'lider' },
  ],
};

// ---- Computed Aggregates & Functions -----------------------
CAMP.recalculateTotals = function () {
  CAMP.totals = {
    leads: CAMP.leads.length,
    hotLeads: CAMP.leads.filter(l => l.segment === 'Caliente').length,
    converted: CAMP.leads.filter(l => l.status === 'Convertido').length,
    revenue: CAMP.sales.reduce((s, x) => s + x.amount, 0),
    conferences: CAMP.conferences.filter(c => c.status !== 'Programada').length,
    upcomingConferences: CAMP.conferences.filter(c => c.status === 'Programada').length,
    diplomadoEnrolled: CAMP.diplomadoModules[0] ? CAMP.diplomadoModules[0].enrolled : 0,
    vipPipeline: CAMP.leaders.reduce((s, l) => s + l.value, 0),
  };
  CAMP.conversionRate = CAMP.totals.leads > 0 ? Math.round((CAMP.totals.converted / CAMP.totals.leads) * 100) : 0;
};

CAMP.resetAll = function () {
  localStorage.setItem('camp_is_zero', '1');
  CAMP.leads = [];
  CAMP.conferences = [];
  CAMP.sales = [];
  CAMP.diplomadoModules = [];
  CAMP.leaders = [];
  CAMP.operators = [];
  CAMP.weeklyLeads.values = [0, 0, 0, 0, 0, 0, 0];
  CAMP.monthlyRevenue.values = [0, 0, 0];
  CAMP.conversionFunnel.values = [0, 0, 0, 0, 0];
  CAMP.sourceBreakdown.values = [0, 0, 0, 0, 0, 0, 0];
  CAMP.productRevenue.values = [0, 0, 0, 0, 0];
  CAMP.flows = [];
  CAMP.activities = [];
  CAMP.recalculateTotals();
};

if (localStorage.getItem('camp_is_zero') === '1') {
  CAMP.resetAll();
} else {
  CAMP.recalculateTotals();
}
