"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface WhatWeDoStep {
  _key: string;
  step: number;
  title: string;
  description: string;
}

export interface WhatWeDoTimelineProps {
  steps: WhatWeDoStep[];
}

export function WhatWeDoTimeline({ steps }: WhatWeDoTimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!steps || steps.length === 0) return null;

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9
    })
  };

  const currentItem = steps[currentIndex];
  const progress = ((currentIndex + 1) / steps.length) * 100;

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 md:py-20 px-4 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-accent font-black tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 block"
        >
          Nuestra Metodología
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-6xl font-black text-primary leading-tight"
        >
          ¿Cómo lo hacemos?
        </motion.h2>

        {/* Progress Tracker */}
        <div className="mt-6 max-w-md mx-auto relative h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-4 text-primary font-black text-xs md:text-sm tracking-widest uppercase opacity-40">
          Paso {currentIndex + 1} de {steps.length}
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Flashcard Stack with SWIPE support - Optimized Height */}
        <div className="w-full max-w-4xl relative min-h-[200px] md:min-h-[250px] flex items-center cursor-grab active:cursor-grabbing">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  nextStep();
                } else if (swipe > swipeConfidenceThreshold) {
                  prevStep();
                }
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="bg-white px-8 py-6 md:px-14 md:py-8 lg:px-16 lg:py-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_70px_rgba(12,32,112,0.05)] border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden w-full select-none"
            >
              {/* Refined Decorative Number Badge */}
              <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-primary text-white flex items-center justify-center font-black text-2xl md:text-5xl shadow-xl shadow-primary/20 relative z-10 pointer-events-none">
                {currentItem.step}
              </div>

              <div className="flex-1 text-center md:text-left relative z-10 pointer-events-none">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-primary mb-4 tracking-tight leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-sm md:text-lg lg:text-xl text-slate-500 leading-relaxed font-medium">
                  {currentItem.description}
                </p>
                <div className="mt-6 lg:hidden text-accent font-black text-[10px] tracking-[0.2em] uppercase opacity-40">
                  Desliza para continuar
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Control Panel - Integrated & Compact */}
        <div className="flex items-center gap-6 mt-10 md:mt-12 bg-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-xl shadow-primary/5 border border-gray-100">
          <button
            onClick={prevStep}
            disabled={currentIndex === 0}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${currentIndex === 0 ? "text-gray-200 cursor-not-allowed" : "bg-gray-50 text-primary hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-sm"
              }`}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Progress Indicators (Dots) inside the control panel */}
          <div className="flex gap-3 px-4">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-10 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentIndex === steps.length - 1}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${currentIndex === steps.length - 1 ? "text-gray-200 cursor-not-allowed" : "bg-gray-50 text-primary hover:bg-primary hover:text-white hover:scale-110 active:scale-95 shadow-sm"
              }`}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
