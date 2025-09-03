# ATA Forms Hub (estático, gratis)

Sitio estático para agrupar *solo* contenido de Taekwondo **ATA**: videos de YouTube, pasos con fotos alojadas en un servidor y texto explicativo.

## ¿Qué incluye?
- Frontend puro (HTML + CSS + JS) — sin backend.
- Buscador y filtros por cinturón y categoría.
- Tarjetas con preview del video (embed) y un modal con:
  - Video incrustado (YouTube)
  - Metadatos (cinturón, categoría, duración)
  - Pasos con texto, timecodes clicables y foto por paso (opcional)
  - Galería de imágenes

## Cómo usar
1. **Descarga** este ZIP y descomprímelo.
2. Abre `index.html` en tu navegador (doble click) para probar local.
3. Edita `data/forms.json` para agregar/editar formas:
   - Puedes poner **link completo de YouTube** en `youtubeUrl` o solo el `youtubeId`.
   - Agrega pasos en `steps` con `title`, `text`, `timecode` (segundos) e `imageUrl` (opcional).
   - Agrega URLs de fotos a `images` para mostrarlas en la galería.
4. Sube tus fotos a un **servidor gratis** (sugerencias abajo) y copia las **URLs públicas**.

## Hosting gratis recomendado
- **GitHub Pages** (muy simple, estable) → sube el repo y habilita Pages.
- **Netlify** o **Vercel** (con deploy automático desde GitHub).

## Dónde alojar tus fotos (gratis)
- **Cloudinary** plan free: URLs rápidas y transformaciones.
- **GitHub** (mismo repo, carpeta `/images` y usa rutas relativas).
- **Imgur** (rápido, pero mejor Cloudinary/GitHub para control).

## Estructura del JSON
```json
{
  "id": "songahm-1",
  "name": "Songahm 1",
  "rank": "Blanco",
  "category": "Formas",
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID_REEMPLAZAR",
  "duration": "~3 min",
  "steps": [
    {
      "title": "Atención y saludo",
      "text": "Descripción del paso…",
      "timecode": 5,
      "imageUrl": "https://tu-servidor/imagen1.jpg"
    }
  ],
  "images": ["https://tu-servidor/foto1.jpg", "https://tu-servidor/foto2.jpg"]
}
```

> **Tip:** el sistema extrae el ID de YouTube automáticamente desde la URL.

## Publicar en GitHub Pages (paso a paso)
1. Crea un repo en GitHub (p. ej. `ata-forms-hub`).
2. Sube todos los archivos de esta carpeta (incluida `data/forms.json`).
3. En **Settings → Pages**, selecciona la rama (`main`) y carpeta **/root** (o `/docs` si prefieres mover el sitio).
4. Espera a que GitHub te dé una URL (algo como `https://tuusuario.github.io/ata-forms-hub/`).

## Personalización rápida
- Cambia colores en `styles.css` (variables CSS al inicio).
- Modifica las opciones de filtros en `index.html` si quieres otras categorías.
- Añade campos extra (p. ej. “número de movimientos”) y muéstralos en `app.js`.

## Límite importante
- **Respeta el contenido ATA**: no mezcles ITF/WTF/Kukkiwon.
- Verifica que los videos que embebes sean **correctos** para ATA.

¡Listo! Si necesitas que lo convierta a **Next.js**/**MDX** con CMS o que agregue editor visual para pasos, dime y lo armamos.
