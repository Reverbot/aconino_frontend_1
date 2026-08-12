"use client";

import React from "react";
import { motion } from "@/compat/motion";
import { FaHeart } from "react-icons/fa";
import { useDonation } from "../../providers/DonationProvider";

export default function FinalCTA() {
  const { openDonationWidget } = useDonation();

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-white/10" />
      <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-accent/20 rounded-full blur-[60px] md:blur-[80px] lg:blur-3xl -mr-16 -mt-16 md:-mr-20 md:-mt-20" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            ¿Listo para hacer la <span className="text-accent">diferencia</span>?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a nuestra familia de donantes. Cada aporte, sin importar el tamaño, nos ayuda a construir un mejor futuro.
          </p>
          <button
            onClick={() => openDonationWidget()}
            className="inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-black text-xl tracking-widest shadow-2xl hover:scale-105 hover:bg-yellow-400 transition-all duration-300 uppercase"
          >
            <FaHeart />
            Donar Ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
