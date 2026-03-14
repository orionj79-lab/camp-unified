// ============================================================
//  DASHBOARD VIEW — KPIs, Charts, Activity Feed
// ============================================================

const DashboardView = (() => {

  function render() {
    const el = document.getElementById('view-dashboard');
    el.innerHTML = `
      <!-- KPI Grid -->
      <div class="section-header">
        <div>
          <div class="section-title" style="display:flex; align-items:center; gap:12px;">
            Dashboard KPIs
            <button id="btnResetKpisDashboard" class="pill pill-red" style="cursor:pointer; border:none; padding:4px 10px;">
              🛑 Ajustar KPIs a cero
            </button>
          </div>
          <div class="section-sub">Resumen en tiempo real · Actualizado ahora</div>
        </div>
        <div class="section-actions" id="btnRestoreData" style="cursor:pointer;" title="Doble clic para restaurar bases de prueba">
          <span class="pill pill-green">🟢 Sistema activo</span>
        </div>
      </div>

      <div class="kpi-grid">
        ${kpiCard('📥', 'purple', CAMP.totals.leads, 'Total Leads', '+12 esta semana', 'up')}
        ${kpiCard('🔥', 'red', CAMP.totals.hotLeads, 'Leads Calientes', 'Altísima intención', 'up')}
        ${kpiCard('✅', 'green', CAMP.totals.converted, 'Convertidos', App.formatCurrency(CAMP.totals.revenue), 'up')}
        ${kpiCard('💰', 'amber', App.formatCurrency(CAMP.totals.revenue).replace('MXN', '').trim(), 'Ingresos', 'Este mes', 'up')}
        ${kpiCard('🎤', 'cyan', CAMP.conferences.length, 'Conferencias', `${CAMP.totals.upcomingConferences} próximas`, 'neutral')}
        ${kpiCard('📚', 'pink', CAMP.totals.diplomadoEnrolled, 'En Diplomado', '6 módulos activos', 'up')}
        ${kpiCard('⭐', 'purple', App.formatCurrency(CAMP.totals.vipPipeline).replace('MXN', '').trim(), 'Pipeline VIP', '5 potenciales', 'up')}
        ${kpiCard('📊', 'cyan', CAMP.conversionRate + '%', 'Tasa Conversión', 'vs 28% benchmark', 'up')}
      </div>

      <!-- Funnel Pipeline -->
      <div class="section-header" style="margin-top:8px">
        <div class="section-title">Embudo de Conversión</div>
      </div>
      <div class="pipeline" style="margin-bottom:28px">
        ${CAMP.conversionFunnel.stages.map((s, i) => {
      const v = CAMP.conversionFunnel.values[i];
      const pct = i === 0 ? 100 : (CAMP.conversionFunnel.values[0] === 0 ? 0 : Math.round((v / CAMP.conversionFunnel.values[0]) * 100));
      const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981'];
      return `<div class="pipeline-stage">
            <div class="pipeline-count" style="color:${colors[i]}">${v}</div>
            <div class="pipeline-label">${s}</div>
            <div class="pipeline-pct">${pct}%</div>
          </div>`;
    }).join('')}
      </div>

      <!-- Charts Row 1 -->
      <div class="charts-grid" style="margin-bottom:20px">
        <div class="chart-card">
          <div class="chart-title">Leads por Día (esta semana)</div>
          <div class="chart-sub">Nuevos prospectos ingresados al embudo</div>
          <div class="chart-wrap"><canvas id="chart-weekly-leads" height="200"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Fuentes de Leads</div>
          <div class="chart-sub">Distribución por canal de adquisición</div>
          <div class="chart-wrap"><canvas id="chart-sources" height="200"></canvas></div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="charts-grid-3" style="margin-bottom:28px">
        <div class="chart-card">
          <div class="chart-title">Ingresos Mensuales</div>
          <div class="chart-sub">MXN acumulado</div>
          <div class="chart-wrap"><canvas id="chart-revenue" height="180"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Ingresos por Producto</div>
          <div class="chart-sub">Distribución de ventas</div>
          <div class="chart-wrap"><canvas id="chart-products" height="180"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Operadores</div>
          <div class="chart-sub">Rendimiento del equipo</div>
          <div class="chart-wrap"><canvas id="chart-operators" height="180"></canvas></div>
        </div>
      </div>

      <!-- Bottom Row: Activity + Automation Flows -->
      <div class="charts-grid">
        <div class="card">
          <div class="chart-title" style="margin-bottom:16px">⚡ Actividad Reciente</div>
          <div class="activity-feed">
            ${CAMP.activities.map(a => `
              <div class="activity-item">
                <div class="activity-dot" style="background:${a.color}"></div>
                <div class="activity-content">
                  <div class="activity-text">${a.text}</div>
                  <div class="activity-time">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="chart-title" style="margin-bottom:16px">🤖 Flujos Automatizados</div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${CAMP.flows.map(f => `
              <div style="padding:12px;background:var(--bg-glass);border-radius:var(--radius-sm);border:1px solid var(--border);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <div style="font-size:13px;font-weight:600">${f.name}</div>
                  <span class="pill ${f.active ? 'pill-green' : 'pill-gray'}" style="font-size:10px">${f.active ? 'Activo' : 'Pausado'}</span>
                </div>
                <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${f.trigger} · ${f.steps} pasos</div>
                <div style="display:flex;gap:12px;font-size:12px">
                  <span style="color:var(--text-secondary)">📤 ${f.sent}</span>
                  <span style="color:var(--cyan-400)">👁 ${f.opened}</span>
                  <span style="color:var(--emerald-400)">✅ ${f.converted}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    renderCharts();

    // Event listener del botón reset
    setTimeout(() => {
      const restoreBtn = document.getElementById('btnRestoreData');
      if (restoreBtn) {
        restoreBtn.addEventListener('dblclick', () => {
          if (localStorage.getItem('camp_is_zero') === '1') {
            localStorage.removeItem('camp_is_zero');
            App.toast('Restaurando datos de prueba originales...', 'info');
            setTimeout(() => location.reload(), 1000);
          }
        });
      }

      const btn = document.getElementById('btnResetKpisDashboard');
      if (btn) {
        btn.addEventListener('click', () => {
          if (confirm('¿Deseas ajustar todos los KPIs a cero de manera permanente?')) {
            CAMP.resetAll();
            document.getElementById('badge-leads').textContent = '0';
            document.getElementById('badge-conferences').textContent = '0';
            App.toast('KPIs ajustados a cero exitosamente. Recargando...', 'success');
            setTimeout(() => location.reload(), 600);
          }
        });
      }
    }, 50);
  }

  function kpiCard(icon, color, value, label, sub, trend) {
    return `
      <div class="kpi-card ${color}">
        <div class="kpi-header">
          <div class="kpi-icon ${color}">${icon}</div>
          <span class="kpi-badge ${trend}">${trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}</span>
        </div>
        <div class="kpi-value ${color}">${value}</div>
        <div class="kpi-label">${label}</div>
        <div class="kpi-sub">${sub}</div>
      </div>
    `;
  }

  function renderCharts() {
    // Weekly Leads
    App.registerChart('chart-weekly-leads', {
      type: 'bar',
      data: {
        labels: CAMP.weeklyLeads.labels,
        datasets: [{
          label: 'Leads',
          data: CAMP.weeklyLeads.values,
          borderRadius: 6,
          backgroundColor: 'rgba(139,92,246,0.5)',
          borderColor: '#8b5cf6',
          borderWidth: 1,
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });

    // Sources Doughnut
    App.registerChart('chart-sources', {
      type: 'doughnut',
      data: {
        labels: CAMP.sourceBreakdown.labels,
        datasets: [{
          data: CAMP.sourceBreakdown.values,
          backgroundColor: CAMP.sourceBreakdown.colors,
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        cutout: '65%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } }
        }
      }
    });

    // Monthly Revenue
    App.registerChart('chart-revenue', {
      type: 'line',
      data: {
        labels: CAMP.monthlyRevenue.labels,
        datasets: [{
          label: 'Ingresos MXN',
          data: CAMP.monthlyRevenue.values,
          fill: true,
          backgroundColor: 'rgba(139,92,246,0.1)',
          borderColor: '#8b5cf6',
          tension: 0.4,
          pointBackgroundColor: '#8b5cf6',
          pointRadius: 4,
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'k' } },
          x: { grid: { display: false } }
        }
      }
    });

    // Product Revenue
    App.registerChart('chart-products', {
      type: 'doughnut',
      data: {
        labels: CAMP.productRevenue.labels,
        datasets: [{
          data: CAMP.productRevenue.values,
          backgroundColor: CAMP.productRevenue.colors,
          borderWidth: 0,
        }]
      },
      options: {
        cutout: '60%',
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, padding: 10, font: { size: 10 } } }
        }
      }
    });

    // Operators Bar
    App.registerChart('chart-operators', {
      type: 'bar',
      data: {
        labels: CAMP.operators.map(o => o.name.split(' ')[0]),
        datasets: [
          {
            label: 'Leads',
            data: CAMP.operators.map(o => o.leads),
            backgroundColor: 'rgba(139,92,246,0.6)',
            borderRadius: 4,
          },
          {
            label: 'Conversiones',
            data: CAMP.operators.map(o => o.conversions),
            backgroundColor: 'rgba(16,185,129,0.6)',
            borderRadius: 4,
          }
        ]
      },
      options: {
        plugins: { legend: { labels: { boxWidth: 10, font: { size: 11 } } } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  return { render };
})();
