"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "¿Es segura mi donación en línea?",
    answer: "Sí, absolutamente. Utilizamos pasarelas de pago reconocidas y seguras que encriptan todos tus datos financieros. Nosotros no guardamos información de tus tarjetas."
  },
  {
    question: "¿A dónde va el dinero de mi donación?",
    answer: "El 100% de las donaciones se destina directamente a subsidiar las terapias de neurorehabilitación, transporte y alimentación de niños de escasos recursos."
  },
  {
    question: "¿Puedo donar en especie (ropa, juguetes, etc)?",
    answer: "¡Claro que sí! Aceptamos donaciones en especie en buen estado. Por favor contáctanos para coordinar la entrega o recogida de los elementos."
  },
  {
    question: "¿Dan certificado de donación?",
    answer: "Sí. Aconiño es una entidad sin ánimo de lucro autorizada. Emitimos certificados de donación tanto para personas naturales como jurídicas para beneficios tributarios."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FaQuestionCircle className="text-5xl text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-black text-primary mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-500 text-lg">Resolvemos tus dudas sobre cómo apoyar nuestra causa.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-lg text-primary focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <FaChevronDown 
                  className={`text-accent transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
