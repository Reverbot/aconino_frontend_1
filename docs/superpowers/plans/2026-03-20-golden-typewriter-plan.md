# Golden Typewriter Effect Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing custom Typewriter component with Aceternity UI's SparklesText combined with a custom golden cursor implementation for a professional typewriter effect with golden shimmer and particles.

**Architecture:** Install aceternity-ui library, create a GoldenTypewriter component that combines letter-by-letter typing reveal with a golden cursor (vertical gradient line + glow orb + spark particles), update Hero.tsx to use the new component, and remove the old Typewriter implementation.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, framer-motion (existing), aceternity-ui (new)

---

## Chunk 1: Install Aceternity UI

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install aceternity-ui**

Run: `npm install aceternity-ui`
Expected: Package added to dependencies

## Chunk 2: Create GoldenTypewriter Component

**Files:**
- Create: `src/components/animations/effects/GoldenTypewriter.tsx`
- Modify: `src/components/animations/index.ts`
- Test: Visual verification in browser

- [ ] **Step 1: Create GoldenTypewriter component**

Write the following to `src/components/animations/effects/GoldenTypewriter.tsx`:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { SparklesText } from "aceternity-ui/sparkles-text";

interface GoldenTypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  loop?: boolean;
  waitDuration?: number;
}

export const GoldenTypewriter = ({
  text,
  className = "",
  delay = 0,
  speed = 0.04,
  loop = true,
  waitDuration = 3000,
}: GoldenTypewriterProps) => {
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"delay" | "typing" | "sparkle" | "wait">("delay");
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let timeout: NodeJS.Timeout;

    if (phase === "delay") {
      timeout = setTimeout(() => setPhase("typing"), delay * 1000);
    } else if (phase === "typing") {
      if (charIndex < text.length) {
        timeout = setTimeout(() => {
          setCharIndex((i) => i + 1);
        }, speed * 1000);
      } else {
        setHasCompletedOnce(true);
        setPhase("sparkle");
      }
    } else if (phase === "sparkle") {
      timeout = setTimeout(() => {
        setPhase("wait");
      }, 1500);
    } else if (phase === "wait") {
      timeout = setTimeout(() => {
        if (loop) {
          setCharIndex(0);
          setPhase("typing");
        }
      }, waitDuration);
    }

    return () => clearTimeout(timeout);
  }, [mounted, phase, charIndex, text.length, delay, speed, loop, waitDuration]);

  const typedText = text.slice(0, charIndex);
  const remainingText = text.slice(charIndex);
  const isTyping = phase === "typing";
  const showSparkle = phase === "sparkle";
  const showCursor = (isTyping && charIndex > 0) || showSparkle;

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`${className} relative inline-block`}>
      {/* Dimmed full text layer */}
      <span
        className="absolute inset-0"
        aria-hidden="true"
        style={{ opacity: 0.25 }}
      >
        <SparklesText text={text} className="inset-0" />
      </span>

      {/* Typing reveal layer with SparklesText */}
      <span className="relative z-10">
        <span>{typedText}</span>
        <span style={{ opacity: 0 }}>{remainingText}</span>
      </span>

      {/* Golden cursor */}
      {showCursor && (
        <span
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${(charIndex / text.length) * 100}%`,
            transform: "translateX(-50%)",
            width: "4px",
            zIndex: 20,
          }}
        >
          {/* Golden vertical line */}
          <span
            className="absolute"
            style={{
              width: "3px",
              height: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              background:
                "linear-gradient(180deg, transparent 0%, rgb(248, 183, 25) 15%, rgb(255, 224, 102) 50%, rgb(248, 183, 25) 85%, transparent 100%)",
              borderRadius: "2px",
              boxShadow: showSparkle
                ? "rgba(248, 183, 25, 0.7) 0px 0px 10px 3px, rgba(248, 183, 25, 0.3) 0px 0px 20px 6px"
                : "rgba(248, 183, 25, 0.7) 0px 0px 10px 3px, rgba(248, 183, 25, 0.3) 0px 0px 20px 6px",
            }}
          />

          {/* Spark particles */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: "2px",
                height: "2px",
                backgroundColor: i === 1 ? "rgb(255, 224, 102)" : "rgb(248, 183, 25)",
                filter: "blur(0.5px)",
                left: "50%",
                top: `${20 + i * 25}%`,
                opacity: 0,
                animation: `spark-float-${i} 0.5s ease-out infinite`,
              }}
            />
          ))}

          {/* Ambient glow */}
          <span
            className="absolute rounded-full"
            style={{
              width: "16px",
              height: "16px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(248, 183, 25, 0.4) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </span>
      )}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes spark-float-0 {
          0% { opacity: 0; transform: translate(-50%, 0) scale(0.3); }
          30% { opacity: 0.9; transform: translate(-50%, -8px) scale(1); }
          100% { opacity: 0; transform: translate(calc(-50% - 10px), -4px) scale(0.5); }
        }
        @keyframes spark-float-1 {
          0% { opacity: 0; transform: translate(-50%, 0) scale(0.3); }
          30% { opacity: 0.8; transform: translate(-50%, 6px) scale(1); }
          100% { opacity: 0; transform: translate(calc(-50% + 8px), 2px) scale(0.5); }
        }
        @keyframes spark-float-2 {
          0% { opacity: 0; transform: translate(-50%, 0) scale(0.3); }
          30% { opacity: 0.9; transform: translate(-50%, -4px) scale(1); }
          100% { opacity: 0; transform: translate(calc(-50% - 12px), -8px) scale(0.5); }
        }
      `}</style>
    </span>
  );
};
```

- [ ] **Step 2: Update exports in index.ts**

Modify `src/components/animations/index.ts` to add:
```tsx
export * from "./effects/GoldenTypewriter";
```

- [ ] **Step 3: Verify in browser (manual test)**
Run: `npm run dev`
Expected: No build errors, page loads

## Chunk 3: Update Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`
- Delete: `src/components/animations/effects/Typewriter.tsx`

- [ ] **Step 1: Update Hero.tsx imports**

Change line 6 from:
```tsx
import { CurtainReveal, GradientOverlay, ParticleMorph, slideVariants, fadeVariants, Typewriter } from "./animations";
```
To:
```tsx
import { CurtainReveal, GradientOverlay, ParticleMorph, slideVariants, fadeVariants, GoldenTypewriter } from "./animations";
```

- [ ] **Step 2: Update Hero.tsx component usage**

Change line 122 from:
```tsx
<Typewriter text={subtitle} delay={1.3} speed={0.03} />
```
To:
```tsx
<GoldenTypewriter text={subtitle} delay={1.3} speed={0.08} />
```

- [ ] **Step 3: Delete old Typewriter.tsx**

Delete: `src/components/animations/effects/Typewriter.tsx`

- [ ] **Step 4: Run build to verify**

Run: `npm run build`
Expected: Build succeeds with no errors

## Chunk 4: Final Verification

- [ ] **Step 1: Run lint check**

Run: `npm run lint`
Expected: No lint errors

- [ ] **Step 2: Commit changes**

```bash
git add -A
git commit -m "feat: replace Typewriter with GoldenTypewriter using Aceternity UI"
```
