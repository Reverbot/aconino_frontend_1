"use client";

import { motion } from "@/compat/motion";
import Image from "next/image";
import Link from "next/link";
import {
    RiHeartPulseLine,
    RiWalkLine,
    RiBookOpenLine,
    RiBrainLine,
    RiStethoscopeLine,
    RiArrowRightLine
} from "react-icons/ri";

interface ProgramCardProps {
  title: string;
  desc: string;
  slug: string;
  link: string;
  imageUrl: string;
  category: string;
  index: number;
}

const getIconForProgram = (slug?: string, defaultIdx: number = 0) => {
    const s = slug?.toLowerCase() || '';
    if (s.includes('temprana') || s.includes('estimulacion')) return RiHeartPulseLine;
    if (s.includes('pediasuit') || s.includes('fisica')) return RiWalkLine;
    if (s.includes('aprendizaje') || s.includes('lenguaje')) return RiBookOpenLine;
    if (s.includes('neurodesarrollo') || s.includes('neurologia')) return RiBrainLine;

    const fallbackIcons = [RiStethoscopeLine, RiHeartPulseLine, RiBrainLine, RiWalkLine];
    return fallbackIcons[defaultIdx % fallbackIcons.length];
};

export default function ProgramCard({
  title,
  desc,
  slug,
  link,
  imageUrl,
  category,
  index
}: ProgramCardProps) {
  const IconComponent = getIconForProgram(slug, index);

  return (
    <motion.div
        initial="initial"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            initial: { opacity: 0, y: 40 },
            hover: { y: -8 }
        }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
        className="group relative flex flex-col h-full bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-slate-300/60 transition-all duration-500"
    >
        {/* Top Image Section */}
        <div className="relative h-40 md:h-64 xl:h-72 overflow-hidden bg-slate-100">
            <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 md:group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

            {/* Title in Badge */}
            <div className="absolute top-3 left-3 right-10 md:top-4 md:left-4 md:right-12 z-10">
                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-lg inline-block border border-white/20">
                    <h3 className="text-[9px] md:text-sm font-bold text-primary tracking-tight uppercase leading-none">
                        {title}
                    </h3>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 md:p-8 relative flex flex-col bg-white">
            {/* Floating Icon */}
            <div className="absolute -top-8 right-4 md:-top-12 md:right-10 w-10 h-10 md:w-16 md:h-16 bg-accent rounded-xl md:rounded-2xl shadow-[0_10px_25px_rgba(255,182,18,0.3)] flex items-center justify-center transform transition-all duration-500 z-20 md:group-hover:rotate-6">
                <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-white" />
            </div>

            <span className="text-sm md:text-lg font-extrabold text-slate-400 uppercase tracking-widest mb-4 md:mb-6">
                {category}
            </span>

            {/* Description (recortada para alinear las cards) */}
            <p className="text-slate-600 text-[10px] md:text-[13px] leading-relaxed line-clamp-3 md:line-clamp-4">
                {desc}
            </p>

            {/* Leer más → lleva al programa */}
            <Link
                href={link}
                className="mt-auto pt-4 inline-flex items-center gap-1.5 text-accent font-bold text-[10px] md:text-sm uppercase tracking-wider hover:gap-2.5 transition-all duration-300"
            >
                Leer más
                <RiArrowRightLine className="w-4 h-4" />
            </Link>
        </div>
    </motion.div>
  );
}
