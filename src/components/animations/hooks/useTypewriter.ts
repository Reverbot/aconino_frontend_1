"use client";

import { useState, useEffect } from "react";
import type { Phase } from "@/lib/Particle";

interface UseTypewriterOptions {
  text: string;
  delay?: number;
  speed?: number;
  loop?: boolean;
  waitDuration?: number;
}

interface UseTypewriterReturn {
  charIndex: number;
  phase: Phase;
  mounted: boolean;
}

export const useTypewriter = ({
  text,
  delay = 0,
  speed = 0.08,
  loop = true,
  waitDuration = 3000,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("delay");
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
        setPhase("sparkle");
      }
    } else if (phase === "sparkle") {
      timeout = setTimeout(() => {
        setPhase("wait");
      }, 1000);
    } else if (phase === "wait") {
      timeout = setTimeout(() => {
        if (loop) {
          setPhase("restarting");
          setTimeout(() => {
            setCharIndex(0);
            setPhase("typing");
          }, 500);
        }
      }, waitDuration);
    }

    return () => clearTimeout(timeout);
  }, [mounted, phase, charIndex, text.length, delay, speed, loop, waitDuration]);

  return { charIndex, phase, mounted };
};
