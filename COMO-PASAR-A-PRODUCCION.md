# 🚀 Cómo Pasar Cambios de Strapi a Producción

## 📋 Resumen

Cuando creas o modificas **Content Types** en Strapi en modo desarrollo, estos cambios se guardan como **archivos de código** en tu repositorio. Para que estos cambios estén disponibles en producción (Render), necesitas:

1. ✅ **Verificar** que los cambios estén guardados
2. ✅ **Commitear** los cambios al repositorio
3. ✅ **Hacer push** al repositorio remoto
4. ✅ **Render** hará deploy automático (o manual)

---

## 🔍 Paso 1: Verificar que los Cambios Están Guardados

Los Content Types se guardan en archivos JSON dentro de `src/api/`:

```
carpenter-company-backend/
└── src/
    └── api/
        └── video/                    ← Content Type "Video"
            └── content-types/
                └── video/
                    └── schema.json   ← Aquí está la estructura del Content Type
```

### Verificar cambios pendientes:

```bash
cd /Users/macbookpro/Desktop/carpenter-company/carpenter-company-backend
git status
```

Deberías ver archivos modificados o nuevos relacionados con el Content Type que creaste.

---

## 📝 Paso 2: Agregar y Commitear los Cambios

### 2.1. Ver qué archivos cambiaron:

```bash
git status
```

### 2.2. Agregar los archivos al staging:

```bash
# Agregar todos los cambios
git add .

# O agregar solo los archivos del Content Type específico
git add src/api/video/
```

### 2.3. Hacer commit:

```bash
git commit -m "feat: agregar Content Type Video para gestión de videos"
```

**Ejemplos de mensajes de commit:**
- `feat: agregar Content Type Video`
- `feat: actualizar Content Type Product con nuevos campos`
- `fix: corregir schema del Content Type Category`

---

## 🚀 Paso 3: Hacer Push al Repositorio

### 3.1. Verificar el remoto:

```bash
git remote -v
```

Deberías ver algo como:
```
origin  https://github.com/tu-usuario/carpenter-company-backend.git (fetch)
origin  https://github.com/tu-usuario/carpenter-company-backend.git (push)
```

### 3.2. Hacer push:

```bash
git push origin main
# o
git push origin master
```

---

## 🔄 Paso 4: Deploy Automático en Render

Si tu proyecto en Render está conectado al repositorio de GitHub/GitLab:

1. **Render detectará automáticamente** el nuevo push
2. **Iniciará el proceso de build** automáticamente
3. **Desplegará los cambios** a producción

### Verificar el deploy:

1. Ve a tu dashboard de Render
2. Selecciona tu servicio de Strapi
3. Ve a la pestaña **"Events"** o **"Logs"**
4. Deberías ver un nuevo deploy iniciándose

### Tiempo estimado:
- **Build**: 2-5 minutos
- **Deploy**: 1-2 minutos
- **Total**: 3-7 minutos

---

## ⚙️ Paso 5: Verificar que los Cambios Están en Producción

Una vez que el deploy termine:

### 5.1. Acceder al panel de administración de producción:

```
https://tu-strapi-en-render.com/admin
```

### 5.2. Verificar que el Content Type existe:

1. Inicia sesión en el panel de administración
2. Ve a **Content Manager**
3. Deberías ver el nuevo Content Type (ej: "Video") en el menú lateral

### 5.3. Verificar permisos:

1. Ve a **Settings > Users & Permissions Plugin > Roles > Public**
2. Verifica que el nuevo Content Type tenga permisos configurados:
   - ✅ `find` (para obtener listas)
   - ✅ `findOne` (para obtener un elemento por ID)

---

## 📊 ¿Qué se Pasa a Producción?

### ✅ Se Pasan a Producción:
- **Content Types** (estructura de datos) → Archivos `schema.json`
- **Controllers, Routes, Services** → Archivos TypeScript/JavaScript
- **Configuraciones** → Archivos en `config/`
- **Plugins personalizados** → Código en `src/extensions/`

