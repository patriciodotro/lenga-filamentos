# Lenga · Filament Tracker

App para control de stock de filamentos de impresión 3D.

## Cómo subir a Vercel

### 1. Subir a GitHub
1. En GitHub, creá un repositorio nuevo llamado `lenga-filamentos`
2. Subí todos estos archivos (arrastrá la carpeta o usá GitHub Desktop)

### 2. Conectar con Vercel
1. Entrá a [vercel.com](https://vercel.com) y creá una cuenta gratis
2. Click en "Add New Project"
3. Importá el repositorio `lenga-filamentos` desde GitHub
4. En configuración dejá todo por defecto — Vercel detecta React automáticamente
5. Click en "Deploy"

En 2 minutos tenés tu URL lista.

### 3. Actualizar la app en el futuro
Cada vez que reemplaces el archivo `src/App.js` en GitHub,
Vercel detecta el cambio y actualiza la app automáticamente.

## Datos
Los datos se guardan en el navegador (localStorage).
Son independientes por dispositivo — si abrís la app en el celular,
tenés que cargar los datos ahí también.
