"use client";

import { useState, useEffect } from "react";
import { motion } from "@/compat/motion";
import { IconBuilding, IconConstruction } from "@/constants/apoyanos-icons";
import ImpactCta from "@/components/impact/ImpactCta";
import YoutubeCarousel from "@/components/YoutubeCarousel";
import DonationAccount from "@/components/apoyanos/DonationAccount";
import { FaWhatsapp } from "react-icons/fa";

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  total: number;
}

interface ComingSoonOverlayProps {
  targetYear?: number;
  targetMonth?: number; // 0 = enero, 7 = agosto
  message?: string;
  show?: boolean;
}

const getTimeLeft = (targetYear: number, targetMonth: number): TimeLeft => {
  const targetDate = new Date(targetYear, targetMonth, 1);
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { years: 0, months: 0, days: 0, hours: 0, total: 0 };
  }

  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(
    (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const days = Math.floor(
    (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return { years, months, days, hours, total: difference };
};

export default function ComingSoonOverlay({
  targetYear = 2027,
  targetMonth = 0,
  message = "Centro Día para Adultos",
  show = true
}: ComingSoonOverlayProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetYear, targetMonth)
  );

  useEffect(() => {
    if (show) {
      document.body.classList.add("coming-soon-overlay-active");
    }

    return () => {
      document.body.classList.remove("coming-soon-overlay-active");
    };
  }, [show]);
  
  useEffect(() => {
    const updateTimeLeft = () => setTimeLeft(getTimeLeft(targetYear, targetMonth));

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetYear, targetMonth]);

  if (!show) return null;

  const timeUnits = [
    { value: timeLeft.years, label: timeLeft.years === 1 ? "Año" : "Años", labelShort: "A" },
    { value: timeLeft.months, label: "Meses", labelShort: "M" },
    { value: timeLeft.days, label: "Días", labelShort: "D" },
    { value: timeLeft.hours, label: "Horas", labelShort: "H" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-x-hidden"
      style={{
        isolation: 'isolate',
        background: 'linear-gradient(to bottom, #1a2744, #1e3a5f, #1a2744)',
      }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -right-[10%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-accent/20 blur-[80px] sm:blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-[10%] -left-[10%] w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] rounded-full bg-accent/20 blur-[60px] sm:blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col">
        <div className="flex flex-col items-center justify-center text-center w-full py-16 min-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-xl border-2 border-accent/30 mb-6 sm:mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconBuilding className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-accent" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 sm:gap-3 bg-accent/20 backdrop-blur-xl border border-accent/40 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <IconConstruction className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </motion.div>
          <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider">
            En Construcción
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
        >
          Próximamente
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold mb-6 sm:mb-8"
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl -z-10"
                />
              </div>
              <span className="text-xs sm:text-sm text-white/70 mt-2 font-medium uppercase tracking-wider">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm sm:text-base font-medium">
                Bogotá, Colombia
              </span>
            </div>
            <div className="hidden sm:block w-1 h-4 bg-white/20 rounded-full" />
            <div className="text-sm sm:text-base text-white/80 mt-2 sm:mt-0">
              Abre en <span className="text-accent font-bold">{targetYear}</span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-6 sm:mt-8 text-sm sm:text-base text-white/60 max-w-xl mx-auto"
        >
          Un espacio dedicado a la neurorehabilitación y cuidado integral de adultos.
        </motion.p>

        {/* Botón CONTÁCTANOS (mismo del inicio) */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a
            href="https://wa.me/573133910760"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent text-primary font-black tracking-widest text-sm md:text-base px-12 py-5 rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-accent/20 transform hover:-translate-y-1 hover:scale-105"
          >
            <FaWhatsapp className="text-xl md:text-2xl" />
            CONTÁCTANOS
          </a>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-12 sm:mt-16 text-white/40 pt-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent mx-auto relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
        </motion.div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="w-full pb-20 px-4 sm:px-0"
        >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center mb-12 sm:mb-16">
                  <div className="w-16 h-1 bg-accent/60 rounded-full mb-8" />
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight leading-tight">
                    Un sueño que comienza a tomar forma:<br className="hidden sm:block"/>
                    <span className="text-accent mt-2 sm:mt-4 inline-block">&ldquo;Centro Día&rdquo;</span>
                  </h3>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 text-white/85 text-base md:text-lg leading-relaxed font-light">
                  <div className="space-y-6">
                    <p>
                      En <strong className="text-white font-medium">Aconiño</strong> creemos profundamente en la dignidad, la autonomía y el derecho a una vida plena de las personas adultas con discapacidad. Hoy, ese compromiso se transforma en un avance concreto que nos llena de emoción.
                    </p>
                    <p>
                      Hemos adquirido un lote ubicado en la calle 127 B, debajo de la autopista, donde construiremos nuestro <strong className="text-white font-medium">Centro Día</strong>: un espacio pensado para acompañar, potenciar habilidades y generar oportunidades reales de participación social.
                    </p>
                    <p>
                      Este proyecto ya cuenta con diseños arquitectónicos y estructurales que contemplan un edificio de tres pisos, con espacios especializados para actividades físicas, desarrollo funcional y una piscina destinada a procesos de hidroterapia.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p>
                      Actualmente, nos encontramos a la espera de la licencia de construcción para iniciar esta nueva etapa.
                    </p>
                    <p>
                      Un <strong className="text-white font-medium">Centro Día</strong> no es solo un lugar: es un entorno de atención integral que promueve la autonomía, el desarrollo personal y la inclusión social a través de actividades ocupacionales y acompañamiento especializado.
                    </p>
                    <p>
                      Este proyecto representa mucho más que infraestructura. Es la construcción de oportunidades, de bienestar y de futuro para muchas personas y sus familias.
                    </p>
                    <div className="p-8 mt-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 relative overflow-hidden group hover:bg-accent/15 transition-all duration-500">
                      <div className="absolute -left-2 top-0 text-accent/20 text-7xl font-serif">&quot;</div>
                      <p className="text-accent font-medium italic text-center text-sm sm:text-base md:text-lg relative z-10 leading-relaxed px-4">
                        Seguimos avanzando con ilusión, compromiso y la certeza de que estamos construyendo algo que realmente transforma vidas.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </motion.div>

        {/* Carrusel de videos de YouTube */}
        <YoutubeCarousel />

        {/* Cuenta bancaria para donaciones (número pendiente) */}
        <DonationAccount />

        {/* Botón de donar por WhatsApp (igual al del inicio) */}
        <div className="w-full pb-20">
            <ImpactCta />
        </div>
      </div>
    </motion.div>
  );
}
