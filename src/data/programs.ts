import { Program } from '../components/programs/types';

export type { Program } from '../components/programs/types';

export const defaultPrograms: Program[] = [
    {
        id: 'default-3',
        title: "Atención temprana",
        description: "de 0 a 3 años. Programa terapéutico integral para apoyar el desarrollo sicomotor a través de la estimulación temprana y adecuada de sistemas multisensoriales.",
        slug: "atencion-temprana",
        ageRange: "0-3 años",
        featuredImage: "/images/programa-atencion-temprana.jpg",
    },
    {
        id: 'default-2',
        title: "Protocolo Intensivo Pediasuit Niños y jóvenes",
        description: "de 2 a 18 años. Protocolo Pediasuit es un programa terapéutico intensivo para apoyar el desarrollo sicomotor a través de la estimulación de sistemas multisensoriales.",
        slug: "pediasuit",
        ageRange: "2-18 años",
        featuredImage: "/images/programa-pediasuit.jpg",
    },
    {
        id: 'default-1',
        title: "Apoyo a dificultades en el aprendizaje a niños",
        description: "de 3 a 14 años. Programa terapéutico de apoyo a las actividades escolares para potencializar las habilidades motoras, cognitivas y de lenguaje.",
        slug: "apoyo-aprendizaje",
        ageRange: "3-14 años",
        featuredImage: "/images/programa-aprendizaje.jpg",
    },
    {
        id: 'default-4',
        title: "Visión a niños y jóvenes",
        description: "de 3 a 18 años. Programa terapéutico integral para apoyar el desarrollo sicomotor y evitar en lo posible la aparición de patrones atípicos.",
        slug: "atencion-ninos-jovenes",
        ageRange: "3-18 años",
        featuredImage: "/images/programa-neurodesarrollo.jpg",
    }
];
