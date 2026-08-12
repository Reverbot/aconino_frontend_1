"use client";

import React from "react";

import { m } from "@/compat/motion";
import { curtainVariants, shimmerVariants } from "@/components/animations/variants/curtainVariants";
import ParticleEffect from "./components/ParticleEffect";

interface HeaderRevealProps {
  isRevealed: boolean;
  children: React.ReactNode;
}

export default function HeaderReveal({ isRevealed, children }: HeaderRevealProps) {
  return (
    <m.div
      variants={curtainVariants}
      initial="initial"
      animate={isRevealed ? "animate" : "initial"}
      className="sticky top-0 z-50 w-full"
    >
      {/* Particle effect during reveal */}
      <ParticleEffect isActive={isRevealed} />

      {/* Shimmer overlay during reveal */}
      <m.div
        variants={shimmerVariants}
        initial="initial"
        animate={isRevealed ? "animate" : "initial"}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(248,183,25,0.15) 50%, transparent 100%)",
        }}
      />
      
      {children}
    </m.div>
  );
}
