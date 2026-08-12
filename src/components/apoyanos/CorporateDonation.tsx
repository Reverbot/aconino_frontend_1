"use client";

import React from "react";
import { motion } from "@/compat/motion";
import { FaBuilding, FaHandshake, FaFileInvoiceDollar } from "react-icons/fa";

export default function CorporateDonation() {
  return (
    <section id="empresarial" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center rotate-3">
              <FaBuilding className="text-4xl text-accent -rotate-3" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-primary mb-6"
          >
            Alianzas <span className="text-accent">Empresariales</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Únete a nuestra red de empresas solidarias. Tu Responsabilidad Social Empresarial (RSE) puede cambiar el futuro de muchos niños.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
              <FaFileInvoiceDollar className="text-2xl text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Beneficios Tributarios</h3>
            <p className="text-gray-600">
              Emitimos certificado de donación válido para descuentos tributarios en la declaración de renta, según la normatividad vigente.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
              <FaHandshake className="text-2xl text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Impacto Medible</h3>
            <p className="text-gray-600">
              Te entregamos informes detallados sobre cómo tu inversión social está transformando vidas, ideal para tus reportes de sostenibilidad.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
              <FaBuilding className="text-2xl text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Voluntariado</h3>
            <p className="text-gray-600">
              Organizamos jornadas de voluntariado corporativo para que tus colaboradores vivan la experiencia de ayudar de primera mano.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/contacto"
            className="inline-flex items-center justify-center bg-primary text-white px-10 py-5 rounded-full font-black text-xl hover:bg-secondary transition-all duration-300 shadow-xl shadow-primary/30"
          >
            Contactar a un asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
}
