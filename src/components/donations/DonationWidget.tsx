"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { FaTimes, FaHeart, FaBuilding } from "react-icons/fa";
import Link from "next/link";

interface DonationWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMOUNTS = [
  { value: 10000, label: "$10.000", desc: "1 sesión de transporte" },
  { value: 20000, label: "$20.000", desc: "2 sesiones" },
  { value: 50000, label: "$50.000", desc: "5 sesiones" },
];

export default function DonationWidget({ isOpen, onClose }: DonationWidgetProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDonate = () => {
    // Redirigir a pasarela externa (placeholder).
    alert("Redirigiendo a pasarela de pago...");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary p-6 text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </button>
              <FaHeart className="text-accent text-4xl mx-auto mb-3" />
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Ayuda a un niño</h2>
              <p className="text-white/80 mt-1 font-medium">Tu donación transforma vidas</p>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt.value}
                    onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedAmount === amt.value 
                        ? "border-accent bg-accent/10" 
                        : "border-gray-100 hover:border-accent/40 bg-gray-50"
                    }`}
                  >
                    <span className="text-xl font-bold text-primary">{amt.label}</span>
                    <span className="text-sm text-gray-500 font-medium">{amt.desc}</span>
                  </button>
                ))}
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    placeholder="Otro monto"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className={`w-full p-4 pl-8 rounded-xl border-2 outline-none transition-all duration-300 ${
                      customAmount ? "border-accent bg-accent/10" : "border-gray-100 bg-gray-50 focus:border-accent/40"
                    } text-primary font-bold text-lg`}
                  />
                </div>
              </div>

              <button
                onClick={handleDonate}
                disabled={!selectedAmount && !customAmount}
                className="w-full bg-accent text-primary font-black text-lg py-4 rounded-xl shadow-lg hover:bg-yellow-400 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-2"
              >
                <FaHeart />
                Donar Ahora
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col items-center justify-center gap-2">
              <Link 
                href="/apoyanos#empresarial" 
                onClick={onClose}
                className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-2"
              >
                <FaBuilding />
                ¿Empresa? Donación empresarial →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
