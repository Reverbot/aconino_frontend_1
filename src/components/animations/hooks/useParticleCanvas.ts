"use client";

import { useEffect, useRef } from "react";
import { Particle, type Phase } from "@/lib/Particle";

interface UseParticleCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  containerRef: React.RefObject<HTMLSpanElement | null>;
  cursorPos: { x: number; y: number };
  phase: Phase;
  mounted: boolean;
}

export const useParticleCanvas = ({
  canvasRef,
  containerRef,
  cursorPos,
  phase,
  mounted,
}: UseParticleCanvasProps): void => {
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef(cursorPos);
  const phaseRef = useRef(phase);

  useEffect(() => {
    cursorRef.current = cursorPos;
  }, [cursorPos]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, canvasRef, containerRef]);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentPhase = phaseRef.current;
      const currentPos = cursorRef.current;

      if (currentPhase === "typing" || currentPhase === "sparkle") {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(new Particle(currentPos.x, currentPos.y));
        }

        const gradient = ctx.createRadialGradient(
          currentPos.x,
          currentPos.y,
          0,
          currentPos.x,
          currentPos.y,
          35
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.2, "rgba(248, 183, 25, 0.5)");
        gradient.addColorStop(1, "rgba(248, 183, 25, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, 35, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, canvasRef]);
};
