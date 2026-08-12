"use client";

import { motion } from "@/compat/motion";
import { FaEnvelope, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

interface MobileMenuFooterProps {
  onDonationClick: () => void;
}

export default function MobileMenuFooter({ onDonationClick }: MobileMenuFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100"
    >
      <div className="flex flex-col gap-3 mb-4">
        <a 
          href="mailto:asistentenorte@aconino.org" 
          className="flex items-center gap-3 active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-accent shrink-0">
            <FaEnvelope className="text-xs" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Escríbenos</span>
            <span className="text-xs font-bold text-primary truncate">asistentenorte@aconino.org</span>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-accent shrink-0">
            <FaMapMarkerAlt className="text-xs" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Ubícanos</span>
            <span className="text-[11px] font-medium text-gray-600 leading-tight">Calle 127 B No. 45-28 – Barrio Prado, Bogotá</span>
          </div>
        </div>
      </div>

      <button
        onClick={onDonationClick}
        className="w-full bg-accent text-primary py-3.5 rounded-xl font-black text-sm tracking-widest shadow-lg shadow-accent/20 active:scale-[0.98] transition-all uppercase flex items-center justify-center gap-2"
      >
        <FaHeart />
        APADRINA UN NIÑO
      </button>
    </motion.div>
  );
}
