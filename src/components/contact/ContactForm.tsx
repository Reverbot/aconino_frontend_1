"use client";

import ScrollReveal from "../animations/ScrollReveal";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
    { icon: <FaFacebookF />, href: "https://web.facebook.com/AsociacionAconino/", color: "hover:bg-blue-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/aconinoacn/", color: "hover:bg-pink-600" },
    { icon: <FaYoutube />, href: "https://www.youtube.com/@asociacionaconino1526", color: "hover:bg-red-600" },
    { icon: <FaXTwitter />, href: "https://twitter.com/aconino", color: "hover:bg-black" },
    { icon: <FaLinkedinIn />, href: "https://co.linkedin.com/company/aconinoacn", color: "hover:bg-blue-700" },
];

export default function ContactForm() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-start">
                    {/* Contact Info & Social */}
                    <div className="lg:col-span-2">
                        <ScrollReveal animation="fade-up" delay={0.1}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    Aconiño
                                </span>
                                <div className="h-[2px] bg-accent w-12" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={0.2}>
                            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight mb-8">
                                Contáctanos
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={0.3}>
                            <p className="text-gray-600 text-lg leading-relaxed mb-10">
                                Envíanos un correo electrónico o completa el formulario que aparece a continuación. Estaremos encantados de atenderte.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal animation="fade-up" delay={0.4}>
                            <div className="flex flex-wrap gap-4">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${social.color}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <ScrollReveal animation="slide-left" delay={0.2}>
                            <form data-contact-form className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-bold text-primary mb-2 ml-1">Nombres y apellidos</label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="Tu nombre completo"
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-4 text-gray-700 placeholder-gray-400 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-phone" className="block text-sm font-bold text-primary mb-2 ml-1">Teléfono o celular</label>
                                        <input
                                            id="contact-phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="Ej: 300 123 4567"
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-4 text-gray-700 placeholder-gray-400 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-bold text-primary mb-2 ml-1">Correo electrónico</label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="tu@correo.com"
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-4 text-gray-700 placeholder-gray-400 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-subject" className="block text-sm font-bold text-primary mb-2 ml-1">Asunto</label>
                                        <input
                                            id="contact-subject"
                                            name="subject"
                                            type="text"
                                            placeholder="¿En qué podemos ayudarte?"
                                            className="w-full bg-gray-50 rounded-2xl px-6 py-4 text-gray-700 placeholder-gray-400 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <label htmlFor="contact-message" className="block text-sm font-bold text-primary mb-2 ml-1">Mensaje</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Cuéntanos más detalles..."
                                        className="w-full bg-gray-50 rounded-2xl px-6 py-4 text-gray-700 placeholder-gray-400 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-full font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-secondary hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <FaPaperPlane className="text-sm" />
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
