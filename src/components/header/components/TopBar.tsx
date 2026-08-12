"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaRegCopy, FaCheck } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { m, AnimatePresence } from "@/compat/motion";

interface TopBarProps {
  isScrolled: boolean;
}

const EMAIL = "asistentenorte@aconino.org";

export default function TopBar({ isScrolled }: TopBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard no disponible; ignorar
    }
  };

  return (
    <AnimatePresence>
      {!isScrolled && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:block bg-[#1b2b65] text-white text-[11px] sm:text-xs md:text-sm overflow-hidden"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Contenedor de Información */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center md:text-left">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l3.707 3.707A1 1 0 0018 17.414V4a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                <span className="font-medium tracking-wide">Calle 127 B No. 45-28 – Barrio Prado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${EMAIL}`} className="font-medium hover:text-accent transition-colors">
                  {EMAIL}
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copiar correo"
                  title={copied ? "¡Copiado!" : "Copiar correo"}
                  className="ml-1 inline-flex items-center gap-1 text-white/70 hover:text-accent transition-colors"
                >
                  {copied ? <FaCheck className="w-3 h-3 text-accent" /> : <FaRegCopy className="w-3 h-3" />}
                  {copied && <span className="text-[10px] font-bold text-accent">¡Copiado!</span>}
                </button>
              </div>
            </div>

            {/* Redes Sociales (Ocultas en móvil para priorizar información de contacto, visibles en PC) */}
            <div className="hidden md:flex items-center gap-4 border-l border-white/20 pl-4 h-full">
              <a href="https://web.facebook.com/AsociacionAconino/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-accent transition-colors"><FaFacebookF /></a>
              <a href="https://www.instagram.com/aconinoacn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent transition-colors"><FaInstagram /></a>
              <a href="https://www.youtube.com/@asociacionaconino1526" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-accent transition-colors"><FaYoutube /></a>
              <a href="https://twitter.com/aconino" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-accent transition-colors"><FaXTwitter /></a>
              <a href="https://co.linkedin.com/company/aconinoacn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><FaLinkedinIn /></a>
            </div>

          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
