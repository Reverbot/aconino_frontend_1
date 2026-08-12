"use client";

import { useDonation } from "@/providers/DonationProvider";
import { IconBuilding, IconConstruction, LocationIcon, GlobeIcon, HeartIcon } from "@/constants/apoyanos-icons";
import { motion } from "@/compat/motion";
import HeroSlider, { HeroSliderSlide } from "../shared/HeroSlider";

const slides: HeroSliderSlide[] = [
  {
    src: "/images/apoyanos-hero.jpg",
    alt: "Construcción del nuevo Centro Día Aconiño",
    overlayOpacity: 60,
  },
  {
    src: "/images/apoyanos-detail.jpg",
    alt: "Edificio moderno de centro de rehabilitación",
    overlayOpacity: 55,
  },
  {
    src: "/images/apoyanos-support.jpg",
    alt: "Instalaciones de neurorehabilitación",
    overlayOpacity: 50,
  },
];

export default function CentroDiaHero() {
  const { openDonationWidget } = useDonation();

  return (
    <HeroSlider
      slides={slides}
      height="h-[320px] sm:h-[450px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
      showCurtain={true}
      curtainColor="bg-secondary"
      showParticles={true}
      particlesSubtle={true}
    >
      <div className="flex flex-col items-center">
        {/* Tag */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="hidden sm:inline-flex items-center gap-2 bg-primary/50 backdrop-blur-xl border border-accent/50 rounded-full px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6 md:mb-8"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <IconConstruction className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-accent font-bold text-xs sm:text-sm uppercase tracking-wider">
            Nueva Construcción
          </span>
        </motion.div>

        {/* Floating Icon and Title */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 15 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            className="hidden lg:block absolute -top-8 md:-top-10 lg:-top-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-primary/60 backdrop-blur-xl border border-accent/40 flex items-center justify-center">
              <IconBuilding className="text-accent w-8 h-8 lg:w-10 lg:h-10" />
            </div>
          </motion.div>

          <div className="pt-0 sm:pt-6 md:pt-8 lg:pt-14 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-black text-white tracking-tight"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
            >
              Construyendo{" "}
              <span className="bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
                Esperanza
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 sm:h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-3 sm:mt-4 rounded-full"
            />
          </div>
        </div>

        {/* Subtitle and Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mt-4 sm:mt-4 md:mt-6 font-semibold text-center"
        >
          El nuevo Centro Día para Adultos
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden sm:block text-xs sm:text-sm md:text-base text-white/70 mt-3 max-w-3xl mx-auto text-center"
        >
          Un espacio dedicado a la neurorehabilitación y cuidado integral de adultos. 
          ¡Ayúdanos a hacer realidad este sueño!
        </motion.p>

        {/* Info Boxes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden sm:flex flex-row flex-wrap justify-center gap-2 md:gap-4 mt-4 sm:mt-6 md:mt-8"
        >
          <div className="flex items-center justify-center gap-2 bg-primary/50 backdrop-blur-xl rounded-full px-4 sm:px-5 py-2 border border-white/10">
            <LocationIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="text-white font-medium text-xs sm:text-sm">Bogotá, Colombia</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary/50 backdrop-blur-xl rounded-full px-4 sm:px-5 py-2 border border-white/10">
            <GlobeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            <span className="text-white font-medium text-xs sm:text-sm">Donaciones Internacionales</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={() => openDonationWidget()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 sm:mt-8 md:mt-10 group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-accent to-yellow-400 text-primary px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-full font-black text-sm sm:text-base md:text-lg lg:text-xl tracking-wide shadow-[0_8px_40px_rgba(248,183,25,0.4)] hover:shadow-[0_8px_50px_rgba(248,183,25,0.6)] hover:scale-105 transition-all duration-300 uppercase overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 via-white/30 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
          <span className="relative z-10">Donar Ahora</span>
        </motion.button>
      </div>
    </HeroSlider>
  );
}
