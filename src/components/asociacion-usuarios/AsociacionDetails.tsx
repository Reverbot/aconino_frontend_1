export default function AsociacionDetails() {
    const objetivos = [
        "Fortalecer nuestra capacidad de escucha frente al usuario.",
        "Proteger los derechos en salud.",
        "Divulgar los deberes y derechos de los usuarios frente a los servicios.",
        "Generar espacios de participación ciudadana.",
        "Velar por la calidad del servicio.",
        "Representar a todos los usuarios de la Asociación.",
        "Propiciar espacios de formación en salud."
    ];

    // Splitting list into two columns
    const col1 = objetivos.slice(0, 4);
    const col2 = objetivos.slice(4);

    const TargetIcon = () => (
        <div className="flex-shrink-0 mt-0.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#0f1f6a" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="6" stroke="#48b7e2" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="2" fill="#0f1f6a" />
            </svg>
        </div>
    );

    return (
        <section className="bg-gray-50/30">
            {/* Objetivos Section */}
            <div className="py-12 border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-4xl text-primary font-bold">Objetivos</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 justify-center">
                        <ul className="flex-1 space-y-6 max-w-lg">
                            {col1.map((obj, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <TargetIcon />
                                    <span className="text-gray-500 font-light text-sm md:text-base leading-relaxed">{obj}</span>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex-1 space-y-6 max-w-lg">
                            {col2.map((obj, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <TargetIcon />
                                    <span className="text-gray-500 font-light text-sm md:text-base leading-relaxed">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Conformación Section */}
            <div className="py-2 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-4xl text-primary font-bold">Conformación</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center text-center">
                        {/* Asopadres */}
                        <div className="flex-1 max-w-sm mx-auto">
                            <h4 className="text-secondary font-bold text-lg mb-6">Representantes de Asopadres Aconiño</h4>

                            <div className="mb-6">
                                <p className="text-gray-700 font-bold mb-1">Luis Fernando Benitez</p>
                                <p className="text-gray-400 font-light text-sm">Presidente</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 font-bold mb-1">Sandra Antivar</p>
                                <p className="text-gray-400 font-light text-sm">Vicepresidente</p>
                            </div>

                            <div>
                                <p className="text-gray-700 font-bold mb-1">Sandra Santiago y Yessica Hurtado</p>
                                <p className="text-gray-400 font-light text-sm">Vocales</p>
                            </div>
                        </div>

                        {/* Aconiño Responsable */}
                        <div className="flex-1 max-w-sm mx-auto">
                            <h4 className="text-secondary font-bold text-lg mb-6">Responsable en Asociación Aconiño</h4>

                            <div className="mb-8">
                                <p className="text-gray-700 font-bold mb-1">María Claudia Rosas Mesa</p>
                                <p className="text-gray-400 font-light text-sm">Coordinadora de Atención Integral</p>
                            </div>

                            <div>
                                <h4 className="text-secondary font-medium text-base mb-2">Fecha de conformación</h4>
                                <p className="text-gray-500 font-light text-sm">19 de diciembre de 2019</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
