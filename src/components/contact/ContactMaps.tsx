"use client";

import ScrollReveal from "../animations/ScrollReveal";

const branches = [
    {
        name: "Sede Norte",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.273161392813!2d-74.05581972414169!3d4.722515095252835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f850239555555%3A0x6b2b7b5f5f5f5f5f!2sAsociaci%C3%B3n%20Aconi%C3%B1o%20Sede%20Norte!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
    },
    {
        name: "Sede Américas",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7130601392813!2d-74.12581972414169!3d4.622515095252835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f990239555555%3A0x6b2b7b5f5f5f5f5b!2sAsociaci%C3%B3n%20Aconi%C3%B1o%20Sede%20Am%C3%A9ricas!5e0!3m2!1ses!2sco!4v1710000000001!5m2!1ses!2sco"
    }
];

export default function ContactMaps() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {branches.map((branch, idx) => (
                        <ScrollReveal key={idx} animation={idx === 0 ? "slide-right" : "slide-left"} delay={0.2}>
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] md:h-[500px] group">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                                <iframe
                                    src={branch.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="filter grayscale-[20%] contrast-[110%] group-hover:grayscale-0 transition-all duration-700"
                                    title={`Mapa ${branch.name}`}
                                />
                                <div className="absolute top-6 left-6 z-20">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-white/50">
                                        <p className="text-primary font-black text-sm uppercase tracking-wider">
                                            {branch.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
