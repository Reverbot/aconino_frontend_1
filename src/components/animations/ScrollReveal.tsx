"use client";

import { ReactNode } from "react";
import { motion } from "@/compat/motion";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in";
  delay?: number;
  duration?: number;
  className?: string;
}

// Physics-based easing — Emil Kowalski style: smooth deceleration
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const;

// Initial hidden states for each animation type
const VARIANTS: Record<
  NonNullable<ScrollRevealProps["animation"]>,
  { initial: object; animate: object }
> = {
  "fade-up": {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.55,
  className = "",
}: ScrollRevealProps) {
  const { initial, animate } = VARIANTS[animation];

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}
