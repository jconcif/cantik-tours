# Guía de Actualización de Contenido - Cantik Tours

Este sitio web es estático, lo que significa que el contenido vive dentro de los archivos de código. Esto lo hace extremadamente rápido y seguro. Aquí te explicamos cómo actualizar las partes más comunes.

## 1. Agregar Nuevas Reseñas

Las reseñas se encuentran en el archivo:
`src/data/tours.js`

1.  Abre el archivo.
2.  Busca el tour específico por su `id` (ej. `ubud-mystic`).
3.  Encuentra la propiedad `reviewsList: [ ... ]`.
4.  Agrega un nuevo objeto al principio o al final de la lista copiando este formato:

```javascript
{
    name: "Nombre del Cliente",
    date: "Hace 1 día", // O la fecha que quieras
    text: "Aquí escribes el comentario que te dejaron...",
    rating: 5 // Número de estrellas (1-5)
},
```

> **Nota:** ¡Recuerda poner una coma `,` al final del bloque si no es el último de la lista!

## 2. Cambiar Precios

En el mismo archivo `src/data/tours.js`:
1.  Busca el campo `price: 50`.
2.  Simplemente cambia el número.

## 3. Cambiar Fotos del Tour

En `src/data/tours.js`:
1.  Busca el campo `image: "https://..."`.
2.  Cambia la URL por la de la nueva foto (puedes usar fotos de Unsplash o subir las tuyas a un servicio de alojamiento de imágenes).

---

## ¿Cómo publicar los cambios?

Una vez hayas guardado los cambios en tu computadora:

1.  Abre tu terminal.
2.  Ejecuta los comandos para subir a GitHub (si ya está configurado):
    ```bash
    git add .
    git commit -m "Actualización de reseñas"
    git push
    ```
3.  Si tienes tu sitio conectado a Vercel o Netlify, ¡se actualizará automáticamente en unos minutos!
