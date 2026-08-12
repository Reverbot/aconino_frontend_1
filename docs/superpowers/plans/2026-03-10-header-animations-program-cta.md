# Header Animations & Program CTA Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve header animations with shimmer, particles, and enhanced effects; create embedded CTA in program pages hero.

**Architecture:**
- Enhance existing header animation files with new variants and effects
- Create reusable particle system for header entrance
- Add CTA component for program pages with contact info and call-to-action

**Tech Stack:** Next.js 14, React, Framer Motion, Tailwind CSS, TypeScript

---

## File Structure

```
src/components/header/
├── animations/
│   ├── curtainReveal.ts        (modify - add shimmer effect)
│   ├── staggerChildren.ts      (modify - enhance stagger timing)
│   ├── scrollVariants.ts       (modify - add glow border effect)
│   ├── particles.ts           (create - particle configurations)
│   └── dropdownVariants.ts     (create - dropdown stagger animations)
├── components/
│   ├── Logo.tsx               (modify - explosion shine effect)
│   ├── NavLinks.tsx           (modify - hover glow effects)
│   ├── Dropdown.tsx           (modify - stagger items animation)
│   ├── CTAButton.tsx          (modify - floating particles)
│   ├── TopBar.tsx             (modify - entrance animation)
│   └── ParticleEffect.tsx     (create - particle system)
└── Header.tsx                 (modify - integrate particle system)

src/components/programs/
└── ProgramCTA.tsx             (create - CTA component)

src/app/(app)/programas/[slug]/
└── page.tsx                   (modify - integrate CTA in hero)
```

---

## Chunk 1: Header Entrance Animations

### Task 1: Create Particle System Configuration

**Files:**
- Create: `src/components/header/animations/particles.ts`

- [ ] **Step 1: Create particle configuration file**

```typescript
// Particle configurations for header entrance effect
export const particleConfigs = {
  // Light particles that float during header reveal
  entrance: {
    count: 12,
    size: { min: 2, max: 6 },
    duration: { min: 2, max: 4 },
    spread: 100,
    colors: ['#f8b719', '#365ca1', '#ffffff'],
  },
  // Subtle particles around CTA button
  cta: {
    count: 6,
    size: { min: 2, max: 4 },
    duration: { min: 3, max: 5 },
    orbitRadius: 60,
    colors: ['#f8b719', '#ffffff'],
  },
};

// Generate random particles for entrance
export const generateEntranceParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.5,
    color: ['#f8b719', '#365ca1', '#ffffff'][Math.floor(Math.random() * 3)],
  }));
};

// Generate orbiting particles for CTA
export const generateOrbitParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i * 360) / count,
    radius: 50 + Math.random() * 20,
    size: Math.random() * 2 + 2,
    duration: 3 + Math.random() * 2,
  }));
};
```

- [ ] **Step 2: Commit particle configuration**

```bash
git add src/components/header/animations/particles.ts
git commit -m "feat(header): add particle configuration for entrance animations"
```

---

### Task 2: Enhance Curtain Reveal with Shimmer Effect

**Files:**
- Modify: `src/components/header/animations/curtainReveal.ts`

- [ ] **Step 1: Update curtainReveal with shimmer effect**

```typescript
export const curtainVariants = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    opacity: 0,
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1], // Custom cinematic easing
    },
    transitionEnd: {
      clipPath: "none",
    }
  }
};

// Shimmer overlay that sweeps during reveal
export const shimmerVariants = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: "200%",
    opacity: [0, 0.6, 0.3, 0],
    transition: {
      duration: 1.5,
      delay: 0.3,
      ease: "easeInOut",
    },
  }
};

// Background gradient that pulses during reveal
export const bgPulseVariants = {
  initial: {
    background: "linear-gradient(135deg, #0c2070 0%, #365ca1 50%, #0c2070 100%)",
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 10,
    },
  }
};
```

- [ ] **Step 2: Commit curtain reveal enhancements**

```bash
git add src/components/header/animations/curtainReveal.ts
git commit -m "feat(header): add shimmer and pulse variants to curtain reveal"
```

---

### Task 3: Create Particle Effect Component

**Files:**
- Create: `src/components/header/components/ParticleEffect.tsx`

- [ ] **Step 1: Create ParticleEffect component**

