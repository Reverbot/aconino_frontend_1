"use client";

import { motion } from "@/compat/motion";
import HeroBase from "../shared/HeroBase";

interface HeroData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface Props {
    data?: HeroData | null;
}

export default function NosotrosHero({ data }: Props) {
    const subtitle = data?.subtitle || "Asociación Aconiño";
    const title = data?.title || "Quiénes Somos";
    const imageUrl = data?.imageUrl || "/images/quienes-hero.jpg";

    return (
        <HeroBase
            title={title}
            subtitle={subtitle}
            description="Conoce nuestra historia, misión y la pasión que nos mueve a transformar vidas cada día."
            backgroundImage={imageUrl}
            height="h-[60vh] md:h-[70vh]"
            overlayOpacity={0} // Custom overlay handled via customOverlay prop
            customOverlay={
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80 mix-blend-multiply z-10" />
            }
            containerClassName="max-w-5xl mx-auto px-6 md:px-8 mt-20 md:mt-16"
            accentLineWidth="w-8 md:w-24"
        >
            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 z-20 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-white/50 relative overflow-hidden">
                    <motion.div 
                        animate={{ y: [0, 48] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-full h-1/2 bg-white absolute top-0"
                    />
                </div>
            </motion.div>
        </HeroBase>
    );
}
