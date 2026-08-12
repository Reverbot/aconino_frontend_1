"use client";

import { motion } from "@/compat/motion";
import { FaHeart } from "react-icons/fa";
import { useDonation } from "../../providers/DonationProvider";
import HeroBase from "../shared/HeroBase";

export default function ApoyanosHero() {
    const { openDonationWidget } = useDonation();

    return (
        <HeroBase
            title={<>Tu apoyo <br className="hidden md:block"/> cambia vidas</>}
            description="Con tu ayuda podemos continuar ofreciendo neurorehabilitación a niños que lo necesitan."
            backgroundImage="/images/apoyanos-hero.jpg"
            overlayOpacity={60}
            height="h-[600px] md:h-[700px]"
            className="mt-[-80px]"
            cta={{
                text: "Donar Ahora",
                onClick: openDonationWidget,
                icon: <FaHeart />,
            }}
            titleClassName="tracking-tighter uppercase"
            containerClassName="max-w-4xl mx-auto px-4 pt-20"
        >
            {/* Absolute positioning of the heart icon relative to the content container */}
            <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 15 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5
                }}
                className="absolute top-20 right-4 md:right-20 lg:right-32 z-30"
            >
                <FaHeart className="text-accent text-5xl md:text-6xl drop-shadow-lg" />
            </motion.div>
        </HeroBase>
    );
}
