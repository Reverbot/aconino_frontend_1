"use client";

import HeroBase from "../shared/HeroBase";

export default function BlogHero() {
    return (
        <HeroBase
            title="Blog"
            subtitle="Noticias y Actualidad"
            description="Historias de transformación, avances en neurodesarrollo y noticias de nuestra asociación."
            backgroundType="gradient"
            height="min-h-0"
            className="pt-28 pb-20 md:pt-36 md:pb-24"
            containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" }
            ]}
            overlayOpacity={0}
            customOverlay={null}
        />
    );
}
