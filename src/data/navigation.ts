export const navLinks = [
    { name: "Inicio", href: "/" },
    { 
        name: "Nosotros", 
        href: "/quienes-somos/nosotros",
        hasDropdown: true,
        subLinks: [
            { name: "Nuestra Historia", href: "/quienes-somos/nosotros#historia" },
            { name: "Misión y Visión", href: "/quienes-somos/nosotros#mision" }
        ]
    },
    { 
        name: "Programas", 
        href: "/programas",
        hasDropdown: true,
        dropdownType: 'dynamic',
        collectionSource: 'programs-pages',
        subLinks: [
            { name: "Enfoque Terapéutico", href: "/programas#modelo" },
            { name: "Metodología de Trabajo", href: "/programas#metodologia" },
            { name: "Objetivos por Área", href: "/programas#objetivos" },
            { name: "Atención Temprana 0-3 Años", href: "/programas#atencion-temprana" },
            { name: "Atención a Niños y Jóvenes 3-18 Años", href: "/programas#atencion-ninos-jovenes" },
            { name: "Apoyo al Aprendizaje", href: "/programas#apoyo-aprendizaje" },
            { name: "Protocolo Intensivo PediaSuit", href: "/programas#pediasuit" }
        ]
    },
    { name: "Cursos", href: "/cursos" },
    { name: "Contacto", href: "/contacto" }
];

export const footerConfig = {
    contactInfo: {
        address: "Calle Falsa 123, Bogotá, Colombia",
        phone: "+57 1 234 5678",
        email: "info@aconino.org"
    },
    socialLinks: [
        { platform: "facebook", url: "https://facebook.com/aconino" },
        { platform: "instagram", url: "https://instagram.com/aconino" }
    ]
};
