"use client";

import React from "react";
import { motion, Variants } from "@/compat/motion";
import {
  Handshake,
  Users,
  Target,
  UserPlus
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export interface Principle {
  _key: string;
  title: string;
  description: string;
}

export interface InterventionModelSectionProps {
  mainTitle?: string;
  subtitle?: string;
  introText?: string;
  principles?: Principle[];
}

const defaultPrinciples: Principle[] = [
  { _key: "1", title: "Intervención interdisciplinaria", description: "Coordinación entre fisioterapia, terapia ocupacional, fonoaudiología y psicología." },
  { _key: "2", title: "Centrada en el usuario y familia", description: "Trabajo conjunto entre profesionales, paciente y núcleo familiar en todo el proceso." },
  { _key: "3", title: "Objetivos funcionales", description: "Trabajamos habilidades que permiten mayor independencia en actividades diarias." },
  { _key: "4", title: "Atención personalizada", description: "Diseñamos el tratamiento específicamente para cada usuario tras evaluación." }
];

const getIconForIndex = (index: number) => {
  const props = { className: "w-8 h-8 md:w-10 md:h-10 text-primary", strokeWidth: 1.5 };
  switch (index % 4) {
    case 0: return <Handshake {...props} />;
    case 1: return <Users {...props} />;
    case 2: return <Target {...props} />;
    case 3: return <UserPlus {...props} />;
    default: return <Target {...props} />;
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

export function InterventionModelSection({
  mainTitle = "Nos centramos más en la actividad y menos en la discapacidad",
  subtitle = "Nuestro Enfoque",
  introText = "En Aconiño trabajamos desde un enfoque interdisciplinario centrado en el niño y su familia, promoviendo el desarrollo integral, la autonomía y la participación social.",
  principles = defaultPrinciples
}: InterventionModelSectionProps) {

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-40 overflow-hidden bg-white">
      {/* Background Decorations - High End Aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-50 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[60px] md:blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-end mb-12 md:mb-24">
            <div className="lg:col-span-8">
              <motion.span
                variants={itemVariants}
                className="text-accent font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-2xl md:text-4xl mb-4 md:mb-6 block"
              >
                {subtitle}
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-2xl md:text-4xl lg:text-5xl font-black text-primary leading-[1.1] md:leading-[1.05] tracking-tight"
              >
                {mainTitle}
              </motion.h2>
            </div>
            <div className="lg:col-span-4">
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium lg:border-l-4 lg:border-accent lg:pl-8"
              >
                {introText}
              </motion.p>
            </div>
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle._key}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] md:shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-500 flex flex-col items-start h-full overflow-hidden"
              >
                <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 bg-blue-50 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-sm border border-blue-100/50">
                  {getIconForIndex(index)}
                </div>

                <h3 className="relative z-10 text-lg md:text-xl font-black text-primary mb-3 md:mb-4 uppercase tracking-tight leading-tight">
                  {principle.title}
                </h3>
                
                <p className="relative z-10 text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Botón Contáctanos (WhatsApp) */}
          <motion.div variants={itemVariants} className="mt-12 md:mt-16 text-center">
            <a
              href="https://wa.me/573133910760"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent text-primary font-black tracking-widest text-sm md:text-base px-12 py-5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-accent/20 transform hover:-translate-y-1 hover:scale-105"
            >
              <FaWhatsapp className="text-xl md:text-2xl" />
              CONTÁCTANOS
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
