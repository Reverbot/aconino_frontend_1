import Image from "next/image";

interface AsociacionIntroProps {
    imageUrl?: string;
    imageAlt?: string;
}

const DEFAULT_IMG = "/images/asociacion-intro.jpg";

export default function AsociacionIntro({ imageUrl, imageAlt }: AsociacionIntroProps) {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Text */}
                    <div className="flex-1 lg:max-w-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm text-gray-600 font-medium">Aconiño</span>
                            <div className="h-[1px] w-12 bg-accent"></div>
                        </div>

                        <h4 className="text-3xl md:text-4xl text-primary font-black mb-8 leading-tight">
                            Asociación de Usuarios
                        </h4>

                        <p className="text-gray-500 leading-relaxed text-justify mb-6 font-light">
                            En el mes de noviembre de 1990, un grupo de siete padres y dos fisioterapeutas fundaron una organización privada sin ánimo de lucro, con el objetivo de brindar atención interdisciplinaria a niños, niñas y jóvenes con alteraciones sensoriomotoras ocasionadas por lesiones del sistema nervioso central. Se impuso asimismo la necesidad de capacitar a familias, profesionales y entidades públicas y privadas en relación con el desarrollo del niño, sus alteraciones y el tratamiento que debe brindársele.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-lg aspect-[4/3] shadow-lg rounded-sm overflow-hidden border-b-8 border-secondary">
                            <Image
                                src={imageUrl || DEFAULT_IMG}
                                alt={imageAlt || "Manos protegiendo recortes de familia"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
