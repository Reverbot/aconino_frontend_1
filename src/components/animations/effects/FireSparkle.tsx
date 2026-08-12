"use client";

import React from "react";
import { motion, AnimatePresence } from "@/compat/motion";

interface FireSparkleProps {
  active: boolean;
  /** Show trailing curtain glow while typing */
  curtain?: boolean;
  /** Show sparkle burst at end of typing */
  burst?: boolean;
  className?: string;
}

/**
 * Golden curtain / sparkle effect rendered inline with text.
 * - `curtain`: vertical golden glow line with trailing sparks (follows cursor)
 * - `burst`: bigger particle explosion at end of typing
 */
export const FireSparkle = ({
  active,
  curtain = false,
  burst = false,
  className = "",
}: FireSparkleProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <span
      className={`inline-flex items-center justify-center relative ml-0 align-middle ${className}`}
      style={{
        width: curtain ? "4px" : burst ? "12px" : "0px",
        height: "1.1em",
        verticalAlign: "middle",
      }}
    >
      <AnimatePresence>
        {active && curtain && (
          <>
            {/* Vertical golden cursor line */}
            <motion.span
              key="curtain-line"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute"
              style={{
                width: "3px",
                height: "100%",
                background:
                  "linear-gradient(180deg, transparent 0%, #f8b719 15%, #ffe066 50%, #f8b719 85%, transparent 100%)",
                borderRadius: "2px",
                boxShadow:
                  "0 0 10px 3px rgba(248, 183, 25, 0.7), 0 0 20px 6px rgba(248, 183, 25, 0.3)",
                left: "50%",
                transform: "translateX(-50%) translateZ(0)",
                willChange: "transform, opacity",
              }}
            />

            {/* Trailing sparks */}
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={`trail-${i}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                animate={{
                  x: -6 - Math.random() * 10,
                  y: (Math.random() - 0.5) * 16,
                  opacity: [0, 0.8, 0],
                  scale: [0.3, 0.6, 0],
                }}
                transition={{
                  duration: 0.35 + Math.random() * 0.25,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: Math.random() * 0.1,
                }}
                className="absolute rounded-full"
                style={{
                  width: "2px",
                  height: "2px",
                  backgroundColor: i % 2 === 0 ? "#f8b719" : "#ffe066",
                  filter: "blur(0.5px)",
                  transform: "translateZ(0)",
                  willChange: "transform, opacity",
                }}
              />
            ))}

            {/* Soft ambient glow */}
            <motion.span
              key="curtain-glow"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: "16px",
                height: "16px",
                background:
                  "radial-gradient(circle, rgba(248,183,25,0.4) 0%, transparent 70%)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) translateZ(0)",
                willChange: "opacity",
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {active && burst && (
          <>
            {/* Core glow burst */}
            <motion.span
              key="burst-core"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 2.5], opacity: [0, 0.8, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                width: "14px",
                height: "14px",
                background:
                  "radial-gradient(circle, #ffe066 0%, #f8b719 40%, transparent 70%)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) translateZ(0)",
                willChange: "transform, opacity",
              }}
            />

            {/* Burst particles */}
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const dist = 12 + Math.random() * 15;
              return (
                <motion.span
                  key={`burst-${i}`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 8,
                    opacity: [0, 1, 0],
                    scale: [0.5, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.3,
                    ease: "easeOut",
                    delay: Math.random() * 0.08,
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: "3px",
                    height: "3px",
                    backgroundColor:
                      i % 3 === 0
                        ? "#fff"
                        : i % 3 === 1
                          ? "#ffe066"
                          : "#f8b719",
                    filter: "blur(0.5px)",
                    left: "50%",
                    top: "50%",
                    transform: "translateZ(0)",
                    willChange: "transform, opacity",
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>
    </span>
  );
};
