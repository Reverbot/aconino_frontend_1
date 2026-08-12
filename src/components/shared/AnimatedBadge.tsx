"use client";

import { motion } from "@/compat/motion";

interface AnimatedBadgeProps {
  label: string;
  value: string;
  className?: string;
}

export default function AnimatedBadge({ label, value, className = "" }: AnimatedBadgeProps) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut", 
        repeatType: "reverse"
      }}
      className={`absolute z-20 bg-primary text-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-3 md:gap-4 border-2 border-accent/30 backdrop-blur-sm ${className}`}
    >
      <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center text-primary text-lg md:text-2xl shrink-0">
        ❤️
      </div>
      <div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent mb-0.5 md:mb-1">{label}</p>
        <p className="text-base md:text-xl font-black leading-none whitespace-nowrap">{value}</p>
      </div>
    </motion.div>
  );
}
