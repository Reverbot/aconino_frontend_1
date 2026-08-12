# Apoyanos Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la página "Apoyanos" y el widget flotante para que sean visualmente profesionales, consistentes con el homepage, y optimizados para conversiones de donación.

**Architecture:** Refactorización modular de componentes existentes + nuevo componente FloatingDonationWidget. Los componentes de apoyanos usarán la misma paleta de colores (primary: #0c2070, secondary: #365ca1, accent: #f8b719) y animaciones (ParticleMorph, CurtainReveal) del homepage. El widget flotante cambiará de chat a CTA de donación directo.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Lucide React (para iconos profesionales)

---

## Chunk 1: Setup y Reemplazo de Iconos

### Task 1.1: Instalar Lucide React

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar lucide-react**

```bash
npm install lucide-react
```

### Task 1.2: Crear archivo de iconos custom para Aconiño

**Files:**
- Create: `src/components/apoyanos/ApoyanosIcons.tsx`

- [ ] **Step 1: Crear componente de iconos SVG custom**

```tsx
import { LucideIcon } from 'lucide-react';

export const IconMoney: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const IconMaterials: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const IconHeart: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const IconHands: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

export const IconBuilding: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

export const IconProgress: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

export const IconUsers: LucideIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
```

### Task 1.3: Eliminar FloatingChatbot y crear FloatingDonationWidget

**Files:**
- Delete: `src/components/FloatingChatbot.tsx`
- Create: `src/components/FloatingDonationWidget.tsx`

- [ ] **Step 1: Crear FloatingDonationWidget con CTA de donación**

```tsx
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDonation } from "@/providers/DonationProvider";
import { IconHeart, IconHands, IconProgress } from "./apoyanos/ApoyanosIcons";

export default function FloatingDonationWidget() {
  const pathname = usePathname();
  const { openDonationWidget } = useDonation();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/apoyanos") {
    return null;
  }

  const progress = 45;
  const donors = 127;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end group chat-widget-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .menu-open .chat-widget-container {
          display: none;
        }
        @media (min-width: 1024px) {
          .menu-open .chat-widget-container {
            display: flex;
          }
        }
      `}} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl mb-4 w-[340px] overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-secondary to-primary p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <IconHeart className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Centro Día Aconiño</h3>
                    <p className="text-white/70 text-sm">Construyendo esperanza</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-2"
                  aria-label="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Card */}
            <div className="p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Progreso</span>
                <span className="text-sm font-bold text-primary">{progress}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IconUsers className="w-4 h-4" />
                  <span>{donors} donors</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IconProgress className="w-4 h-4" />
                  <span>Meta: $500M</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 bg-white border-t border-gray-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openDonationWidget();
                }}
                className="w-full bg-gradient-to-r from-accent to-yellow-400 text-primary font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
              >
                <IconHands className="w-5 h-5" />
                Donar Ahora
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Tu aporte hace la diferencia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-accent to-yellow-400 text-primary w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-2xl transition-all group relative"
        aria-label="Donar"
      >
        <motion.div
          animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <IconHeart className="w-7 h-7" />
        </motion.div>
        
        <motion.div
          animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>

        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
      </motion.button>
    </div>
  );
}
```

### Task 1.4: Actualizar layout para usar nuevo widget

**Files:**
- Modify: `src/app/(app)/layout.tsx`

- [ ] **Step 1: Reemplazar import de FloatingChatbot por FloatingDonationWidget**

```tsx
// Antes:
import FloatingChatbot from "../../components/FloatingChatbot";

// Después:
import FloatingDonationWidget from "@/components/FloatingDonationWidget";
```

- [ ] **Step 2: Reemplazar uso del componente**

```tsx
// Antes:
<FloatingChatbot />

// Después:
<FloatingDonationWidget />
```

---

## Chunk 2: Rediseño de Componentes de Apoyanos

### Task 2.1: Rediseñar CentroDiaHero

**Files:**
- Modify: `src/components/apoyanos/CentroDiaHero.tsx`

- [ ] **Step 1: Agregar CurtainReveal y ParticleMorph como el Hero del homepage**

```tsx
// Agregar imports
import { CurtainReveal, GradientOverlay, ParticleMorph } from "../animations";
import { IconBuilding } from "./ApoyanosIcons";

