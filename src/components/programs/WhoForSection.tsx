"use client";

import React from "react";
import { motion } from "@/compat/motion";

export interface TargetAudienceItem {
  _key: string;
  icon: string;
  label: string;
}

export interface WhoForSectionProps {
  targetAudience: TargetAudienceItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
};

export function WhoForSection({ targetAudience }: WhoForSectionProps) {
  if (!targetAudience || targetAudience.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header Optimized for Overview */}
      <div className="text-center mb-10 md:mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-black tracking-[0.3em] uppercase text-[10px] md:text-sm mb-3 md:mb-4 block"
        >
          Población de Atención
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tight"
        >
          ¿A quién está dirigido?
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-1.5 bg-accent rounded-full mx-auto mt-6 md:mt-8"
        />
      </div>

      {/* Grid Optimized: 2 columns on mobile (dense), 3 on desktop */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
      >
        {targetAudience.map((target) => (
          <motion.div
            key={target._key}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white p-4 md:p-10 rounded-[1.5rem] md:rounded-[3rem] border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden h-full"
          >
            {/* Soft Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 w-14 h-14 md:w-24 md:h-24 bg-blue-50/50 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 md:mb-8 group-hover:bg-primary group-hover:rotate-3 transition-all duration-500 shadow-sm">
              <span className="text-3xl md:text-5xl group-hover:scale-110 transition-transform duration-500 select-none">
                {target.icon}
              </span>
            </div>
            
            <h3 className="relative z-10 text-xs md:text-xl font-black text-primary uppercase tracking-tight leading-tight group-hover:text-blue-700 transition-colors">
              {target.label}
            </h3>

            {/* Subtle decorative dot */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
