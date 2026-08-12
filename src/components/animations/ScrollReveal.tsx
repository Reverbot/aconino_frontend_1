"use client";

import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
}: ScrollRevealProps) {
  void animation;
  void delay;
  void duration;

  return (
    <div className={className}>
      {children}
    </div>
  );
}
