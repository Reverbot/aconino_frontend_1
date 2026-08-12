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
            { name: "Atención Temprana", href: "/programas#atencion-temprana" },
            { name: "Pediasuit", href: "/programas#pediasuit" },
            { name: "Apoyo al Aprendizaje", href: "/programas#apoyo-aprendizaje" },
            { name: "Visión", href: "/programas#atencion-ninos-jovenes" }
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
