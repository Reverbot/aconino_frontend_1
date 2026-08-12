export const contactConfig = {
    hero: {
        title: "Contáctanos",
        subtitle: "Estamos aquí para escucharte y apoyarte en el desarrollo integral de tus seres queridos."
    },
    branches: [
        {
            name: "Sede Principal",
            address: "Calle 147 No. 7 - 70",
            city: "Bogotá, Colombia",
            phones: ["+57 601 258 0000", "+57 313 391 0760"],
            email: "info@aconino.org",
            schedule: "Lunes a Viernes: 8:00 AM - 5:00 PM",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2443!2d-74.0326!3d4.7214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f856616a29737%3A0xc3c6f6e52290453!2sAsociaci%C3%B3n%20Aconi%C3%B1o!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
        },
        {
            name: "Sede Rehabilitación",
            address: "Carrera 7 No. 147 - 50",
            city: "Bogotá, Colombia",
            phones: ["+57 601 258 1111"],
            email: "rehabilitacion@aconino.org",
            schedule: "Lunes a Viernes: 7:00 AM - 4:00 PM",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.2443!2d-74.0326!3d4.7214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f856616a29737%3A0xc3c6f6e52290453!2sAsociaci%C3%B3n%20Aconi%C3%B1o!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
        }
    ]
};

export const blogCategories = [
    { id: "1", name: "Inclusión", slug: "inclusion" },
    { id: "2", name: "Neurodesarrollo", slug: "neurodesarrollo" },
    { id: "3", name: "Noticias", slug: "noticias" },
    { id: "4", name: "Eventos", slug: "eventos" }
];

export const staticBlogPosts = [
    {
        id: "1",
        title: "La importancia del juego en el neurodesarrollo",
        slug: "importancia-juego-neurodesarrollo",
        excerpt: "Descubre cómo el juego estructurado ayuda a los niños con discapacidad sensoriomotora a desarrollar nuevas habilidades.",
        content: "Contenido detallado del artículo...",
        date: "2024-03-10",
        author: "Equipo Aconiño",
        category: "Neurodesarrollo",
        featuredImage: "/images/programa-atencion-temprana.jpg"
    },
    {
        id: "2",
        title: "Próximo Taller de Certificación Bobath",
        slug: "taller-certificacion-bobath-2024",
        excerpt: "Abrimos inscripciones para nuestro taller anual de certificación internacional en el Concepto Bobath.",
        content: "Contenido detallado del artículo...",
        date: "2024-03-05",
        author: "Dirección Académica",
        category: "Eventos",
        featuredImage: "/images/programa-neurodesarrollo.jpg"
    }
];

export const apoyanosConfig = {
    hero: {
        badge: "CONSTRUYENDO EL FUTURO",
        title: "Apoya la Construcción del Centro Día",
        subtitle: "Un espacio diseñado para brindar autonomía y bienestar a jóvenes y adultos con discapacidad.",
        backgroundImage: "/images/apoyanos-hero.jpg",
        quickStats: [
            { label: "Beneficiarios", value: "200+" },
            { label: "Ubicación", value: "Bogotá" }
        ]
    },
    progress: {
        title: "Avance de la Obra",
        description: "Estamos en la fase de acabados y equipamiento. Tu donación nos permite completar este sueño.",
        currentProgress: 75,
        goalAmount: 500000000,
        materialsNeeded: [
            { name: "Sillas Ergonómicas", needed: 50, donated: 20 },
            { name: "Pantallas de TV", needed: 10, donated: 4 },
            { name: "Material de Construcción", needed: 100, donated: 75 }
        ]
    },
    donationOptions: {
        title: "Formas de Apoyar",
        options: [
            { title: "Donación Unica", description: "Aporta el monto que desees para la construcción.", link: "/donar" },
            { title: "Plan Padrino", description: "Apadrina a un joven para sus terapias mensuales.", link: "/donar" }
        ]
    },
    corporateDonation: {
        title: "Alianzas Corporativas",
        description: "Tu empresa puede ser parte del cambio a través de donaciones directas o programas de voluntariado.",
        benefits: [
            "Certificado de donación",
            "Mención en nuestra placa de honor",
            "Impacto social medible"
        ]
    },
    faq: {
        title: "Preguntas Frecuentes",
        items: [
            { question: "¿Es deducible de impuestos?", answer: "Sí, emitimos certificados de donación válidos ante la DIAN." },
            { question: "¿Cómo puedo visitar la obra?", answer: "Contáctanos para programar una visita guiada." }
        ]
    },
    finalCTA: {
        title: "Juntos podemos lograrlo",
        description: "Cada aporte, sin importar el tamaño, nos acerca un paso más a la meta.",
        buttonText: "DONAR AHORA"
    }
};

