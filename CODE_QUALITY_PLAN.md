# Aconiño Frontend - Code Quality Implementation Plan

**Goal:** Implement all high and medium priority code quality improvements identified in the codebase analysis.

**Architecture:** 
- Fix Sanity client CDN configuration and error handling
- Consolidate duplicated TypeScript types into single source of truth
- Replace hardcoded values with constants
- Add proper TypeScript interfaces to hooks
- Memoize expensive computations in hooks
- Replace window.location.href with Next.js router

**Tech Stack:** Next.js 15, TypeScript 5.9, Sanity CMS, React 19

---

## Chunk 1: Sanity Client & Error Handling

### Task 1.1: Fix Sanity Client CDN Configuration
- Modify: `src/sanity/lib/client.ts` - Change `useCdn: false` to `useCdn: true` for read client

### Task 1.2: Create Sanity Error Handler Utility
- Create: `src/sanity/lib/errors.ts` - SanityError class and fetchWithError utility

### Task 1.3: Update sanity-posts.ts with Error Handling
- Modify: `src/lib/sanity-posts.ts` - Add error handling to all fetch calls

---

## Chunk 2: TypeScript Type Consolidation

### Task 2.1: Expand src/types/sanity.ts
- Add all missing types including SanityAuthor, crop field, etc.

### Task 2.2: Update src/lib/sanity-posts.ts to import from types
- Remove duplicated type definitions, import from @/types/sanity

### Task 2.3: Fix src/types/index.ts
- Remove component import, export types properly

---

## Chunk 3: DonationProvider Navigation Fix

### Task 3.1: Replace window.location.href
- Modify: `src/providers/DonationProvider.tsx` - Use window.open() instead

---

## Chunk 4: Hooks TypeScript Interfaces

### Task 4.1: Add Types to useScrollDetection
- Add `UseScrollDetectionReturn` interface

### Task 4.2: Add Types to useMobileMenu
- Add `UseMobileMenuReturn` interface and extract MOBILE_BREAKPOINT constant

### Task 4.3: Add Types and Memoization to useGlassmorphism
- Add useMemo for glassStyles, proper interfaces

### Task 4.4: Add Types to useCurtainReveal
- Add `UseCurtainRevealReturn` interface

---

## Chunk 5: Sanity Schema Validation

### Task 5.1: Add Validation to settings Schema
### Task 5.2: Add Validation to post Schema

---

## Chunk 6: Extract Magic Numbers to Constants

### Task 6.1: Create src/constants/index.ts
### Task 6.2: Update hooks to use constants

---

## Chunk 7: wp.ts Error Handling

### Task 7.1: Improve Error Handling in wp.ts
- Replace console.error with WPAPIError class

---

## Verification Commands

```bash
npm run typecheck
npm run lint
npm run build
```

**Implementation Order:** Chunks 1-7 sequentially
