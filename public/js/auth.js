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

  // ─── Product Data (Server API) ──────────────────────────────────────────
  const getProducts = async () => {
    try {
      const response = await fetch('/api/products');
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch products:', err);
      return {};
    }
  };

  const saveProducts = async (products) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products)
      });
      return await response.json();
    } catch (err) {
      console.error('Failed to save products:', err);
      return { success: false };
    }
  };

  // ─── Home Page Data (Server API) ────────────────────────────────────────
  const getHomePageData = async () => {
    try {
      const response = await fetch('/api/homepage');
      return await response.json();
    } catch (err) {
      console.error('Failed to fetch homepage data:', err);
      return {};
    }
  };

  const saveHomePageData = async (data) => {
    try {
      const response = await fetch('/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      console.error('Failed to save homepage data:', err);
      return { success: false };
    }
  };

  // ─── Legacy Overrides (Now proxies to API or returns local if needed) ───
  // Note: These are simplified for the migration. Callers should move to getProducts()
  const getProductOverrides = () => {
    console.warn('RRAuth.getProductOverrides is deprecated. Use getProducts instead.');
    return {}; // Return empty to avoid crashes while we update callers
  };

  const saveProductOverride = async (productId, data) => {
    const products = await getProducts();
    products[productId] = { ...products[productId], ...data, updatedAt: new Date().toISOString() };
    return await saveProducts(products);
  };

  // ─── All registered users (admin only) ───────────────────────────────
  const getAllUsers = () => {
    if (!isAdmin()) return [];
    return _getUsers().map(u => ({ ...u, password: '••••••••' }));
  };

  // Initialize
  _seedUsers();

  return { 
    login, register, logout, isLoggedIn, isAdmin, getUser, getAllUsers,
    getProducts, saveProducts, getHomePageData, saveHomePageData,
    getProductOverrides, saveProductOverride // Deprecated legacy support
  };
})();

// Make globally available
window.RRAuth = RRAuth;
