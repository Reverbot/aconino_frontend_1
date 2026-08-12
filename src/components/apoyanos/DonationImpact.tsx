"use client";

import { motion } from "@/compat/motion";
import { FaUsers, FaHome, FaHeart, FaAward } from "react-icons/fa";

const impacts = [
  { icon: FaUsers, value: '150+', label: 'Adultos beneficiados', description: 'Familias con acceso a neurorehabilitación' },
  { icon: FaHome, value: '1', label: 'Nuevo Centro Día', description: 'Espacio dedicado al cuidado integral' },
  { icon: FaHeart, value: '100%', label: 'Sin costo para pacientes', description: 'Gracias a donors como tú' },
  { icon: FaAward, value: '25', label: 'Años de experiencia', description: 'Trayectoria en neurorehabilitación' }
];

export default function DonationImpact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">El Impacto de Tu Donación</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Cada aporte suma para construir un lugar donde los adultos con discapacidad recibirán la atención que merecen.</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"><impact.icon className="text-3xl text-accent" /></div>
              <p className="text-4xl font-black text-primary mb-2">{impact.value}</p>
              <p className="font-bold text-gray-800 mb-2">{impact.label}</p>
              <p className="text-sm text-gray-500">{impact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
          <FaAward className="text-4xl text-accent mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium text-gray-700 mb-6 max-w-3xl mx-auto">&quot;Construir este Centro Día es más que levantar paredes. Es crear un hogar donde cada adulto encontrará dignidad, cuidado y la oportunidad de vivir plenamente.&quot;</blockquote>
          <cite className="text-gray-500">— Equipo Aconiño, 25 años de trayectoria</cite>
        </motion.div>
      </div>
    </section>
  );
}
