"use client";

import HeroBase from "./shared/HeroBase";
import HeroSlider, { HeroSliderSlide } from "./shared/HeroSlider";

const DEFAULT_TITLE = "36 años acompañando a niños con discapacidad.";
const DEFAULT_DESCRIPTION = "Hoy seguimos soñando y trabajando por un nuevo paso: un Centro Día para adultos.";
const DEFAULT_IMAGE = "/images/hero-background-blue.png";

interface HeroProps {
    acf?: {
        hero_title?: string;
        hero_subtitle?: string;
        hero_description?: string;
        hero_background_type?: string;
        hero_video_url?: string;
        hero_image?: string;
        hero_impact?: string;
        hero_cta_text?: string;
        hero_cta_link?: string;
    };
    slides?: HeroSliderSlide[];
}

export default function Hero({ acf, slides }: HeroProps) {
    const title = acf?.hero_title || DEFAULT_TITLE;
    const description = acf?.hero_description || DEFAULT_DESCRIPTION;
    const backgroundType = (acf?.hero_background_type === "video" ? "video" : "image") as 'video' | 'image';
    const videoUrl = acf?.hero_video_url;
    const imageUrl = acf?.hero_image || DEFAULT_IMAGE;

    if (slides && slides.length > 0) {
        return (
            <HeroSlider
                slides={slides}
                title={title}
                description={description}
                showCurtain={false}
                showParticles={false}
                useTypewriter={false}
                horizontalAlign="left"
                verticalAlign="center"
                containerClassName="w-full px-6 md:px-12 lg:px-[90px]"
                titleClassName="!max-w-[1100px] !px-0"
                descriptionClassName="!max-w-[1100px] !text-white !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !font-black !leading-[1.18] !mt-5 md:!mt-8"
                height="min-h-[600px] md:min-h-[800px] lg:min-h-[calc(100vh-220px)]"
            />
        );
    }

    return (
        <HeroBase
            title={title}
            description={description}
            backgroundImage={imageUrl}
            backgroundVideo={videoUrl}
            videoPoster={DEFAULT_IMAGE}
            backgroundType={backgroundType}
            showCurtain={false}
            showParticles={false}
            useTypewriter={false}
            horizontalAlign="left"
            verticalAlign="center"
            containerClassName="w-full px-6 md:px-12 lg:px-[90px]"
            titleClassName="!max-w-[1100px] !px-0"
            descriptionClassName="!max-w-[1100px] !text-white !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !font-black !leading-[1.18] !mt-5 md:!mt-8"
            height="min-h-[600px] md:min-h-[800px] lg:min-h-[calc(100vh-220px)]"
        />
    );
}
