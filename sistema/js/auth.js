// ============================================================
//  CAMP — AUTH.JS (Simulated Firebase Auth / Session control)
// ============================================================

const Auth = (() => {
  // Configuración lista para Firebase
  const firebaseConfig = {
    apiKey: "AIzaSy_MOCK_API_KEY",
    authDomain: "camp-sistema.firebaseapp.com",
    projectId: "camp-sistema",
    storageBucket: "camp-sistema.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:mock12345"
  };

  function login(email, password, btnElement, errorElement) {
    if (btnElement) btnElement.classList.add('btn-loading');
    if (errorElement) errorElement.style.display = 'none';

    // Simulate Network Request
    setTimeout(() => {
      if (email === "jjvargas" && password === "Orion2509#") {
        localStorage.setItem('camp_auth_token', 'demo_active_token_xyz');
        localStorage.setItem('camp_user_email', email);
        window.location.href = 'index.html';
      } else {
        if (btnElement) btnElement.classList.remove('btn-loading');
        if (errorElement) {
          errorElement.style.display = 'block';
          errorElement.innerHTML = "Credenciales incorrectas (Usa jjvargas / Orion2509#)";
        }
      }
    }, 1200);
  }

  function logout() {
    localStorage.removeItem('camp_auth_token');
    localStorage.removeItem('camp_user_email');
    window.location.href = 'login.html';
  }

  // Guard for protected routes (Dashboard)
  function requireAuth() {
    if (!localStorage.getItem('camp_auth_token')) {
      window.location.href = 'login.html';
    }
  }

  // Guard for public routes (Login)
  function requireNoAuth() {
    if (localStorage.getItem('camp_auth_token')) {
      window.location.href = 'index.html';
    }
  }

  function getUser() {
    return localStorage.getItem('camp_user_email');
  }

  return { login, logout, requireAuth, requireNoAuth, getUser, firebaseConfig };
})();
