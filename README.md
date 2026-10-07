# Boceto Padel

Demo de reservas de pádel preparada para funcionar sin servidor y para conectarse luego a una API.

## Estructura

- `index.html`: interfaz y reglas de reserva.
- `js/config.js`: configuración pública; no contiene secretos.
- `js/data-store.js`: persistencia local y sincronización con la API.
- `js/auth.js`: acceso demo y puente a autenticación remota.

Mientras no se defina `window.APP_API_BASE_URL`, los datos se guardan en el navegador con `localStorage`. Esto permite probar reservas, cancelaciones, inventario y configuración del club sin depender de servicios externos.

## Contrato de la API futura

Antes de cargar los scripts, definir `window.APP_API_BASE_URL` con la URL del backend. La app espera:

- `GET /demo-state` → `{ club, expenses, stock, bookings }`
- `PUT /demo-state` → recibe el mismo objeto y responde `2xx`
- `POST /auth/session` → recibe `{ username, password, requestedRole }` y responde `{ role }`

El backend debe validar permisos y disponibilidad en cada escritura. La interfaz evita reservas duplicadas, pero la base de datos debe imponer también una restricción única por `fecha + cancha + horario`.

## Seguridad de producción

No subir contraseñas, claves de Mercado Pago ni credenciales de la base de datos al repositorio. La autenticación real debe manejarse en el servidor, usando cookies `HttpOnly`, `Secure` y `SameSite`; los datos de pago y los mensajes automáticos de WhatsApp también requieren servicios de servidor con sus propias credenciales.
