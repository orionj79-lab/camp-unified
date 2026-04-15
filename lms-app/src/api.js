const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_URL}/api/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  getContent: async (productId) => {
    const res = await fetch(`${API_URL}/api/content/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch content');
    return res.json();
  }
};
