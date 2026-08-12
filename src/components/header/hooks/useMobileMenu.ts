import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/constants";

const MOBILE_BREAKPOINT = BREAKPOINTS.LG;

export interface UseMobileMenuReturn {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  expandedItem: string | null;
  toggleExpanded: (item: string | undefined) => void;
  setExpandedItem: (item: string | null) => void;
}

export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  
  const toggleExpanded = (item: string | undefined) => {
    if (!item) return;
    setExpandedItem((prev) => (prev === item ? null : item));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("menu-open");
    }
    return () => { 
      document.body.style.overflow = "unset"; 
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  return { isOpen, toggleMenu, closeMenu, expandedItem, toggleExpanded, setExpandedItem };
}