### ❌ NO se Pasan a Producción:
- **Datos/Contenido** → Estos ya están en la base de datos compartida
- **Archivos subidos** → Ya están en DigitalOcean Spaces
- **Variables de entorno** → Se configuran directamente en Render

---

## 🔧 Deploy Manual (si el automático no funciona)

Si Render no detecta automáticamente los cambios:

### Opción 1: Trigger Manual en Render

1. Ve a tu servicio en Render
2. Clic en **"Manual Deploy"**
3. Selecciona el commit más reciente
4. Clic en **"Deploy"**

### Opción 2: Usar Render CLI

```bash
# Instalar Render CLI (si no lo tienes)
npm install -g render-cli

# Hacer deploy manual
render deploy
```

---

## ⚠️ Importante: Base de Datos Compartida

### ✅ Ventaja:
- Los **datos** (videos, productos, etc.) que crees en desarrollo **ya están disponibles en producción**
- No necesitas migrar datos manualmente
- La base de datos es la misma en ambos entornos

### ⚠️ Precauciones:
- **NO** crees datos de prueba en desarrollo que no quieras en producción
- **NO** elimines datos importantes en desarrollo (se eliminarán también en producción)
- **SÍ** puedes crear datos de prueba, pero recuerda eliminarlos antes de pasar a producción

---

## 🐛 Troubleshooting

### El Content Type no aparece en producción

**Problema**: Hiciste push pero el Content Type no aparece en producción.

**Solución**:
1. Verifica que el deploy se completó correctamente en Render
2. Verifica que los archivos están en el repositorio:
   ```bash
   git ls-files src/api/video/
   ```
3. Verifica los logs de Render para ver si hubo errores en el build
4. Intenta hacer un deploy manual desde Render

### Error en el build de Render

**Problema**: El build falla en Render.

**Solución**:
1. Revisa los logs de build en Render
2. Verifica que todas las dependencias estén en `package.json`
3. Verifica que no haya errores de sintaxis en los archivos TypeScript
4. Verifica que el schema.json sea válido JSON

### Los permisos no funcionan

**Problema**: El Content Type aparece pero no puedes acceder a los datos desde el frontend.

**Solución**:
1. Ve a **Settings > Users & Permissions Plugin > Roles > Public**
2. Marca los permisos necesarios:
   - ✅ `find`
   - ✅ `findOne`
3. Clic en **"Save"**
4. Verifica que el Content Type esté publicado en Strapi

---

## 📝 Checklist Antes de Pasar a Producción

- [ ] Verificaste que los cambios están guardados localmente
- [ ] Hiciste commit de todos los archivos del Content Type
- [ ] Hiciste push al repositorio remoto
- [ ] Verificaste que Render está haciendo el deploy
- [ ] Esperaste a que el deploy termine
- [ ] Verificaste que el Content Type aparece en producción
- [ ] Configuraste los permisos en producción
- [ ] Probaste crear/editar contenido desde producción

---

## 🎯 Resumen Rápido

```bash
# 1. Verificar cambios
cd /Users/macbookpro/Desktop/carpenter-company/carpenter-company-backend
git status

# 2. Agregar cambios
git add src/api/video/

# 3. Commit
git commit -m "feat: agregar Content Type Video"

# 4. Push
git push origin main

# 5. Esperar deploy en Render (3-7 minutos)

# 6. Verificar en producción
# https://tu-strapi-en-render.com/admin
```

---

## 💡 Tips

1. **Siempre verifica** que los cambios estén en el repositorio antes de esperar el deploy
2. **Usa mensajes de commit descriptivos** para saber qué cambió
3. **Revisa los logs de Render** si algo no funciona
4. **Haz pruebas locales** antes de pasar a producción
5. **Mantén un backup** de la base de datos antes de cambios importantes

---

¿Necesitas ayuda? Revisa los logs de Render o contacta al equipo de desarrollo.

