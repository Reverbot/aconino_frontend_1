"use client";

import React from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { IconHeart } from "@/constants/apoyanos-icons";

interface TriggerButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function TriggerButton({ isOpen, toggle }: TriggerButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="bg-gradient-to-r from-accent to-yellow-400 text-primary w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(248,183,25,0.4)] hover:shadow-accent/50 transition-all group relative z-[100]"
      aria-label={isOpen ? "Cerrar menú de donación" : "Abrir menú de donación"}
    >
      {/* Breathing Background Layer (Mobile focused) */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-accent/40 pointer-events-none"
        />
      )}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="heart"
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              // Subtle continuous icon pulse when closed
              y: [0, -2, 0]
            }}
            transition={{
              scale: { duration: 0.2 },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            exit={{ scale: 0 }}
            className="absolute"
          >
            <IconHeart className="w-6 h-6 md:w-7 md:h-7" />
          </motion.div>
        ) : (
          <motion.div
            key="close"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            className="absolute"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Pulse effect */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-accent/30 pointer-events-none opacity-50" />
      )}
    </motion.button>
  );
}
