# Cursos Sanity Connection Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conectar toda la página de cursos (/cursos y /cursos/[slug]) a Sanity Studio para que sea 100% editable desde el panel de administración.

**Architecture:** Dos nuevos tipos de documento Sanity: `curso` (documento independiente por cada curso) y `cursosPage` (configuración de la página: hero, historia, instructores, CTA). El schema existente `cursosHero` se elimina y sus campos migran a `cursosPage`.

**Tech Stack:** Sanity Studio, GROQ queries, Next.js App Router, TypeScript, Framer Motion

---

## Chunk 1: Schemas de Sanity

### Task 1: Crear schema `curso`

**Files:**
- Create: `src/sanity/schemaTypes/curso.ts`
- Modify: `src/sanity/schemaTypes/index.ts`
- Modify: `src/sanity/lib/queries.ts`

- [ ] **Step 1: Crear src/sanity/schemaTypes/curso.ts**

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'curso',
  title: 'Curso',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Curso',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dates',
      title: 'Fechas',
      type: 'string',
      description: 'Ej: "31 octubre - 3 noviembre 2024"',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      description: 'Ej: "Bogotá, Colombia"',
    }),
    defineField({
      name: 'countryCode',
      title: 'Código de País',
      type: 'string',
      description: 'Código ISO de 2 letras: CO, VE, PE, EC, MX, AR, BR, CL, US, ES',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'Finalizado', value: 'finalizado' },
          { title: 'Próximamente', value: 'proximamente' },
          { title: 'Inscripciones Abiertas', value: 'inscripciones_abiertas' },
        ],
        layout: 'radio',
      },
      initialValue: 'proximamente',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
      description: 'Descripción para la tarjeta del curso (visible en el grid)',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen Destacada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      description: 'Año del curso para agrupar en el grid',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor Principal',
      type: 'string',
    }),
    defineField({
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de beneficios (ej: "Material de apoyo incluido")',
    }),
    defineField({
      name: 'body',
      title: 'Contenido Rico',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
      description: 'Contenido de la página de detalle del curso',
    }),
    defineField({
      name: 'detailUrl',
      title: 'URL Externa',
      type: 'url',
      description: 'Si el curso es externo, link a la página del curso',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dates',
      media: 'featuredImage',
    },
  },
})
```

- [ ] **Step 2: Verificar que el archivo se creó correctamente**

Run: `ls src/sanity/schemaTypes/`
Expected: `curso.ts` aparece en la lista

---

### Task 2: Crear schema `cursosPage`

**Files:**
- Create: `src/sanity/schemaTypes/cursosPage.ts`

- [ ] **Step 1: Crear src/sanity/schemaTypes/cursosPage.ts**

```typescript
import { defineType, defineField } from 'sanity'

const iconOptions = [
  { title: 'Cerebro', value: 'FaBrain' },
  { title: 'Globo', value: 'FaGlobeAmericas' },
  { title: 'Manos', value: 'FaHandsHelping' },
  { title: 'Graduación', value: 'FaGraduationCap' },
]

const colorOptions = [
  { title: 'Azul', value: 'from-blue-500 to-indigo-600' },
  { title: 'Verde', value: 'from-emerald-400 to-teal-600' },
  { title: 'Ámbar', value: 'from-amber-400 to-orange-500' },
  { title: 'Púrpura', value: 'from-purple-500 to-pink-600' },
]

