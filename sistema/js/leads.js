// ============================================================
//  LEADS VIEW — Tabla de Prospectos + Filtros + Segmentación
// ============================================================

const LeadsView = (() => {
  let filtered = [...CAMP.leads];
  let sortKey = 'score';
  let sortDir = -1;

  function render() {
    const el = document.getElementById('view-leads');
    filtered = [...CAMP.leads];
    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">Leads & Prospectos</div>
          <div class="section-sub">${CAMP.leads.length} contactos · ${CAMP.totals.hotLeads} calientes · ${CAMP.totals.converted} convertidos</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" id="addLeadBtn">+ Nuevo Lead</button>
        </div>
      </div>

      <!-- Segment Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:20px">
        ${segmentCard('🔥', 'Calientes', CAMP.leads.filter(l=>l.segment==='Caliente').length, '#ef4444', 'Caliente')}
        ${segmentCard('🌡️', 'Tibios', CAMP.leads.filter(l=>l.segment==='Tibio').length, '#f59e0b', 'Tibio')}
        ${segmentCard('❄️', 'Fríos', CAMP.leads.filter(l=>l.segment==='Frío').length, '#06b6d4', 'Frío')}
        ${segmentCard('✅', 'Convertidos', CAMP.leads.filter(l=>l.status==='Convertido').length, '#10b981', null, 'Convertido')}
        ${segmentCard('📅', 'Citas Agendadas', CAMP.leads.filter(l=>l.status==='Cita Agendada').length, '#8b5cf6', null, 'Cita Agendada')}
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <div class="filter-input" style="flex:1;min-width:180px">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 9l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input type="text" placeholder="Buscar por nombre, teléfono, email..." id="leadSearch" />
        </div>
        <select class="filter-select" id="filterSegment">
          <option value="">Todos los segmentos</option>
          <option value="Caliente">🔥 Caliente</option>
          <option value="Tibio">🌡️ Tibio</option>
          <option value="Frío">❄️ Frío</option>
        </select>
        <select class="filter-select" id="filterStatus">
          <option value="">Todos los estados</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Seguimiento">En Seguimiento</option>
          <option value="Cita Agendada">Cita Agendada</option>
          <option value="Convertido">Convertido</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <select class="filter-select" id="filterOperator">
          <option value="">Todos los operadores</option>
          ${CAMP.operators.map(o => `<option value="${o.name}">${o.name}</option>`).join('')}
        </select>
        <select class="filter-select" id="filterSource">
          <option value="">Todas las fuentes</option>
          ${[...new Set(CAMP.leads.map(l=>l.source))].map(s => `<option value="${s}">${s}</option>`).join('')}
        </select>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table id="leadsTable">
          <thead>
            <tr>
              <th>Contacto</th>
              <th style="cursor:pointer" data-sort="segment">Segmento</th>
              <th style="cursor:pointer" data-sort="status">Estado</th>
              <th style="cursor:pointer" data-sort="score">Score ↕</th>
              <th>Fuente</th>
              <th>Operador</th>
              <th style="cursor:pointer" data-sort="date">Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="leadsBody"></tbody>
        </table>
      </div>
      <div id="leadsPagination" style="margin-top:16px;text-align:center;color:var(--text-muted);font-size:13px"></div>
    `;

    renderTable();
    bindEvents(el);
  }

  function segmentCard(icon, label, count, color, seg, status) {
    return `
      <div class="kpi-card" style="cursor:pointer" onclick="document.getElementById('filterSegment').value='${seg||''}';document.getElementById('filterStatus').value='${status||''}';LeadsView.applyFilters()">
        <div style="font-size:22px;margin-bottom:8px">${icon}</div>
        <div style="font-size:24px;font-weight:800;color:${color}">${count}</div>
        <div style="font-size:12px;color:var(--text-secondary)">${label}</div>
      </div>
    `;
  }

  function renderTable() {
    const tbody = document.getElementById('leadsBody');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">Sin resultados</div><div class="empty-sub">Ajusta los filtros para ver más leads</div></div></td></tr>`;
      return;
    }

    const sorted = [...filtered].sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return va < vb ? sortDir : va > vb ? -sortDir : 0;
    });

    tbody.innerHTML = sorted.map(l => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar">${l.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div>
              <div style="font-weight:600">${l.name}</div>
              <div class="td-sub">${l.phone}</div>
            </div>
          </div>
        </td>
        <td>${App.segmentPill(l.segment)}</td>
        <td>${App.statusPill(l.status)}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:700;color:${l.score>=80?'var(--emerald-400)':l.score>=55?'var(--amber-400)':'var(--red-400)'}">${l.score}</span>
            <div style="flex:1;height:4px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden;width:48px">
              <div style="height:100%;width:${l.score}%;background:${l.score>=80?'var(--emerald-400)':l.score>=55?'var(--amber-400)':'var(--red-400)'};border-radius:99px"></div>
            </div>
          </div>
        </td>
        <td><span class="td-muted">${l.source}</span></td>
        <td><span class="td-muted">${l.operator}</span></td>
        <td><span class="td-muted">${App.formatDate(l.date)}</span></td>
        <td>
          <div style="display:flex;gap:4px">
            <button class="btn btn-secondary btn-sm" onclick="LeadsView.viewLead(${l.id})">Ver</button>
            <button class="btn btn-ghost btn-sm" onclick="LeadsView.scheduleCall(${l.id})">📞</button>
          </div>
        </td>
      </tr>
    `).join('');

    document.getElementById('leadsPagination').textContent = `Mostrando ${sorted.length} de ${CAMP.leads.length} leads`;
  }

  function bindEvents(el) {
    // Search
    el.querySelector('#leadSearch')?.addEventListener('input', () => applyFilters());

    // Filters
    ['filterSegment', 'filterStatus', 'filterOperator', 'filterSource'].forEach(id => {
      el.querySelector(`#${id}`)?.addEventListener('change', () => applyFilters());
    });

    // Sort headers
    el.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        if (sortKey === th.dataset.sort) sortDir *= -1;
        else { sortKey = th.dataset.sort; sortDir = -1; }
        renderTable();
      });
    });

    // Add lead
    el.querySelector('#addLeadBtn')?.addEventListener('click', () => openAddModal());
  }

  function applyFilters() {
    const q = document.getElementById('leadSearch')?.value.toLowerCase() || '';
    const seg = document.getElementById('filterSegment')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';
    const operator = document.getElementById('filterOperator')?.value || '';
    const source = document.getElementById('filterSource')?.value || '';

    filtered = CAMP.leads.filter(l => {
      const matchQ = !q || l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.email.toLowerCase().includes(q);
      const matchSeg = !seg || l.segment === seg;
      const matchSt = !status || l.status === status;
      const matchOp = !operator || l.operator === operator;
      const matchSrc = !source || l.source === source;
      return matchQ && matchSeg && matchSt && matchOp && matchSrc;
    });

    renderTable();
  }

  function viewLead(id) {
    const l = CAMP.leads.find(x => x.id === id);
    if (!l) return;
    const body = `
      <div style="display:grid;gap:14px">
        <div style="display:flex;align-items:center;gap:14px">
          <div class="avatar avatar-lg">${l.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
          <div>
            <div style="font-size:18px;font-weight:700">${l.name}</div>
            <div style="color:var(--text-muted);font-size:13px">${l.email}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><div class="form-label">Teléfono</div><div>${l.phone}</div></div>
          <div><div class="form-label">Fuente</div><div>${l.source}</div></div>
          <div><div class="form-label">Segmento</div><div>${App.segmentPill(l.segment)}</div></div>
          <div><div class="form-label">Estado</div><div>${App.statusPill(l.status)}</div></div>
          <div><div class="form-label">Score</div><div style="font-weight:700;font-size:20px;color:${l.score>=80?'var(--emerald-400)':l.score>=55?'var(--amber-400)':'var(--red-400)'}">${l.score}/100</div></div>
          <div><div class="form-label">Operador</div><div>${l.operator}</div></div>
          <div><div class="form-label">Fecha de ingreso</div><div>${App.formatDate(l.date)}</div></div>
          ${l.tag ? `<div><div class="form-label">Etiqueta</div><div><span class="pill pill-purple">${l.tag}</span></div></div>` : ''}
        </div>
        <div>
          <div class="form-label">Notas</div>
          <div style="background:var(--bg-glass);padding:12px;border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);border:1px solid var(--border)">${l.notes}</div>
        </div>
      </div>
    `;
    App.openModal(`👤 ${l.name}`, body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cerrar</button>
       <button class="btn btn-primary" onclick="App.closeModal();App.toast('Seguimiento registrado','success')">✉️ Registrar Seguimiento</button>`
    );
  }

  function scheduleCall(id) {
    const l = CAMP.leads.find(x => x.id === id);
    if (!l) return;
    App.toast(`📞 Llamada agendada con ${l.name}`, 'success');
  }

  function openAddModal() {
    const body = `
      <div class="form-group"><label class="form-label">Nombre completo *</label><input class="form-input" id="newName" placeholder="Ej. Juan García" /></div>
      <div class="form-group"><label class="form-label">Teléfono *</label><input class="form-input" id="newPhone" placeholder="+52 55 0000-0000" /></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="newEmail" type="email" placeholder="correo@email.com" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Segmento</label>
          <select class="form-input"><option>Frío</option><option>Tibio</option><option>Caliente</option></select>
        </div>
        <div class="form-group"><label class="form-label">Fuente</label>
          <select class="form-input"><option>Instagram</option><option>Facebook Ad</option><option>Conferencia</option><option>Referido</option><option>WhatsApp Orgánico</option></select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Notas</label><textarea class="form-input" placeholder="Observaciones iniciales..."></textarea></div>
    `;
    App.openModal('➕ Nuevo Lead', body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
       <button class="btn btn-primary" onclick="App.closeModal();App.toast('Lead registrado exitosamente','success')">Guardar Lead</button>`
    );
  }

  return { render, applyFilters, viewLead, scheduleCall };
})();
