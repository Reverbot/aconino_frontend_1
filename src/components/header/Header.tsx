"use client";

import { m } from "@/compat/motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useHeader } from "./hooks/useHeader";
import { staggerContainer } from "@/components/animations/variants/staggerChildren";
import { headerContainerVariants } from "@/components/animations/variants/scrollVariants";

import TopBar from "./components/TopBar";
import Logo from "./components/Logo";
import NavLinks from "./components/NavLinks";
import CTAButton from "./components/CTAButton";
import MobileMenu from "./components/MobileMenu";
import HeaderReveal from "@/components/header/HeaderReveal";
import { HeaderProps } from "@/types/header";
import { mapNavigationData } from "@/lib/navigation-utils";

export default function Header({ navData, ctaLabel, ctaHref, settings }: HeaderProps) {
  const { isScrolled, mobileMenu, isRevealed } = useHeader();
  const links = mapNavigationData(navData);
  
  // Determine if CTA should be donation or link based on props
  const headerCTALabel = ctaLabel || settings?.headerCTA || "DONAR AHORA";
  const headerCTAHref = ctaHref || "/apoyanos";
  const isDonation = !ctaLabel || ctaLabel === "DONAR AHORA" || ctaLabel === "CONTÁCTANOS";

  return (
    <>
      <HeaderReveal isRevealed={isRevealed}>
        <TopBar isScrolled={isScrolled} />

        <m.header
          variants={headerContainerVariants}
          initial="top"
          animate={isScrolled ? "scrolled" : "top"}
          className="transition-all duration-300 relative bg-white"
        >
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1 md:py-2' : 'py-2 md:py-3'}`}
          >
            <Logo />

            <NavLinks navLinks={links} />

            <div className="flex items-center gap-3 md:gap-4 relative z-50">
              <CTAButton 
                label={headerCTALabel} 
                href={headerCTAHref}
                isDonation={isDonation}
              />

              <button
                onClick={mobileMenu.toggleMenu}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${mobileMenu.isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-primary hover:bg-primary hover:text-white'
                  }`}
                aria-label="Toggle menu"
              >
                {mobileMenu.isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </div>
          </m.div>

          {/* Animated accent line */}
          <m.div
            className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-secondary origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </m.header>
      </HeaderReveal>

      <MobileMenu
        mobileMenu={mobileMenu}
        navLinks={links}
      />
    </>
  );
}

