"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { ChevronDown } from "lucide-react";

export interface Principle {
  _key: string;
  title: string;
  description: string;
}

export interface PrinciplesAccordionProps {
  principles: Principle[];
}

export function PrinciplesAccordion({ principles }: PrinciplesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!principles || principles.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 px-2 md:px-0">
      {principles.map((principle, index) => {
        const isOpen = openIndex === index;

        return (
          <div 
            key={principle._key}
            className={`group border rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 ${isOpen ? 'bg-blue-50/40 border-primary/20 shadow-[0_15px_45px_rgba(12,32,112,0.05)]' : 'bg-white border-gray-100 hover:border-primary/20 hover:shadow-lg'}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left p-5 md:p-8 flex items-center justify-between focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-6 md:gap-10">
                {/* Number Container - Optimized for symmetry */}
                <span className={`flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-3xl text-sm md:text-lg font-black shrink-0 transition-all duration-500 shadow-sm ${isOpen ? 'bg-primary text-white scale-110 rotate-3' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <span className={`text-base md:text-2xl font-black transition-colors duration-300 tracking-tight leading-tight ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                  {principle.title}
                </span>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className={`shrink-0 ml-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-300'}`}
              >
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="px-5 md:px-8 pb-8 md:pb-12 pt-0 md:ml-24">
                    <p className="text-sm md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl border-l-4 border-accent pl-6 md:pl-10">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
