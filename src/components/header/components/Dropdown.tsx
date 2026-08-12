"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "@/compat/motion";
import { useActiveLink } from "@/hooks/useActiveLink";
import { dropdownStaggerContainer, dropdownStaggerItem } from "@/components/animations/variants/staggerChildren";

interface SubLink {
  name?: string;
  href?: string;
}

interface DropdownProps {
  subLinks: SubLink[];
  isOpen: boolean;
}

export default function Dropdown({ subLinks, isOpen }: DropdownProps) {
  const { isActive } = useActiveLink();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] pt-4 z-50"
          style={{ perspective: "1000px" }}
        >
          {/* Shadow connector */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-b from-transparent to-black/5 blur-sm" />

          <motion.div
            className="bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 overflow-hidden relative"
            variants={dropdownStaggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Animated top border gradient */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl" />

            <div className="flex flex-col relative">
              {subLinks.map((sub, idx) => {
                const subActive = isActive(sub.href);
                return (
                  <motion.div
                    key={idx}
                    variants={dropdownStaggerItem}
                    className="relative"
                  >
                    <Link
                      href={sub.href || "#"}
                      className={`relative block px-6 py-3 text-sm transition-all duration-300 border-l-4 ${
                        subActive
                          ? 'border-accent bg-primary/5 text-primary font-black'
                          : 'border-transparent text-gray-600 font-semibold hover:bg-gray-50 hover:text-primary hover:border-accent hover:pl-7'
                      }`}
                    >
                      {/* Hover background sweep */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{sub.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
