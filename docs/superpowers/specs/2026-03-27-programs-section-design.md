# Programs Section Redesign - Spec

## Context

Redesign the programs section on the Aconiño website to better communicate their intervention model and detailed program information. The client wants to move from hardcoded content to Sanity-managed content with sensible defaults.

## Goal

Consolidate all programs-related content management into Sanity schemas, with fallback defaults for a first draft. The homepage shows a summarized version while the `/programas` page contains the full detailed content. **As a premium, elite-level implementation, the frontend must leverage robust aesthetic principles (glassmorphism, smooth gradients, modern typography) and seamless micro-animations (via Framer Motion) to deliver a "wow" factor that emphasizes professional care and modern design.**

---

## Design 1: Homepage - Intervention Model Section

### Visual Aesthetic & Interactions
- **Typography & Presence**: Dynamic text reveal for the titles using Framer Motion (`staggerChildren` and `y` displacement).
- **Cards (Principles)**: Implement a sleek grid where each card features a subtle scale effect (`whileHover={{ scale: 1.02 }}`) and a dynamic soft drop-shadow. Icons should use `lucide-react` with animated strokes.
- **Call to Action**: A highly interactive button with hover glow effects and a smooth arrow translation on hover.

### Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Animated Reveal]                                          │
│  "Nos centramos más en la actividad y menos en la           │
│   discapacidad"                                             │
│                                                             │
│  "Potenciar habilidades, no solo tratar dificultades"         │
└─────────────────────────────────────────────────────────────┘

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ [Glass] │  │ [Glass] │  │ [Glass] │  │ [Glass] │
│   🤝    │  │   👨‍👩‍👧    │  │   🎯    │  │   ✂️    │
│ Inter-  │  │ Centrado│  │Objetivos│  │ Personal│
│disciplin│  │  en     │  │Funciona-│  │  izado  │
│   aria  │  │ usuario │  │  les    │  │         │
└─────────┘  └─────────┘  └─────────┘  └─────────┘

┌─────────────────────────────────────────────────────────────┐
│  Aconiño acompaña a:                                        │
│  👶 Bebés  👧 Niños  🧒 Jóvenes                             │
│  [Ver todos los programas → (Hover effect)]                 │
└─────────────────────────────────────────────────────────────┘
```

### Components
- `InterventionModelSection.tsx` - new component for homepage
  - Props: `title`, `subtitle`, `principles[]`, `targetAudience[]`, `ctaLabel`, `ctaLink`
  - Integration: Fully responsive, mobile-first approach. Uses `framer-motion` for `whileInView` triggers.

---

## Design 2: Programs Page (`/programas`)

### Premium UX Principles
- **Accordions**: Smooth height transitions (`framer-motion` `AnimatePresence`), chevron rotation, active state highlighting with subtle background gradients.
- **Tabs**: Animated layout tabs (using `layoutId` in `framer-motion` for a sliding active tab indicator).
- **Timeline**: Interactive vertical timeline. Nodes pulse on hover, and connecting lines use gradients to guide the eye downward.
- **Icon Grid (Bento Style)**: Use a modern bento-box grid layout for "A quién están dirigidos", featuring rounded corners (`rounded-3xl`), subtle borders, and blur backdrop filters.
- **Checkmarks**: Animated checkmarks drawing in when scrolled into view, staggered list reveals.

### Page Structure (Vertical scroll with clear visual hierarchy)

```
📌 HERO (existing)
   Title + Background image (Ensure parallax or subtle scale effect on scroll)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 1. MODELO DE INTERVENCIÓN
   Intro text about the interdisciplinary approach.
   *Visual: Split layout (Text on left, compelling visual/abstract shapes on right)*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 2. PRINCIPIOS (accordion/expandable)
   Premium Accordion UI
   ▼ 1. Intervención interdisciplinaria
   ▼ 2. Atención centrada en usuario/familia
   ▼ 3. Objetivos funcionales
   ▼ 4. Intervención personalizada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 3. A QUIÉN ESTÁN DIRIGIDOS (Bento Icon Grid)
   6 target audience groups with icons in a sleek asymmetric grid.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 4. NUESTRA MÁXIMA SATISFACCIÓN
   Inspirational quote with large, beautiful typography and accent quotation marks.
   Jugar, Aprender, Comunicarse, Relacionarse, Participar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 5. QUÉ HACEMOS (timeline/steps)
   7 steps: Valoración, Objetivos, Plan, Familia, Seguimiento, Informe semestral, Egreso
   *Visual: Connected vertical timeline with Framer Motion triggers.*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 6. OBJETIVOS POR ÁREA (Animated Tabs)
   Tab 1: Motricidad Gruesa | Tab 2: Motricidad Fina | Tab 3: Comunicación | Tab 4: Psicología
   *Content fades in/out gracefully.*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 7. POR QUÉ ELEGIR ACONIÑO (Checkmark Grid)
   6 reasons to choose Aconiño.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 CTA FINAL
   Contact button (Premium gradient and scale on hover)
```

---

## Data Architecture

### Sanity Schema Updates

**Recommendation**: Use a single `programasPage` schema. It provides a cleaner separation of concerns.

### Default Values Strategy
All fields should have `initialValue` so that:
1. First draft looks reasonable without manual editing.
2. The UI is populated with robust copy to showcase the premium layout immediately.
3. Empty fields safely map to defaults in the frontend using Nullish Coalescing.

---

## Technical Approach

### Files to Create/Modify

**Sanity Schemas:**
- `src/sanity/schemaTypes/programasPage.ts`
- `src/sanity/schemaTypes/index.ts`

**Components (All leveraging `framer-motion` & `lucide-react`):**
- `src/components/InterventionModelSection.tsx`
- `src/components/ProgramsSection.tsx`
- `src/components/programs/PrinciplesAccordion.tsx`
- `src/components/programs/ObjectivesTabs.tsx`
- `src/components/programs/WhoForSection.tsx`
- `src/components/programs/WhatWeDoTimeline.tsx`
- `src/components/programs/WhyChooseUs.tsx`

**Pages:**
- `src/app/(app)/page.tsx`
- `src/app/(app)/programas/page.tsx`

**Queries:**
- `src/sanity/lib/queries.ts`

**Types:**
- `src/components/programs/types.ts`

---

## Success Criteria

- [ ] All content is manageable via Sanity Studio.
- [ ] Default values provide a robust, production-ready first draft.
- [ ] Implementation reaches elite design standards (Glassmorphism, animations, spacing).
- [ ] Staggered entry animations execute flawlessly without layout shift.
- [ ] UI is 100% responsive, utilizing mobile safe-areas and fluid typography.
- [ ] TypeScript compiles perfectly with strict types.