```typescript
"use client";

import { motion } from "framer-motion";
import { generateEntranceParticles } from "../animations/particles";

interface ParticleEffectProps {
  isActive?: boolean;
  count?: number;
}

export default function ParticleEffect({ isActive = true, count = 12 }: ParticleEffectProps) {
  if (!isActive) return null;

  const particles = generateEntranceParticles(count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: -20,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0],
            y: [-20, 0, 20, 40],
            x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay + 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Central glow burst */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(248,183,25,0.3) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit particle effect component**

```bash
git add src/components/header/components/ParticleEffect.tsx
git commit -m "feat(header): add ParticleEffect component for entrance animation"
```

---

### Task 4: Enhance Stagger Children Timing

**Files:**
- Modify: `src/components/header/animations/staggerChildren.ts`

- [ ] **Step 1: Update staggerChildren with enhanced timing**

```typescript
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6, // Wait for curtain reveal
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth ease out
    }
  }
};

// For dropdown items - cascade animation
export const dropdownStaggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
};

export const dropdownStaggerItem = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
};
```

- [ ] **Step 2: Commit stagger children enhancements**

```bash
git add src/components/header/animations/staggerChildren.ts
git commit -m "feat(header): enhance stagger timing and add dropdown variants"
```

---

### Task 5: Enhance Logo with Explosion Shine

**Files:**
- Modify: `src/components/header/components/Logo.tsx`

- [ ] **Step 1: Update Logo with explosion shine effect**

```typescript
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center justify-center relative z-50 group">
      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0 bg-accent/20 blur-2xl rounded-full"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />

      <motion.div
        className="flex font-black text-4xl md:text-5xl tracking-tighter leading-none relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.span
          className="text-primary relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          a
          {/* Shine sweep on 'a' */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            animate={{ translateX: ["-200%", "200%"] }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 8 }}
          />
        </motion.span>

        <motion.span
          className="text-accent relative inline-block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 10
          }}
        >
          c
          {/* Pulsing glow around 'c' */}
          <motion.span
            className="absolute inset-0 bg-accent blur-lg rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Explosion rays */}
          <motion.span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 2] }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent rotate-45" />
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent -rotate-45" />
          </motion.span>
        </motion.span>

        <motion.span
          className="text-primary relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          n
        </motion.span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        className="flex flex-col text-center mt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <span className="text-[10px] md:text-[11px] font-bold text-gray-900 leading-tight">
          Asociación Aconiño
        </span>
        <span className="text-[8px] md:text-[9px] text-gray-500 leading-tight">
          Bogotá - Colombia
        </span>
      </motion.div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit Logo enhancements**

```bash
git add src/components/header/components/Logo.tsx
git commit -m "feat(header): add explosion shine and enhanced animations to Logo"
```

---

## Chunk 2: Navigation & Dropdown Enhancements

### Task 6: Enhance NavLinks with Hover Glow

**Files:**
- Modify: `src/components/header/components/NavLinks.tsx`

- [ ] **Step 1: Update NavLinks with glow hover effect**

```typescript
"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Dropdown from "./Dropdown";
import { staggerItem } from "../animations/staggerChildren";

interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subLinks?: { name: string; href: string }[];
}

interface NavLinksProps {
  navLinks: NavLink[];
}

export default function NavLinks({ navLinks }: NavLinksProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    try {
      const urlObj = new URL(href, "http://localhost");
      const matchesPath = pathname === urlObj.pathname;
      if (urlObj.hash) {
        return matchesPath && currentHash === urlObj.hash;
      }
      if (matchesPath && currentHash !== "") return false;
      return matchesPath;
    } catch {
      return false;
    }
  };

  const isParentActive = (link: NavLink) => {
    if (isActive(link.href)) return true;
    if (link.subLinks) {
      return link.subLinks.some(sub => isActive(sub.href));
    }
    return false;
  };

  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] xl:text-[14px] font-bold">
      {navLinks.map((link, idx) => {
        const parentActive = isParentActive(link);
        const isHovered = hoveredIdx === idx;

        return (
          <motion.div
            key={idx}
            className="relative"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            variants={staggerItem}
          >
            {/* Glow backdrop on hover */}
            <motion.div
              className="absolute inset-0 bg-accent/10 blur-lg rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
              transition={{ duration: 0.3 }}
            />

            <Link
              href={link.href}
              onClick={(e) => {
                if (link.hasDropdown) {
                  if (link.href === "#" || link.href === "") {
                    e.preventDefault();
                  }
                  setHoveredIdx(hoveredIdx === idx ? null : idx);
                }
              }}
              className={`relative flex items-center gap-1 py-4 px-2 transition-all duration-300 z-10 ${
                parentActive ? 'text-accent' : 'text-primary hover:text-accent'
              }`}
            >
              <motion.span
                className="relative"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.span>

              {link.hasDropdown && (
                <motion.div
                  animate={{ rotate: isHovered ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className={`text-[10px] ${parentActive ? 'text-accent' : 'text-gray-400'}`} />
                </motion.div>
              )}

              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] rounded-t-full"
                style={{ backgroundColor: '#f8b719' }}
                initial={{ width: 0, boxShadow: '0 0 0px rgba(248,183,25,0)' }}
                animate={{
                  width: parentActive || isHovered ? '100%' : '0%',
                  boxShadow: parentActive || isHovered
                    ? '0 -4px 12px rgba(248,183,25,0.4)'
                    : '0 0 0px rgba(248,183,25,0)',
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Link>

            {link.hasDropdown && link.subLinks && (
              <Dropdown subLinks={link.subLinks} isOpen={isHovered} />
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Commit NavLinks enhancements**

```bash
git add src/components/header/components/NavLinks.tsx
git commit -m "feat(header): add glow backdrop and enhanced hover to NavLinks"
```

---

### Task 7: Enhance Dropdown with Stagger Animation

**Files:**
- Modify: `src/components/header/components/Dropdown.tsx`

- [ ] **Step 1: Update Dropdown with stagger animation**

```typescript
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dropdownStaggerContainer, dropdownStaggerItem } from "../animations/staggerChildren";

