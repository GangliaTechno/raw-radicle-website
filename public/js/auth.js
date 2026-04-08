/**
 * RRAuth - Raw Radicles Authentication Module
 * Manages users, sessions & product data via localStorage + server API.
 */

const RRAuth = (() => {
  const USERS_KEY = 'rr_users';
  const SESSION_KEY = 'rr_session';
  const PRODUCTS_KEY = 'rr_product_overrides';

  // ─── Seed default users if none exist ────────────────────────────────
  const _seedUsers = () => {
    if (!localStorage.getItem(USERS_KEY)) {
      const defaultUsers = [
        {
          id: 'admin-001',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@rawradicles.com',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  };

  const _getUsers = () => {
    _seedUsers();
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  };

  const _saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  // ─── Session ──────────────────────────────────────────────────────────
  const getUser = () => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch { return null; }
  };

  const isLoggedIn = () => !!getUser();

  const isAdmin = () => {
    const u = getUser();
    return u && u.role === 'admin';
  };

  const _setSession = (user) => {
    // Store a safe copy (no password)
    const safe = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/login.html';
  };

  // ─── Auth Actions ─────────────────────────────────────────────────────
  const login = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = _getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (user) {
          _setSession(user);
          resolve({ success: true, user });
        } else {
          resolve({ success: false, message: 'Incorrect email or password. Please try again.' });
        }
      }, 400); // simulate network
    });
  };

  const register = ({ firstName, lastName, email, password }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = _getUsers();
        const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          resolve({ success: false, message: 'An account with this email already exists.' });
          return;
        }
        const newUser = {
          id: 'user-' + Date.now(),
          firstName,
          lastName,
          email,
          password,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        users.push(newUser);
        _saveUsers(users);
        resolve({ success: true, user: newUser });
      }, 400);
    });
  };

  // ─── Product Overrides ────────────────────────────────────────────────
  const getProductOverrides = () => {
    try {
      return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '{}');
    } catch { return {}; }
  };

  const saveProductOverride = (productId, data) => {
    const overrides = getProductOverrides();
    overrides[productId] = { ...overrides[productId], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(overrides));
    return overrides[productId];
  };

  const getProductOverride = (productId) => {
    return getProductOverrides()[productId] || null;
  };

  // ─── All registered users (admin only) ───────────────────────────────
  const getAllUsers = () => {
    if (!isAdmin()) return [];
    return _getUsers().map(u => ({ ...u, password: '••••••••' }));
  };

  // Initialize
  _seedUsers();

  return { login, register, logout, isLoggedIn, isAdmin, getUser, getAllUsers, getProductOverrides, saveProductOverride, getProductOverride };
})();

// Make globally available
window.RRAuth = RRAuth;
