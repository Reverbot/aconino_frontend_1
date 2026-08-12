# Donation Sidebar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the current `DonationWidget` into a professional, modular, and scalable sidebar (`DonationSidebar`) that maximizes conversion through storytelling and impact visualization.

**Architecture:** A sidebar component built with `Framer Motion` for animations, structured into independent sub-components for header (tabs), impact narrative, donation grid, and custom amount input. Data and logic will be centralized in a configuration file.

**Tech Stack:** React (TypeScript), Tailwind CSS, Framer Motion, React Icons.

---

### Task 1: Centralized Data & Constants

**Files:**
- Create: `src/data/donation-options.ts`

- [ ] **Step 1: Define the data schema and export options**

```typescript
import { FaHardHat, FaHandHoldingHeart, FaStethoscope, FaTruck, FaUtensils } from "react-icons/fa";
import { IconType } from "react-icons";

export const MIN_DONATION_AMOUNT = 5000;

export interface DonationItem {
  value: number;
  label: string;
  impactLabel: string;
  icon: IconType;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  image: string;
  progress: {
    target: number;
    current: number;
    unit: string;
  };
  impactMultiplier: number;
  impactUnit: string;
  items: DonationItem[];
}

export const DONATION_OPTIONS: DonationCategory[] = [
  {
    id: 'construction',
    title: 'Construye el Centro',
    description: 'Ayúdanos a terminar el nuevo Centro Día para adultos con discapacidad.',
    color: 'from-primary to-secondary',
    image: '/images/hero-background-blue.png',
    progress: { target: 100, current: 65, unit: 'bultos' },
    impactMultiplier: 85000,
    impactUnit: 'm² de piso',
    items: [
      { value: 85000, label: '$85.000', impactLabel: '1 m² de piso', icon: FaHardHat },
      { value: 150000, label: '$150.000', impactLabel: '2 bultos de cemento', icon: FaHardHat },
      { value: 500000, label: '$500.000', impactLabel: 'Kit de materiales básicos', icon: FaHardHat },
    ]
  },
  {
    id: 'padrino',
    title: 'Plan Padrino',
    description: 'Apoya directamente el tratamiento y bienestar de nuestros niños.',
    color: 'from-secondary to-accent',
    image: '/images/hero-background-blue.png',
    progress: { target: 50, current: 12, unit: 'padrinos' },
    impactMultiplier: 20000,
    impactUnit: 'sesiones de transporte',
    items: [
      { value: 20000, label: '$20.000', impactLabel: '1 sesión de transporte', icon: FaTruck },
      { value: 50000, label: '$50.000', impactLabel: 'Kit nutricional semanal', icon: FaUtensils },
      { value: 100000, label: '$100.000', impactLabel: '1 sesión de fisioterapia', icon: FaStethoscope },
    ]
  }
];

export const calculateImpact = (amount: number, categoryId: string): string => {
  const category = DONATION_OPTIONS.find(c => c.id === categoryId);
  if (!category) return "";
  const result = (amount / category.impactMultiplier).toFixed(1);
  return `${result} ${category.impactUnit}`;
};
```

- [ ] **Step 2: Commit changes**
```bash
git add src/data/donation-options.ts
git commit -m "feat: add comprehensive donation options and impact logic"
```

### Task 2: Refactor DonationProvider State

**Files:**
- Modify: `src/providers/DonationProvider.tsx`

- [ ] **Step 1: Update `DonationContextProps` interface**
Add `selectedCategory: string`, `handleProcessDonation: (amount: number, categoryId: string) => void`, and update `openDonationWidget(categoryId?: string)`.

- [ ] **Step 2: Implement category selection and redirection logic**
Ensure `openDonationWidget` handles optional `categoryId`. Implement `handleProcessDonation` constructing a URL like `https://checkout.wompi.co/p/?amount=${amount}&reference=${categoryId}_${Date.now()}`.

- [ ] **Step 3: Commit changes**
```bash
git add src/providers/DonationProvider.tsx
git commit -m "refactor: update DonationProvider with category support and redirection"
```

### Task 3: Sidebar Header & Narrative

**Files:**
- Create: `src/components/donations/SidebarHeader.tsx`
- Create: `src/components/donations/ImpactStory.tsx`

- [ ] **Step 1: Create `SidebarHeader.tsx`**
Implement category Tabs and close button ("X").

- [ ] **Step 2: Create `ImpactStory.tsx`**
Implement visual narrative area with dynamic image and progress bar ("Faltan X [unit]...").

- [ ] **Step 3: Commit changes**
```bash
git add src/components/donations/SidebarHeader.tsx src/components/donations/ImpactStory.tsx
git commit -m "feat: implement sidebar header and impact story components"
```

### Task 4: Donation Selection Components

**Files:**
- Create: `src/components/donations/DonationGrid.tsx`
- Create: `src/components/donations/CustomAmountInput.tsx`

- [ ] **Step 1: Create `DonationGrid.tsx`**
Implement amount selection cards mapping over category items.

- [ ] **Step 2: Create `CustomAmountInput.tsx`**
Implement input field with real-time impact calculation using `calculateImpact`.

- [ ] **Step 3: Commit changes**
```bash
git add src/components/donations/DonationGrid.tsx src/components/donations/CustomAmountInput.tsx
git commit -m "feat: implement donation grid and custom amount input"
```

### Task 5: Sidebar Footer & Main Integration

**Files:**
- Create: `src/components/donations/SidebarFooter.tsx`
- Create: `src/components/donations/DonationSidebar.tsx`

- [ ] **Step 1: Create `SidebarFooter.tsx`**
Implement action button, trust badges, and link to corporate donation (`/apoyanos#empresarial`).

- [ ] **Step 2: Assemble `DonationSidebar.tsx`**
Use `AnimatePresence` and `motion.div`. Include backdrop with `backdrop-blur-sm` and `onClick` to close.
**Constraints:** Desktop width `500px`, Mobile width `100%`.

- [ ] **Step 3: Commit changes**
```bash
git add src/components/donations/SidebarFooter.tsx src/components/donations/DonationSidebar.tsx
git commit -m "feat: assemble final DonationSidebar component"
```

### Task 6: Final Provider Integration

**Files:**
- Modify: `src/providers/DonationProvider.tsx`

- [ ] **Step 1: Mount `DonationSidebar` within the provider**
Ensure it's rendered inside the provider. Replace the old `DonationWidget`.

- [ ] **Step 2: Manual verification**
Open from various pages, check responsiveness, animations, impact calculator, and corporate link.

- [ ] **Step 3: Commit changes**
```bash
git add src/providers/DonationProvider.tsx
git commit -m "feat: final integration of DonationSidebar into provider"
```