// Agregar después del primer div:
<CurtainReveal color="bg-secondary" />
<GradientOverlay from="from-primary/80" via="via-secondary/50" to="to-primary/80" className="opacity-60" />
<ParticleMorph subtle={true} />
```

- [ ] **Step 2: Mejorar tipografía y CTAs**

```tsx
// Cambiar títulos para mayor impacto
<h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
  Construyendo <span className="text-accent">Esperanza</span>
</h1>

// Mejorar CTA con estilo consistente
<motion.button
  onClick={openDonationWidget}
  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-yellow-400 text-primary px-12 py-5 rounded-full font-black text-lg tracking-widest shadow-2xl hover:shadow-[0_20px_50px_rgba(248,183,25,0.4)] hover:scale-105 transition-all duration-300 uppercase"
>
  <IconHands />
  Donar Ahora
</motion.button>
```

### Task 2.2: Rediseñar ConstructionProgress

**Files:**
- Modify: `src/components/apoyanos/ConstructionProgress.tsx`

- [ ] **Step 1: Usar iconos custom y mejorar estilos**

```tsx
// Importar iconos
import { IconProgress, IconUsers, IconBuilding } from "./ApoyanosIcons";

// Mejorar card con glassmorphism
<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-8">
```

- [ ] **Step 2: Mejorar barra de progreso**

```tsx
<div className="h-10 bg-black/30 rounded-full overflow-hidden relative shadow-inner">
  <motion.div 
    initial={{ width: 0 }} 
    animate={{ width: `${percentage}%` }} 
    transition={{ duration: 1.5, ease: "easeOut" }} 
    className="h-full bg-gradient-to-r from-accent via-yellow-300 to-accent rounded-full relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
  </motion.div>
  {/* Marcadores */}
  <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/20" />
  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20" />
  <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/20" />
</div>
```

- [ ] **Step 3: Agregar estilos de animación shimmer al global.css**

```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

### Task 2.3: Rediseñar DonationCatalog

**Files:**
- Modify: `src/components/apoyanos/DonationCatalog.tsx`

- [ ] **Step 1: Usar iconos custom y mejorar cards**

```tsx
// Imports
import { IconMoney, IconMaterials, IconHeart, IconBuilding, IconUsers } from "./ApoyanosIcons";

// Reemplazar FaMoneyBillWave con IconMoney
// Reemplazar FaBoxOpen con IconMaterials
// etc.
```

- [ ] **Step 2: Mejorar layout de categorías**

```tsx
// Cards con mejor jerarquía visual
<div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
  <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden`}>
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    <IconComponent className="w-8 h-8 mb-3 relative z-10" />
    <h3 className="font-bold text-xl relative z-10">{category.title}</h3>
  </div>
```

- [ ] **Step 3: Mejorar CTA de sección internacional**

```tsx
<div className="bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden shadow-2xl">
  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
  {/* Content with relative z-index */}
</div>
```

---

## Chunk 3: Optimización para Conversión

### Task 3.1: Agregar trust badges y urgencia

**Files:**
- Create: `src/components/apoyanos/TrustBadges.tsx`

- [ ] **Step 1: Crear componente de confianza**

```tsx
"use client";

import { motion } from "framer-motion";

const badges = [
  { icon: "🛡️", text: "Donaciones 100% seguras" },
  { icon: "📋", text: "Certificados de donación" },
  { icon: "📊", text: "Transparencia total" },
];

export default function TrustBadges() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-8 py-6 bg-gray-50"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 text-gray-600"
        >
          <span className="text-2xl">{badge.icon}</span>
          <span className="font-medium">{badge.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Task 3.2: Integrar TrustBadges en ApoyanosClient

**Files:**
- Modify: `src/app/(app)/apoyanos/ApoyanosClient.tsx`

- [ ] **Step 1: Importar y usar TrustBadges**

```tsx
import TrustBadges from "@/components/apoyanos/TrustBadges";

// Agregar después de ConstructionProgress
<TrustBadges />
```

---

## Chunk 4: Testing y Verificación

### Task 4.1: Verificar build y lint

- [ ] **Step 1: Ejecutar lint**

```bash
npm run lint
```

- [ ] **Step 2: Ejecutar typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

- [ ] **Step 4: Commit cambios**

```bash
git add -A
git commit -m "feat: redesign Apoyanos page with professional styling and conversion optimization"
```

---

## Dependencias

- `lucide-react` - Para iconos profesionales
- `framer-motion` - Ya instalado
- `react-countup` - Ya instalado
- Tailwind CSS - Ya configurado
