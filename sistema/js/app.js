// ============================================================
//  CAMP — APP.JS (Router + State + Global Utilities)
// ============================================================

const App = (() => {
  // State
  let currentView = 'dashboard';
  let charts = {};

  // ---- ROUTER ---------------------------------------------
  function navigate(view) {
    if (view === currentView) return;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navEl = document.getElementById(`nav-${view}`);
    if (navEl) navEl.classList.add('active');

    // Update breadcrumbs
    const labels = {
      dashboard: 'Dashboard KPIs',
      leads: 'Leads & Prospectos',
      conferences: 'Conferencias',
      sales: 'Ventas & Diplomado',
      leaders: 'Líderes VIP',
      reports: 'Reportes',
      config: 'Configuración',
    };
    document.getElementById('breadcrumb').textContent = labels[view] || view;

    // Swap views
    document.querySelector('.view.active')?.classList.remove('active');
    const viewEl = document.getElementById(`view-${view}`);
    if (viewEl) viewEl.classList.add('active');

    currentView = view;

    // Render view
    renderView(view);
  }

  function renderView(view) {
    switch (view) {
      case 'dashboard': DashboardView.render(); break;
      case 'leads': LeadsView.render(); break;
      case 'conferences': ConferencesView.render(); break;
      case 'sales': SalesView.render(); break;
      case 'leaders': LeadersView.render(); break;
      case 'reports': ReportsView.render(); break;
      case 'config': ConfigView.render(); break;
    }
  }

  // ---- INIT -----------------------------------------------
  function init() {
    // Sidebar toggle (desktop)
    document.getElementById('sidebarToggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    // Mobile menu
    document.getElementById('menuBtn').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('mobile-open');
    });

    // Nav clicks
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(el.dataset.view);
        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('mobile-open');
      });
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
      document.getElementById('refreshBtn').classList.add('spinning');
      setTimeout(() => {
        document.getElementById('refreshBtn').classList.remove('spinning');
        toast('Datos actualizados', 'success');
        renderView(currentView);
      }, 800);
    });

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de poner todos los contadores a cero de forma permanente?')) {
          CAMP.resetAll();
          document.getElementById('badge-leads').textContent = '0';
          document.getElementById('badge-conferences').textContent = '0';
          toast('Contadores reiniciados a cero. Recargando...', 'success');
          setTimeout(() => location.reload(), 600);
        }
      });
    }

    // Restore Global button
    const restoreBtnGlobal = document.getElementById('restoreDataBtnGlobal');
    if (restoreBtnGlobal) {
      restoreBtnGlobal.addEventListener('click', () => {
        if (confirm('¿Deseas restaurar la información simulada de muestra?')) {
          localStorage.removeItem('camp_is_zero');
          toast('Restaurando datos de prueba originales...', 'info');
          setTimeout(() => location.reload(), 800);
        }
      });
    }
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', Auth.logout);
    }

    // Clock
    updateClock();
    setInterval(updateClock, 1000);

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    // Global search
    document.getElementById('globalSearch').addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (q.length > 2) globalSearch(q);
    });

    // Badge counts
    document.getElementById('badge-leads').textContent = CAMP.leads.length;
    document.getElementById('badge-conferences').textContent = CAMP.conferences.filter(c => c.status === 'Programada').length;

    // Render initial view
    renderView('dashboard');
  }

  // ---- UTILITIES ------------------------------------------
  function updateClock() {
    const now = new Date();
    const opts = { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('es-MX', opts);
  }

  function toast(msg, type = 'info') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span class="toast-msg">${msg}</span>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    document.getElementById('toastContainer').appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  function openModal(title, bodyHTML, footer = '') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalFooter').innerHTML = footer;
    document.getElementById('modalOverlay').classList.add('active');
  }

  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
  }

  function globalSearch(query) {
    const q = query.toLowerCase();
    const lead = CAMP.leads.find(l => l.name.toLowerCase().includes(q));
    if (lead) {
      navigate('leads');
      toast(`Resultado: ${lead.name}`, 'info');
    }
  }

  // ---- Chart registry (prevent duplicates) ----------------
  function registerChart(id, config) {
    if (charts[id]) { charts[id].destroy(); }
    const ctx = document.getElementById(id);
    if (!ctx) return;
    charts[id] = new Chart(ctx, config);
    return charts[id];
  }

  function formatCurrency(n) {
    return '$' + n.toLocaleString('es-MX') + ' MXN';
  }

  function formatDate(d) {
    if (!d) return '—';
    return new Date(d + 'T12:00:00').toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function scoreColor(score) {
    if (score >= 80) return 'green';
    if (score >= 55) return 'amber';
    return 'red';
  }

  function avatarHtml(initials, colorClass = 'purple') {
    return `<div class="avatar">${initials}</div>`;
  }

  function segmentPill(seg) {
    const map = { 'Caliente': 'pill-red', 'Tibio': 'pill-amber', 'Frío': 'pill-cyan' };
    return `<span class="pill ${map[seg] || 'pill-gray'}">${seg}</span>`;
  }

  function statusPill(status) {
    const map = {
      'Nuevo': 'pill-cyan',
      'Seguimiento': 'pill-amber',
      'Cita Agendada': 'pill-purple',
      'Convertido': 'pill-green',
      'Inactivo': 'pill-gray',
    };
    return `<span class="pill ${map[status] || 'pill-gray'}">${status}</span>`;
  }

  // Chart default theme
  Chart.defaults.color = '#9894b4';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";

  return {
    init, navigate, toast, openModal, closeModal,
    registerChart, formatCurrency, formatDate,
    scoreColor, segmentPill, statusPill, avatarHtml,
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', App.init);
