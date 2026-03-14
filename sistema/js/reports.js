// ============================================================
//  REPORTS VIEW — Análisis & Exportación
// ============================================================

const ReportsView = (() => {

  function render() {
    const el = document.getElementById('view-reports');
    el.innerHTML = `
      <div class="section-header">
        <div>
          <div class="section-title">Reportes & Análisis</div>
          <div class="section-sub">Generación automática de reportes semanales</div>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" onclick="ReportsView.generateReport()">📊 Generar Reporte</button>
          <button class="btn btn-secondary" onclick="ReportsView.exportCSV()">⬇️ Exportar CSV</button>
        </div>
      </div>

      <!-- Weekly Report Card -->
      <div class="card" style="margin-bottom:24px;background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(236,72,153,0.08));border-color:var(--border-purple)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
          <div>
            <div style="font-size:16px;font-weight:700;margin-bottom:4px">📋 Reporte Semanal Automático</div>
            <div style="font-size:13px;color:var(--text-muted)">Semana del 3–9 de Marzo 2026 · Generado automáticamente cada lunes a las 8:00 AM</div>
          </div>
          <span class="pill pill-green">✅ Enviado</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px">
          ${reportKpi('📥', 'Nuevos Leads', '12', 'var(--purple-400)')}
          ${reportKpi('🔥', 'Leads Calientes', '4', 'var(--red-400)')}
          ${reportKpi('✅', 'Conversiones', '3', 'var(--emerald-400)')}
          ${reportKpi('💰', 'Ingresos', '$47,200', 'var(--amber-400)')}
          ${reportKpi('🎤', 'Conferencias', '1 completada', 'var(--cyan-400)')}
          ${reportKpi('📚', 'Módulos Progreso', '+18% avance', 'var(--pink-400)')}
        </div>
      </div>

      <!-- Charts -->
      <div class="charts-grid" style="margin-bottom:20px">
        <div class="chart-card">
          <div class="chart-title">Evolución de Leads (últimas 4 semanas)</div>
          <div class="chart-sub">Nuevos leads por semana</div>
          <div class="chart-wrap"><canvas id="chart-report-leads" height="200"></canvas></div>
        </div>
        <div class="chart-card">
          <div class="chart-title">Tasa de Conversión por Semana</div>
          <div class="chart-sub">% leads convertidos</div>
          <div class="chart-wrap"><canvas id="chart-report-conv" height="200"></canvas></div>
        </div>
      </div>

      <div class="chart-card" style="margin-bottom:24px">
        <div class="chart-title">Ingresos por Semana (MXN)</div>
        <div class="chart-sub">Últimas 4 semanas de actividad comercial</div>
        <div class="chart-wrap" style="max-height:220px"><canvas id="chart-report-revenue"></canvas></div>
      </div>

      <!-- Report History -->
      <div class="section-header"><div class="section-title">Historial de Reportes</div></div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Reporte</th>
              <th>Fecha</th>
              <th>Leads</th>
              <th>Conversiones</th>
              <th>Ingresos</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${[
        { name: 'Reporte Semana 10', date: '2026-03-09', leads: 12, conv: 3, revenue: 47200, status: 'Enviado' },
        { name: 'Reporte Semana 9', date: '2026-03-02', leads: 19, conv: 5, revenue: 73500, status: 'Enviado' },
        { name: 'Reporte Semana 8', date: '2026-02-23', leads: 24, conv: 8, revenue: 98000, status: 'Enviado' },
        { name: 'Reporte Semana 7', date: '2026-02-16', leads: 15, conv: 4, revenue: 42300, status: 'Enviado' },
      ].map(r => `
              <tr>
                <td style="font-weight:600">📋 ${r.name}</td>
                <td class="td-muted">${App.formatDate(r.date)}</td>
                <td style="color:var(--purple-400)">${r.leads}</td>
                <td style="color:var(--emerald-400)">${r.conv}</td>
                <td style="color:var(--amber-400);font-weight:600">${App.formatCurrency(r.revenue)}</td>
                <td><span class="pill pill-green">✅ ${r.status}</span></td>
                <td>
                  <button class="btn btn-ghost btn-sm" onclick="ReportsView.exportCSV()">⬇️ Descargar</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    renderCharts();
  }

  function reportKpi(icon, label, value, color) {
    return `
      <div style="padding:14px;background:rgba(0,0,0,0.2);border-radius:var(--radius-sm);border:1px solid var(--border)">
        <div style="font-size:20px;margin-bottom:6px">${icon}</div>
        <div style="font-size:18px;font-weight:800;color:${color}">${value}</div>
        <div style="font-size:11px;color:var(--text-muted)">${label}</div>
      </div>
    `;
  }

  function renderCharts() {
    const weeks = ['Sem 7', 'Sem 8', 'Sem 9', 'Sem 10'];

    App.registerChart('chart-report-leads', {
      type: 'bar',
      data: {
        labels: weeks,
        datasets: [{
          label: 'Nuevos Leads',
          data: [15, 24, 19, 12],
          backgroundColor: ['rgba(139,92,246,0.5)', 'rgba(139,92,246,0.6)', 'rgba(139,92,246,0.7)', 'rgba(139,92,246,0.8)'],
          borderRadius: 6,
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

    App.registerChart('chart-report-conv', {
      type: 'line',
      data: {
        labels: weeks,
        datasets: [{
          label: 'Conversión %',
          data: [27, 33, 26, 25],
          fill: true,
          backgroundColor: 'rgba(16,185,129,0.1)',
          borderColor: '#10b981',
          tension: 0.4,
          pointBackgroundColor: '#10b981',
          pointRadius: 5,
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => v + '%' } },
          x: { grid: { display: false } }
        }
      }
    });

    App.registerChart('chart-report-revenue', {
      type: 'bar',
      data: {
        labels: weeks,
        datasets: [{
          label: 'Ingresos MXN',
          data: [42300, 98000, 73500, 47200],
          backgroundColor: 'rgba(245,158,11,0.5)',
          borderColor: '#f59e0b',
          borderRadius: 8,
          borderWidth: 1,
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
  }

  function generateReport() {
    App.toast('🔄 Generando reporte semanal...', 'info');
    setTimeout(() => App.toast('✅ Reporte generado y enviado a los stakeholders', 'success'), 2000);
  }

  function exportCSV() {
    App.toast('⬇️ Preparando datos para exportación...', 'info');

    setTimeout(() => {
      const csvRows = [
        ['ID', 'Nombre', 'Email', 'Telefono', 'Estatus', 'Fuente', 'Fecha', 'Valor MXN']
      ];

      CAMP.leads.forEach(l => {
        csvRows.push([
          l.id,
          `"${l.name}"`,
          `"${l.email}"`,
          `"${l.phone}"`,
          l.status,
          `"${l.source}"`,
          l.date,
          l.value
        ]);
      });

      const csvContent = "\uFEFF" + csvRows.map(e => e.join(",")).join("\n");
      const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `Reporte_General_Leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      App.toast('✅ Archivo CSV descargado correctamente', 'success');
    }, 600);
  }

  return { render, generateReport, exportCSV };
})();
