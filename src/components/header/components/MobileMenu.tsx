"use client";

import { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { NavLink } from "../../../types/navigation";
import { useActiveLink } from "../../../hooks/useActiveLink";
import { useDonation } from "../../../providers/DonationProvider";

import MobileNavLink from "./MobileNavLink";
import MobileDropdown from "./MobileDropdown";
import MobileMenuFooter from "./MobileMenuFooter";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";

interface MobileMenuState {
  isOpen: boolean;
  closeMenu: () => void;
  expandedItem: string | null;
  toggleExpanded: (item: string | undefined) => void;
}

interface MobileMenuProps {
  mobileMenu: MobileMenuState;
  navLinks: NavLink[];
}

export default function MobileMenu({ mobileMenu, navLinks }: MobileMenuProps) {
  const { isOpen, closeMenu, expandedItem, toggleExpanded } = mobileMenu;
  const { isActive, isParentActive } = useActiveLink();
  const { openDonationWidget } = useDonation();

  const simpleLinks = useMemo(
    () => navLinks.filter(link => !link.hasDropdown),
    [navLinks]
  );
  const dropdownLinks = useMemo(
    () => navLinks.filter(link => link.hasDropdown),
    [navLinks]
  );

  const checkActive = useCallback(
    (href: string | undefined) => isActive(href),
    [isActive]
  );


  const handleDonationClick = () => {
    closeMenu();
    openDonationWidget();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 bg-white lg:hidden overflow-y-auto"
          style={{ zIndex: 60 }}
        >
          {/* Header persistente dentro del menú móvil */}
          <div className="sticky top-0 left-0 w-full h-20 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-[70] shadow-sm">
            <div onClick={closeMenu}>
              <Logo />
            </div>
            <button
              onClick={closeMenu}
              className="p-3 rounded-xl bg-gray-50 text-primary hover:bg-primary hover:text-white transition-all active:scale-95"
              aria-label="Cerrar menú"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col px-4 sm:px-6 pt-6 pb-24 h-full overflow-y-auto">
            {/* Grid de enlaces simples - 2 columnas compactas */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {simpleLinks.map((link, idx) => (
                <MobileNavLink
                  key={link.name}
                  name={link.name || ""}
                  href={link.href || "#"}
                  active={checkActive(link.href)}
                  onClick={closeMenu}
                  index={idx}
                />
              ))}
            </div>

            {/* Dropdowns compactos */}
            <div className="space-y-2">
              {dropdownLinks.map((link, idx) => (
                <MobileDropdown
                  key={link.name}
                  name={link.name || ""}
                  isExpanded={expandedItem === link.name}
                  parentActive={isParentActive(link)}
                  onToggle={() => toggleExpanded(link.name)}
                  subLinks={link.subLinks}
                  activeLinkChecker={checkActive}
                  onLinkClick={closeMenu}
                  index={idx}
                />
              ))}
            </div>

            {/* Footer compacto */}
            <MobileMenuFooter onDonationClick={handleDonationClick} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