export default defineType({
  name: 'cursosPage',
  title: 'Página de Cursos',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título del Hero',
      type: 'string',
      initialValue: 'Cursos y Capacitaciones',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Slides del Carrusel',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              title: 'Texto Alternativo',
              type: 'string',
            }),
            defineField({
              name: 'overlayOpacity',
              title: 'Opacidad del Overlay',
              type: 'number',
              initialValue: 50,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Slide sin descripción', subtitle: 'Imagen del carrusel', media }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'historiaTitle',
      title: 'Título de Historia',
      type: 'string',
      initialValue: 'Historia del Neurodesarrollo Bobath',
    }),
    defineField({
      name: 'historiaSubtitle',
      title: 'Subtítulo de Historia',
      type: 'string',
      initialValue: 'Un recorrido de innovación y esperanza en la neurorehabilitación',
    }),
    defineField({
      name: 'historiaEvents',
      title: 'Eventos del Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Año/Fase', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              options: { list: iconOptions },
            }),
            defineField({
              name: 'color',
              title: 'Color',
              type: 'string',
              options: { list: colorOptions },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
          },
        },
      ],
    }),
    defineField({
      name: 'instructorsTitle',
      title: 'Título de Instructores',
      type: 'string',
      initialValue: 'Aconiño agradece',
    }),
    defineField({
      name: 'instructorsIntro',
      title: 'Texto Introductorio de Instructores',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instructorGroups',
      title: 'Grupos de Instructores',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'organization', title: 'Organización', type: 'string' }),
            defineField({
              name: 'instructors',
              title: 'Instructores',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'organization' },
            prepare({ title }) {
              return { title }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Final',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción', type: 'text' }),
        defineField({ name: 'buttonText', title: 'Texto del Botón', type: 'string' }),
        defineField({ name: 'buttonLink', title: 'Link del Botón', type: 'url' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página de Cursos', subtitle: 'Configuración completa de la página' }
    },
  },
})
```

---

### Task 3: Eliminar `cursosHero` y actualizar `index.ts`

**Files:**
- Delete: `src/sanity/schemaTypes/cursosHero.ts`
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1: Eliminar cursosHero.ts**

Run: `rm src/sanity/schemaTypes/cursosHero.ts`

- [ ] **Step 2: Actualizar index.ts para importar curso y cursosPage, y remover cursosHero**

```typescript
import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import page from './page'
import settings from './settings'
import navigation from './navigation'
import ctaSection from './ctaSection'
import aboutSection from './aboutSection'
import nosotrosIntro from './nosotrosIntro'
import quienesSomos from './quienesSomos'
import homeHero from './homeHero'
import homePrograms from './homePrograms'
import homeRecognitions from './homeRecognitions'
import homeNews from './homeNews'
import curso from './curso'
import cursosPage from './cursosPage'
import programasPage from './programasPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    page,
    settings,
    navigation,
    ctaSection,
    aboutSection,
    nosotrosIntro,
    quienesSomos,
    homeHero,
    homePrograms,
    homeRecognitions,
    homeNews,
    curso,
    cursosPage,
    programasPage,
  ],
}
```

---

### Task 4: Agregar queries GROQ

**Files:**
- Modify: `src/sanity/lib/queries.ts`

- [ ] **Step 1: Agregar queries al final de queries.ts**

```typescript
// Query para todos los cursos
export const ALL_CURSOS_QUERY = defineQuery(`
  *[_type == "curso"] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    dates,
    location,
    countryCode,
    status,
    description,
    "featuredImage": featuredImage.asset->url,
    year,
    instructor,
    isFeatured,
    detailUrl
  }
`)

// Query para un curso por slug
export const CURSO_BY_SLUG_QUERY = defineQuery(`
  *[_type == "curso" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    dates,
    location,
    countryCode,
    status,
    description,
    body,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    benefits,
    detailUrl,
    year,
    instructor
  }
`)

