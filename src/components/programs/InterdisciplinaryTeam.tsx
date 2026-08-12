"use client";

import React from "react";
import { motion } from "@/compat/motion";
import { 
  RiWalkFill, 
  RiHandHeartFill, 
  RiSpeakFill, 
  RiBrainFill 
} from "react-icons/ri";

const teamAreas = [
  {
    id: "fisioterapia",
    title: "Fisioterapia",
    description: "Enfoque en el desarrollo motor, la movilidad y la fuerza física.",
    icon: RiWalkFill,
    bgColor: "bg-primary",
    iconColor: "text-white",
    shadow: "shadow-primary/30"
  },
  {
    id: "terapia-ocupacional",
    title: "Terapia Ocupacional",
    description: "Desarrollo de habilidades para la independencia en la vida diaria.",
    icon: RiHandHeartFill,
    bgColor: "bg-primary",
    iconColor: "text-white",
    shadow: "shadow-primary/30"
  },
  {
    id: "fonoaudiologia",
    title: "Fonoaudiología",
    description: "Mejora de la comunicación, el lenguaje y la alimentación.",
    icon: RiSpeakFill,
    bgColor: "bg-primary",
    iconColor: "text-white",
    shadow: "shadow-primary/30"
  },
  {
    id: "psicologia",
    title: "Psicología",
    description: "Apoyo emocional, conductual y orientación a familias.",
    icon: RiBrainFill,
    bgColor: "bg-primary",
    iconColor: "text-white",
    shadow: "shadow-primary/30"
  }
];

export function InterdisciplinaryTeam() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo coherente con el Hero */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] text-primary -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-[400px] md:w-[800px] h-[400px] md:h-[800px] border-[30px] md:border-[60px] border-current rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 md:mb-4 block"
          >
            Nuestro Equipo Interdisciplinario
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight"
          >
            Sinergia para el desarrollo integral
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 md:h-1.5 bg-accent rounded-full mx-auto mt-6 md:mt-8"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {teamAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center relative overflow-hidden"
            >
              {/* Contenedor de Icono Circular - Responsive scale */}
              <div className={`relative z-10 w-16 h-16 md:w-24 md:h-24 ${area.bgColor} rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl ${area.shadow} border-2 md:border-4 border-white`}>
                <area.icon className={`w-8 h-8 md:w-12 md:h-12 ${area.iconColor} drop-shadow-md`} />
              </div>
              
              <h3 className="relative z-10 text-lg md:text-xl font-black text-primary mb-2 md:mb-4 uppercase tracking-tight">
                {area.title}
              </h3>
              <p className="relative z-10 text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
