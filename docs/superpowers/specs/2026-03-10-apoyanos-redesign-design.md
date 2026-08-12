# Diseño: Rediseño de "Apóyanos" - Conversión de Donaciones

**Fecha:** 2026-03-10
**Estado:** Aprobado
**Urgencia:** Alta (2-3 semanas)

## Resumen

Rediseñar completamente la presencia de donaciones en el sitio web para aumentar la visibilidad y conversión de donaciones monetarias, manteniendo capacidad de captación de leads.

## Objetivos

- **Principal:** Aumentar donaciones monetarias
- **Secundario:** Captar leads/interesados para seguimiento
- **Público:** Personas naturales colombianas y empresas locales
- **Contenido disponible:** Fotos, videos, historias, testimonios, estadísticas

## Componentes del Diseño

### 1. Header Modificado - Botón "DONAR AHORA"

**Ubicación:** Derecha del header, después del CTA actual o reemplazándolo.

**Especificaciones:**
- Fondo: `bg-accent` (amarillo/dorado)
- Texto: "DONAR AHORA" o "♥ DONAR"
- Animación idle: pulso sutil cada 3 segundos
- Hover: scale 1.05 + shadow pronunciado
- Mobile: Visible en menú hamburguesa como primer item destacado
- Click → Abre widget de micro-donación (overlay)

**Archivo a modificar:** `src/components/header/Header.tsx`

---

### 2. Widget de Micro-Donaciones (Nuevo Componente)

**Activación:**
- Click en botón "DONAR AHORA" del header
- Click en CTA flotante

**Diseño:**
- Modal centrado con backdrop blur
- Animación de entrada: fade + scale
- Cierre: click fuera o botón X

**Contenido:**
```
- Título: "♥ AYUDA A UN NIÑO"
- Subtítulo: "Tu donación transforma vidas"
- Montos sugeridos (cards seleccionables):
  - $10.000 - 1 sesión de transporte
  - $20.000 - 2 sesiones
  - $50.000 - 5 sesiones
  - Custom: "Otro monto"
- Botón "DONAR AHORA" → Abre pasarela externa
- Link "¿Empresa? Donación empresarial →"
- Datos bancarios colapsables
```

**Archivos nuevos:**
- `src/components/donations/DonationWidget.tsx`
- `src/components/donations/DonationWidget.css` (si necesario)

---

### 3. Sección "Impacto Real" en Home (Nuevo Componente)

**Ubicación:** Entre `ProgramsSection` y `CtaSection` en `src/app/(app)/page.tsx`

**Estructura:**
```
- Título: "TU APOYO TRANSFORMA VIDAS"
- Contadores animados (3):
  - 150+ niños atendidos
  - 25 años de servicio
  - 5000+ sesiones anuales
- Cards de historias (3):
  - Foto del niño/familia
  - Nombre o inicial
  - Testimonio corto (2-3 líneas)
- CTA principal: "♥ APADRINA UN NIÑO" → Abre widget
```

**Responsivo:**
- Mobile: Stack vertical
- Tablet: 2 columnas
- Desktop: 3 columnas

**Archivos nuevos:**
- `src/components/ImpactSection.tsx`
- `src/components/animations/countUp.ts` (animación de números)

**Archivo a modificar:** `src/app/(app)/page.tsx`

---

### 4. CTA Flotante (Nuevo Componente)

**Ubicación:** Fixed, bottom-right, siempre visible (excepto en `/apoyanos`)

**Especificaciones:**
- Botón circular: 56px (mobile: 48px)
- Fondo: `bg-accent` con gradiente
- Icono: FaHeart con animación de pulso suave
- Shadow: `shadow-lg`, hover `shadow-2xl`
- Aparece: Siempre (no depende de scroll)
- Z-index: 40

**Archivos nuevos:**
- `src/components/FloatingDonateCTA.tsx`

---

### 5. Página Apóyanos Rediseñada

**Estructura actualizada:**

```
1. Hero Emocional (mejorar ApoyanosHero.tsx)
   - Video de fondo o imagen impactante
   - "TU APOYO CAMBIA VIDAS"
   - Botón DONAR AHORA

2. Estadísticas (nuevo)
   - 3 contadores animados (reutilizar de ImpactSection)

3. Plan Padrino (mejorar PlanPadrinoSection.tsx)
   - Contenido actual mejorado visualmente

4. Historias de Impacto (nuevo)
   - Galería de testimonios con fotos

5. Opciones de Donación (mejorar DonationOptions.tsx)
   - Widget integrado
   - Datos bancarios mejorados
   - Sección empresarial

6. Donación Empresarial (nuevo)
   - Certificados
   - Beneficios tributarios
   - Formulario de contacto

7. FAQ (nuevo)
   - Preguntas frecuentes

8. CTA Final (nuevo)
   - "¿Listo para hacer la diferencia?"
```

**Archivos nuevos:**
- `src/components/apoyanos/ImpactStories.tsx`
- `src/components/apoyanos/CorporateDonation.tsx`
- `src/components/apoyanos/FAQ.tsx`
- `src/components/apoyanos/FinalCTA.tsx`

**Archivos a modificar:**
- `src/app/(app)/apoyanos/page.tsx`
- `src/components/apoyanos/ApoyanosHero.tsx`
- `src/components/apoyanos/PlanPadrinoSection.tsx`
- `src/components/apoyanos/DonationOptions.tsx`

---

### 6. SEO y Metadatos

**Meta tags para `/apoyanos`:**

```typescript
title: "Donar a Niños con Discapacidad | Apóyanos - Aconiño"
description: "Ayuda a niños con discapacidad en Colombia. Dona ahora y transforma vidas. Plan Padrino, donaciones empresariales y voluntariado. 25 años apoyando neurorehabilitación infantil."
```

**Open Graph:**
- og:title: "Dona y Cambia una Vida | Aconiño"
- og:description: "Tu donación ayuda a niños con discapacidad a recibir terapia."
- og:image: Imagen con niño real + logo (1200x630px)

**Schema.org:**
- Tipo: DonateAction
- Organization: Asociación Aconiño

**Archivo nuevo:**
- `src/app/(app)/apoyanos/layout.tsx` (para metadata)
- Imagen OG: `public/og-donar.jpg`

---

## Flujo de Usuario

```
Usuario entra → Ve CTA flotante + Botón header
        ↓
Click en DONAR → Abre widget
        ↓
Selecciona monto → Click "Donar"
        ↓
Redirige a pasarela externa (PayU/Wompi)
        ↓
Completa pago → Vuelve con confirmación
```

## Consideraciones Técnicas

- **Animaciones:** Reutilizar framer-motion existente
- **Contadores:** Usar `react-countup` o animación custom con framer-motion
- **Modal:** Crear componente reutilizable
- **Estado:** Widget state con React context o prop drilling simple
- **SEO:** metadata de Next.js 13+ App Router

## Métricas de Éxito

- Clics en botones de donación (header + flotante + secciones)
- Aperturas de widget
- Conversiones a pasarela externa
- Tiempo en página `/apoyanos`