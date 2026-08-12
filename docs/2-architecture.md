# Arquitectura Frontend - Asociación Aconiño

Basado en el contexto de Headless CMS con Next.js y WordPress REST API.

## 1. Estrategia de Enrutamiento (App Router Next.js)

Se proponen las siguientes rutas principales mapeando a las entidades de WordPress:

- `/` -> Portada (`page`)
- `/sobre-nosotros` -> Página (Identidad Aconiño) (`page`)
- `/servicios` -> Página / Custom Post Type (`page` / `cpt_service`)
- `/noticias` -> Archivo de listado de Entradas (`posts` loop)
- `/noticias/[slug]` -> Entrada individual (`post`)
- `/categoria/[slug]` -> Archivo de Categoría (`category` -> `posts`)

## 2. Componentes Principales y Layout

La arquitectura de interfaz de usuario se basará en Server Components principalmente por rendimiento y SEO, recurriendo a Client Components solo cuando sea estrictamente necesario.

### Componentes de UI (Diseño System):
- `Header` / `Footer`: Navegación estática obtenida opcionalmente vía menús REST (ej. `wp-json/wp/v2/menu`).
- `HeroBanner`: Visual para las landing pages principales.
- `PostCard`: Componente reutilizable para listado de noticias o servicios.
- `PostGrid`: Listado de `PostCard`s con paginación integrada.
- `RichTextRenderer`: Componente crítico que tomará el `content.rendered` de WP de forma segura (sanitizado) y lo inyectará en el UI o lo parseará para usar componentes de React en ciertos bloques.

## 3. Estrategia de Data Fetching

1.  **Static Site Generation (SSG)** e **Incremental Static Regeneration (ISR)**: 
    Dado que es una web corporativa, el contenido (páginas, noticias) no cambia a cada segundo. Next.js utilizará `fetch` con el revalidation cacheo adecuado (e.g. `revalidate: 3600` - 1 hora) para no saturar el servidor de WordPress.
2.  **Rutas Dinámicas**: Utilizaremos `generateStaticParams()` para pre-renderizar las páginas y noticias más importantes o recientes según el `slug`.
3.  **Manejo de SEO**: Se utilizará la data de `yoast_head_json` incluida en cada respuesta REST para construir dinámicamente el objeto `metadata` de Next.js en cada `page.tsx`.
4.  **Manejo de Medios**: Los IDs de `featured_media` se cruzarán con el endpoint de medios (o la incrustación `_embed`) para extraer URLs optimizadas, delegando idealmente en `next/image` con un dominio externo autorizado (`aconino.org`).