// Query para la página de configuración de cursos
export const CURSOS_PAGE_QUERY = defineQuery(`
  *[_type == "cursosPage"][0] {
    heroTitle,
    heroSlides[] {
      _key,
      "imageUrl": image.asset->url,
      alt,
      overlayOpacity
    },
    historiaTitle,
    historiaSubtitle,
    historiaEvents[] {
      _key,
      year,
      title,
      description,
      color,
      icon
    },
    instructorsTitle,
    instructorsIntro,
    instructorGroups[] {
      _key,
      organization,
      instructors
    },
    cta {
      title,
      description,
      buttonText,
      buttonLink
    }
  }
`)
```

---

## Chunk 2: Página principal de cursos

### Task 5: Modificar BobathHistory.tsx para recibir props

**Files:**
- Modify: `src/components/cursos/BobathHistory.tsx`

- [ ] **Step 1: Actualizar BobathHistory.tsx para recibir datos como props**

Reemplazar el archivo completo con esta versión:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HistoriaEvent {
  year: string;
  title: string;
  description: string;
  color?: string;
  icon?: string;
}

interface BobathHistoryProps {
  title?: string;
  subtitle?: string;
  events?: HistoriaEvent[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaBrain: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor"><path d="M144 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 34.602-24.573 63.703-57.818 70.243.013-.09.018-.18.018-.273C230.2 93.594 196.111 58.52 196.111 0c-39.765 0-72 32.235-72 72 0 35.346 25.452 64.847 59.143 71.362-2.274-6.965-3.768-14.475-4.373-22.273C147.648 134.891 128 163.107 128 195.97c0 39.765 32.235 72 72 72 28.005 0 52.455-16.034 64.021-39.487-.025.076-.055.15-.079.226C275.313 245.266 288 267.526 288 293.031c0 39.765-32.235 72-72 72s-72-32.235-72-72c0-24.602 12.688-46.862 24.058-63.262-.024.076-.054.15-.079.226C146.545 244.766 122.095 228.731 94.09 228.731 54.325 228.731 22 196.496 22 156.731 22 116.966 54.325 84.731 94.09 84.731c33.456 0 61.484 22.828 70.251 54.179C168.959 116.348 184 89.859 184 60c0-39.765-32.235-72-72-72s-72 32.235-72 72c0 29.859 15.041 56.348 39.659 78.91C64.484 107.559 36.456 84.731 3 84.731c-39.765 0-72 32.235-72 72s32.235 72 72 72c28.005 0 52.455-16.034 64.021-39.487-.025.076-.055.15-.079.226C78.313 245.266 91 267.526 91 293.031c0 39.765 32.235 72 72 72s72-32.235 72-72c0-25.505-12.687-47.765-24.058-64.262.025.076.055.15.079.226C222.455 244.766 246.905 260.8 274.91 260.8c39.765 0 72.09-32.235 72.09-72 0-39.765-32.325-72-72.09-72z"/></svg>
  ),
  FaGlobeAmericas: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 496 512" fill="currentColor"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM96 128c0-35.3 28.7-64 64-64s64 28.7 64 64-28.7 64-64 64-64-28.7-64-64zm292.1 64h-108c-8.8-56.9-25.6-107.8-49.9-141.6C289.8 37.8 347.8 80 376 147c21.1-51.1 35.9-105.4 40.1-147h1.7c10.2 72.1 32.8 130.2 63.4 170.3s58 85.8 90.2 111.7C499.7 372.3 480 321.3 480 256c0-39.8-11.2-77.3-30.8-110.3z"/></svg>
  ),
  FaHandsHelping: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 640 512" fill="currentColor"><path d="M544 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM320 256c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm0-192c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80zm244 192h-40c-15.2 0-29.3 4.8-41.1 12.9 9.4 6.4 17.9 13.9 25.4 22.4 4.9-5 12.5-8 20.7-8h40c19.5 0 37.1-7.8 49.7-20.3-1.5-1.4-3.5-2.3-5.7-2.3zM496 224c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM160 73l-80 86.2c-13.3 14.9-20.8 34.5-20.8 54.8v128c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-128c0-20.3-7.5-39.9-20.8-54.8L320 73c-11.7-12.4-28.6-20-47-20h-64c-18.4 0-35.3 7.6-47 20z"/></svg>
  ),
  FaGraduationCap: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 640 512" fill="currentColor"><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9l0 28.1c0 28.4-10.8 57.7-22.3 80.8-6.5 13-13.9 25.8-22.5 37.6C10.8 458.8 5.4 465.7 5.4 472.4c0 3.7 3.1 6.9 7.1 8.3l64 16c17.7 4.4 36 6.8 54.4 6.9 27 0 53.9-9.2 76.5-26.7l256-177.7c11.8-8.2 26.3-8.2 38 0L467.5 264.5c22.7 17.5 49.6 26.8 76.5 26.8 18.4 0 36.7-2.5 54.4-6.9l64-16c4-1.4 7.1-4.6 7.1-8.3-.1-6.7-5.4-11.6-11.8-17.7-8.7-11.9-16-24.6-22.5-37.6C602.2 348.7 592 319.4 592 291l0-28.1c0-32.1-9.3-62.6-25.7-86.1l57.9-20.9c9.5-3.4 15.8-12.6 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336 33.4 328 32 320 32zM128 408c0 35.3-86 72-192 72s-192-36.7-192-72 86-72 192-72 192 36.7 192 72z"/></svg>
  ),
}

const defaultEvents = [
  {
    year: "Orígenes",
    title: "El Concepto Bobath",
    description: "Desarrollado en la década de 1940 por la fisioterapeuta Berta Bobath y el psiquiatra Karel Bobath, basado en la observación clínica y la neuroplasticidad para el tratamiento de alteraciones neurológicas.",
    icon: "FaBrain",
    color: "from-blue-500 to-indigo-600",
  },
  {
    year: "Evolución",
    title: "Expansión Global",
    description: "El enfoque evolucionó de una técnica de facilitación a un concepto vivo de resolución de problemas, adaptándose a los nuevos descubrimientos en neurociencia y control motor.",
    icon: "FaGlobeAmericas",
    color: "from-emerald-400 to-teal-600",
  },
  {
    year: "Colombia",
    title: "Llegada e Impacto",
    description: "El concepto llega a Colombia impulsado por profesionales comprometidos, transformando la neurorehabilitación infantil y ofreciendo nuevas esperanzas a familias de todo el país.",
    icon: "FaHandsHelping",
    color: "from-amber-400 to-orange-500",
  },
  {
    year: "Actualidad",
    title: "ACONINO y el Futuro",
    description: "Consolidación de la práctica a través de la educación continua, certificación de tutores y un enfoque transdisciplinario centrado en el individuo y su entorno.",
    icon: "FaGraduationCap",
    color: "from-purple-500 to-pink-600",
  },
]

export default function BobathHistory({
  title = "Historia del Neurodesarrollo Bobath",
  subtitle = "Un recorrido de innovación y esperanza en la neurorehabilitación",
  events = defaultEvents,
}: BobathHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative bg-slate-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-slate-600 uppercase">Nuestro Legado</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bobath</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 rounded-full transform md:-translate-x-1/2 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 via-indigo-500 to-purple-600"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 md:space-y-24 relative">
            {events.map((item, index) => {
              const isEven = index % 2 === 0
              const IconComponent = iconMap[item.icon || "FaBrain"] || iconMap.FaBrain

              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center group">
                  <div
                    className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-16" : "md:justify-start md:pl-16 md:order-last"} pl-20 md:pl-0`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                      className="bg-white p-8 rounded-2xl shadow-[0 8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0 8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1"
                    >
                      <div
                        className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.color || "from-blue-500 to-indigo-600"} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold tracking-wider mb-4">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-14 h-14 rounded-full bg-white shadow-lg border-4 border-slate-50 flex items-center justify-center z-10 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-tr ${item.color || "from-blue-500 to-indigo-600"} opacity-10`} />
                    <IconComponent className="w-5 h-5 text-slate-800" />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 6: Modificar InstructorsSection.tsx para recibir props

