"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "@/compat/motion";
import { FaChevronDown } from "react-icons/fa";

interface MobileDropdownProps {
  name: string;
  isExpanded: boolean;
  parentActive: boolean;
  onToggle: () => void;
  subLinks?: { name?: string; href?: string }[];
  activeLinkChecker: (href: string | undefined) => boolean;
  onLinkClick: () => void;
  index: number;
}

export default function MobileDropdown({ 
  name, 
  isExpanded, 
  parentActive, 
  onToggle, 
  subLinks, 
  activeLinkChecker, 
  onLinkClick, 
  index 
}: MobileDropdownProps) {
  return (
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15 + index * 0.04 }}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all border ${
          isExpanded 
          ? 'bg-white border-accent shadow-sm' 
          : 'bg-gray-50 border-gray-200/60 hover:border-accent/30'
        }`}
        onClick={onToggle}
      >
        <span className={`text-[15px] font-bold transition-colors ${parentActive || isExpanded ? 'text-accent' : 'text-primary'}`}>
          {name}
        </span>
        <div className={`p-1 rounded-md transition-colors ${isExpanded ? 'bg-accent text-white' : 'text-gray-400'}`}>
          <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isExpanded ? '-rotate-180' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col py-1 pl-4 gap-0.5 ml-3 border-l-2 border-accent/15">
              {subLinks?.map((sub, sIdx) => {
                const subActive = activeLinkChecker(sub.href);
                return (
                  <Link
                    key={sIdx}
                    href={sub.href || "#"}
                    onClick={onLinkClick}
                    className={`px-3 py-2 text-[13px] transition-all rounded-lg ${
                      subActive 
                      ? 'text-accent font-bold bg-accent/5' 
                      : 'text-gray-600 font-medium hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
