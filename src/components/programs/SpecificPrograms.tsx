"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/compat/motion";

const programsData = [
  {
    id: 1,
    title: "Atención temprana de 0 a 3 años",
    description: "Programa terapéutico integral para apoyar el desarrollo sicomotor a través de la estimulación temprana y adecuada de sistemas multisensoriales (musculoesquelético, neuromotor, vestibular, visual, etc) para mejorar la funcionalidad.\n\nCapacitar a las familias en el manejo y conocimiento de la condición de su bebé.",
    image: "/images/programa-atencion-temprana.jpg",
    alt: "Atención temprana bebé",
    layout: "image-left" as const,
    decorations: "yellow-bar-heart",
    anchorId: "atencion-temprana",
  },
  {
    id: 2,
    title: "Atención a niños y jóvenes de 3 a 18 años",
    description: "Programa terapéutico integral para apoyar el desarrollo sicomotor y evitar en lo posible la aparición de patrones atípicos, a través de la estimulación de sistemas multisensoriales (musculo-esquelético, neuromotor, vestibular, visual, etc) para mejorar la funcionalidad y propiciar la inclusión social.\n\nCapacitar a la familia en el manejo y conocimiento de la condición de su hijo.",
    image: "/images/programa-neurodesarrollo.jpg",
    alt: "Visión niños y jóvenes",
    layout: "image-right" as const,
    decorations: "blue-bar-yellow-bg",
    anchorId: "atencion-ninos-jovenes",
  },
  {
    id: 3,
    title: "Apoyo a dificultades en el aprendizaje a niños de 3 a 14 años",
    description: "Programa terapéutico de apoyo a las actividades escolares para potencializar las habilidades motoras, cognitivas y de lenguaje, con el fin de lograr un mejor desempeño en el aula regular.\n\nEstá dirigido a niños y jóvenes de diversas Entidades Administradoras de Planes de Beneficios- EATB, alumnos de colegios, particulares y usuarios en general.",
    image: "/images/programa-aprendizaje.jpg",
    alt: "Apoyo en el aprendizaje",
    layout: "image-left" as const,
    decorations: "yellow-bar-half-heart",
    anchorId: "apoyo-aprendizaje",
  },
  {
    id: 4,
    title: "Protocolo Intensivo Pediasuit Niños y jóvenes de 2 a 18 años",
    description: "Protocolo Pediasuit es un programa terapéutico intensivo para apoyar el desarrollo sicomotor a través de la estimulación de sistemas multisensoriales (musculoesquelético, neuromotor, etc) para mejorar la funcionalidad y propiciar la inclusión social.\n\nRecomendado a niños y jóvenes con discapacidad física con clasificación de Medida de la Función Motora Gruesa - GMFM entre nivel I y IV.\n\nCapacitar a la familia en el manejo y conocimiento de la condición de su hijo.",
    image: "/images/programa-pediasuit.jpg",
    alt: "Protocolo Intensivo Pediasuit",
    layout: "image-right" as const,
    decorations: "blue-bar-full-yellow-bg",
    anchorId: "pediasuit",
  }
];

export function SpecificPrograms() {
  return (
    <div className="flex flex-col gap-32 md:gap-40 w-full">
      {programsData.map((program) => {
        const isImageLeft = program.layout === "image-left";
        
        return (
          <div key={program.id} id={program.anchorId} className="w-full relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-32">
            
            {/* Background Decoration for specific items (like Visión and Pediasuit) */}
            {program.decorations === "blue-bar-yellow-bg" && (
              <div className="absolute top-0 right-0 w-[80%] md:w-[45%] h-[120%] bg-accent rounded-l-[4rem] -z-10 translate-x-[10%] translate-y-[-10%] opacity-90 hidden md:block" />
            )}
            
            {program.decorations === "blue-bar-full-yellow-bg" && (
              <div className="absolute top-0 right-0 w-[95%] md:w-[60%] h-[120%] bg-accent rounded-l-[5rem] -z-10 translate-x-[5%] translate-y-[-10%] opacity-100 hidden md:block" />
            )}

            {/* Mobile Header (Visible only on mobile) */}
            <div className="lg:hidden mb-12 pt-8 text-center px-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-6 bg-accent"></div>
                <span className="text-gray-400 font-bold tracking-widest uppercase text-[9px] sm:text-xs">Aconiño</span>
                <div className="h-[2px] w-6 bg-accent"></div>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-primary leading-[1.15] px-2">
                {program.title}
              </h3>
            </div>

            <div className={`flex flex-col ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-20 items-center`}>
              
              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full lg:w-1/2 relative z-10"
              >
                <div className="relative w-full aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Specific Decorations per item - Adjusted for mobile safety */}
                {program.decorations === "yellow-bar-heart" && (
                  <div className="absolute -right-2 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 h-[70%] w-2 sm:w-3 md:w-4 bg-accent rounded-full z-20 flex flex-col items-center justify-end shadow-lg">
                     <div className="absolute -bottom-6 w-8 h-8 md:w-10 md:h-10 text-accent">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                     </div>
                  </div>
                )}
                
                {program.decorations === "yellow-bar-half-heart" && (
                   <div className="absolute -right-2 sm:-right-4 md:-right-8 top-[10%] h-[80%] w-2 sm:w-3 md:w-4 bg-accent rounded-full z-20 flex flex-col items-center justify-end shadow-lg">
                      <div className="absolute -bottom-4 -right-2 w-6 h-6 md:w-8 md:h-8 text-accent">
                         <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      </div>
                   </div>
                )}

              </motion.div>

              {/* Content Section */}
              <motion.div 
                initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="w-full lg:w-1/2 relative"
              >
                {/* Desktop Header (Hidden on Mobile) */}
                <div className="hidden lg:block relative">
                  {program.decorations.includes("blue-bar") && (
                    <div className="absolute -left-10 top-0 h-24 w-2 bg-primary rounded-full" />
                  )}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-500 font-bold tracking-widest uppercase text-sm">Aconiño</span>
                    <div className="h-[2px] w-16 bg-accent"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-8 leading-[1.15]">
                    {program.title}
                  </h3>
                </div>

                <div className="space-y-6 text-gray-600 sm:text-lg mb-10 leading-relaxed font-medium text-center lg:text-left">
                  {program.description.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex justify-center lg:justify-start">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-105 hover:shadow-primary/30"
                  >
                    Más información
                  </Link>
                </div>

              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
