"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const sedes = [
    {
        name: "Sede Norte",
        address: "Calle 127 B No. 45-28 - Barrio Prado",
        phones: ["(+57) 60(1) 650 8473", "(+57) 313 391 0760"],
        email: "asistentenorte@aconino.org",
        color: "bg-primary",
        iconColor: "text-white"
    },
    {
        name: "Sede Américas",
        address: "Calle 6 A No. 71 A - 10 - Barrio Marsella",
        phones: ["(+57) 60(1) 290 0521", "(+57) 311 476 3740"],
        email: "asistenteamericas@aconino.org",
        color: "bg-accent",
        iconColor: "text-primary"
    }
];

export default function ContactBranches() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-32 relative z-20">
                    {sedes.map((sede, idx) => (
                        <ScrollReveal key={idx} animation={idx === 0 ? "slide-right" : "slide-left"} delay={0.2}>
                            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 h-full flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500">
                                <div className={`w-16 h-16 rounded-2xl ${sede.color} ${sede.iconColor} flex items-center justify-center text-2xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                                    <FaMapMarkerAlt />
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4 uppercase tracking-tight">
                                    {sede.name}
                                </h3>
                                <p className="text-gray-500 mb-6 font-medium">
                                    {sede.address}
                                </p>
                                <div className="space-y-3 mb-6">
                                    {sede.phones.map((phone, pIdx) => (
                                        <div key={pIdx} className="flex items-center justify-center gap-2 text-gray-600">
                                            <FaPhoneAlt className="text-accent text-sm" />
                                            <span className="text-sm font-semibold">{phone}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    <a
                                        href={`mailto:${sede.email}`}
                                        className="flex items-center gap-2 text-secondary hover:text-accent font-bold transition-colors group"
                                    >
                                        <FaEnvelope className="text-sm group-hover:scale-110 transition-transform" />
                                        <span>{sede.email}</span>
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
