// Public configuration only. Never place database credentials or payment keys here.
(function registerConfig(global) {
  const getApiBaseUrl = () => String(global.APP_API_BASE_URL || '').trim().replace(/\/$/, '');
  global.PadelConfig = Object.freeze({
    STORAGE_KEY: 'padel-reservas-demo-v3',
    getApiBaseUrl,
    isRemoteMode: () => Boolean(getApiBaseUrl())
  });
})(window);