**Files:**
- Modify: `src/components/cursos/InstructorsSection.tsx`

- [ ] **Step 1: Actualizar InstructorsSection.tsx para recibir datos como props**

Reemplazar el archivo completo:

```tsx
"use client";

import ScrollReveal from "../animations/ScrollReveal";

interface InstructorGroup {
  organization: string;
  instructors: string[];
}

interface InstructorsSectionProps {
  title?: string;
  intro?: string;
  groups?: InstructorGroup[];
}

const defaultGroups: InstructorGroup[] = [
  {
    organization: "Asociación Europea de Neurodesarrollo EBTA",
    instructors: ["Neda Rotar", "Evi Sideri", "Lea Šuc", "Aleksandra Łada"],
  },
  {
    organization: "Asociación Americana de Neurodesarrollo NDTA",
    instructors: [
      "Teresa Gutierrez", "Gay Lloyd Pinder", "Addie Adler", "Roma Alexander",
      "Susanna Davis", "Lindell Owens", "Gail Ritchie", "Karl Barn",
      "Mechthild Rast", "Jane Shyer-Acevedo", "Pam Mullens",
    ],
  },
  {
    organization: "Universidad Nacional de Colombia",
    instructors: ["Dr. Jairo Zuluaga"],
  },
]

const defaultIntro =
  "A todos los instructores que han venido a aportarnos no solo su conocimiento y experiencia, " +
  "sino también la voluntad de hacernos partícipes de su sensibilidad frente al servicio por nuestra población vulnerable."

export default function InstructorsSection({
  title = "Aconiño agradece",
  intro = defaultIntro,
  groups = defaultGroups,
}: InstructorsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4">{title}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">{intro}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {groups.map((group, idx) => (
              <div
                key={idx}
                className={`text-center px-6 py-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 ${idx < groups.length - 1 ? "md:border-r-0" : ""}`}
              >
                <h3 className="text-sm md:text-base font-bold text-primary uppercase tracking-wider mb-6 leading-tight min-h-[3rem] flex items-center justify-center">
                  {group.organization}
                </h3>
                <div className="w-10 h-0.5 bg-accent mx-auto mb-6 rounded-full" />
                <ul className="space-y-2">
                  {group.instructors.map((name, i) => (
                    <li
                      key={i}
                      className="text-gray-600 text-sm md:text-base font-medium hover:text-primary transition-colors duration-200"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

---

### Task 7: Modificar cursos/page.tsx para usar Sanity

**Files:**
- Modify: `src/app/(app)/cursos/page.tsx`

- [ ] **Step 1: Actualizar cursos/page.tsx para usar datos de Sanity**

Reemplazar todo el archivo con esta versión que consume los schemas nuevos:

```tsx
import CursosHero from "@/components/cursos/CursosHero";
import BobathHistory from "@/components/cursos/BobathHistory";
import InstructorsSection from "@/components/cursos/InstructorsSection";
import CourseGrid from "@/components/cursos/CourseGrid";
import { CourseCardData } from "@/components/cursos/CourseCard";
import { client } from "@/sanity/lib/client";
import {
  ALL_CURSOS_QUERY,
  CURSOS_PAGE_QUERY,
} from "@/sanity/lib/queries";

