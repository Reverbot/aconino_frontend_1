# Programas Page - Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que todo el contenido de la página de programas (hero, programas, CTA) sea editable desde el panel de Sanity.

**Architecture:** Crear un schema `programasPage` en Sanity con estructura similar a `homePrograms`, añadir query GROQ, y actualizar la página para obtener datos de Sanity con fallback a datos por defecto.

**Tech Stack:** Next.js, Sanity CMS, GROQ

---

## Estructura de Archivos

- **Crear**: `src/sanity/schemaTypes/programasPage.ts` - Schema de Sanity
- **Modificar**: `src/sanity/schemaTypes/index.ts` - Registrar el nuevo schema
- **Modificar**: `src/sanity/lib/queries.ts` - Añadir query para programas
- **Modificar**: `src/app/(app)/programas/page.tsx` - Fetch de datos de Sanity

---

## Chunk 1: Schema de Sanity

### Task 1: Crear schema programasPage

**Files:**
- Create: `src/sanity/schemaTypes/programasPage.ts`

- [ ] **Step 1: Crear el schema con la estructura del Hero, Programas y CTA**

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programasPage',
  title: 'Página de Programas',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Programas'
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 2,
          initialValue: 'Conoce nuestros programas de habilitación y rehabilitación integral.'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Imagen de Fondo',
          type: 'image',
          options: { hotspot: true }
        })
      ]
    }),
    defineField({
      name: 'programs',
      title: 'Programas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título del Programa',
              type: 'string'
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 3
            }),
            defineField({
              name: 'ageRange',
              title: 'Rango de Edad',
              type: 'string',
              description: 'Ej: 0-3 años'
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96
              }
            }),
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: { hotspot: true }
            })
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'CTA Final',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: '¿Quieres saber más sobre nuestros programas?'
        }),
        defineField({
          name: 'buttonText',
          title: 'Texto del Botón',
          type: 'string',
          initialValue: 'CONTÁCTANOS'
        }),
        defineField({
          name: 'buttonLink',
          title: 'Enlace del Botón',
          type: 'string',
          initialValue: '/contacto'
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Página de Programas',
        subtitle: 'Contenido editable de la página de programas'
      }
    }
  }
})
```

- [ ] **Step 2: Registrar el schema en index.ts**

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`

En la línea de imports añadir:
```typescript
import programasPage from './programasPage'
```

En el array types añadir `programasPage`:
```typescript
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [/* ...existing */ programasPage],
}
```

---

## Chunk 2: Query GROQ

### Task 2: Añadir query para programasPage

**Files:**
- Modify: `src/sanity/lib/queries.ts` (añadir al final)

- [ ] **Step 1: Añadir la query para programasPage**

```typescript
// Query para la página de Programas
export const PROGRAMAS_PAGE_QUERY = defineQuery(`
  *[_type == "programasPage"][0] {
    hero {
      title,
      subtitle,
      "backgroundImageUrl": backgroundImage.asset->url
    },
    programs[] {
      _key,
      title,
      description,
      ageRange,
      "slug": slug.current,
      "imageUrl": image.asset->url
    },
    cta {
      title,
      buttonText,
      buttonLink
    }
  }
`)
```

---

## Chunk 3: Actualizar Página de Programas

### Task 3: Modificar programas/page.tsx para usar Sanity

**Files:**
- Modify: `src/app/(app)/programas/page.tsx`

- [ ] **Step 1: Importar cliente de Sanity y query**

```typescript
import { client } from "@/sanity/lib/client";
import { PROGRAMAS_PAGE_QUERY } from "@/sanity/lib/queries";
import { defaultPrograms } from "@/data/secondaryPages";
```

- [ ] **Step 2: Modificar el componente para fetch datos de Sanity**

Reemplazar las variables hardcodeadas con:

```typescript
interface Program {
  _key?: string;
  title?: string;
  description?: string;
  slug?: string;
  ageRange?: string;
  imageUrl?: string;
}

interface Hero {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
}

interface CTA {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default async function ProgramasPage() {
  const programasData = await client.fetch(PROGRAMAS_PAGE_QUERY);
  
  const hero: Hero = programasData?.hero || {
    title: "Programas",
    subtitle: "Conoce nuestros programas de habilitación y rehabilitación integral.",
    backgroundImageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop"
  };
  
  const programs: Program[] = programasData?.programs?.length > 0 
    ? programasData.programs 
    : defaultPrograms;
    
  const cta: CTA = programasData?.cta || {
    title: "¿Quieres saber más sobre nuestros programas?",
    buttonText: "CONTÁCTANOS",
    buttonLink: "/contacto"
  };
  
  const heroImage = hero.backgroundImageUrl || "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop";
```

- [ ] **Step 3: Actualizar los usos de datos en el JSX**

Cambiar referencias:
- `heroTitle` → `hero.title`
- `heroSubtitle` → `hero.subtitle`
- `heroImage` → `heroImage`
- `program.featuredImage` → `program.imageUrl`
- `ctaText` → `cta.buttonText`
- `ctaLink` → `cta.buttonLink`
- `ctaTitle` → `cta.title`

---

## Chunk 4: Verificación

### Task 4: Verificar la implementación

- [ ] **Step 1: Ejecutar dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verificar en Sanity Studio**

Navegar a: http://localhost:3000/studio

Debería aparecer "Página de Programas" en el menú. Crear y publicar un documento.

- [ ] **Step 3: Verificar en la página**

Navegar a: http://localhost:3000/programas

---

## Resumen de tareas

| Chunk | Archivos |
|-------|----------|
| 1 | Create: `src/sanity/schemaTypes/programasPage.ts`, Modify: `src/sanity/schemaTypes/index.ts` |
| 2 | Modify: `src/sanity/lib/queries.ts` |
| 3 | Modify: `src/app/(app)/programas/page.tsx` |
| 4 | Test: npm run dev |
