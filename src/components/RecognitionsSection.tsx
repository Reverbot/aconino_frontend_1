import Image from "next/image";
import ScrollReveal from "./animations/ScrollReveal";
import RecognitionCard from "./recognitions/RecognitionCard";

interface RecognitionItem {
    title: string;
    meta: string;
    imageUrl?: string;
    description?: string;
}

interface RecognitionsSectionProps {
    recognitions?: RecognitionItem[];
    text?: string;
}

export default function RecognitionsSection({ recognitions, text }: RecognitionsSectionProps) {
    const defaultRecognitions: RecognitionItem[] = [
        { title: "Fundación Aflora", meta: "Noviembre de 2017" },
        { title: "Comisión Segunda Constitucional", meta: "Diciembre de 2025" },
        { title: "Compensar", meta: "Noviembre 2017" },
        { title: "Concejo de Bogotá", meta: "Cruz de Oro" }
    ];

    const displayRecognitions = recognitions || defaultRecognitions;
    const defaultRecognitionImages = [
        "/images/reconocimiento-aflora.png",
        "/images/reconocimiento-comision.png",
        "/images/reconocimiento-compensar.png",
        "/images/reconocimiento-concejo.png",
    ];

    return (
        <section className="w-full py-12 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Atmosferic Background Elements */}
            <div className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[80px] lg:blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] md:w-[280px] md:h-[280px] lg:w-[400px] lg:h-[400px] bg-accent/5 rounded-full blur-[50px] md:blur-[70px] lg:blur-[100px] translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
            
            <div className="max-w-[1400px] mx-auto px-6 sm:px-6 lg:px-8 text-center relative z-10">

                <ScrollReveal 
                    animation="fade-up"
                    className="flex flex-col items-center justify-center mb-10 md:mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-0.5 md:h-1 bg-accent w-12 md:w-20"></div>
                        <span className="text-xl md:text-3xl font-black text-primary tracking-[0.2em] uppercase">Excelencia Aconiño</span>
                        <div className="h-0.5 md:h-1 bg-accent w-12 md:w-20"></div>
                    </div>

                    <h2 className="text-3xl md:text-6xl font-black text-primary mb-4 leading-tight">
                        {text || "Nuestros Reconocimientos"}
                    </h2>
                    <div className="w-12 md:w-24 h-1 bg-accent/30 rounded-full"></div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
                    {displayRecognitions.map((award, idx) => (
                        <RecognitionCard
                            key={idx}
                            index={idx}
                            title={award.title}
                            meta={award.meta}
                            imageUrl={award.imageUrl || defaultRecognitionImages[idx % defaultRecognitionImages.length]}
                            description={award.description}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative bottom SVG Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
                <Image
                    src="/images/hero-background-blue.png"
                    alt="Decoración"
                    fill
                    className="object-cover grayscale"
                />
            </div>
        </section>
    );
}

