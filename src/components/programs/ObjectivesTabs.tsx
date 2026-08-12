"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Objective {
  _key: string;
  description: string;
}

export interface ObjectivesByArea {
  motorGruesa: Objective[];
  motorFina: Objective[];
  comunicacion: Objective[];
  psicologia: Objective[];
}

export interface ObjectivesTabsProps {
  objectives: ObjectivesByArea;
}

type TabKeys = keyof ObjectivesByArea;

const TABS: { id: TabKeys; label: string; icon: string }[] = [
  { id: 'motorGruesa', label: 'Motor Gruesa', icon: '🏃' },
  { id: 'motorFina', label: 'Motor Fina', icon: '✍️' },
  { id: 'comunicacion', label: 'Comunicación', icon: '🗣️' },
  { id: 'psicologia', label: 'Psicología', icon: '🧠' }
];

export function ObjectivesTabs({ objectives }: ObjectivesTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKeys>('motorGruesa');
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!objectives) return null;

  const currentObjectives = objectives[activeTab] || [];

  const handleTabChange = (id: TabKeys) => {
    setActiveTab(id);
    setMobileIndex(0);
  };

  const nextObjective = () => {
    if (mobileIndex < currentObjectives.length - 1) {
      setDirection(1);
      setMobileIndex(mobileIndex + 1);
    }
  };

  const prevObjective = () => {
    if (mobileIndex > 0) {
      setDirection(-1);
      setMobileIndex(mobileIndex - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
      <div className="text-center mb-10 md:mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] bg-blue-50 px-6 py-2 rounded-full inline-block mb-4"
        >
          Metas Terapéuticas
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight"
        >
          Objetivos por Área
        </motion.h2>
      </div>

      {/* Tabs Layout - Smart Wrapping, no forced horizontal scroll */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-slate-50 p-2 md:p-3 rounded-3xl md:rounded-full border border-gray-100 shadow-inner w-full md:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-full text-[10px] sm:text-xs md:text-sm font-black transition-all duration-300 z-10 flex items-center justify-center gap-2 md:gap-3 ${
                activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-primary hover:bg-white/50'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-pill-objs-final"
                  className="absolute inset-0 bg-primary rounded-2xl md:rounded-full -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-base md:text-xl">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Intelligent Responsive Grid */}
      <div className="relative min-h-[450px]">
        
        {/* DESKTOP & TABLET: Adaptive Grid (Visible from sm up) */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 md:gap-y-10 p-6 md:p-16 lg:p-20 bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-xl shadow-gray-500/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 md:gap-y-10"
            >
              {currentObjectives.map((obj, i) => (
                <div key={obj._key} className="flex items-start gap-5 md:gap-6 group">
                  <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center font-black text-sm md:text-lg shadow-lg shadow-primary/10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-gray-900 font-bold leading-relaxed text-base md:text-xl tracking-tight">
                    {obj.description}
                  </p>
                </div>
              ))}
              {currentObjectives.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
                  Sin objetivos registrados
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE ONLY: Flashcard Stack (Visible only on xs screens) */}
        <div className="sm:hidden flex flex-col items-center">
          <div className="w-full relative min-h-[380px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${activeTab}-${mobileIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -5000) nextObjective();
                  else if (swipe > 5000) prevObjective();
                }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center w-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl mb-8 shadow-xl shadow-primary/20">
                  {mobileIndex + 1}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-900 font-black text-xl leading-snug tracking-tight">
                    {currentObjectives[mobileIndex]?.description}
                  </p>
                </div>
                <div className="mt-8 text-accent font-black text-[10px] tracking-[0.2em] uppercase opacity-60">
                  Desliza para continuar
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center gap-6 mt-8 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-50">
            <button
              onClick={prevObjective}
              disabled={mobileIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                mobileIndex === 0 ? "text-gray-200" : "bg-gray-50 text-primary active:scale-90"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-primary font-black text-sm tracking-widest">
              {mobileIndex + 1} / {currentObjectives.length}
            </span>
            <button
              onClick={nextObjective}
              disabled={mobileIndex === currentObjectives.length - 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                mobileIndex === currentObjectives.length - 1 ? "text-gray-200" : "bg-gray-50 text-primary active:scale-90"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
