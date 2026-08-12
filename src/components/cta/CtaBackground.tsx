"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";

interface CtaBackgroundProps {
  backgroundImage: string;
}

export default function CtaBackground({ backgroundImage }: CtaBackgroundProps) {
  return (
    <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
    >
        <Image
            src={backgroundImage}
            alt="Niños felices"
            fill
            className="object-cover"
            priority
        />
    </motion.div>
  );
}
