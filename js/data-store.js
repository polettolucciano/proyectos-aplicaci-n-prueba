(function registerDataStore(global) {
  const loadLocalData = storageKey => {
    try { return JSON.parse(localStorage.getItem(storageKey)); } catch { return null; }
  };
  const saveLocalData = (storageKey, data) => localStorage.setItem(storageKey, JSON.stringify(data));
  const loadRemoteData = async () => {
    const baseUrl = global.PadelConfig.getApiBaseUrl();
    if (!baseUrl) return null;
    const response = await fetch(`${baseUrl}/demo-state`, { credentials: 'include' });
    if (!response.ok) throw new Error('No se pudo recuperar el estado remoto.');
    return response.json();
  };
  const syncRemoteData = async data => {
    const baseUrl = global.PadelConfig.getApiBaseUrl();
    if (!baseUrl) return;
    const response = await fetch(`${baseUrl}/demo-state`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!response.ok) throw new Error('No se pudo guardar el estado remoto.');
  };
  global.PadelDataStore = Object.freeze({ loadLocalData, saveLocalData, loadRemoteData, syncRemoteData });
})(window);
