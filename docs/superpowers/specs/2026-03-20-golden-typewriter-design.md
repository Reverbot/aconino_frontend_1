# Golden Typewriter Effect - Spec

## Overview
Replace the existing custom Typewriter component in `Hero.tsx` with Aceternity UI's `SparklesText` combined with a custom golden cursor implementation to achieve the professional typewriter effect with golden shimmer and particles.

## Visual Effect (from reference HTML)
- Static title "36 años" (unchanged)
- Second line: text types in letter-by-letter
- Golden cursor follows the typing position with:
  - Vertical golden line (gradient from transparent → gold → transparent)
  - Glow/shadow effect (box-shadow in gold tones)
  - Particle sparkles around the cursor
- Remaining untyped text visible but dimmed (opacity 0.25)

## Implementation Plan

### Step 1: Install Aceternity UI
```bash
npm install aceternity-ui
```

### Step 2: Create GoldenTypewriter Component
Create `src/components/animations/effects/GoldenTypewriter.tsx`

This component will:
- Accept props: `text`, `delay`, `speed`, `loop`, `waitDuration`
- Implement typewriter letter-by-letter reveal
- Render golden cursor with:
  - Vertical gradient line
  - Pulsing glow orb
  - Animated spark particles
- Dim untyped text to 0.25 opacity

### Step 3: Update Hero.tsx
- Remove old `Typewriter` import
- Import new `GoldenTypewriter`
- Replace `<Typewriter>` with `<GoldenTypewriter>`

### Step 4: Cleanup
- Remove old `Typewriter.tsx` file
- Keep other animation components unchanged

## Files to Modify
- `package.json` — add aceternity-ui dependency
- `src/components/animations/effects/GoldenTypewriter.tsx` — NEW
- `src/components/Hero.tsx` — update imports and usage
- `src/components/animations/index.ts` — export new component
- `src/components/animations/effects/Typewriter.tsx` — DELETE

## Dependencies
- `aceternity-ui` — animation components library

## Compatibility
- Already has `framer-motion` (required by aceternity-ui)
- Next.js 15 with React 19
- Tailwind CSS 4
