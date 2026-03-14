// ============================================================
//  CONFIG VIEW — Integraciones, APIs, Templates
// ============================================================

const ConfigView = (() => {

  function render() {
    const el = document.getElementById('view-config');
    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">Configuración del Sistema</div>
          <div class="section-sub">Integraciones, APIs, flujos y plantillas de comunicación</div>
        </div>
      </div>

      <!-- Integrations Status -->
      <div class="config-section">
        <div class="config-title">🔌 Integraciones & APIs</div>
        <div class="config-grid">
          ${configItem('💬', 'WhatsApp Business API', 'Via WABA — Meta Cloud API', 'on', 'rgba(37,211,102,0.15)')}
          ${configItem('🤖', 'Chatbot n8n', 'Flujos de automatización activos', 'on', 'rgba(139,92,246,0.15)')}
          ${configItem('🔥', 'Firebase Firestore', 'Base de datos en tiempo real', 'on', 'rgba(255,160,0,0.15)')}
          ${configItem('📧', 'Email Marketing (Mailchimp)', 'Campañas y seguimiento automático', 'on', 'rgba(255,230,0,0.15)')}
          ${configItem('📊', 'Google Sheets Sync', 'Sincronización de leads en tiempo real', 'pending', 'rgba(66,133,244,0.15)')}
          ${configItem('📱', 'Telegram Notifications', 'Alertas para el equipo', 'on', 'rgba(0,136,204,0.15)')}
          ${configItem('💳', 'Stripe / MercadoPago', 'Procesamiento de pagos', 'pending', 'rgba(99,91,255,0.15)')}
          ${configItem('📅', 'Calendly / Cal.com', 'Agendado automático de citas', 'off', 'rgba(0,0,0,0.2)')}
        </div>
      </div>

      <!-- Auto-flow Templates -->
      <div class="config-section">
        <div class="config-title">📨 Plantillas de Mensajes Automáticos</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${template('🙋', 'Bienvenida a Nuevo Lead', 'Hola [NOMBRE], gracias por tu interés en "Esperando contra toda esperanza" de J.J. Vargas. Esta historia transformó mi vida y estoy seguro de que también la tuya. ¿Tienes 5 minutos para platicar?', 'WhatsApp · Inmediato al registro', 'pill-green')}
          ${template('🎤', 'Seguimiento Post-Conferencia', 'Hola [NOMBRE], fue un gusto tenerte en la conferencia de [CIUDAD]. ¿Qué parte del mensaje te impactó más? Tenemos una oferta especial por 48 horas para quienes asistieron.', 'WhatsApp · 2 horas post-evento', 'pill-purple')}
          ${template('❄️', 'Reactivación Lead Frío', 'Hola [NOMBRE], ¿cómo estás? Hace un tiempo hablamos sobre el libro. Justo esta semana tenemos algo especial que creo te puede interesar. ¿Puedo compartírtelo?', 'WhatsApp · Día 14 sin respuesta', 'pill-cyan')}
          ${template('🎉', 'Confirmación de Venta', '¡Felicidades [NOMBRE]! Tu acceso al Diplomado "Esperando contra toda esperanza" está activado. Aquí está tu link de acceso: [LINK]. Bienvenido a la comunidad.', 'Email + WhatsApp · Compra completada', 'pill-amber')}
          ${template('📊', 'Reporte Semanal VIP', 'Reporte semana [SEMANA]: [X] nuevos leads, [Y] conversiones, [Z] ingresos. Top conferencia: [CONF]. Próximos eventos: [EVENTOS]. — Equipo CAMP', 'Email · Cada lunes 8am', 'pill-pink')}
        </div>
      </div>

      <!-- System Config -->
      <div class="config-section">
        <div class="config-title">⚙️ Parámetros del Sistema</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
          ${paramCard('Lead Score Mínimo Caliente', '75', '0 – 100 puntos')}
          ${paramCard('Días sin respuesta para reactivación', '14', 'Días calendario')}
          ${paramCard('Descuento máximo autorizado', '25%', 'Sin apro. gerencial')}
          ${paramCard('Precio base Diplomado', '$8,500 MXN', 'Sin descuentos')}
          ${paramCard('Meta Leads/semana', '20', 'KPI primario')}
          ${paramCard('Hora reporte automático', '8:00 AM', 'Zona horaria CDMX')}
        </div>
      </div>

      <!-- About -->
      <div class="card" style="background:linear-gradient(135deg,rgba(139,92,246,0.08),rgba(236,72,153,0.06));border-color:var(--border-purple);padding:24px">
        <div style="display:flex;align-items:center;gap:16px">
          <div style="font-size:40px">📖</div>
          <div>
            <div style="font-size:15px;font-weight:700;margin-bottom:4px">Esperando contra toda esperanza</div>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">J.J. Vargas · Sistema de Seguimiento Digital v1.0</div>
            <div style="font-size:12px;color:var(--text-secondary)">
              ✅ Dashboard KPIs · ✅ Gestión de Leads · ✅ Conferencias · ✅ Ventas & Diplomado · ✅ Líderes VIP · ✅ Reportes Automáticos · ✅ Flujos WhatsApp
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function configItem(icon, name, desc, status, bg) {
    const statusMap = { on: 'Conectado', off: 'Desconectado', pending: 'Pendiente' };
    const dotClass = { on: 'on', off: 'off', pending: 'pending' };
    return `
      <div class="config-item" onclick="App.toast('${name}: click para configurar','info')">
        <div class="config-item-icon" style="background:${bg};font-size:22px">${icon}</div>
        <div class="config-item-info">
          <div class="config-item-name">${name}</div>
          <div class="config-item-desc">${desc}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <div class="config-status-dot ${dotClass[status]}"></div>
          <span style="font-size:11px;color:${status==='on'?'var(--emerald-400)':status==='pending'?'var(--amber-400)':'var(--red-400)'}">${statusMap[status]}</span>
        </div>
      </div>
    `;
  }

  function template(icon, name, text, trigger, pillClass) {
    return `
      <div class="card card-sm" style="cursor:pointer" onclick="App.toast('Plantilla copiada al portapapeles','success')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <div style="font-weight:600;font-size:14px">${icon} ${name}</div>
          <span class="pill ${pillClass}" style="font-size:10px;flex-shrink:0;margin-left:8px">Activo</span>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);line-height:1.5;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">"${text}"</div>
        <div style="font-size:11px;color:var(--text-muted)">⚡ ${trigger}</div>
      </div>
    `;
  }

  function paramCard(label, value, note) {
    return `
      <div class="card card-sm" style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="App.toast('Parámetro editable en la versión con Firebase','info')">
        <div>
          <div style="font-size:13px;font-weight:500">${label}</div>
          <div style="font-size:11px;color:var(--text-muted)">${note}</div>
        </div>
        <div style="font-size:18px;font-weight:800;color:var(--purple-400)">${value}</div>
      </div>
    `;
  }

  return { render };
})();
