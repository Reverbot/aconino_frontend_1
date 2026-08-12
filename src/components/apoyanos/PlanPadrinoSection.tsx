"use client";

import { motion } from "@/compat/motion";
import { FaHeart, FaChevronDown, FaHandHoldingHeart } from "react-icons/fa";

export default function PlanPadrinoSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <span className="text-gray-400 font-medium tracking-widest text-sm">Aconiño</span>
                            <div className="w-20 h-0.5 bg-accent" />
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-primary uppercase leading-tight">
                            ¿QUÉ ES EL PLAN <br />
                            <span className="text-secondary">PADRINO?</span>
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Es un aporte o donación voluntaria para apoyar el tratamiento de rehabilitación
                            o el transporte de los niños, niñas y jóvenes que debido a su situación económica
                            no pueden tener acceso a los programas de tratamiento que brinda la organización.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary cursor-pointer transition-colors hover:bg-primary hover:text-white"
                        >
                            <FaChevronDown className="text-xl" />
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Illustrative Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Background circles or shapes to mimic the graphic */}
                            <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-50" />

                            {/* Main Icon */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <div className="bg-gradient-to-br from-secondary to-primary p-12 rounded-full shadow-2xl">
                                    <FaHandHoldingHeart className="text-[120px] md:text-[180px] text-white" />
                                </div>

                                {/* Floating Hearts */}
                                <motion.div
                                    animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-4 right-4 text-secondary opacity-40"
                                >
                                    <FaHeart className="text-6xl" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    className="absolute bottom-8 left-4 text-accent opacity-60"
                                >
                                    <FaHeart className="text-5xl" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
