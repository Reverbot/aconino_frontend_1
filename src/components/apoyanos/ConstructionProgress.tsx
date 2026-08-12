"use client";

import { motion } from "@/compat/motion";
import { useScrollReveal } from "../animations";
import { IconProgress, IconUsers, IconBuilding } from "@/constants/apoyanos-icons";

interface ConstructionProgressProps {
  goal: number;
  raised: number;
  donors: number;
}

export default function ConstructionProgress({ goal, raised, donors }: ConstructionProgressProps) {
  const percentage = Math.min((raised / goal) * 100, 100);
  const scrollReveal = useScrollReveal();
  const formatNumber = (value: number, decimals = 0) => new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <section className="py-24 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          {...scrollReveal}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Progreso de la Construcción
            </h2>
            <p className="text-white/70 text-lg">Juntos estamos construyendo un futuro mejor</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6">
              <div>
                <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Total Recaudado</p>
                <p className="text-4xl md:text-5xl lg:text-6xl font-black text-accent">
                  ${formatNumber(raised)}
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Meta</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  ${formatNumber(goal)}
                </p>
              </div>
            </div>

            <div className="h-10 bg-black/30 rounded-full overflow-hidden relative shadow-inner">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${percentage}%` }} 
                transition={{ duration: 1.5, ease: "easeOut" }} 
                className="h-full bg-gradient-to-r from-accent via-yellow-300 to-accent rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.div>
              <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white/20" />
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20" />
              <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white/20" />
            </div>

            <div className="flex justify-between mt-4 text-sm">
              <span className="text-white/70">{percentage.toFixed(1)}% completado</span>
              <span className="text-white/70">
                Faltan ${formatNumber(goal - raised)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
            >
              <IconProgress className="text-accent w-8 h-8 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-white">
                {formatNumber(percentage, 1)}%
              </p>
              <p className="text-white/70 text-sm mt-1">del objetivo</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.1 }} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
            >
              <IconUsers className="text-accent w-8 h-8 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-white">
                {formatNumber(donors)}
              </p>
              <p className="text-white/70 text-sm mt-1">donantes</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }} 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 col-span-2 md:col-span-1"
            >
              <IconBuilding className="text-accent w-8 h-8 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-black text-white">5</p>
              <p className="text-white/70 text-sm mt-1">zonas en progreso</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
