// ============================================================
//  LEADERS VIEW — Pipeline VIP de Alto Valor
// ============================================================

const LeadersView = (() => {

  function render() {
    const el = document.getElementById('view-leaders');
    const totalPipeline = CAMP.leaders.reduce((s, l) => s + l.value, 0);
    const avgProb = Math.round(CAMP.leaders.reduce((s, l) => s + l.probability, 0) / CAMP.leaders.length);

    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">⭐ Líderes VIP — Pipeline de Alto Valor</div>
          <div class="section-sub">${CAMP.leaders.length} oportunidades · Pipeline ${App.formatCurrency(totalPipeline)}</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" onclick="LeadersView.openAddModal()">+ Nuevo Líder VIP</button>
        </div>
      </div>

      <!-- Summary -->
      <div class="kpi-grid" style="margin-bottom:24px">
        <div class="kpi-card purple">
          <div class="kpi-icon purple">🎯</div>
          <div class="kpi-value purple">${CAMP.leaders.length}</div>
          <div class="kpi-label">Oportunidades VIP</div>
        </div>
        <div class="kpi-card amber">
          <div class="kpi-icon amber">💎</div>
          <div class="kpi-value amber" style="font-size:18px">${App.formatCurrency(totalPipeline)}</div>
          <div class="kpi-label">Pipeline Total</div>
        </div>
        <div class="kpi-card green">
          <div class="kpi-icon green">📈</div>
          <div class="kpi-value green">${avgProb}%</div>
          <div class="kpi-label">Probabilidad Media</div>
        </div>
        <div class="kpi-card cyan">
          <div class="kpi-icon cyan">⚡</div>
          <div class="kpi-value cyan">${App.formatCurrency(Math.round(totalPipeline * avgProb / 100))}</div>
          <div class="kpi-label">Valor Esperado</div>
          <div class="kpi-sub">Pipeline × probabilidad</div>
        </div>
      </div>

      <!-- Stage pipeline visual -->
      <div class="section-header"><div class="section-title">Etapas del Pipeline</div></div>
      <div class="pipeline" style="margin-bottom:28px">
        ${['Primer Contacto','Demo/Reunión','Seguimiento','Negociación','Propuesta Enviada'].map(stage => {
          const inStage = CAMP.leaders.filter(l => l.stage === stage);
          return `
            <div class="pipeline-stage">
              <div class="pipeline-count" style="color:var(--purple-400)">${inStage.length}</div>
              <div class="pipeline-label" style="font-size:11px">${stage}</div>
              <div class="pipeline-pct" style="color:var(--text-muted);font-size:10px">${App.formatCurrency(inStage.reduce((s,l)=>s+l.value,0))}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Leader Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px">
        ${CAMP.leaders.map(l => leaderCard(l)).join('')}
      </div>
    `;
  }

  function leaderCard(l) {
    const stageColors = {
      'Primer Contacto': 'pill-cyan',
      'Demo/Reunión': 'pill-purple',
      'Seguimiento': 'pill-amber',
      'Negociación': 'pill-pink',
      'Propuesta Enviada': 'pill-green',
    };

    return `
      <div class="card glow-on-hover" style="cursor:pointer" onclick="LeadersView.viewLeader(${l.id})">
        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px">
          <div style="display:flex;gap:12px;align-items:flex-start">
            <div class="avatar">${l.name.split(' ').slice(-2).map(n=>n[0]).join('')}</div>
            <div>
              <div style="font-weight:700;font-size:15px">${l.name}</div>
              <div style="font-size:12px;color:var(--text-muted)">${l.company}</div>
              <div style="font-size:11px;color:var(--text-muted)">📍 ${l.city}</div>
            </div>
          </div>
          <span class="pill ${stageColors[l.stage] || 'pill-gray'}" style="font-size:10px;white-space:nowrap">${l.stage}</span>
        </div>

        <!-- Value & Probability -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px">Valor Potencial</div>
            <div style="font-size:20px;font-weight:800;color:var(--amber-400)">${App.formatCurrency(l.value)}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:2px">Probabilidad</div>
            <div style="font-size:24px;font-weight:800;color:${l.probability>=85?'var(--emerald-400)':l.probability>=70?'var(--amber-400)':'var(--purple-400)'}">${l.probability}%</div>
          </div>
        </div>

        <div class="progress-bar" style="margin-bottom:12px">
          <div class="progress-fill" style="width:${l.probability}%;background:${l.probability>=85?'var(--grad-green)':'var(--grad-brand)'}"></div>
        </div>

        <!-- Notes & Meta -->
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${l.notes}</div>

        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid var(--border)">
          <div style="font-size:11px;color:var(--text-muted)">👤 ${l.assigned}</div>
          <div style="font-size:11px;color:var(--text-muted)">Último contacto: ${App.formatDate(l.lastContact)}</div>
        </div>
      </div>
    `;
  }

  function viewLeader(id) {
    const l = CAMP.leaders.find(x => x.id === id);
    if (!l) return;
    const body = `
      <div style="display:grid;gap:14px">
        <div style="display:flex;gap:14px;align-items:center">
          <div class="avatar avatar-lg">${l.name.split(' ').slice(-2).map(n=>n[0]).join('')}</div>
          <div>
            <div style="font-size:17px;font-weight:700">${l.name}</div>
            <div style="font-size:13px;color:var(--text-muted)">${l.company} · ${l.city}</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><div class="form-label">Valor Potencial</div><div style="font-weight:800;font-size:20px;color:var(--amber-400)">${App.formatCurrency(l.value)}</div></div>
          <div><div class="form-label">Probabilidad de Cierre</div><div style="font-weight:800;font-size:20px;color:${l.probability>=85?'var(--emerald-400)':'var(--purple-400)'}">${l.probability}%</div></div>
          <div><div class="form-label">Etapa</div><div>${l.stage}</div></div>
          <div><div class="form-label">Contacto</div><div>${l.contact}</div></div>
          <div><div class="form-label">Asignado a</div><div>${l.assigned}</div></div>
          <div><div class="form-label">Último contacto</div><div>${App.formatDate(l.lastContact)}</div></div>
        </div>
        <div><div class="form-label">Notas</div>
          <div style="background:var(--bg-glass);padding:12px;border-radius:var(--radius-sm);font-size:13px;color:var(--text-secondary);border:1px solid var(--border)">${l.notes}</div>
        </div>
        <div>
          <div class="form-label">Valor esperado (ajustado por probabilidad)</div>
          <div style="font-size:22px;font-weight:800;background:var(--grad-brand);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${App.formatCurrency(Math.round(l.value * l.probability / 100))}</div>
        </div>
      </div>
    `;
    App.openModal(`⭐ ${l.name}`, body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cerrar</button>
       <button class="btn btn-primary" onclick="App.closeModal();App.toast('Seguimiento registrado para ${l.name}','success')">📋 Registrar Avance</button>`
    );
  }

  function openAddModal() {
    const body = `
      <div class="form-group"><label class="form-label">Nombre completo *</label><input class="form-input" placeholder="Ej. Empresario Juan Pérez" /></div>
      <div class="form-group"><label class="form-label">Empresa / Organización</label><input class="form-input" placeholder="Ej. Grupo Empresarial Norte" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Ciudad</label><input class="form-input" placeholder="Ciudad" /></div>
        <div class="form-group"><label class="form-label">Contacto</label><input class="form-input" placeholder="+52 XX XXXX-XXXX" /></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Valor Potencial (MXN)</label><input class="form-input" type="number" placeholder="0" /></div>
        <div class="form-group"><label class="form-label">Probabilidad %</label><input class="form-input" type="number" min="0" max="100" placeholder="75" /></div>
      </div>
      <div class="form-group"><label class="form-label">Etapa</label>
        <select class="form-input"><option>Primer Contacto</option><option>Demo/Reunión</option><option>Seguimiento</option><option>Negociación</option><option>Propuesta Enviada</option></select>
      </div>
      <div class="form-group"><label class="form-label">Notas</label><textarea class="form-input" placeholder="Descripción de la oportunidad..."></textarea></div>
    `;
    App.openModal('⭐ Nuevo Líder VIP', body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
       <button class="btn btn-primary" onclick="App.closeModal();App.toast('Líder VIP registrado','success')">Guardar</button>`
    );
  }

  return { render, viewLeader, openAddModal };
})();
