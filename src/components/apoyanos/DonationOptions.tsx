"use client";

import { motion } from "@/compat/motion";
import { FaUniversity, FaGlobe, FaCreditCard, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useDonation } from "../../providers/DonationProvider";

const programs = [
    {
        title: "PROGRAMA DE 12 SESIONES MENSUALES",
        price: "$432.000",
        color: "bg-primary",
    },
    {
        title: "PROGRAMA DE 24 SESIONES MENSUALES",
        price: "$864.000",
        color: "bg-secondary",
    },
    {
        title: "APOYO PARA TRANSPORTE # 1",
        price: "$88.000",
        color: "bg-primary",
    },
    {
        title: "APOYO PARA TRANSPORTE # 2",
        price: "$176.000",
        color: "bg-secondary",
    },
];

export default function DonationOptions() {
    const { openDonationWidget } = useDonation();

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Title */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">Apadrina a un niño ahora</h3>
                    <div className="w-24 h-1 bg-accent mx-auto" />
                </div>

                {/* Program Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            onClick={() => openDonationWidget()}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-lg shadow-gray-200 overflow-hidden flex flex-col items-center text-center p-8 border-t-8 border-accent cursor-pointer group"
                        >
                            <h4 className={`text-sm font-black text-white px-4 py-8 mb-4 w-full h-32 flex items-center justify-center ${program.color} rounded-xl transition-colors duration-300`}>
                                {program.title}
                            </h4>
                            <p className="text-2xl font-bold text-primary mb-4">{program.price}</p>
                            <span className="text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                <FaHeart /> Donar
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bank & Payment Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-100 border border-gray-100">

                    {/* Local Bank Transfer */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-secondary">
                            <FaUniversity className="text-3xl" />
                            <h4 className="text-xl font-bold uppercase">Consignación o transferencia a:</h4>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <p className="font-black text-primary">Banco AV Villas</p>
                                <p>Cuenta de Ahorros N° 572-000-131</p>
                            </div>
                            <div>
                                <p className="font-black text-primary">Bancolombia</p>
                                <p>Cuenta de Ahorros N° 209-651427-82</p>
                            </div>
                            <div>
                                <p className="font-black text-primary">A nombre Asociación Aconiño</p>
                                <p className="text-sm font-bold">NIT 800.175.839-5</p>
                            </div>
                        </div>
                    </div>

                    {/* International Donations */}
                    <div className="space-y-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 text-secondary">
                            <FaGlobe className="text-3xl" />
                            <h4 className="text-xl font-bold uppercase">Para donaciones desde el exterior:</h4>
                        </div>
                        <div className="space-y-3 text-xs md:text-sm text-gray-600 leading-tight">
                            <p><span className="font-black text-primary">Banco corresponsal:</span> CITIBANK N.A.</p>
                            <p>111 Wall Street - New York, N.Y. 10043 - USA</p>
                            <p><span className="font-black text-primary">ABA N.</span> 021000089</p>
                            <p><span className="font-black text-primary">CODIGO SWIFT:</span> CITIUS33</p>
                            <div className="pt-2 border-t border-blue-200">
                                <p><span className="font-black text-primary">Banco beneficiario:</span> AV Villas - Colombia</p>
                                <p><span className="font-black text-primary">Número de cuenta:</span> 36240612</p>
                                <p><span className="font-black text-primary">CODIGO SWIFT:</span> BAVICOBB</p>
                            </div>
                        </div>
                    </div>

                    {/* Electronic Payments */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-secondary">
                            <FaCreditCard className="text-3xl" />
                            <h4 className="text-xl font-bold uppercase">Pagos electrónicos y donaciones:</h4>
                        </div>
                        <div className="space-y-8 flex flex-col items-center">
                            <p className="font-black text-primary text-lg">AvalPay Center</p>

                            <div className="flex flex-wrap justify-center gap-6 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="relative w-32 h-16">
                                    <Image
                                        src="https://www.avalpaycenter.com/portal/assets/images/logo_avalpay.png"
                                        alt="AvalPay Center"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="relative w-20 h-16">
                                    <Image
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Logo_PSE.png/800px-Logo_PSE.png"
                                        alt="PSE"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">Click en la imagen para realizar transacción</p>
                        </div>
                    </div>

                </div>

                {/* Post-donation contact */}
                <div className="mt-12 text-center pb-8 border-b border-gray-200">
                    <p className="text-primary font-bold">
                        Una vez realices la donación infórmanos al correo:
                        <a href="mailto:contabilidad@aconino.com" className="text-secondary hover:underline ml-1">
                            contabilidad@aconino.com
                        </a>
                    </p>
                </div>

            </div>
        </section>
    );
}
