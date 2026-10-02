# ITIZ+ — portal estático para la comunidad

## Páginas y archivos

- `index.html`, `styles.css` y `script.js`: dashboard, oferta educativa, actividades y detalles de las carreras con SweetAlert2.
- `mapa.html`, `mapa.css` y `mapa.js`: mapa independiente, selectores de origen/destino, invertir ruta, filtros, búsqueda, trazado esquemático, zoom y arrastre.
- `login.html`, `login.css` y `login.js`: inicio de sesión, registro, recuperación y cierre de sesión con Supabase Auth y SweetAlert2.
- `app-shell.js`: tema claro/oscuro, perfil de navegación y cliente Supabase compartido.
- `mapa.png`: imagen del plano del campus utilizada por el mapa.
- `supabase_setup.sql`: trigger, políticas y RPC de matrícula incluidos para configurar el proyecto.

## Ejecución

Sirve la carpeta desde IntelliJ o con cualquier servidor HTTP estático para evitar restricciones del navegador al autenticar desde `file://`. No requiere compilación ni `npm install`. Para autenticación real, configura el proyecto Supabase y ejecuta `supabase_setup.sql` en SQL Editor.

El proyecto usa una publishable key en el cliente; nunca coloques una service-role key en los archivos web. Conserva Row Level Security (RLS) y las políticas apropiadas para tus tablas. La búsqueda de matrícula requiere la función RPC `get_auth_email_by_matricula`; el registro requiere la tabla `carreras` y el trigger configurado en el SQL.

En Supabase > Authentication > URL Configuration, añade las URLs de despliegue permitidas para `login.html` y confirma el dominio de redirección del correo. El flujo informa al estudiante si debe confirmar el correo antes de iniciar sesión.

El mapa y las rutas entre cualquier par de ubicaciones son guías esquemáticas derivadas del plano disponible, sin escala, distancias ni pasillos verificados. Los marcadores de espacios no etiquetados en el plano y el horario de atención de Servicios Escolares son referenciales: confirma ubicaciones, horarios y trámites con el instituto.

## Publicación

Publica la carpeta completa en GitHub Pages o en otro hosting estático, incluyendo `mapa.png`, `app-shell.js` y las tres páginas. Google Fonts, Lucide, Supabase y SweetAlert2 se cargan desde CDN y requieren conexión a internet.
