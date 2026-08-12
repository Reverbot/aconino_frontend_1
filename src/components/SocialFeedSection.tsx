'use client';

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import ScrollReveal from "./animations/ScrollReveal";

interface SocialFeedSectionProps {
    title?: string;
    description?: string;
    instagramImageUrl?: string;
    facebookImageUrl?: string;
}

const DEFAULT_INSTAGRAM_IMG = "/images/equipo-principal.jpg";
const DEFAULT_FACEBOOK_IMG = "/images/programas-hero.jpg";

export default function SocialFeedSection({
    title = "Conéctate con Nosotros",
    description = "Sigue nuestras últimas actividades y noticias en tiempo real a través de nuestras redes sociales.",
    instagramImageUrl,
    facebookImageUrl
}: SocialFeedSectionProps) {
    const instagramImg = instagramImageUrl || DEFAULT_INSTAGRAM_IMG;
    const facebookImg = facebookImageUrl || DEFAULT_FACEBOOK_IMG;
    return (
        <section className="w-full py-20 md:py-32 bg-gray-50 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <ScrollReveal 
                    animation="fade-up"
                    className="flex flex-col items-start text-left mb-16 gap-4"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">COMUNIDAD ACONIÑO</span>
                        <div className="h-[2px] bg-accent w-20"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary">{title}</h2>
                    <p className="text-gray-600 max-w-2xl text-lg">{description}</p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Instagram Card */}
                    <ScrollReveal animation="slide-right" className="group">
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                style={{ backgroundImage: `url('${instagramImg}')` }}
                            ></div>
                            
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-4xl mb-6 shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                                    <FaInstagram />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2">Instagram</h3>
                                <p className="text-white/80 text-lg mb-8 font-medium">@asociacion_aconino</p>
                                
                                <a 
                                    href="https://www.instagram.com/aconinoacn/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full max-w-[240px] bg-white text-primary font-bold py-4 px-8 rounded-2xl hover:bg-accent transition-all duration-200 shadow-xl flex items-center justify-center gap-3 group/btn active:scale-95"
                                >
                                    <span>Ver Galería</span>
                                    <FaInstagram className="transition-transform group-hover/btn:scale-110" />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Facebook Card */}
                    <ScrollReveal animation="slide-left" className="group">
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                style={{ backgroundImage: `url('${facebookImg}')` }}
                            ></div>
                            
                            {/* Glassmorphism Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1877F2]/90 via-[#1877F2]/40 to-transparent"></div>
                            
                            {/* Content */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-4xl mb-6 shadow-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                                    <FaFacebookF />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2">Facebook</h3>
                                <p className="text-white/80 text-lg mb-8 font-medium">Asociación Aconiño</p>
                                
                                <a 
                                    href="https://facebook.com/asociacionaconino" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-full max-w-[240px] bg-white text-[#1877F2] font-bold py-4 px-8 rounded-2xl hover:bg-accent hover:text-primary transition-all duration-200 shadow-xl flex items-center justify-center gap-3 group/btn active:scale-[0.97]"
                                >
                                    <span>Ir a la Página</span>
                                    <FaFacebookF className="transition-transform group-hover/btn:scale-110" />
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
}
