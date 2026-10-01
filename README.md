# ITIZ+ — versión estática para GitHub Pages


## Archivos principales

- `index.html` — página principal y mapa.
- `styles.css` — estilos de la página principal.
- `script.js` — carrusel, mapa, búsqueda, zoom y modales.
- `login.html` — inicio de sesión + registro en la misma página.
- `login.css` — estilos del acceso.
- `login.js` — integración con Supabase Auth y la base de datos.
- `mapa.png` — coloca aquí tu imagen del mapa.
- `supabase_setup.sql` — políticas, trigger y RPC necesarios en Supabase.

## Configuración de Supabase

1. Abre Supabase > SQL Editor.
2. Ejecuta `supabase_setup.sql`.
3. En Authentication > URL Configuration agrega la URL de tu página de GitHub Pages. Por ejemplo:
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/login.html`
4. Decide si quieres mantener activada la confirmación de correo. Si está activa, el registro muestra un aviso para confirmar el email.

La clave incluida en `login.js` es una **publishable key**, no una secret/service-role key. Aun así, las tablas deben quedar protegidas con Row Level Security (RLS).

## Publicación

Sube estos archivos al repositorio y activa GitHub Pages desde la rama/carpeta correspondiente. No necesitas `npm install` ni un servidor Node para desplegar este proyecto.
