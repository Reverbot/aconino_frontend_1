"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "@/compat/motion";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center justify-center relative z-50 group">
      {/* Subtle Glow backdrop */}
      <motion.div
        className="absolute inset-0 bg-accent/10 blur-xl rounded-full md:scale-150 scale-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Image 
          src="/images/logo_aconino.png" 
          alt="Aconiño" 
          width={180} 
          height={180}
          className="w-16 md:w-20 lg:w-24 h-auto drop-shadow-sm"
          priority
        />
      </motion.div>
    </Link>
  );
}
