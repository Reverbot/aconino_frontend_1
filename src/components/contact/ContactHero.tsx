"use client";

import HeroBase from "../shared/HeroBase";

export default function ContactHero() {
    return (
        <HeroBase
            title="Contáctanos"
            subtitle="Estamos para ayudarte"
            description="¿Tienes dudas sobre nuestros programas o cursos? Ponte en contacto con nosotros hoy mismo."
            backgroundType="gradient"
            height="min-h-0"
            className="pt-28 pb-20 md:pt-36 md:pb-24"
            containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Contacto", href: "/contacto" }
            ]}
            overlayOpacity={0}
            customOverlay={null}
        />
    );
}
