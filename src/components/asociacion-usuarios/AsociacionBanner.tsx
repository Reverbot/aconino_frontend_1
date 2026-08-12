import Image from "next/image";

export default function AsociacionBanner() {
    return (
        <section className="relative w-full py-12 md:py-20 flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/asociacion-banner.jpg"
                    alt="Niños sonriendo"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[#0f1f6a]/90"></div> {/* Color matching the screenshot */}
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug drop-shadow-md">
                    Con el fin de velar por la calidad del servicio y la defensa de los usuarios
                </h2>
            </div>
        </section>
    );
}
