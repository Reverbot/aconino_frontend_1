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

## Auditoría de React

- React ya no se hidrata en ninguna ruta: el build no contiene etiquetas `astro-island` y ningún HTML referencia el runtime de cliente de React.
- Las rutas activas ya no usan React, Next, `react-icons`, `lucide-react` ni Portable Text. `@astrojs/react` fue retirado de la configuración y las dependencias directas de React fueron eliminadas del proyecto.
- Los componentes TSX antiguos permanecen únicamente como legado de referencia en `src/app` y `src/components`; ya no forman parte del grafo de rutas Astro activas.
- Los componentes con estado que quedaron (`src/providers`, `src/components/donations`, algunos efectos de animación y la versión anterior de Apóyanos) están fuera de las rutas activas o conservados como legado para no perder funcionalidad histórica.
- La pantalla activa de Apóyanos ya no usa ese legado: se sirve desde `src/components/apoyanos/ComingSoonPage.astro` con CSS y un contador nativo.
- Contacto, App, Blog, documentos legales y la ruta independiente de Asociación de Usuarios ya se sirven desde componentes `.astro`; sus rutas dejaron de importar páginas React.
- Blog ahora usa datos locales en `src/data/blog.ts` y salida HTML nativa, sin `@portabletext/react`, `motion` ni componentes de iconos React en esas rutas.
- Cursos y sus tres detalles (`concepto-bobath`, `movimientos-generales` y `pediasuit-formacion`) ahora usan `CoursesPage.astro`, `CourseDetailPage.astro` y datos locales en `src/data/courses.ts`; la agenda, tarjetas, historia Bobath, instructores y CTAs se mantienen en HTML/CSS.
- Programas ahora usa `src/components/programs/ProgramasPage.astro`; conserva todo el contenido y las secciones originales, pero el hero, objetivos, timeline, programas específicos, FAQ y CTA se generan con HTML/Astro e iconos SVG inline.
- Quiénes Somos ahora usa `src/components/quienes-somos/QuienesSomosPage.astro`; conserva identidad, aspiración estratégica, visión, historia, fundadores, semillas, junta directiva, equipo, administración y asociación de usuarios con salida HTML/Astro.

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
- Retirar gradualmente los componentes TSX, hooks y proveedores heredados que ya no se necesiten, después de validar que no se requieren para recuperar funcionalidades antiguas.
- Eliminar de forma controlada las compatibilidades de Next cuando ninguna ruta las necesite.
- Eliminar de forma controlada `src/app`, `src/sanity`, `scripts` y los dumps de Sanity solo después de completar la migración.
- Retirar `temp_uploads/` después de validar los documentos seleccionados.
- Rotar secretos de `.env.local` y retirarlo del historial Git.
- Limpiar del historial Git `.next`, caches y uploads históricos.
