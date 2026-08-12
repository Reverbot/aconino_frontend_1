"use client";

import { motion, Variants } from "@/compat/motion";
import { FaPhone, FaEnvelope, FaHeart, FaCalendarAlt, FaUserMd } from "react-icons/fa";

interface ProgramCTAProps {
  programTitle: string;
}

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function ProgramCTA({ programTitle }: ProgramCTAProps) {
  return (
    <motion.div
      variants={slideFromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Animated Rotating Border Gradient */}
      <motion.div 
        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(248,183,25,1)_360deg)] opacity-50 z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[2px] bg-white rounded-2xl z-0" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none z-10" />

      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-primary to-secondary z-20" />

      <div className="relative bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100/50 z-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl relative"
            animate={{
              boxShadow: ["0 0 0 0px rgba(248,183,25,0.4)", "0 0 0 10px rgba(248,183,25,0)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-white text-xl drop-shadow-md" />
            </motion.div>
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-primary">¿Necesitas ayuda?</h3>
            <p className="text-sm text-gray-500">Estamos aquí para ti</p>
          </div>
        </div>

        {/* Program context */}
        <motion.div
          className="mb-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-sm mb-2">Estás viendo:</p>
          <p className="font-semibold text-primary">{programTitle}</p>
        </motion.div>

        {/* Contact options */}
        <div className="space-y-3 mb-6">
          <motion.a
            href="tel:+573001234567"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-primary/5 transition-colors group relative overflow-hidden"
            whileHover={{ x: 5 }}
          >
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <FaPhone className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Llámanos</p>
              <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                +57 300 123 4567
              </p>
            </div>
          </motion.a>

          <motion.a
            href="mailto:asistentenorte@aconino.org"
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80 hover:bg-primary/5 transition-colors group relative overflow-hidden"
            whileHover={{ x: 5 }}
          >
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <FaEnvelope className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Escríbenos</p>
              <p className="font-semibold text-gray-700 group-hover:text-primary transition-colors text-sm">
                asistentenorte@aconino.org
              </p>
            </div>
          </motion.a>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <motion.a
            href="/contacto"
            className="relative overflow-hidden flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
               initial={{ x: '-100%' }}
               whileHover={{ x: '200%' }}
               transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
            />
            <FaCalendarAlt className="relative z-10" />
            <span className="relative z-10">Agendar Cita</span>
          </motion.a>

          <motion.a
            href="/pago-en-linea"
            className="relative overflow-hidden flex items-center justify-center gap-2 w-full bg-accent text-primary py-3 px-6 rounded-xl font-bold hover:bg-accent/90 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
               initial={{ x: '-100%' }}
               whileHover={{ x: '200%' }}
               transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
            />
            <FaHeart className="relative z-10" />
            <span className="relative z-10">Donar Ahora</span>
          </motion.a>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
            <FaUserMd className="text-accent" />
            <span>+500 familias atendidas</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
