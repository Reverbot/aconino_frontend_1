"use client";

import Link from "next/link";
import { motion } from "@/compat/motion";

interface MobileNavLinkProps {
  name: string;
  href: string;
  active: boolean;
  onClick: () => void;
  index: number;
}

export default function MobileNavLink({ name, href, active, onClick, index }: MobileNavLinkProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center justify-center py-3 px-3 rounded-xl transition-all border text-sm font-bold ${
          active 
          ? 'bg-accent border-accent text-primary shadow-md' 
          : 'bg-gray-50 border-gray-200/60 text-primary hover:bg-gray-100'
        }`}
      >
        {name}
      </Link>
    </motion.div>
  );
}
