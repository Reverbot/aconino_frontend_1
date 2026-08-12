# Migración a Astro estático

## Estado actual

La aplicación principal ya se genera con Astro en modo `static`, usando las páginas y componentes visuales originales como fuente de la interfaz. Astro actúa como la nueva entrada y sistema de rutas; no se ha reconstruido el diseño con una plantilla paralela.

```bash
npm run dev
npm run check
npm run build
npm run preview
```

Las rutas de `src/pages/` montan componentes `.astro`. El contenido activo vive ahora en código y los recursos principales se sirven desde `public/`, manteniendo la estructura visual y los estilos existentes.

## Auditoría de React

- React ya no se hidrata en ninguna ruta: el build no contiene etiquetas `astro-island` y ningún HTML referencia el runtime de cliente de React.
- Las rutas activas ya no usan React, Next, `react-icons`, `lucide-react` ni Portable Text. `@astrojs/react` fue retirado de la configuración y las dependencias directas de React fueron eliminadas del proyecto.
- El árbol legado de React/Next, sus proveedores, adaptadores, hooks y componentes TSX fue retirado; no forma parte del proyecto activo.
- La pantalla activa de Apóyanos ya no usa ese legado: se sirve desde `src/components/apoyanos/ComingSoonPage.astro` con CSS y un contador nativo.
- Contacto, App, Blog, documentos legales y la ruta independiente de Asociación de Usuarios ya se sirven desde componentes `.astro`; sus rutas dejaron de importar páginas React.
- Blog ahora usa datos locales en `src/data/blog.ts` y salida HTML nativa, sin `@portabletext/react`, `motion` ni componentes de iconos React en esas rutas.
- Cursos ahora usan `CoursesPage.astro` y datos locales en `src/data/courses.ts`; se retiraron las rutas de detalle porque no tenían contenido publicado.
- Programas ahora usa `src/components/programs/ProgramasPage.astro`; conserva todo el contenido y las secciones originales, pero el hero, objetivos, timeline, programas específicos, FAQ y CTA se generan con HTML/Astro e iconos SVG inline.
- Quiénes Somos ahora usa `src/components/quienes-somos/QuienesSomosPage.astro`; conserva identidad, aspiración estratégica, visión, historia, fundadores, semillas, junta directiva, equipo, administración y asociación de usuarios con salida HTML/Astro.

## Incluido en esta fase

- Astro como framework principal.
- Build estático con 17 páginas.
- Layout, navegación, footer, WhatsApp y formularios originales conectados a Astro.
- Blog, programas, cursos, contacto, donaciones y páginas institucionales basados en los componentes originales.
- Documentos legales seleccionados en `public/documents/`.
- Sin dependencias ni compatibilidades de React/Next en el proyecto activo.
- Tailwind v4 integrado mediante Vite, conservando las clases originales.
- Recursos visuales principales sustituidos por imágenes locales del respaldo histórico de Aconiño; no quedan imágenes `Unsplash`, `placehold.co` ni texturas externas en `src/`.
- Formulario de contacto validado y conectado a un correo `mailto:` para mantener su funcionamiento en una arquitectura estática.

## Auditoría visual y funcional completada

- Las 17 rutas actuales pasan `astro check` y `astro build` sin errores, warnings ni hints.
- Los enlaces internos generados fueron comprobados: no quedan enlaces rotos.
- Las páginas estáticas (`blog`, artículos, asociación de usuarios, `política de privacidad`, `transparencia` y `permanencia ESAL`) no hidratan React; conservan únicamente la interactividad global del encabezado.
- El encabezado global ya fue migrado a Astro/HTML estático. El menú móvil, dropdowns, estado al hacer scroll y copia del correo funcionan con un script nativo pequeño; ya no existe una isla React global en las páginas.
- La página de cursos se renderiza como una única salida estática; se retiraron los detalles sin contenido publicado.
- Programas ya no importa la página TSX original ni hidrata React: sus acordeones usan `<details>` y sus tabs, timeline y navegación móvil usan un script nativo pequeño con clases CSS.
- Inicio, App, Contacto, Apóyanos y Quiénes Somos dejaron de hidratar islas React; la comprobación del build confirma `astro-island` en 0 páginas.
- Inicio, Programas, Quiénes Somos y el footer global ahora se generan con componentes `.astro`; ninguna página activa importa `src/app/(app)` ni un componente TSX.
- Los carruseles del hero, el formulario de contacto y los controles de Programas funcionan con JavaScript nativo y CSS, sin `useState`, `useEffect` ni `motion` en el navegador.
- La página `Quiénes Somos` ya no depende de un objeto vacío ni de Sanity en tiempo de ejecución: recupera en código la información original de identidad, aspiración estratégica, visión, historia, fundadores, semillas, junta directiva, equipo, administración y asociación de usuarios.
- Las imágenes históricas de esa página se guardaron localmente en `public/images/quienes-original/`, incluyendo fotografías, retratos de fundadores y recursos de la junta y el equipo.
- La ruta `Apóyanos` muestra nuevamente la pantalla `En construcción` del Centro Día mientras se corrige y valida el proceso de donaciones. La pantalla ahora es un componente Astro estático con contador nativo; el contenido completo de la campaña permanece disponible en sus componentes para reactivarlo cuando los pagos funcionen.

## Optimización de peso

- `public/` pesa aproximadamente 34 MB; el video local del hero concentra 25 MB.
- Se evaluó una transcodificación nativa sin modificar todavía el archivo original, porque la herramienta disponible no produjo una salida compatible en este entorno.
- El siguiente paso recomendado es generar una versión MP4/WebM comprimida fuera del flujo visual y verificarla en Safari, Chrome y móvil antes de reemplazar el video original.

## Pendiente antes de borrar definitivamente el legado

- Revisar y completar los datos estáticos de las páginas restantes contra el contenido histórico exportado.
- Migrar los documentos y medios que todavía deban conservarse.
- Convertir gradualmente los componentes interactivos restantes a HTML/CSS nativo cuando no afecte la paridad visual.
- Mantener `App` y `Blog` fuera del menú principal hasta decidir su publicación.
- Optimizar el video del hero cuando exista una herramienta de transcodificación compatible y validar el resultado en Safari, Chrome y móvil.
- `temp_uploads/` fue retirado después de validar los documentos y recursos seleccionados para la versión estática.
- Rotar secretos de `.env.local` y retirarlo del historial Git.
- Limpiar del historial Git `.next`, caches y uploads históricos.
