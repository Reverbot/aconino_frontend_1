# Migración a Astro estático

## Estado actual

La aplicación principal ya se genera con Astro en modo `static`, usando las páginas y componentes visuales originales como fuente de la interfaz. Astro actúa como la nueva entrada y sistema de rutas; no se ha reconstruido el diseño con una plantilla paralela.

```bash
npm run dev
npm run check
npm run build
npm run preview
```

Las rutas de `src/pages/` montan los componentes originales de `src/app` y `src/components`. El contenido activo vive ahora en código y los recursos principales se sirven desde `public/`, manteniendo la estructura visual y los estilos existentes.

## Incluido en esta fase

- Astro como framework principal.
- Build estático con 23 páginas.
- Layout, navegación, footer, WhatsApp y formularios originales conectados a Astro.
- Blog, programas, cursos, contacto, donaciones y páginas institucionales basados en los componentes originales.
- Documentos legales seleccionados en `public/documents/`.
- Compatibilidad temporal para `next/link`, `next/image` y `next/navigation` durante la migración.
- Tailwind v4 integrado mediante Vite, conservando las clases originales.
- Recursos visuales principales sustituidos por imágenes locales del respaldo histórico de Aconiño; no quedan imágenes `Unsplash`, `placehold.co` ni texturas externas en `src/`.
- Formulario de contacto validado y conectado a un correo `mailto:` para mantener su funcionamiento en una arquitectura estática.

## Auditoría visual y funcional completada

- 21 rutas verificadas en escritorio (`1440px`) y móvil (`390px`).
- Sin desbordamiento horizontal.
- Sin imágenes rotas en las rutas construidas.
- Menú móvil probado con apertura y cierre.
- Hero de inicio verificado con texto completo, posición corregida y video local original.
- Build validado con `astro check` y `astro build`: 0 errores, 0 warnings, 23 páginas generadas.
- Las páginas estáticas (`blog`, artículos, asociación de usuarios, `privacidad`, `política de privacidad`, `transparencia` y `permanencia ESAL`) ya no hidratan React; conservan únicamente la interactividad global del encabezado.
- El encabezado global ya fue migrado a Astro/HTML estático. El menú móvil, dropdowns, estado al hacer scroll y copia del correo funcionan con un script nativo pequeño; ya no existe una isla React global en las páginas.
- La página de cursos y sus tres detalles ahora se renderizan sin hidratación React; el hero sigue usando el mismo componente, pero como salida estática porque no hay carrusel activo.
- Programas conserva sus acordeones, tabs y timeline interactivos, pero su isla se carga en `client:idle` para no bloquear la carga inicial.

## Optimización de peso

- `public/` pesa aproximadamente 34 MB; el video local del hero concentra 25 MB.
- Se evaluó una transcodificación nativa sin modificar todavía el archivo original, porque la herramienta disponible no produjo una salida compatible en este entorno.
- El siguiente paso recomendado es generar una versión MP4/WebM comprimida fuera del flujo visual y verificarla en Safari, Chrome y móvil antes de reemplazar el video original.

## Pendiente antes de borrar definitivamente el legado

- Revisar y completar los datos estáticos de cada página contra el contenido histórico exportado.
- Migrar los documentos y medios que todavía deban conservarse.
- Convertir gradualmente los componentes interactivos restantes a HTML/CSS nativo cuando no afecte la paridad visual.
- Eliminar de forma controlada las compatibilidades de Next cuando ninguna ruta las necesite.
- Eliminar de forma controlada `src/app`, `src/sanity`, `scripts` y los dumps de Sanity solo después de completar la migración.
- Retirar `temp_uploads/` después de validar los documentos seleccionados.
- Rotar secretos de `.env.local` y retirarlo del historial Git.
- Limpiar del historial Git `.next`, caches y uploads históricos.
