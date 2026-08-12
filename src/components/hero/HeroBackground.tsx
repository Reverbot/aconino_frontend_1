"use client";

import Image from "next/image";
import { motion } from "@/compat/motion";

interface HeroBackgroundProps {
  backgroundType: 'video' | 'image';
  videoUrl?: string;
  imageUrl?: string;
  posterPlaceholder?: string;
  defaultImage?: string;
}

export default function HeroBackground({ 
  backgroundType, 
  videoUrl, 
  imageUrl, 
  posterPlaceholder, 
  defaultImage 
}: HeroBackgroundProps) {
  if (backgroundType === "video" && videoUrl) {
    return (
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        poster={posterPlaceholder}
      >
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
    );
  }

  const finalImageUrl = imageUrl || defaultImage;

  if (!finalImageUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 w-full h-full z-0"
    >
      <Image
        src={finalImageUrl}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />
    </motion.div>
  );
}
