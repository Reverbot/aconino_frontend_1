"use client";

import React, { useState } from "react";
import { AnimatePresence } from "@/compat/motion";
import { useDonation } from "@/providers/DonationProvider";
import TriggerButton from "./TriggerButton";
import DonationPopup from "./DonationPopup";

/**
 * FloatingDonationWidget
 * Modular component for the floating donation CTA.
 * Location: Bottom-right, hides on mobile menu open via globals.css
 */
export default function FloatingDonationWidget() {
  const { openDonationWidget } = useDonation();
  const [isOpen, setIsOpen] = useState(false);

  // Widget is explicitly allowed on /apoyanos as per user request

  // Hardcoded values for now, could be passed as props or fetched
  const progress = 45;
  const donors = 127;

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);
  const handleOpenMainWidget = () => {
    setIsOpen(false);
    openDonationWidget();
  };

  return (
    <div 
      className="fixed z-[90] flex flex-col items-end group floating-widget-container bottom-5 right-5 md:bottom-8 md:right-8"
    >
      <AnimatePresence>
        {isOpen && (
          <DonationPopup 
            onClose={handleClose}
            onDonate={handleOpenMainWidget}
            progress={progress}
            donors={donors}
          />
        )}
      </AnimatePresence>

      <TriggerButton 
        isOpen={isOpen} 
        toggle={handleToggle} 
      />
    </div>
  );
}
