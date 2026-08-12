"use client";

import { m } from "@/compat/motion";
import { generateEntranceParticles } from "@/components/animations/variants/particles";
import { useEffect, useState } from "react";

interface ParticleEffectProps {
  isActive?: boolean;
  count?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  vx: number;
  color: string;
}

export default function ParticleEffect({ isActive = true, count = 12 }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateEntranceParticles(count));
  }, [count]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <m.div
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
            x: [0, particle.vx || 0, (particle.vx || 0) * 1.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay + 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Central glow burst */}
      <m.div
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
