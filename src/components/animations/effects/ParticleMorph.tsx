"use client";

import { motion } from "@/compat/motion";
import { useEffect, useState } from "react";

interface ParticleMorphProps {
  subtle?: boolean;
}

interface Particle {
  width: number;
  height: number;
  top: string;
  left: string;
  xAnimation: number;
  duration: number;
  delay: number;
}

export function ParticleMorph({ subtle = false }: ParticleMorphProps) {
  void subtle;
  return null;
}