// Quienes Somos Content
export const quienesSomosContent = {
    hero: {
        title: "Nuestra Historia",
        subtitle: "Tres décadas impulsando el neurodesarrollo en Colombia.",
        backgroundImage: "/images/quienes-hero.jpg"
    },
    intro: {
        label: "Trayectoria",
        title: "Más de 30 años transformando vidas",
        paragraphs: [
            { text: "La Asociación Aconiño nació en 1990 con el firme propósito de brindar una atención integral a niños y jóvenes con discapacidad sensoriomotora.", isHighlighted: true },
            { text: "Desde entonces, hemos sido pioneros en la implementación de técnicas avanzadas como el Concepto Bobath y otras terapias innovadoras." }
        ],
        image: "/images/quienes-intro.jpg",
        stats: [
            { value: "+30", label: "Años de Experiencia" },
            { value: "+5000", label: "Niños Atendidos" }
        ]
    },
    mision: {
        title: "Nuestra Misión",
        paragraphs: [
            { text: "Brindar rehabilitación integral de alta calidad, promoviendo la inclusión y el bienestar de niños y jóvenes con discapacidad." }
        ],
        image: "/images/quienes-mission.jpg"
    },
    vision: {
        title: "Nuestra Visión",
        mainText: "Ser el centro de referencia líder en neurorehabilitación infantil en Colombia.",
        secondaryText: "Reconocidos por nuestra excelencia clínica, humanismo y capacidad de innovación."
    },
    historia: {
        title: "Nuestra Cronología",
        subtitle: "Momentos clave que definieron nuestro camino",
        events: [
            { year: "1990", title: "Fundación", description: "Un grupo de profesionales decide unir fuerzas para crear Aconiño." },
            { year: "2010", title: "Nueva Sede", description: "Inauguración de nuestras instalaciones principales en Bogotá." }
        ]
    },
    fundadores: {
        introText: "Nuestros fundadores sentaron las bases de lo que hoy es Aconiño.",
        row1: {
            people: [
                { name: "Nombre Fundador 1", role: "Cargo / Especialidad", photo: "/images/equipo-principal.jpg" }
            ]
        },
        row2: {
            people: [
                { name: "Nombre Fundador 2", role: "Cargo / Especialidad", photo: "/images/equipo-secundario.jpg" }
            ]
        }
    },
    semillas: {
        title: "Proyecto Semillas",
        description: "Un programa dedicado a la atención temprana y prevención.",
        image: "/images/programa-atencion-temprana.jpg"
    },
    juntaDirectiva: {
        title: "Junta Directiva",
        groupPhoto: "/images/quienes-junta.jpg",
        photoCaption: "Nuestros líderes comprometidos con la causa.",
        members: [
            { name: "Juan Pérez", role: "Presidente" },
            { name: "María Rodríguez", role: "Secretaria" }
        ]
    },
    equipoProfesional: {
        title: "Nuestro Equipo Terapéutico",
        introText: "Especialistas altamente calificados en diversas disciplinas.",
        members: [
            { name: "Dr. Roberto Gómez", role: "Fisioterapeuta Bobath", photo: "/images/equipo-principal.jpg" }
        ]
    },
    administrativos: {
        title: "Equipo Administrativo",
        introText: "El soporte vital que hace posible nuestra operación diaria.",
        members: [
            { name: "Ana Lucía", role: "Directora Administrativa", photo: "/images/equipo-secundario.jpg" }
        ]
    }
};

// Note: defaultPrograms moved to @/data/programs
