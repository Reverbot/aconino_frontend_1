# Programs Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign homepage and programas page with new intervention model content, all manageable via Sanity. The outcome must feature **elite-level visual polish**, utilizing Framer Motion for scroll/interaction animations, modern Typography, and premium Tailwind CSS utility classes (backdrop-blur, gradients, etc.).

**Architecture:** Homepage gets a new `InterventionModelSection`. `/programas` page gets detailed content organized with animated accordions, layout tabs, and vertical timelines.

**Tech Stack:** Next.js, Sanity, TypeScript, Tailwind CSS, Framer Motion, Lucide React / React Icons.

---

## Chunk 1: Sanity Schema

### Task 1: Update programasPage.ts schema

**Files:**
- Modify: `src/sanity/schemaTypes/programasPage.ts`

- [ ] **Step 1:** Update with comprehensive new fields and `initialValue` defaults for all objects:
  - `interventionModel`: mainTitle, subtitle, introText
  - `principles[]`: title, description
  - `targetAudience[]`: icon, label
  - `maxSatisfaction`: title, items[]
  - `whatWeDo[]`: step, title, description
  - `objectivesByArea`: motorGruesa[], motorFina[], comunicacion[], psicologia[]
  - `whyChooseUs[]`: text

- [ ] **Step 2: Commit**
  - Run `git add` and commit `feat(sanity): add intervention model fields to programasPage schema`.

---

## Chunk 2: GROQ Query

### Task 2: Update PROGRAMAS_PAGE_QUERY

**Files:**
- Modify: `src/sanity/lib/queries.ts:319-340`

- [ ] **Step 1:** Replace the existing `PROGRAMAS_PAGE_QUERY` with the expanded version that fetches all the newly added schema fields (`interventionModel`, `principles`, `targetAudience`, etc.).
- [ ] **Step 2: Commit**

---

## Chunk 3: Homepage Component (Elite UI)

### Task 3: Create InterventionModelSection

**Files:**
- Create: `src/components/InterventionModelSection.tsx`

- [ ] **Step 1: Setup props and robust defaults.**
- [ ] **Step 2: Build UI with Framer Motion.**
  - Use a `staggerChildren` layout for the header text.
  - Cards should incorporate `backdrop-blur` (glassmorphism) and smooth hover scaling (`whileHover={{ y: -5, shadow: "..."}}`).
  - Use `lucide-react` icons (or Sanity provided emojis/icons mapped nicely).
- [ ] **Step 3: Commit component.**

### Task 4: Update homepage `page.tsx`

**Files:**
- Modify: `src/app/(app)/page.tsx`

- [ ] **Step 1:** Import and insert `<InterventionModelSection />` between the About and Programs sections.
- [ ] **Step 2: Commit.**

---

## Chunk 4: Programas Page Components (Elite UI)

*Note: All components here MUST implement fluid animations and extensive visual polish.*

### Task 5: Create PrinciplesAccordion
- Create: `src/components/programs/PrinciplesAccordion.tsx`
- **Implementation Rules:** Use `framer-motion` `AnimatePresence` to animate accordion height (`height: "auto"` vs `height: 0`). Active state should subtly alter the background color using Tailwind gradients. Smooth chevron rotation.

### Task 6: Create WhoForSection
- Create: `src/components/programs/WhoForSection.tsx`
- **Implementation Rules:** Build a "Bento-style" grid. Cards should have `rounded-3xl`, soft inner borders, and pop up consecutively on scroll (`whileInView`).

### Task 7: Create WhatWeDoTimeline
- Create: `src/components/programs/WhatWeDoTimeline.tsx`
- **Implementation Rules:** Vertical timeline. Draw the connecting line using a subtle gradient. Render steps with alternating left/right layout on desktop, and a single-column layout on mobile.

### Task 8: Create ObjectivesTabs
- Create: `src/components/programs/ObjectivesTabs.tsx`
- **Implementation Rules:** Implement Animated Tabs. Map through the 4 areas. Use `framer-motion` `layoutId="activeTab"` to smoothly slide a background pill behind the selected tab button. Fade out/in the content lists.

### Task 9: Create WhyChooseUs
- Create: `src/components/programs/WhyChooseUs.tsx`
- **Implementation Rules:** Checkmark list. Use animated SVG paths for the checkmarks, triggering as they enter the viewport.

- [ ] **Step 10: Commit all programs components.**

---

## Chunk 5: Programas Page Assembly

### Task 10: Rebuild programas page

**Files:**
- Modify: `src/app/(app)/programas/page.tsx`

- [ ] **Step 1:** Fetch data securely using Sanity Client. 
- [ ] **Step 2:** Assemble the page matching the new hierarchy:
  1. Hero
  2. InterventionModelSection (reused)
  3. PrinciplesAccordion
  4. WhoForSection
  5. MaxSatisfaction (Large, beautifully styled typography)
  6. WhatWeDoTimeline
  7. ObjectivesTabs
  8. WhyChooseUs
  9. Final CTA
- [ ] **Step 3:** Commit.

---

## Chunk 6: Types and Defaults

### Task 11: Update types and default data

**Files:**
- Modify: `src/components/programs/types.ts`
- Modify: `src/data/programs.ts`

- [ ] **Step 1:** Enforce strict typing via Interfaces (`Principle`, `TargetAudience`, `WhatWeDoStep`, etc.).
- [ ] **Step 2:** Update fallback default values in `programs.ts` to ensure components never gracefully degrade to a broken layout if Sanity content is temporarily empty.
- [ ] **Step 3:** Commit.

---

## Chunk 7: Verification

### Task 12: Verify TypeScript compiles

- [ ] **Step 1:** Run `npx tsc --noEmit`. Fix any implicit any or nullability issues.

### Task 13: Elite Visual Verification

- [ ] **Step 1:** Review spacing (padding/margins). Are they generous and balanced?
- [ ] **Step 2:** Trigger scroll animations on mobile and desktop viewports. Ensure no horizontal overflow occurs during `x` axis entrance animations.
- [ ] **Step 3:** Validate interaction states (hover, focus, active). Every clickable element must provide visual feedback.

---

## Order of Execution

1. Chunk 1: Sanity Schema
2. Chunk 2: GROQ Query
3. Chunk 3: Homepage Component (Elite UI)
4. Chunk 4: Programas Page Components (Elite UI)
5. Chunk 5: Programas Page Assembly
6. Chunk 6: Types and Defaults
7. Chunk 7: Verification
