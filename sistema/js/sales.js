// ============================================================
//  SALES VIEW — Ventas, Diplomado & Operadores
// ============================================================

const SalesView = (() => {

  function render() {
    const el = document.getElementById('view-sales');
    const totalRev = CAMP.sales.reduce((s, x) => s + x.amount, 0);

    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">Ventas & Diplomado</div>
          <div class="section-sub">${CAMP.sales.length} transacciones · ${CAMP.totals.diplomadoEnrolled} en diplomado</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" onclick="SalesView.openSaleModal()">+ Registrar Venta</button>
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid" style="margin-bottom:24px">
        <div class="kpi-card amber">
          <div class="kpi-icon amber">💰</div>
          <div class="kpi-value amber" style="font-size:22px">${App.formatCurrency(totalRev)}</div>
          <div class="kpi-label">Ingresos Totales</div>
        </div>
        <div class="kpi-card purple">
          <div class="kpi-icon purple">🎓</div>
          <div class="kpi-value purple">${CAMP.totals.diplomadoEnrolled}</div>
          <div class="kpi-label">Estudiantes Diplomado</div>
          <div class="kpi-sub">6 módulos activos</div>
        </div>
        <div class="kpi-card pink">
          <div class="kpi-icon pink">📚</div>
          <div class="kpi-value pink">${CAMP.sales.filter(s => s.product.includes('Libro')).length}</div>
          <div class="kpi-label">Libros Vendidos</div>
        </div>
        <div class="kpi-card cyan">
          <div class="kpi-icon cyan">📦</div>
          <div class="kpi-value cyan">${CAMP.sales.filter(s => s.product.includes('Paquete')).length}</div>
          <div class="kpi-label">Paquetes Corporativos</div>
        </div>
      </div>

      <!-- Grid: Sales + Diplomado -->
      <div class="charts-grid" style="margin-bottom:24px">
        <!-- Sales Table -->
        <div class="card" style="padding:0;overflow:hidden">
          <div style="padding:18px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
            <div style="font-weight:600">Historial de Ventas</div>
            <span style="font-size:12px;color:var(--text-muted)">${CAMP.sales.length} transacciones</span>
          </div>
          <div class="table-wrapper" style="border:none;border-radius:0">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Comprador</th>
                  <th>Monto</th>
                  <th>Canal</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                ${CAMP.sales.map(s => `
                  <tr>
                    <td style="font-weight:600">${s.product}</td>
                    <td class="td-muted">${s.buyer}</td>
                    <td style="color:var(--amber-400);font-weight:700">${App.formatCurrency(s.amount)}</td>
                    <td><span class="pill pill-gray">${s.channel}</span></td>
                    <td class="td-muted">${App.formatDate(s.date)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Diplomado Progress -->
        <div class="card">
          <div style="font-weight:600;margin-bottom:16px">🎓 Progreso del Diplomado</div>
          <div style="display:flex;flex-direction:column;gap:14px">
            ${CAMP.diplomadoModules.map(m => {
              const pct = Math.round((m.completed / m.enrolled) * 100);
              return `
                <div>
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <div style="font-size:13px;font-weight:500">${m.name}</div>
                    <span style="font-size:12px;color:var(--text-muted)">${m.completed}/${m.enrolled}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width:${pct}%;background:${pct>70?'var(--grad-green)':pct>40?'linear-gradient(135deg,var(--amber-500),var(--amber-400))':'var(--grad-brand)'}"></div>
                  </div>
                  <div style="display:flex;justify-content:space-between;margin-top:4px">
                    <span style="font-size:11px;color:var(--text-muted)">${pct}% completado</span>
                    ${m.rating > 0 ? `<span style="font-size:11px;color:var(--amber-400)">⭐ ${m.rating}</span>` : '<span style="font-size:11px;color:var(--text-muted)">Sin calificar</span>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Operators Performance -->
      <div class="section-header">
        <div class="section-title">Rendimiento del Equipo</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
        ${CAMP.operators.map(o => `
          <div class="card glow-on-hover">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
              <div class="avatar avatar-lg">${o.avatar}</div>
              <div>
                <div style="font-weight:700">${o.name}</div>
                <div style="font-size:12px;color:var(--text-muted)">${o.role}</div>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
              <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
                <div style="font-weight:700;font-size:18px;color:var(--purple-400)">${o.leads}</div>
                <div style="font-size:10px;color:var(--text-muted)">Leads</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
                <div style="font-weight:700;font-size:18px;color:var(--emerald-400)">${o.conversions}</div>
                <div style="font-size:10px;color:var(--text-muted)">Ventas</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-glass);border-radius:var(--radius-sm)">
                <div style="font-weight:700;font-size:14px;color:var(--amber-400)">${App.formatCurrency(o.revenue).replace(' MXN','')}</div>
                <div style="font-size:10px;color:var(--text-muted)">Ingresos</div>
              </div>
            </div>
            <div style="margin-top:12px">
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:4px">
                <span>Tasa conversión</span>
                <span>${Math.round((o.conversions/o.leads)*100)}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${Math.round((o.conversions/o.leads)*100)}%"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function openSaleModal() {
    const body = `
      <div class="form-group"><label class="form-label">Producto *</label>
        <select class="form-input">
          <option>Libro Físico</option>
          <option>Libro Digital PDF</option>
          <option>Audiolibro</option>
          <option>Diplomado Completo</option>
          <option>Paquete Corporativo x10</option>
          <option>Paquete Corporativo x50</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Comprador</label><input class="form-input" placeholder="Nombre del cliente" /></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div class="form-group"><label class="form-label">Monto (MXN)</label><input class="form-input" type="number" placeholder="0.00" /></div>
        <div class="form-group"><label class="form-label">Canal</label>
          <select class="form-input"><option>Conferencia</option><option>Online</option><option>WhatsApp</option><option>Cita Directa</option><option>Referido</option><option>Distribuidor</option></select>
        </div>
      </div>
      <div class="form-group"><label class="form-label">Operador</label>
        <select class="form-input">${CAMP.operators.map(o=>`<option>${o.name}</option>`).join('')}</select>
      </div>
    `;
    App.openModal('💰 Registrar Venta', body,
      `<button class="btn btn-secondary" onclick="App.closeModal()">Cancelar</button>
       <button class="btn btn-primary" onclick="App.closeModal();App.toast('Venta registrada','success')">Guardar</button>`
    );
  }

  return { render, openSaleModal };
})();
