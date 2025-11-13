# 🧪 Cómo Probar Cambios en Desarrollo

## 📋 Resumen

Antes de pasar cambios a producción, es importante probarlos localmente en modo desarrollo. Esta guía te muestra cómo verificar que todo funciona correctamente.

---

## ✅ Paso 1: Verificar que Strapi Está en Modo Desarrollo

### 1.1. Verificar que está corriendo:

```bash
# Verificar procesos
ps aux | grep "strapi develop" | grep -v grep
```

O simplemente abre tu navegador en:
```
http://localhost:1337/admin
```

### 1.2. Verificar que Content-Type Builder está disponible:

1. Inicia sesión en `http://localhost:1337/admin`
2. En el menú lateral izquierdo, deberías ver **"Content-Type Builder"**
3. Si NO lo ves, estás en modo producción ❌

---

## 🎬 Paso 2: Verificar el Content Type "Video"

### 2.1. Verificar que el Content Type existe:

1. Ve a **Content-Type Builder** en el menú lateral
2. Deberías ver **"Video"** en la lista de Collection Types
3. Clic en **"Video"** para ver todos los campos

### 2.2. Verificar que todos los campos están creados:

Deberías ver estos campos:
- ✅ `title` (Text - Short text)
- ✅ `description` (Text - Long text)
- ✅ `video` (Media - Single media)
- ✅ `youtube_url` (Text - Short text)
- ✅ `vimeo_url` (Text - Short text)
- ✅ `video_type` (Enumeration: direct, youtube, vimeo)
- ✅ `thumbnail` (Media - Single media)
- ✅ `autoplay` (Boolean)
- ✅ `muted` (Boolean)
- ✅ `controls` (Boolean)
- ✅ `loop` (Boolean)
- ✅ `height` (Enumeration: small, medium, large, full)
- ✅ `text_position` (Enumeration: top, bottom, overlay)
- ✅ `is_active` (Boolean)
- ✅ `sort_order` (Number - Integer)

---

## 🔐 Paso 3: Configurar Permisos

### 3.1. Configurar permisos públicos:

1. Ve a **Settings > Users & Permissions Plugin > Roles > Public**
2. Busca la sección **"Video"**
3. Marca los siguientes permisos:
   - ✅ `find` (para obtener lista de videos)
   - ✅ `findOne` (para obtener un video por ID)
4. Clic en **"Save"**

### 3.2. Verificar permisos:

```bash
# Probar la API desde la terminal
curl http://localhost:1337/api/videos
```

Deberías recibir una respuesta JSON (probablemente un array vacío `[]` si no hay videos aún).

---

## 📝 Paso 4: Crear un Video de Prueba

### 4.1. Crear un video desde el panel:

1. Ve a **Content Manager > Video**
2. Clic en **"+ Create new entry"**
3. Completa los campos:

#### Ejemplo 1: Video de YouTube
- **Title**: "Video de Prueba - YouTube"
- **Description**: "Este es un video de prueba desde YouTube"
- **YouTube URL**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` (o cualquier video de YouTube)
- **Video Type**: `youtube`
- **Autoplay**: `false`
- **Muted**: `true`
- **Controls**: `true`
- **Loop**: `false`
- **Height**: `medium`
- **Text Position**: `bottom`
- **Is Active**: `true`
- **Sort Order**: `0`

4. Clic en **"Save"**
5. Clic en **"Publish"**

#### Ejemplo 2: Video de Vimeo
- **Title**: "Video de Prueba - Vimeo"
- **Vimeo URL**: `https://vimeo.com/123456789` (o cualquier video de Vimeo)
- **Video Type**: `vimeo`
- (Resto igual que el ejemplo anterior)

#### Ejemplo 3: Video Directo (si tienes un archivo MP4)
- **Title**: "Video de Prueba - Directo"
- **Video**: Sube un archivo MP4
- **Video Type**: `direct`
- (Resto igual que el ejemplo anterior)

---

## 🧪 Paso 5: Probar la API

### 5.1. Probar obtener todos los videos:

```bash
curl http://localhost:1337/api/videos
```

**Respuesta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Video de Prueba - YouTube",
        "description": "Este es un video de prueba desde YouTube",
        "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "video_type": "youtube",
        "autoplay": false,
        "muted": true,
        "controls": true,
        "loop": false,
        "height": "medium",
        "text_position": "bottom",
        "is_active": true,
        "sort_order": 0,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### 5.2. Probar obtener un video por ID:

```bash
curl http://localhost:1337/api/videos/1
```

