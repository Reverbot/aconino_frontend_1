"use client";

import React from "react";
import { motion } from "@/compat/motion";
import { IconHeart, IconHands } from "@/constants/apoyanos-icons";

interface DonationPopupProps {
  onClose: () => void;
  onDonate: () => void;
  progress: number;
  donors: number;
}

export default function DonationPopup({ onClose, onDonate, progress, donors }: DonationPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95, originX: '100%', originY: '100%' }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] mb-4 w-[calc(100vw-3rem)] max-w-[350px] mx-auto overflow-hidden border border-gray-100"
    >
      {/* Header Widget */}
      <div className="bg-gradient-to-r from-primary via-secondary to-primary p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
              <IconHeart className="text-accent w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-base md:text-lg tracking-tight">Centro Día Aconiño</h3>
              <p className="text-white/70 text-xs uppercase tracking-widest font-bold">Proyecto de Vida</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-gray-50/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado Actual</span>
          <span className="text-sm font-black text-primary">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <span className="text-primary font-black text-lg leading-none">{donors}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">Donantes</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <span className="text-primary font-black text-lg leading-none">$500M</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase mt-1">Meta</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-4 bg-white">
        <button
          onClick={onDonate}
          className="w-full bg-gradient-to-r from-accent to-yellow-400 text-primary font-black py-4 px-6 rounded-2xl hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20 uppercase tracking-widest text-xs"
        >
          <IconHands className="w-5 h-5" />
          Donar Ahora
        </button>
      </div>
    </motion.div>
  );
}
