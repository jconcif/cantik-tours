# Imágenes a Reemplazar - Cantik Tours

## Resumen
Necesitas reemplazar 2 imágenes que actualmente muestran a Pertiyano por imágenes de paisajes de Bali **sin personas**.

---

## 1. Imagen del Hero (Página de Inicio)

**Ubicación del archivo:** `public/images/hero.png`

**Dónde se usa:** 
- Componente: `src/components/Hero.jsx` (línea 22)
- Página: Inicio (Home) - Es la imagen principal de fondo que aparece al entrar al sitio

**Especificaciones recomendadas:**
- **Tipo:** Paisaje panorámico de Bali
- **Orientación:** Horizontal (landscape)
- **Resolución mínima:** 1920x1080px (Full HD) o superior
- **Formato:** PNG o JPG
- **Sin personas**

**Sugerencias de contenido:**
- Terrazas de arroz (rice terraces) al amanecer/atardecer
- Templos balineses con montañas al fondo
- Paisaje tropical con palmeras y cielo dramático
- Vista panorámica de la isla

**Recursos gratuitos:**
- Unsplash: https://unsplash.com/s/photos/bali-landscape
- Pexels: https://www.pexels.com/search/bali%20landscape/

---

## 2. Imagen de la Sección "Nosotros" (About Us)

**Ubicación del archivo:** `public/images/perti.jpg`

**Dónde se usa:**
- Componente: `src/components/AboutUs.jsx` (línea 54)
- Página: Inicio (Home) - Sección "Nosotros" (id="nosotros")
- También aparece en: Página "Nosotros" (`/nosotros`)

**Especificaciones recomendadas:**
- **Tipo:** Paisaje de Bali con elementos culturales
- **Orientación:** Vertical o cuadrada (4:5 o 1:1)
- **Resolución mínima:** 800x1000px
- **Formato:** JPG o PNG
- **Sin personas**

**Sugerencias de contenido:**
- Templo balinés con vegetación tropical
- Jardín zen con esculturas de piedra balinesas
- Cascada en la selva tropical
- Arquitectura tradicional balinesa con naturaleza
- Flores tropicales con elementos culturales

**Recursos gratuitos:**
- Unsplash: https://unsplash.com/s/photos/bali-temple
- Pexels: https://www.pexels.com/search/bali%20culture/

---

## Instrucciones para Reemplazar

### Opción 1: Reemplazar archivos directamente
1. Descarga las imágenes que te gusten de Unsplash o Pexels
2. Renombra las imágenes:
   - Para el hero: `hero.png` o `hero.jpg`
   - Para nosotros: `perti.jpg`
3. Reemplaza los archivos en la carpeta `public/images/`

### Opción 2: Usar nuevos nombres de archivo
Si prefieres usar nombres diferentes:

1. Guarda las nuevas imágenes en `public/images/` con los nombres que prefieras
2. Actualiza las referencias en el código:

**Para el Hero:**
```javascript
// En src/components/Hero.jsx, línea 22
src="/images/TU_NUEVO_NOMBRE.jpg"  // Cambia hero.png por tu nuevo nombre
```

**Para Nosotros:**
```javascript
// En src/components/AboutUs.jsx, línea 54
src="/images/TU_NUEVO_NOMBRE.jpg"  // Cambia perti.jpg por tu nuevo nombre
```

---

## Notas Importantes

- ✅ Asegúrate de que las imágenes sean de **alta calidad**
- ✅ Verifica que **NO haya personas** en las imágenes
- ✅ Las imágenes de Unsplash y Pexels son **gratuitas** y libres para uso comercial
- ✅ Después de reemplazar, recarga la página para ver los cambios
- ✅ Si usas el navegador, puede que necesites limpiar la caché (Cmd+Shift+R en Mac)

---

## Enlaces Directos Recomendados

### Para Hero (horizontal, dramático):
- https://unsplash.com/s/photos/bali-rice-terraces
- https://unsplash.com/s/photos/bali-sunrise
- https://unsplash.com/s/photos/bali-temple-landscape

### Para Nosotros (vertical/cuadrado, cultural):
- https://unsplash.com/s/photos/bali-temple
- https://unsplash.com/s/photos/bali-culture
- https://unsplash.com/s/photos/bali-garden
