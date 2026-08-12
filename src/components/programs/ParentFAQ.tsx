"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "@/compat/motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

// Fake image for the visual section
const therapyImage = "/images/programas-intervention.jpg";

const faqs = [
  {
    question: "¿Cuándo debería iniciar terapia mi hijo?",
    answer: "Lo ideal es iniciar tan pronto como se note algún retraso en el desarrollo o tras recibir un diagnóstico. La intervención temprana aprovecha la neuroplasticidad del cerebro para obtener mejores resultados."
  },
  {
    question: "¿Cuántas sesiones necesita?",
    answer: "El número de sesiones depende de la valoración inicial y de los objetivos planteados. Diseñamos un plan personalizado que se ajusta a las necesidades específicas de cada niño y su familia."
  },
  {
    question: "¿Cómo puedo apoyar el proceso en casa?",
    answer: "La participación de la familia es fundamental. Nuestros especialistas te brindarán pautas, ejercicios y estrategias adaptadas para integrar el proceso terapéutico en las rutinas diarias del hogar."
  },
  {
    question: "¿Mi hijo puede mejorar aunque tenga un diagnóstico?",
    answer: "¡Por supuesto! El objetivo de la habilitación y rehabilitación es potenciar al máximo las habilidades, fomentando la independencia y mejorando la calidad de vida funcional, independientemente del diagnóstico."
  }
];

export function ParentFAQ({ imageUrl, imageAlt }: { imageUrl?: string; imageAlt?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden text-slate-800">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
             <div className="h-[2px] w-6 md:w-12 bg-accent"></div>
             <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-sm">Para Familias</span>
             <div className="h-[2px] w-6 md:w-12 bg-accent"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight mb-6 px-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto px-6">
            Resolvemos las dudas más comunes de los padres sobre el inicio y desarrollo del proceso terapéutico.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Visual Section - Single Image Layout */}
          <div className="w-full lg:w-1/2 shrink-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-xl group"
            >
              <Image
                src={imageUrl || therapyImage}
                alt={imageAlt || "Niños en diferentes tratamientos"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.5 }}
               viewport={{ once: true }}
               className="mt-8 flex items-start gap-4 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100"
            >
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                Nuestros profesionales acompañan a los niños en diferentes etapas, garantizando un entorno seguro, motivador y <strong className="text-primary font-bold">centrado en su bienestar.</strong>
              </p>
            </motion.div>
          </div>

          {/* FAQ Accordion Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6"
          >
             {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                   <motion.div 
                     key={index}
                     className={`group border rounded-[2rem] md:rounded-[3rem] overflow-hidden ${isOpen ? 'bg-blue-50/40 border-primary/20 shadow-xl' : 'bg-white border-gray-100 hover:border-primary/20 hover:shadow-md'}`}
                     layout
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                   >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left p-6 md:p-8 flex items-center justify-between focus:outline-none"
                    >
                      <span className={`text-lg md:text-xl font-bold transition-colors duration-500 leading-snug pr-4 ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                        {faq.question}
                      </span>
                      
                       <motion.div
                         className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary mt-1'}`}
                         animate={{ rotate: isOpen ? 180 : 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 25 }}
                       >
                         <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                       </motion.div>
                    </button>
                    
                     <AnimatePresence initial={false}>
                       {isOpen && (
                         <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: "auto" }}
                           exit={{ opacity: 0, height: 0 }}
                           transition={{
                             height: { type: "spring", stiffness: 400, damping: 30 },
                             opacity: { duration: 0.25, ease: "easeOut" }
                           }}
                           style={{ willChange: "height, opacity" }}
                         >
                           <motion.div
                             className="px-6 md:px-8 pb-8 pt-0"
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: 5 }}
                             transition={{
                               y: { type: "spring", stiffness: 500, damping: 30, delay: 0.05 },
                               opacity: { duration: 0.2, delay: 0.05 }
                             }}
                           >
                             <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium pb-2">
                               {faq.answer}
                             </p>
                           </motion.div>
                         </motion.div>
                       )}
                      </AnimatePresence>
                   </motion.div>
                );
             })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