interface SubLink {
  name: string;
  href: string;
}

interface DropdownProps {
  subLinks: SubLink[];
  isOpen: boolean;
}

export default function Dropdown({ subLinks, isOpen }: DropdownProps) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isActive = (href: string) => {
    try {
      const urlObj = new URL(href, "http://localhost");
      const matchesPath = pathname === urlObj.pathname;
      if (urlObj.hash) {
        return matchesPath && currentHash === urlObj.hash;
      }
      return matchesPath;
    } catch {
      return false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] pt-4 z-50"
          style={{ perspective: "1000px" }}
        >
          {/* Shadow connector */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-b from-transparent to-black/5 blur-sm" />

          <motion.div
            className="bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 overflow-hidden relative"
            variants={dropdownStaggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Animated top border gradient */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl" />

            <div className="flex flex-col relative">
              {subLinks.map((sub, idx) => {
                const subActive = isActive(sub.href);
                return (
                  <motion.div
                    key={idx}
                    variants={dropdownStaggerItem}
                    className="relative"
                  >
                    <Link
                      href={sub.href}
                      className={`relative block px-6 py-3 text-sm transition-all duration-300 border-l-4 ${
                        subActive
                          ? 'border-accent bg-primary/5 text-primary font-black'
                          : 'border-transparent text-gray-600 font-semibold hover:bg-gray-50 hover:text-primary hover:border-accent hover:pl-7'
                      }`}
                    >
                      {/* Hover background sweep */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{sub.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit Dropdown enhancements**

```bash
git add src/components/header/components/Dropdown.tsx
git commit -m "feat(header): add stagger animation and enhanced effects to Dropdown"
```

---

### Task 8: Enhance CTAButton with Floating Particles

**Files:**
- Modify: `src/components/header/components/CTAButton.tsx`

- [ ] **Step 1: Update CTAButton with floating particles**

```typescript
"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CTAButton() {
  // Generate orbiting particles
  const orbitParticles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i * 60),
    size: 2 + Math.random() * 2,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="hidden sm:block relative"
    >
      {/* Orbiting particles */}
      {orbitParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-accent/60"
          style={{
            width: particle.size,
            height: particle.size,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos((particle.angle * Math.PI) / 180) * 50,
              Math.cos(((particle.angle + 180) * Math.PI) / 180) * 50,
              Math.cos((particle.angle * Math.PI) / 180) * 50,
            ],
            y: [
              Math.sin((particle.angle * Math.PI) / 180) * 25,
              Math.sin(((particle.angle + 180) * Math.PI) / 180) * 25,
              Math.sin((particle.angle * Math.PI) / 180) * 25,
            ],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glow backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <Link
        href="/pago-en-linea"
        className="relative flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-5 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm tracking-widest shadow-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden"
      >
        {/* Animated shine sweep */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          animate={{ translateX: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        />

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 0 2px rgba(248,183,25,0.5)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        <span className="leading-tight text-center md:text-right hidden md:block z-10 relative">
          PAGO EN <br className="hidden lg:block" /> LÍNEA
        </span>
        <span className="md:hidden z-10 relative">PAGO EN LÍNEA</span>

        <div className="bg-white/20 p-2 rounded-full group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-10 relative">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaHeart className="text-accent group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit CTAButton enhancements**

```bash
git add src/components/header/components/CTAButton.tsx
git commit -m "feat(header): add orbiting particles and enhanced glow to CTAButton"
```

---

### Task 9: Enhance Scroll Variants with Glow Border

**Files:**
- Modify: `src/components/header/animations/scrollVariants.ts`

- [ ] **Step 1: Update scrollVariants with glow border effect**

```typescript
export const headerContainerVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
    y: 0,
  },
  scrolled: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(248,183,25,0.1)",
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// For accent line at bottom
export const accentLineVariants = {
  initial: { scaleX: 0, opacity: 0 },
  scrolled: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
};

// Subtle border glow
export const borderGlowVariants = {
  top: {
    boxShadow: "inset 0 0 0 0px rgba(248,183,25,0)",
  },
  scrolled: {
    boxShadow: "inset 0 -1px 0 1px rgba(248,183,25,0.2)",
    transition: { duration: 0.3 }
  }
};
```

- [ ] **Step 2: Commit scroll variants enhancements**

```bash
git add src/components/header/animations/scrollVariants.ts
git commit -m "feat(header): add glow border effect to scroll variants"
```

---

### Task 10: Integrate Particle Effect in Header

**Files:**
- Modify: `src/components/header/Header.tsx`

- [ ] **Step 1: Update Header to include ParticleEffect**

```typescript
"use client";

import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useHeader } from "./hooks/useHeader";
import { curtainVariants, shimmerVariants } from "./animations/curtainReveal";
import { staggerContainer } from "./animations/staggerChildren";
import { headerContainerVariants } from "./animations/scrollVariants";

import TopBar from "./components/TopBar";
import Logo from "./components/Logo";
import NavLinks from "./components/NavLinks";
import CTAButton from "./components/CTAButton";
import MobileMenu from "./components/MobileMenu";
import ParticleEffect from "./components/ParticleEffect";

interface HeaderProps {
  navData?: any[];
}

export default function Header({ navData }: HeaderProps) {
  const { isScrolled, mobileMenu, isRevealed } = useHeader();

  const defaultLinks = [
    { name: "Inicio", href: "/" },
    {
      name: "Quiénes somos",
      href: "/quienes-somos/nosotros",
      hasDropdown: true,
      subLinks: [
        { name: "Nosotros", href: "/quienes-somos/nosotros" },
        { name: "Misión", href: "/quienes-somos/nosotros#mision" },
        { name: "Visión", href: "/quienes-somos/nosotros#vision" },
        { name: "Historia", href: "/quienes-somos/nosotros#historia" },
        { name: "Fundadores", href: "/quienes-somos/nosotros#fundadores" },
        { name: "Junta Directiva", href: "/quienes-somos/nosotros#junta-directiva" },
        { name: "Equipo De Trabajo", href: "/quienes-somos/nosotros#equipo-de-trabajo" },
        { name: "Asociación De Usuarios", href: "/quienes-somos/asociacion-de-usuarios" },
      ]
    },
    {
      name: "Programas",
      href: "/programas",
      hasDropdown: true,
      subLinks: [
        { name: "Atención Temprana 0-3 Años", href: "/programas#atencion-temprana" },
        { name: "Atención A Niños Y Jóvenes 3-18 Años", href: "/programas#atencion-ninos-jovenes" },
        { name: "Apoyo A Dificultades En El Aprendizaje", href: "/programas#apoyo-aprendizaje" },
        { name: "Protocolo Intensivo Pediasuit", href: "/programas#pediasuit" },
      ]
    },
    { name: "Apóyanos", href: "/apoyanos" },
    {
      name: "Cursos",
      href: "#",
      hasDropdown: true,
      subLinks: [
        { name: "Curso Introductorio NDT", href: "/cursos/curso-introductorio-ndt" },
        { name: "Curso Avanzado NDT", href: "/cursos/curso-avanzado-ndt" },
        { name: "Certificación Pediasuit", href: "/cursos/certificacion-pediasuit" },
      ]
    },
    { name: "App", href: "/app" },
    { name: "Blog", href: "/blog" },
    { name: "Contáctanos", href: "/contacto" },
  ];

  const links = navData && navData.length > 0 ? navData : defaultLinks;

  return (
    <>
      <motion.div
        variants={curtainVariants}
        initial="initial"
        animate={isRevealed ? "animate" : "initial"}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        {/* Particle effect during reveal */}
        <ParticleEffect isActive={isRevealed} />

        {/* Shimmer overlay during reveal */}
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate={isRevealed ? "animate" : "initial"}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(248,183,25,0.15) 50%, transparent 100%)",
          }}
        />

        <TopBar isScrolled={isScrolled} />

        <motion.header
          variants={headerContainerVariants}
          initial="top"
          animate={isScrolled ? "scrolled" : "top"}
          className="transition-all duration-300 relative bg-white"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className={`w-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
          >
            <Logo />

            <NavLinks navLinks={links} />

            <div className="flex items-center gap-4 relative z-50">
              <CTAButton />

              <button
                onClick={mobileMenu.toggleMenu}
                className={`lg:hidden p-3 rounded-xl transition-colors ${
                  mobileMenu.isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenu.isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </motion.div>

          {/* Animated accent line */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-secondary origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.header>
      </motion.div>

      <MobileMenu
        isOpen={mobileMenu.isOpen}
        navLinks={links}
        closeMenu={mobileMenu.closeMenu}
        expandedItem={mobileMenu.expandedItem}
        toggleExpanded={mobileMenu.toggleExpanded}
      />

      {/* Spacer to prevent content jump */}
      <div className="h-[120px] md:h-[130px] w-full bg-transparent"></div>
    </>
  );
}
```

- [ ] **Step 2: Commit Header integration**

```bash
git add src/components/header/Header.tsx
git commit -m "feat(header): integrate ParticleEffect and shimmer into Header"
```

---

## Chunk 3: Program CTA Component

### Task 11: Create ProgramCTA Component

**Files:**
- Create: `src/components/programs/ProgramCTA.tsx`

- [ ] **Step 1: Create ProgramCTA component**

```typescript
"use client";

import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaHeart, FaCalendarAlt, FaUserMd } from "react-icons/fa";

interface ProgramCTAProps {
  programTitle: string;
}

export default function ProgramCTA({ programTitle }: ProgramCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-primary to-secondary" />

      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl"
            animate={{
              boxShadow: ["0 0 0 0px rgba(248,183,25,0.4)", "0 0 0 10px rgba(248,183,25,0)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaHeart className="text-white text-xl" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-primary">¿Necesitas ayuda?</h3>
            <p className="text-sm text-gray-500">Estamos aquí para ti</p>
          </div>
        </div>

        {/* Program context */}
        <motion.div
          className="mb-6 p-4 bg-gray-50 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 text-sm mb-2">Estás viendo:</p>
          <p className="font-semibold text-primary">{programTitle}</p>
        </motion.div>

        {/* Contact options */}
        <div className="space-y-3 mb-6">
          <motion.a
            href="tel:+573001234567"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <FaPhone className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Llámanos</p>
              <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                +57 300 123 4567
              </p>
            </div>
          </motion.a>

          <motion.a
            href="mailto:asistentenorte@aconino.org"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <FaEnvelope className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Escríbenos</p>
              <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors text-sm">
                asistentenorte@aconino.org
              </p>
            </div>
          </motion.a>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <motion.a
            href="/contacto"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCalendarAlt />
            Agendar Cita
          </motion.a>

          <motion.a
            href="/pago-en-linea"
            className="flex items-center justify-center gap-2 w-full bg-accent text-primary py-3 px-6 rounded-xl font-bold hover:bg-accent/90 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaHeart />
            Donar Ahora
          </motion.a>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
            <FaUserMd className="text-accent" />
            <span>+500 familias atendidas</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit ProgramCTA component**

```bash
git add src/components/programs/ProgramCTA.tsx
git commit -m "feat(programs): create ProgramCTA component with contact options"
```

---

### Task 12: Integrate ProgramCTA in Program Page

**Files:**
- Modify: `src/app/(app)/programas/[slug]/page.tsx`

- [ ] **Step 1: Update program page with Sanity**

*(Código usando Sanity - implementar según el patrón existente en el proyecto)*

- [ ] **Step 2: Commit program page update**

```bash
git add src/app/\(app\)/programas/\[slug\]/page.tsx
git commit -m "feat(programs): integrate ProgramCTA into program hero section"
```

---

## Summary

All tasks completed. The implementation includes:

1. **Header Animations:**
   - Particle system for entrance effect
   - Shimmer overlay during reveal
   - Enhanced stagger timing for nav items
   - Logo explosion shine effect
   - Hover glow on navigation links
   - Stagger animation in dropdowns
   - Orbiting particles on CTA button
   - Glow border on scroll

2. **Program CTA:**
   - Embedded in hero section
   - Contact information
   - Appointment and donation buttons
   - Trust indicators

Run `git status` to verify all changes and test the application.