**Respuesta esperada:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Video de Prueba - YouTube",
      ...
    }
  }
}
```

### 5.3. Probar con filtros (solo videos activos):

```bash
curl "http://localhost:1337/api/videos?filters[is_active][$eq]=true"
```

---

## 🎨 Paso 6: Probar desde el Frontend

### 6.1. Verificar que el frontend puede conectarse a Strapi:

1. Asegúrate de que el frontend tiene la URL correcta de Strapi en desarrollo
2. Verifica el archivo `.env` o `.env.local` del frontend:

```bash
# En el frontend
VITE_STRAPI_URL=http://localhost:1337
```

### 6.2. Probar el hook `useVideos`:

Abre la consola del navegador y verifica que no hay errores cuando el componente intenta cargar videos.

### 6.3. Probar el componente `VideoSection`:

En `src/pages/Index.tsx`, descomenta la sección de video:

```tsx
<section id="video">
  <VideoSection videoId="1" />
</section>
```

### 6.4. Verificar en el navegador:

1. Inicia el servidor de desarrollo del frontend:
   ```bash
   cd /Users/macbookpro/Desktop/carpenter-company/carpenter-company
   npm run dev
   ```

2. Abre `http://localhost:5173` (o el puerto que use Vite)

3. Navega a la sección de video

4. Verifica que:
   - ✅ El video se carga correctamente
   - ✅ El título y descripción se muestran
   - ✅ Los controles funcionan (si están habilitados)
   - ✅ El video se reproduce correctamente

---

## 🔍 Paso 7: Verificar Logs y Errores

### 7.1. Verificar logs de Strapi:

Revisa la terminal donde está corriendo `npm run develop`. Deberías ver:
- ✅ Sin errores de compilación
- ✅ Sin errores de conexión a la base de datos
- ✅ Requests HTTP exitosos (200, 201)

### 7.2. Verificar logs del frontend:

Revisa la consola del navegador (F12):
- ✅ Sin errores de CORS
- ✅ Sin errores 404 o 500
- ✅ Sin errores de TypeScript

### 7.3. Verificar Network Tab:

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca requests a `/api/videos`
5. Verifica que:
   - ✅ El status es 200
   - ✅ La respuesta contiene datos válidos

---

## ✅ Checklist de Pruebas

Antes de pasar a producción, verifica:

### Backend (Strapi):
- [ ] Strapi está corriendo en modo desarrollo
- [ ] Content-Type Builder está disponible
- [ ] El Content Type "Video" existe y tiene todos los campos
- [ ] Los permisos públicos están configurados
- [ ] Puedo crear un video desde el panel
- [ ] Puedo publicar un video
- [ ] La API `/api/videos` responde correctamente
- [ ] La API `/api/videos/:id` responde correctamente
- [ ] Los filtros funcionan (ej: `is_active=true`)

### Frontend:
- [ ] El frontend puede conectarse a Strapi local
- [ ] El hook `useVideos()` funciona correctamente
- [ ] El hook `useVideo(id)` funciona correctamente
- [ ] El componente `VideoSection` muestra videos correctamente
- [ ] Los videos de YouTube se reproducen
- [ ] Los videos de Vimeo se reproducen
- [ ] Los videos directos se reproducen (si los probaste)
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores de CORS

### Funcionalidad:
- [ ] Los videos se cargan con el título y descripción correctos
- [ ] Los controles funcionan (play, pause, mute, etc.)
- [ ] El autoplay funciona (si está habilitado)
- [ ] El loop funciona (si está habilitado)
- [ ] La altura del video es correcta (small, medium, large, full)
- [ ] La posición del texto es correcta (top, bottom, overlay)
- [ ] Solo se muestran videos con `is_active=true`

---

## 🐛 Troubleshooting

### Error: "Content-Type Builder no está disponible"

**Solución**: Asegúrate de estar en modo desarrollo:
```bash
cd /Users/macbookpro/Desktop/carpenter-company/carpenter-company-backend
npm run develop
```

### Error: "No se puede acceder a /api/videos"

**Solución**: Verifica los permisos:
1. Ve a **Settings > Users & Permissions Plugin > Roles > Public**
2. Marca `find` y `findOne` para Video
3. Guarda los cambios

### Error: CORS en el frontend

**Solución**: Verifica la configuración de CORS en Strapi:
1. Ve a **Settings > Middlewares**
2. Verifica que `cors` esté habilitado
3. Verifica que `http://localhost:5173` esté en la lista de orígenes permitidos

### Error: "Video no se muestra"

**Solución**:
1. Verifica que el video esté publicado en Strapi
2. Verifica que `is_active` esté en `true`
3. Verifica que la URL de YouTube/Vimeo sea correcta
4. Verifica los logs del navegador para ver errores específicos

---

## 🎯 Próximos Pasos

Una vez que hayas probado todo en desarrollo y esté funcionando correctamente:

1. ✅ Revisa el checklist de pruebas
2. ✅ Asegúrate de que no hay errores
3. ✅ Sigue la guía `COMO-PASAR-A-PRODUCCION.md` para desplegar

---

¿Necesitas ayuda con alguna prueba específica? Revisa los logs o contacta al equipo de desarrollo.

