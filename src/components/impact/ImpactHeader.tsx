import React from "react";
import ScrollReveal from "../animations/ScrollReveal";

export default function ImpactHeader() {
  return (
    <ScrollReveal
      animation="fade-up"
      className="text-center mb-16 md:mb-20"
    >
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center gap-4">
          <div className="h-[2px] bg-accent w-12 md:w-16"></div>
          <span className="text-sm font-bold text-gray-400 tracking-[0.2em] uppercase">Comunidad aconiño</span>
          <div className="h-[2px] bg-accent w-12 md:w-16"></div>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-[1.1] tracking-tight">
        ESTAMOS GENERANDO IMPACTO
      </h2>
      
      <p className="text-base md:text-lg text-slate-500 max-w-2xl font-medium leading-relaxed text-center mx-auto">
        Trabajamos cada día para transformar vidas, generando impacto en nuestra población con discapacidad y demostrando que la verdadera inclusión nace cuando vemos capacidades, no limitaciones.
      </p>
    </ScrollReveal>
  );
}

