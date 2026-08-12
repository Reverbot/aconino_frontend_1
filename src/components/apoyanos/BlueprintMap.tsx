"use client";

import { motion } from "@/compat/motion";
import { FaHandHoldingMedical, FaBed, FaUtensils, FaTv, FaBriefcase, FaChevronRight } from "react-icons/fa";
import { CenterZone } from "@/types/centro-dia";

interface BlueprintMapProps {
  zones: CenterZone[];
  onZoneClick: (zone: CenterZone) => void;
}

const iconMap: Record<string, React.ElementType> = {
  'FaHandHoldingMedical': FaHandHoldingMedical,
  'FaBed': FaBed,
  'FaUtensils': FaUtensils,
  'FaTv': FaTv,
  'FaBriefcase': FaBriefcase,
};

export default function BlueprintMap({ zones, onZoneClick }: BlueprintMapProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explora el Centro Día</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Haz clic en cada zona para ver las necesidades específicas</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200 p-8 md:p-12 border-2 border-primary/10">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0c2070 1px, transparent 1px), linear-gradient(90deg, #0c2070 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-10">
            <div className="border-4 border-primary/30 rounded-2xl p-6 md:p-8 bg-primary/5">
              <h3 className="text-center text-primary font-bold text-lg mb-6 uppercase tracking-widest">Plano del Centro Día - Adultos</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {zones.map((zone, index) => {
                  const IconComponent = iconMap[zone.icon] || FaBriefcase;
                  const percentage = (zone.totalRaised / zone.totalNeeded) * 100;
                  
                  return (
                    <motion.button key={zone.id} onClick={() => onZoneClick(zone)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }} className="group bg-white border-2 border-gray-200 rounded-xl p-4 text-left hover:border-accent hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <IconComponent className="text-primary group-hover:text-accent" />
                        </div>
                        <h4 className="font-bold text-primary text-sm">{zone.name}</h4>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{percentage.toFixed(0)}%</span>
                        <span className="flex items-center gap-1 group-hover:text-accent">Ver más <FaChevronRight className="text-xs" /></span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
