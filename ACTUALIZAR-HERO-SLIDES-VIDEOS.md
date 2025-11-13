# 🎬 Guía para Agregar Videos a Hero Slides en Strapi

## ⚠️ IMPORTANTE: Modo Desarrollo Requerido

**Para editar Content Types en Strapi, DEBES estar en modo desarrollo.**

### ✅ Verificar que estás en modo desarrollo:
1. Strapi debe estar corriendo con `npm run develop` (NO `npm run start`)
2. Debes ver **Content-Type Builder** en el menú lateral izquierdo
3. Si no ves Content-Type Builder, estás en modo producción y no podrás editar content types

---

## 📋 Pasos para Agregar Campos de Video al Content Type "hero-slide"

### 1. Acceder al Content-Type Builder

1. Ve a **Content-Type Builder** en Strapi
2. Busca **"Hero Slide"** en la lista de Collection Types
3. Clic en **"Hero Slide"** para ver todos los campos

### 2. Agregar Campos de Video

Agrega los siguientes campos en el orden indicado:

#### Campo 1: `video` (Media - Single media)
- **Name**: `video`
- **Type**: Media
- **Default**: Single media
- **Required**: No
- **Allowed types**: Videos (MP4, WebM, etc.)
- **Note**: Para videos directos (self-hosted)

#### Campo 2: `youtube_url` (Text - Short text)
- **Name**: `youtube_url`
- **Type**: Text
- **Default**: Short text
- **Required**: No
- **Note**: URL completa de YouTube (ej: `https://www.youtube.com/watch?v=VIDEO_ID`)

#### Campo 3: `vimeo_url` (Text - Short text)
- **Name**: `vimeo_url`
- **Type**: Text
- **Default**: Short text
- **Required**: No
- **Note**: URL completa de Vimeo (ej: `https://vimeo.com/VIDEO_ID`)

#### Campo 4: `video_type` (Enumeration)
- **Name**: `video_type`
- **Type**: Enumeration
- **Values**: 
  - `direct` (para videos directos)
  - `youtube` (para videos de YouTube)
  - `vimeo` (para videos de Vimeo)
- **Default**: (sin valor por defecto)
- **Required**: No

#### Campo 5: `video_autoplay` (Boolean)
- **Name**: `video_autoplay`
- **Type**: Boolean
- **Default**: `true`
- **Required**: No
- **Note**: Si el video debe reproducirse automáticamente

#### Campo 6: `video_muted` (Boolean)
- **Name**: `video_muted`
- **Type**: Boolean
- **Default**: `true`
- **Required**: No
- **Note**: Si el video debe estar silenciado por defecto (requerido para autoplay en muchos navegadores)

#### Campo 7: `video_controls` (Boolean)
- **Name**: `video_controls`
- **Type**: Boolean
- **Default**: `false`
- **Required**: No
- **Note**: Si mostrar controles de reproducción (play, pause, volumen, etc.)

#### Campo 8: `video_loop` (Boolean)
- **Name**: `video_loop`
- **Type**: Boolean
- **Default**: `true`
- **Required**: No
- **Note**: Si el video debe repetirse en bucle

### 3. Guardar los Cambios

1. Clic en **"Save"** en la parte superior derecha
2. Espera a que Strapi compile los cambios
3. Verifica que no hay errores

---

## 📝 Cómo Usar Videos en Hero Slides

### Opción 1: Video Directo (Self-hosted)

1. Ve a **Content Manager > Hero Slide**
2. Edita o crea un Hero Slide
3. Completa los campos:
   - **Image**: (opcional) Imagen de respaldo/thumbnail
   - **Image Mobile**: (opcional) Imagen móvil de respaldo/thumbnail
   - **Video**: Sube un archivo MP4, WebM, etc.
   - **Video Type**: `direct`
   - **Video Autoplay**: `true` (recomendado)
   - **Video Muted**: `true` (requerido para autoplay)
   - **Video Controls**: `false` (recomendado para hero)
   - **Video Loop**: `true` (recomendado para hero)
