"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";
import ScrollReveal from "../animations/ScrollReveal";

interface RecognitionCardProps {
  title: string;
  meta: string;
  imageUrl: string;
  description?: string;
  index: number;
}

export default function RecognitionCard({ 
  title, 
  meta, 
  imageUrl, 
  description, 
  index 
}: RecognitionCardProps) {
  return (
    <ScrollReveal
      animation="fade-up"
      delay={index * 0.1}
    >
      <motion.div 
          whileTap={{ scale: 0.98 }}
          className="group relative flex flex-col items-center bg-white p-5 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-[0_15px_40px_rgba(8,112,184,0.08)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)] transition-all duration-500 border border-white h-full"
      >
          {/* Logo Frame */}
          <div className="w-20 h-20 md:w-36 md:h-36 relative mb-4 md:mb-8 rounded-xl md:rounded-3xl bg-gray-50 flex items-center justify-center p-3 md:p-6 overflow-hidden group-hover:bg-white transition-colors duration-500 shadow-inner">
              <Image 
                  src={imageUrl} 
                  alt={title} 
                  fill 
                  sizes="(max-width: 144px) 50vw, 144px"
                  className="object-contain p-2 md:p-4 mix-blend-multiply filter group-hover:scale-110 transition-transform duration-700" 
              />
              {/* Internal Shine border matching rest of site */}
              <div className="absolute inset-1.5 md:inset-3 border border-white/40 rounded-[0.6rem] md:rounded-[1.4rem] pointer-events-none" />
          </div>
          
          <h4 className="font-black text-[11px] md:text-xl text-primary mb-1 md:mb-4 leading-tight line-clamp-2 text-center transition-colors duration-300 group-hover:text-accent">
              {title}
          </h4>
          
          <span className="text-[9px] md:text-xs font-bold text-accent/80 uppercase tracking-[0.1em] mt-auto">
              {meta}
          </span>

          <p className="hidden md:block text-gray-500 text-sm leading-relaxed mt-6 line-clamp-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {description || "Compromiso constante con la rehabilitación integral y la inclusión social."}
          </p>
      </motion.div>
    </ScrollReveal>
  );
}
