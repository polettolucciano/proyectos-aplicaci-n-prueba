(function registerAuth(global) {
  const SESSION_ROLE_KEY = 'padel-demo-role';
  const DEMO_ACCOUNTS = Object.freeze({ encargado: { password: 'demo123', role: 'encargado' }, dueno: { password: 'demo123', role: 'dueno' } });
  const getStoredRole = () => sessionStorage.getItem(SESSION_ROLE_KEY);
  const rememberRole = role => sessionStorage.setItem(SESSION_ROLE_KEY, role);
  // With APP_API_BASE_URL configured, the server owns authentication and should
  // return { role }. Session cookies must be HttpOnly and Secure in production.
  const authenticate = async ({ username, password, requestedRole }) => {
    const baseUrl = global.PadelConfig.getApiBaseUrl();
    if (baseUrl) {
      const response = await fetch(`${baseUrl}/auth/session`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password, requestedRole }) });
      if (!response.ok) return null;
      const session = await response.json();
      return session.role === requestedRole ? session.role : null;
    }
    const account = DEMO_ACCOUNTS[username];
    return account && account.password === password && account.role === requestedRole ? account.role : null;
  };
  global.PadelAuth = Object.freeze({ authenticate, getStoredRole, rememberRole });
})(window);
