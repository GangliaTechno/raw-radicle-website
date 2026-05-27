// Authentication service for admin dashboard

export const ADMIN_EMAILS = [
  'admin@rawradicles.com',
  'dsplmanipal@gmail.com',
  'director@dashapatmaja.in',
  'info@rawradicles.com',
];
export const DEFAULT_PASSWORD = 'admin123';
export const USERS_KEY = 'rr_users';
export const SESSION_KEY = 'rr_session';
export const ADMIN_SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000;

export const ensureAdmins = () => {
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    users = [];
  }
  let changed = false;
  ADMIN_EMAILS.forEach((email, index) => {
    const existing = users.find((u) => u.email?.toLowerCase() === email);
    if (!existing) {
      users.push({
        id: `admin-${100 + index}`,
        firstName: index === 0 ? 'Admin' : email.split('@')[0],
        lastName: 'Admin',
        email,
        password: DEFAULT_PASSWORD,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });
      changed = true;
    } else if (existing.role !== 'admin' || existing.password !== DEFAULT_PASSWORD) {
      existing.role = 'admin';
      existing.password = DEFAULT_PASSWORD;
      changed = true;
    }
  });
  if (changed || !localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
};

export const upsertAdminUser = (email) => {
  const users = ensureAdmins();
  const normalized = email.toLowerCase();
  let user = users.find((u) => u.email?.toLowerCase() === normalized);
  if (!user) {
    user = {
      id: `admin-${Date.now()}`,
      firstName: 'Admin',
      lastName: 'User',
      email: normalized,
      password: DEFAULT_PASSWORD,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
  }
  user.password = DEFAULT_PASSWORD;
  user.role = 'admin';
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
};

export const getSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');

    if (!session) return null;

    if (session.expiresAt && Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
};

export const setSession = (user) => {
  const isAdmin = user.role === 'admin' || ADMIN_EMAILS.includes(user.email?.toLowerCase());

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      expiresAt: isAdmin ? Date.now() + ADMIN_SESSION_TIMEOUT_MS : null,
    })
  );
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};