export const metadata = {
  title: "Cursos y Capacitaciones - Asociación Aconiño",
  description:
    "Cursos de neurodesarrollo, certificaciones profesionales y capacitaciones especializadas en el tratamiento de la discapacidad sensoriomotora.",
};

export default async function CursosPage() {
  const [cursosPage, cursosData] = await Promise.all([
    client.fetch(CURSOS_PAGE_QUERY).catch(() => null),
    client.fetch(ALL_CURSOS_QUERY).catch(() => []),
  ]);

  const courses: CourseCardData[] = (cursosData || []).map(
    (c: {
      _id: string;
      title: string;
      slug: string;
      dates: string | null;
      location: string | null;
      countryCode: string | null;
      status: string | null;
      description: string | null;
      featuredImage: string | null;
      year: number;
      detailUrl?: string | null;
    }) => ({
      id: c._id,
      title: c.title,
      slug: c.slug,
      dates: c.dates,
      location: c.location,
      countryCode: c.countryCode,
      status: c.status,
      description: c.description,
      featuredImage: c.featuredImage,
      year: c.year,
      detailUrl: c.detailUrl,
    })
  );

  let heroTitle = "Cursos y Capacitaciones";
  let heroSlides: { src: string; alt: string; overlayOpacity?: number }[] | undefined;

  if (cursosPage) {
    heroTitle = cursosPage.heroTitle || heroTitle;
    if (cursosPage.heroSlides && Array.isArray(cursosPage.heroSlides)) {
      heroSlides = cursosPage.heroSlides
        .filter((s: { imageUrl?: string }) => s.imageUrl)
        .map((s: { imageUrl?: string; alt?: string; overlayOpacity?: number }) => ({
          src: s.imageUrl || "",
          alt: s.alt || "",
          overlayOpacity: s.overlayOpacity,
        }));
    }
  }

  const historyTitle = cursosPage?.historiaTitle || "Historia del Neurodesarrollo Bobath";
  const historySubtitle = cursosPage?.historiaSubtitle || "Un recorrido de innovación y esperanza en la neurorehabilitación";
  const historyEvents = cursosPage?.historiaEvents;

  const instructorsTitle = cursosPage?.instructorsTitle || "Aconiño agradece";
  const instructorsIntro = cursosPage?.instructorsIntro;
  const instructorGroups = cursosPage?.instructorGroups;

  const ctaConfig = cursosPage?.cta || {
    title: "¿Interesado en nuestros cursos?",
    description: "Contáctanos para conocer las próximas fechas y disponibilidad de cupos.",
    buttonText: "CONTÁCTANOS",
    buttonLink: "https://wa.me/573133910760",
  };

  return (
    <main className="min-h-screen bg-white">
      <CursosHero title={heroTitle} slides={heroSlides} />

      <BobathHistory
        title={historyTitle}
        subtitle={historySubtitle}
        events={historyEvents}
      />

      <InstructorsSection
        title={instructorsTitle}
        intro={instructorsIntro}
        groups={instructorGroups}
      />

      <CourseGrid courses={courses} />

      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            {ctaConfig.title}
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            {ctaConfig.description}
          </p>
          <a
            href={ctaConfig.buttonLink || "https://wa.me/573133910760"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-primary px-10 py-4 rounded-full font-black text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
          >
            {ctaConfig.buttonText}
          </a>
        </div>
      </section>
    </main>
  );
}
```

---

## Chunk 3: Página de detalle de curso

### Task 8: Modificar cursos/[slug]/page.tsx

**Files:**
- Modify: `src/app/(app)/cursos/[slug]/page.tsx`

- [ ] **Step 1: Actualizar cursos/[slug]/page.tsx para usar Sanity**

Reemplazar todo el archivo con esta versión:

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { FaCalendarAlt, FaMapMarkerAlt, FaCertificate, FaArrowLeft } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { CURSO_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const countryFlags: Record<string, string> = {
  CO: "🇨🇴", VE: "🇻🇪", PE: "🇵🇪", EC: "🇪🇨", MX: "🇲🇽",
  AR: "🇦🇷", BR: "🇧🇷", CL: "🇨🇱", US: "🇺🇸", ES: "🇪🇸",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CursoData {
  _id: string;
  title: string;
  slug: string;
  dates?: string | null;
  location?: string | null;
  countryCode?: string | null;
  status?: string | null;
  description?: string | null;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  body?: unknown[];
  benefits?: string[];
  detailUrl?: string | null;
  year?: number;
  instructor?: string | null;
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;

  const curso: CursoData | null = await client.fetch(CURSO_BY_SLUG_QUERY, { slug }).catch(() => null);

  if (!curso) {
    return notFound();
  }

  const flag = curso.countryCode ? countryFlags[curso.countryCode] || "" : "";
  const isFinished = curso.status === "finalizado";

  const imageUrl = curso.featuredImage || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop";

  const defaultBenefits = [
    "Material de apoyo incluido",
    "Sesiones prácticas",
    "Diploma oficial",
    "Instructores internacionales",
  ];
  const benefits = curso.benefits && curso.benefits.length > 0 ? curso.benefits : defaultBenefits;

  return (
    <article className="min-h-screen bg-white">
      <header className="bg-primary text-white pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-in" delay={0.1}>
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Volver a cursos</span>
            </Link>
          </ScrollReveal>

          <div className="text-center max-w-4xl mx-auto">
            <ScrollReveal animation="fade-up" delay={0.2}>
              <span className="text-accent font-bold tracking-widest uppercase mb-4 block text-sm">
                Capacitación Especializada
              </span>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={0.3}>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                {curso.title}
              </h1>
            </ScrollReveal>

            {isFinished && (
              <ScrollReveal animation="fade-up" delay={0.35}>
                <span className="inline-block bg-red-500/90 text-white text-sm font-black px-5 py-2 rounded-full uppercase tracking-wider mb-6 shadow-lg">
                  Finalizado
                </span>
              </ScrollReveal>
            )}

            <ScrollReveal animation="fade-up" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                {curso.dates && (
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                    <FaCalendarAlt className="text-accent" />
                    <div className="text-left">
                      <span className="text-white/60 text-xs block">Fechas</span>
                      <span className="font-bold text-sm">{curso.dates}</span>
                    </div>
                  </div>
                )}
                {curso.location && (
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-accent" />
                    <div className="text-left">
                      <span className="text-white/60 text-xs block">Ubicación</span>
                      <span className="font-bold text-sm">{curso.location} {flag}</span>
                    </div>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 flex items-center gap-3">
                  <FaCertificate className="text-accent" />
                  <div className="text-left">
                    <span className="text-white/60 text-xs block">Certificación</span>
                    <span className="font-bold text-sm">Avalada por Aconiño</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 md:w-96 h-80 md:h-96 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 md:w-96 h-80 md:h-96 bg-secondary rounded-full blur-[120px]" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            {imageUrl && (
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                  <Image
                    src={imageUrl}
                    alt={curso.featuredImageAlt || curso.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal animation="fade-up" delay={0.2}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-6">
                Sobre el curso
              </h2>
              {curso.description && (
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {curso.description}
                </p>
              )}
            </ScrollReveal>

            {curso.body && Array.isArray(curso.body) && curso.body.length > 0 && (
              <ScrollReveal animation="fade-up" delay={0.3}>
                <div className="prose prose-lg prose-primary max-w-none text-gray-600">
                  <PortableText value={curso.body as Parameters<typeof PortableText>[0]["value"]} />
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className="relative">
            <ScrollReveal animation="slide-left" delay={0.3}>
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
                <h3 className="text-2xl font-extrabold text-primary mb-6">
                  Inscríbete ahora
                </h3>
                <ul className="space-y-4 mb-8 text-gray-600">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {isFinished ? (
                  <div className="text-center">
                    <p className="text-gray-400 font-medium mb-4">
                      Este curso ya finalizó
                    </p>
                    <Link
                      href="/cursos"
                      className="w-full inline-block text-center bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-300 transition-all"
                    >
                      Ver próximos cursos
                    </Link>
                  </div>
                ) : (
                  <a
                    href={curso.detailUrl || "https://wa.me/573001234567"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center bg-primary text-white font-black py-5 rounded-2xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    SOLICITAR CUPO
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </article>
  );
}
```

---

## Chunk 4: Validación

### Task 9: Verificar imports y tipos

**Files:**
- Check: `src/app/(app)/cursos/page.tsx`
- Check: `src/app/(app)/cursos/[slug]/page.tsx`
- Check: `src/components/cursos/BobathHistory.tsx`
- Check: `src/components/cursos/InstructorsSection.tsx`

- [ ] **Step 1: Verificar que no hay errores de compilación**

Run: `cd "C:/Users/Jose Diaz/Documents/Aconiño/aconino_frontend" && npx tsc --noEmit 2>&1 | head -50`

Expected: Sin errores de compilación. Si hay errores, corregirlos.

- [ ] **Step 2: Verificar que npm run lint pasa**

Run: `cd "C:/Users/Jose Diaz/Documents/Aconiño/aconino_frontend" && npm run lint 2>&1 | head -30`

Expected: Sin errores de lint

---

### Task 10: Verificar que Sanity Studio tiene los nuevos schemas

- [ ] **Step 1: Verificar que Sanity Studio corre**

Run: `cd "C:/Users/Jose Diaz/Documents/Aconiño/aconino_frontend" && npm run dev -- --help 2>&1 | head -5`

- [ ] **Step 2: Verificar que los schemas están bien exportados**

Verificar en `src/sanity/schemaTypes/index.ts` que `curso` y `cursosPage` están importados y exportados.

- [ ] **Step 3: Crear documento de prueba en Sanity Studio**

1. Abrir `http://localhost:3000/studio`
2. Ir a "Página de Cursos" y crear/editar el documento con datos de prueba
3. Ir a "Curso" y crear un curso de prueba con: título, slug, fechas, ubicación, país, descripción e imagen
4. Verificar que los cursos aparecen en `/cursos`
5. Verificar que el curso detalle funciona en `/cursos/[slug]`

---

## Notas importantes

1. **Migración de datos existentes**: Después de deployar, debe existir UN documento de tipo "Página de Cursos" en Sanity Studio. Los datos actuales del Hero deben copiarse manualmente a ese documento.

2. **PortableText**: La página de detalle usa `@portabletext/react` para renderizar el body rico. Verificar que el paquete está instalado.

3. **Iconos SVG inline**: Los iconos en `BobathHistory` se cambiaron a SVGs inline para evitar dependencias de `react-icons/fa` que pueden causar problemas. Si los SVGs se renderizan diferente, se pueden ajustar los paths.