4. Clic en **"Save"** y **"Publish"**

### Opción 2: Video de YouTube

1. Ve a **Content Manager > Hero Slide**
2. Edita o crea un Hero Slide
3. Completa los campos:
   - **Image**: (opcional) Imagen de respaldo/thumbnail
   - **Image Mobile**: (opcional) Imagen móvil de respaldo/thumbnail
   - **YouTube URL**: `https://www.youtube.com/watch?v=VIDEO_ID`
   - **Video Type**: `youtube`
   - **Video Autoplay**: `true` (recomendado)
   - **Video Muted**: `true` (requerido para autoplay)
   - **Video Controls**: `false` (recomendado para hero)
   - **Video Loop**: `true` (recomendado para hero)
4. Clic en **"Save"** y **"Publish"**

### Opción 3: Video de Vimeo

1. Ve a **Content Manager > Hero Slide**
2. Edita o crea un Hero Slide
3. Completa los campos:
   - **Image**: (opcional) Imagen de respaldo/thumbnail
   - **Image Mobile**: (opcional) Imagen móvil de respaldo/thumbnail
   - **Vimeo URL**: `https://vimeo.com/VIDEO_ID`
   - **Video Type**: `vimeo`
   - **Video Autoplay**: `true` (recomendado)
   - **Video Muted**: `true` (requerido para autoplay)
   - **Video Controls**: `false` (recomendado para hero)
   - **Video Loop**: `true` (recomendado para hero)
4. Clic en **"Save"** y **"Publish"**

### Opción 4: Solo Imagen (Sin Video)

Si no completas los campos de video, el Hero Slide mostrará solo la imagen (comportamiento actual).

---

## 🎯 Recomendaciones

### Para Hero Slides con Videos:

1. **Autoplay y Muted**: Siempre usa `autoplay: true` y `muted: true` para mejor UX
2. **Loop**: Usa `loop: true` para videos cortos que se repiten
3. **Controls**: Usa `controls: false` para un look más limpio en el hero
4. **Imagen de Respaldo**: Siempre incluye una imagen como respaldo por si el video no carga
5. **Videos Cortos**: Los videos de 10-30 segundos funcionan mejor para hero slides
6. **Formato**: Para videos directos, usa MP4 (H.264) para mejor compatibilidad

### Orden de Prioridad:

El componente Hero mostrará:
1. **Video** (si está configurado) - YouTube, Vimeo, o Directo
2. **Imagen** (si no hay video o como respaldo)

---

## 🔧 Troubleshooting

### El video no se muestra

- Verifica que el Hero Slide esté publicado
- Verifica que `is_active` esté en `true`
- Verifica que el `video_type` esté configurado correctamente
- Verifica que la URL de YouTube/Vimeo sea correcta
- Verifica que el archivo de video se haya subido correctamente

### El video no se reproduce automáticamente

- Verifica que `video_autoplay` esté en `true`
- Verifica que `video_muted` esté en `true` (requerido para autoplay)
- Algunos navegadores bloquean autoplay con sonido

### El video se ve mal en móvil

- Asegúrate de que el video tenga `playsInline` (ya está configurado en el código)
- Considera usar una imagen móvil diferente si el video no se adapta bien

---

## 🚀 Próximos Pasos

1. Agregar los campos de video al Content Type "hero-slide" en Strapi
2. Crear o editar Hero Slides con videos
3. Verificar que los videos se muestran correctamente en el frontend
4. Ajustar configuraciones según sea necesario

---

## 📝 Notas

- Los videos en hero slides se reproducen automáticamente y en bucle por defecto
- Los videos se pueden mezclar con imágenes en el mismo carrusel
- El componente Hero detecta automáticamente si un slide tiene video o imagen
- Si un slide tiene video, se mostrará el video; si no, se mostrará la imagen

---

¿Necesitas ayuda? Revisa los logs de Strapi o contacta al equipo de desarrollo.

