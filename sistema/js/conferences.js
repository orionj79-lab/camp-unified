// ============================================================
//  CONFERENCES VIEW — Gestión de Eventos y Talleres
// ============================================================

const ConferencesView = (() => {

  function render() {
    const el = document.getElementById('view-conferences');
    const completed = CAMP.conferences.filter(c => c.status === 'Completada');
    const totalAttendees = completed.reduce((s, c) => s + c.attendees, 0);
    const totalRevenue = completed.reduce((s, c) => s + c.revenue, 0);
    const totalLeads = completed.reduce((s, c) => s + c.leads, 0);

    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">Conferencias & Eventos</div>
          <div class="section-sub">${CAMP.conferences.length} eventos · ${CAMP.totals.upcomingConferences} programados</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" onclick="ConferencesView.openNewConferenceModal()">+ Nueva Conferencia</button>
        </div>
      </div>

      <!-- Summary KPIs -->
      <div class="kpi-grid" style="margin-bottom:24px">
        <div class="kpi-card purple">
          <div class="kpi-icon purple">🎤</div>
          <div class="kpi-value purple">${CAMP.conferences.length}</div>
          <div class="kpi-label">Total Eventos</div>
        </div>
        <div class="kpi-card cyan">
          <div class="kpi-icon cyan">👥</div>
          <div class="kpi-value cyan">${totalAttendees.toLocaleString()}</div>
          <div class="kpi-label">Asistentes Totales</div>
        </div>
        <div class="kpi-card pink">
          <div class="kpi-icon pink">📥</div>
          <div class="kpi-value pink">${totalLeads}</div>
          <div class="kpi-label">Leads Generados</div>
        </div>
        <div class="kpi-card amber">
          <div class="kpi-icon amber">💰</div>
          <div class="kpi-value amber" style="font-size:22px">${App.formatCurrency(totalRevenue)}</div>
          <div class="kpi-label">Ingresos en Eventos</div>
        </div>
      </div>

      <!-- Conference Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-bottom:28px">
        ${CAMP.conferences.map(c => conferenceCard(c)).join('')}
      </div>

      <!-- Chart: Leads por Conferencia -->
      <div class="chart-card">
        <div class="chart-title">Leads y Conversiones por Evento</div>
        <div class="chart-sub">Comparativo de rendimiento de conferencias completadas</div>
        <div class="chart-wrap" style="max-height:260px"><canvas id="chart-conf-performance"></canvas></div>
      </div>
    `;

    renderChart();
    setTimeout(() => bindModal(), 100);
  }

  function conferenceCard(c) {
    const statusMap = {
      'Completada': { pill: 'pill-green', icon: '✅' },
      'En Curso': { pill: 'pill-amber', icon: '🟡' },
      'Programada': { pill: 'pill-cyan', icon: '📅' },
    };
    const s = statusMap[c.status] || { pill: 'pill-gray', icon: '•' };
    const convRate = c.attendees > 0 ? Math.round((c.conversions / c.attendees) * 100) : 0;

    return `
      <div class="card glow-on-hover" style="cursor:pointer" onclick="ConferencesView.viewConference(${c.id})">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px">
          <div style="flex:1;padding-right:12px">
            <div style="font-weight:700;font-size:15px;margin-bottom:4px">${c.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">📍 ${c.city} · 📅 ${App.formatDate(c.date)}</div>
          </div>
          <span class="pill ${s.pill}">${s.icon} ${c.status}</span>
        </div>

        ${c.status !== 'Programada' ? `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">
            <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
              <div style="font-weight:700;font-size:18px;color:var(--purple-400)">${c.attendees.toLocaleString()}</div>
              <div style="font-size:10px;color:var(--text-muted)">Asistentes</div>
            </div>
            <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
              <div style="font-weight:700;font-size:18px;color:var(--cyan-400)">${c.leads}</div>
              <div style="font-size:10px;color:var(--text-muted)">Leads</div>
            </div>
            <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
              <div style="font-weight:700;font-size:18px;color:var(--emerald-400)">${c.conversions}</div>
              <div style="font-size:10px;color:var(--text-muted)">Ventas</div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">Tasa de conversión: <strong style="color:var(--amber-400)">${convRate}%</strong></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${convRate}%"></div></div>
        ` : `
          <div style="padding:14px;background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary)">
            📋 ${c.notes}
          </div>
        `}

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px">
          <div style="font-size:11px;color:var(--text-muted)">👤 ${c.organizer}</div>
          ${c.status === 'Completada' ? `<div style="font-size:13px;font-weight:600;color:var(--amber-400)">${App.formatCurrency(c.revenue)}</div>` : ''}
        </div>
      </div>
    `;
  }

  function renderChart() {
    const data = CAMP.conferences.filter(c => c.status !== 'Programada');
    App.registerChart('chart-conf-performance', {
      type: 'bar',
      data: {
        labels: data.map(c => c.name.replace('Conferencia ', '').replace('Webinar Online — ', 'Webinar ')),
        datasets: [
          {
            label: 'Leads',
            data: data.map(c => c.leads),
            backgroundColor: 'rgba(139,92,246,0.6)',
            borderRadius: 6,
          },
          {
            label: 'Conversiones',
            data: data.map(c => c.conversions),
            backgroundColor: 'rgba(16,185,129,0.6)',
            borderRadius: 6,
          },
          {
            label: 'Asistentes / 10',
            data: data.map(c => Math.round(c.attendees / 10)),
            backgroundColor: 'rgba(6,182,212,0.4)',
            borderRadius: 6,
          }
        ]
      },
      options: {
        plugins: { legend: { labels: { boxWidth: 12, font: { size: 11 } } } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function viewConference(id) {
    const c = CAMP.conferences.find(x => x.id === id);
    if (!c) return;
    const roi = c.revenue > 0 ? Math.round((c.revenue / (c.attendees * 50)) * 100) : 0;
    const body = `
      <div style="display:grid;gap:14px">
        <div style="display:flex;justify-content:space-between">
          <div>
            <div style="font-size:16px;font-weight:700">${c.name}</div>
            <div style="font-size:13px;color:var(--text-muted)">📍 ${c.city} · 📅 ${App.formatDate(c.date)}</div>
          </div>
          <span class="pill ${c.status === 'Completada' ? 'pill-green' : c.status === 'En Curso' ? 'pill-amber' : 'pill-cyan'}">${c.status}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          <div style="text-align:center;padding:14px;background:var(--bg-glass);border-radius:var(--radius-sm)">
            <div style="font-size:24px;font-weight:800;color:var(--purple-400)">${c.attendees.toLocaleString()}</div>
            <div style="font-size:11px;color:var(--text-muted)">Asistentes</div>
          </div>
          <div style="text-align:center;padding:14px;background:var(--bg-glass);border-radius:var(--radius-sm)">
            <div style="font-size:24px;font-weight:800;color:var(--cyan-400)">${c.leads}</div>
            <div style="font-size:11px;color:var(--text-muted)">Leads captados</div>
          </div>
          <div style="text-align:center;padding:14px;background:var(--bg-glass);border-radius:var(--radius-sm)">
            <div style="font-size:24px;font-weight:800;color:var(--emerald-400)">${c.conversions}</div>
            <div style="font-size:11px;color:var(--text-muted)">Ventas</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><div class="form-label">Organizador</div><div>${c.organizer}</div></div>
          <div><div class="form-label">Ingresos</div><div style="font-weight:700;color:var(--amber-400)">${App.formatCurrency(c.revenue)}</div></div>
        </div>
        <div><div class="form-label">Notas del Evento</div>
          <div style="background:var(--bg-glass);padding:12px;border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);border:1px solid var(--border)">${c.notes}</div>
        </div>
      </div>
    `;
    App.openModal(`🎤 ${c.name}`, body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cerrar</button>
       <button class="btn btn-primary" onclick="ConferencesView.exportConference(${c.id})">📊 Exportar Reporte</button>`
    );
  }

  function openNewConferenceModal() {
    const body = `
      <div class="form-group"><label class="form-label">Nombre del evento *</label><input id="newConfName" class="form-input" placeholder="Ej. Conferencia Cancún" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Ciudad</label><input id="newConfCity" class="form-input" placeholder="Ciudad, Estado" /></div>
        <div class="form-group"><label class="form-label">Fecha</label><input id="newConfDate" class="form-input" type="date" /></div>
      </div>
      <div class="form-group"><label class="form-label">Organizador</label>
        <input id="newConfOrganizer" list="organizerOptions" class="form-input" placeholder="Nombre completo" />
        <datalist id="organizerOptions">${CAMP.operators.map(o => `<option value="${o.name}"></option>`).join('')}</datalist>
      </div>
      <div class="form-group"><label class="form-label">Notas</label><textarea id="newConfNotes" class="form-input" placeholder="Detalles iniciales..."></textarea></div>
    `;
    App.openModal('🎤 Nueva Conferencia', body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
       <button class="btn btn-primary" onclick="ConferencesView.saveNewConference()">Guardar Evento</button>`
    );
  }

  function saveNewConference() {
    const name = document.getElementById('newConfName').value.trim();
    if (!name) return App.toast('Agrega el nombre del evento', 'error');

    const newConf = {
      id: CAMP.conferences.length > 0 ? Math.max(...CAMP.conferences.map(c => c.id)) + 1 : 1,
      name: name,
      city: document.getElementById('newConfCity').value.trim() || 'Por definir',
      date: document.getElementById('newConfDate').value || new Date().toISOString().split('T')[0],
      attendees: 0,
      leads: 0,
      conversions: 0,
      revenue: 0,
      status: 'Programada',
      organizer: document.getElementById('newConfOrganizer').value,
      notes: document.getElementById('newConfNotes').value.trim() || 'Sin notas.'
    };

    CAMP.conferences.push(newConf);
    CAMP.recalculateTotals();
    App.closeModal();
    App.toast('Conferencia agendada exitosamente', 'success');
    render();
  }

  function exportConference(id) {
    const c = CAMP.conferences.find(x => x.id === id);
    if (!c) return;

    const csvRows = [
      ['ID', 'Evento', 'Ciudad', 'Fecha', 'Estatus', 'Organizador', 'Asistentes', 'Leads', 'Ventas', 'Ingresos MXN', 'Notas'],
      [c.id, `"${c.name}"`, `"${c.city}"`, c.date, c.status, `"${c.organizer}"`, c.attendees, c.leads, c.conversions, c.revenue, `"${c.notes.replace(/\n/g, ' ')}"`]
    ];

    const csvContent = "\uFEFF" + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Reporte_Conferencia_${c.id}_${c.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      App.closeModal();
      App.toast('Reporte CSV descargado correctamente', 'success');
    }, 200);
  }

  function bindModal() {
    // Cards are inlined with onclick
  }

  return { render, viewConference, openNewConferenceModal, saveNewConference, exportConference };
})();
