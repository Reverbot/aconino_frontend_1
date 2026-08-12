"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "@/compat/motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/573133910760";

interface CTAButtonProps {
  label?: string;
  href?: string;
  isDonation?: boolean;
}

export default function CTAButton({ href, isDonation = true }: CTAButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="relative w-[40px] sm:w-[50px] h-[36px] sm:h-[44px]" />;
  }

  const buttonContent = (
    <motion.span
      className="flex relative items-center bg-accent text-primary px-3 sm:px-4 py-2.5 sm:py-3 rounded-full font-black shadow-lg hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 active:scale-95 group overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="bg-primary/10 p-1 sm:p-1.5 rounded-full flex-shrink-0"
      >
        <FaWhatsapp className="text-[14px] sm:text-base text-primary group-hover:text-[#25D366] transition-colors" />
      </motion.div>
    </motion.span>
  );

  // Modo donación → ahora redirige a WhatsApp (en vez de abrir el modal)
  if (isDonation) {
    return (
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
      >
        {buttonContent}
      </a>
    );
  }

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
