"use client";

import { motion } from "@/compat/motion";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin, FaInfoCircle, FaTools } from "react-icons/fa";
import Image from "next/image";

export default function AdditionalInfo() {
    const socialLinks = [
        { icon: FaFacebook, href: "#", label: "Facebook" },
        { icon: FaInstagram, href: "#", label: "Instagram" },
        { icon: FaYoutube, href: "#", label: "YouTube" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        <div className="space-y-0">

            {/* Ten en cuenta Section */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="flex justify-center mb-6 text-primary opacity-50">
                        <FaInfoCircle className="text-4xl" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">Ten en cuenta</h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                        Por tu donación recibirás un certificado que te permitirá deducir de la renta
                        el valor de la donación efectuada según el artículo 125 del estatuto tributario Colombiano.
                    </p>
                </div>
            </section>

            {/* Banco de Productos Section */}
            <section className="relative py-24 bg-primary text-white overflow-hidden">
                {/* Background Overlay Image (Placeholder for children hands) */}
                <div className="absolute inset-0 opacity-10 grayscale">
                    <Image
                        src="/images/programas-intervention.jpg"
                        alt="Hands"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <p className="text-accent font-bold mb-4 uppercase tracking-widest flex items-center justify-center gap-2">
                        <FaTools /> Dona al Banco de Productos de Apoyo
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 leading-tight px-4 md:px-0">
                        Contribuye a la inclusión social de un niño donando órtesis o equipo especial
                        <span className="text-accent italic block mt-2 text-2xl font-bold">
                            (Férulas, caminadores, sillas de ruedas, bipedestadores, etc).
                        </span>
                    </h2>

                    <div className="flex justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full overflow-hidden border-4 border-accent shadow-2xl flex items-center justify-center p-4"
                        >
                            <Image
                                src="/images/programa-pediasuit.jpg"
                                alt="Equipment"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Aliado Social Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-secondary tracking-widest uppercase">Aliado Social</h2>
                        <div className="w-20 h-1 bg-accent mx-auto mt-4" />
                    </div>

                    <div className="relative bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed text-center md:text-left">
                                Como empresa te puedes vincular siendo nuestro aliado en el mejoramiento de nuestros procesos,
                                donándonos recursos económicos o físicos como muebles de oficina, material terapéutico,
                                equipos de cómputo, etc.
                            </p>
                            <p className="text-gray-500 font-medium text-center md:text-left">
                                Por tu ayuda recibes beneficios en los programas de responsabilidad social corporativa
                                y un certificado que te permitirá deducir de la renta el valor de la donación efectuada.
                            </p>
                        </div>

                        <div className="relative w-48 h-48 flex-shrink-0">
                            <div className="absolute inset-0 bg-accent rounded-full -rotate-6 scale-105" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                                <Image
                                    src="/images/equipo-secundario.jpg"
                                    alt="Corporate Partnership"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Footer Link Section */}
            <section className="relative py-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/equipo-principal.jpg"
                        alt="Community"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <p className="text-accent uppercase tracking-widest text-sm font-black mb-4">Conoce y difunde lo que hacemos</p>
                    <h3 className="text-3xl md:text-4xl font-black mb-12 max-w-3xl mx-auto leading-tight">
                        Síguenos, dale like a nuestras redes sociales y comparte para que
                        más personas puedan conocer y apoyar a los niños de Asociación Aconiño
                    </h3>

                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary text-xl shadow-lg transition-colors hover:text-accent"
                                aria-label={social.label}
                            >
                                <social.icon />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
