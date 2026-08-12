import { PortableTextBlock } from "@portabletext/react";

import NosotrosHero from "@/components/quienes-somos/NosotrosHero";
import NosotrosIntro from "@/components/quienes-somos/NosotrosIntro";
import NosotrosMission from "@/components/quienes-somos/NosotrosMission";
import NosotrosVision from "@/components/quienes-somos/NosotrosVision";
import NosotrosHistory from "@/components/quienes-somos/NosotrosHistory";
import NosotrosFundadores from "@/components/quienes-somos/NosotrosFundadores";
import NosotrosSemillas from "@/components/quienes-somos/NosotrosSemillas";
import NosotrosJuntaPhoto from "@/components/quienes-somos/NosotrosJuntaPhoto";
import NosotrosJuntaRoles from "@/components/quienes-somos/NosotrosJuntaRoles";
import NosotrosEquipo from "@/components/quienes-somos/NosotrosEquipo";
import NosotrosAdmin from "@/components/quienes-somos/NosotrosAdmin";
import AsociacionIntro from "@/components/asociacion-usuarios/AsociacionIntro";
import AsociacionBanner from "@/components/asociacion-usuarios/AsociacionBanner";
import AsociacionDetails from "@/components/asociacion-usuarios/AsociacionDetails";

export const metadata = {
    title: "Quiénes Somos - Aconiño",
    description: "Conoce más sobre la Asociación Aconiño, nuestra misión, visión e historia impulsando la neurorehabilitación infantil en Colombia.",
};

interface IdentidadData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    description?: PortableTextBlock[];
    stats?: Array<{
        value: string;
        label: string;
        color: string;
    }>;
}

interface MisionData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    description?: PortableTextBlock[];
}

interface HistoriaData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    events?: Array<{
        year: string;
        title: string;
        description: string;
    }>;
}

interface VisionData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    cardImageUrl?: string;
    cardImageAlt?: string;
    visionText?: string;
    visionTextSecondary?: string;
}

interface HeroData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface FundadorData {
    name?: string;
    role?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface SemillaData {
    name?: string;
    age?: string;
    imageUrl?: string;
    imageAlt?: string;
}

interface JuntaPersonData {
    name?: string;
    description?: string;
}

interface JuntaRoleData {
    position?: string;
    people?: JuntaPersonData[];
}

interface JuntaData {
    subtitle?: string;
    title?: string;
    photoUrl?: string;
    photoAlt?: string;
    roles?: JuntaRoleData[];
}

interface EquipoData {
    subtitle?: string;
    title?: string;
    imageUrl?: string;
    imageAlt?: string;
    secondImageUrl?: string;
    secondImageAlt?: string;
}

interface AdminPersonData {
    name?: string;
    description?: string;
}

interface AdminRoleData {
    position?: string;
    people?: AdminPersonData[];
}

interface AdminData {
    subtitle?: string;
    title?: string;
    roles?: AdminRoleData[];
}

interface QuienesSomosData {
    identidad?: IdentidadData;
    mision?: MisionData;
    vision?: VisionData;
    historia?: HistoriaData;
    hero?: HeroData;
    fundadores?: FundadorData[];
    semillas?: SemillaData[];
    junta?: JuntaData;
    equipo?: EquipoData;
    admin?: AdminData;
    asociacionImageUrl?: string;
    asociacionImageAlt?: string;
}

const portableText = (text: string): PortableTextBlock[] => [
    {
        _key: "quienes-somos-copy",
        _type: "block",
        children: [
            {
                _key: "quienes-somos-copy-span",
                _type: "span",
                marks: [],
                text,
            },
        ],
        markDefs: [],
        style: "normal",
    },
];

const pageData: QuienesSomosData = {
    hero: {
        title: "Quienes somos",
        imageUrl: "/images/quienes-original/hero.jpg",
        imageAlt: "Familias y niños de la Asociación Aconiño",
    },
    identidad: {
        subtitle: "Historia Aconiño",
        title: "Nuestra Identidad",
        imageUrl: "/images/quienes-original/identidad.jpg",
        imageAlt: "Familias y niños de la Asociación Aconiño",
        description: portableText(
            "Somos una entidad privada sin ánimo de lucro fundada en 1990, nacida con el propósito de acompañar y apoyar a las familias de niños y jóvenes con discapacidad en su proceso de desarrollo y rehabilitación para que puedan participar plenamente en su vida familiar, escolar y social. En Aconiño brindamos atención integral basada en el Neurodesarrollo, abordando condiciones como parálisis cerebral, retraso en el desarrollo psicomotor, síndrome de West, hipotonía, entre otras. Durante más de tres décadas de trabajo, hemos construido un espacio seguro y humano donde la ciencia, el compromiso profesional y el amor por lo que hacemos se unen para acompañar a cada niño y joven en el desarrollo de su máximo potencial. Aconiño es, ante todo, un lugar donde las familias encuentran apoyo, esperanza y oportunidades para el futuro",
        ),
    },
    mision: {
        subtitle: "Nuestro Propósito",
        title: "Aspiración Estratégica",
        imageUrl: "/images/quienes-original/mision.jpg",
        imageAlt: "Acompañamiento terapéutico de la Asociación Aconiño",
        description: portableText(
            "Ser el ecosistema referente y preferido por las personas con discapacidad y sus familias en el acompañamiento efectivo a lo largo de su ciclo de vida en Colombia y por lo menos dos países de Latinoamérica.",
        ),
    },
    vision: {
        subtitle: "Nuestro Futuro",
        imageUrl: "/images/quienes-original/vision.jpg",
        imageAlt: "Acompañamiento a personas con discapacidad y sus familias",
        cardImageUrl: "/images/quienes-original/vision-card.jpg",
        cardImageAlt: "Equipo de la Asociación Aconiño",
        visionText:
            "1. Liderazgo y referencia\nSer una organización sostenible y referente nacional e internacional en la atención de alteraciones sensoriomotoras, reconocida por la innovación, el uso de nuevas tecnologías y la excelencia en el acompañamiento a personas con discapacidad y sus familias.",
        visionTextSecondary:
            "2. Desarrollo y expansión institucional\nPara el año 2027, consolidar la creación de un Centro Día que brinde apoyo, desarrollo, autonomía e inclusión social a adultos con discapacidad, ampliando el impacto de la asociación a lo largo del ciclo de vida.",
    },
    historia: {
        subtitle: "Nuestro Legado",
        title: "Historia",
        imageUrl: "/images/quienes-original/historia.jpg",
        imageAlt: "Historia de la Asociación Aconiño",
        events: [
            {
                year: "",
                title: "Noviembre de 1990",
                description:
                    "Siete padres y dos fisioterapeutas, movidos por la necesidad de encontrar mejores oportunidades de atención y desarrollo para sus hijos con discapacidad, decidieron unir esfuerzos y crear esta organización privada sin ánimo de lucro. Su propósito no era solo brindar apoyo a sus propios hijos, sino generar un espacio de atención y acompañamiento para todas las familias de la comunidad que enfrentaban la misma realidad: la falta de servicios especializados para niños, niñas y jóvenes con alteraciones sensoriomotoras derivadas de lesiones del sistema nervioso central.",
            },
            {
                year: "",
                title: "Nuestra Evolución",
                description:
                    "Con el tiempo se impuso la necesidad de ir más allá y capacitar a familias, profesionales y entidades tanto públicas como privadas en relación con el desarrollo integral del niño, sus alteraciones y los tratamientos idóneos que deben brindarse.",
            },
        ],
    },
    fundadores: [
        { name: "Berta Brunal", role: "fundadora", imageUrl: "/images/quienes-original/fundadora-berta.png" },
        { name: "Patricia Flórez", role: "Fundadora", imageUrl: "/images/quienes-original/fundadora-patricia.png" },
        { name: "Laureano González", role: "fundador", imageUrl: "/images/quienes-original/fundador-laureano.png" },
        { name: "Beatríz Acevedo", role: "Fundadora", imageUrl: "/images/quienes-original/fundadora-beatriz.png" },
        { name: "Miryam Barrera", role: "Fundadora", imageUrl: "/images/quienes-original/fundadora-miryam.png" },
        { name: "Lila Cañaveras", role: "Fundadora", imageUrl: "/images/quienes-original/fundadora-lila.png" },
        { name: "Juan Andrade", role: "Fundador", imageUrl: "/images/quienes-original/fundador-juan.png" },
        { name: "Guillermo Ronderos", role: "Fundador", imageUrl: "/images/quienes-original/fundador-guillermo.png" },
        { name: "Rosana Bonilla", role: "Fundadora", imageUrl: "/images/quienes-original/fundadora-rosana.png" },
    ],
    semillas: [
        { name: "Sandra Arbeláez", imageUrl: "/images/quienes-original/semilla-sandra.png" },
        { name: "Ernesto Constantín", imageUrl: "/images/quienes-original/semilla-ernesto.png" },
        { name: "Juan Carlos Andrade", imageUrl: "/images/quienes-original/semilla-juan.png" },
        { name: "Guillermo José Ronderos", imageUrl: "/images/quienes-original/semilla-guillermo.png" },
        { name: "Camilo González", imageUrl: "/images/quienes-original/semilla-camilo.png" },
        { name: "Daniel Domínguez", imageUrl: "/images/quienes-original/semilla-daniel.png" },
    ],
    junta: {
        title: "Junta directiva",
        photoUrl: "/images/quienes-original/junta.jpg",
        photoAlt: "Junta Directiva de la Asociación Aconiño",
        roles: [
            {
                position: "Presidente",
                people: [
                    {
                        name: "Germán Camilo Lleras Echeverry",
                        description:
                            "Forma parte de una de las familias fundadoras de Aconiño. Por cerca de 20 años se ha dedicado a la consultoría especializada en transporte, ciudades e infraestructura y a la docencia en la ingeniería civil.",
                    },
                ],
            },
            {
                position: "Secretaria",
                people: [
                    {
                        name: "Myriam Lilia Barrera Castillo",
                        description:
                            "Fisioterapeuta experta en Neurodesarrollo, egresada de la Universidad Nacional de Colombia, donde trabajó como profesora por más de 30 años. Fundadora de Asociación Aconiño, actualmente secretaria de la Junta Directiva.",
                    },
                ],
            },
            {
                position: "Vocal",
                people: [
                    {
                        name: "Gloria Lucía Santa",
                        description:
                            "Contadora de la Universidad Nacional de Colombia, especializada en administración de empresas y en gerencia de servicios de salud. Con amplia experiencia en la gestión administrativa y financiera de entidades de salud públicas y privadas, en la academia, consultoría e investigación.",
                    },
                    {
                        name: "Juan Carlos Andrade Flórez",
                        description:
                            "Abogado y especialista en derecho laboral y seguridad social de la Universidad del Rosario, conferencista en temas de inclusión y discapacidad con 7 años de experiencia, fundador de Asociación Aconiño.",
                    },
                    {
                        name: "Jose Ignacio Leiva González",
                        description:
                            "Abogado egresado de la Universidad Javeriana, especialista en derecho administrativo del Colegio Mayor de Nuestra Señora del Rosario y con estudios en resolución alternativa de conflictos y arbitraje de la Universidad de Western Sydney, Australia.",
                    },
                ],
            },
            {
                position: "Vicepresidente",
                people: [
                    {
                        name: "Norma Inés Orjuela de Deeb",
                        description:
                            "Médica de la Universidad Javeriana, con entrenamiento, experiencia y afinidad por la Gestión Integral en Calidad y Mejoramiento Continuo de servicios de salud, reflejados en la capacidad de diseñar, desarrollar, implementar y evaluar mecanismos y sistemas de gestión que permitan la mejora de la calidad de los servicios de salud y la adquisición de habilidades gerenciales integrales. Experiencia laboral en los sectores público y privado, en los niveles local, departamental y nacional, e internacional.",
                    },
                ],
            },
        ],
    },
    equipo: {
        title: "Equipo de trabajo",
        imageUrl: "/images/quienes-original/equipo.jpg",
        imageAlt: "Equipo de trabajo de la Asociación Aconiño",
        secondImageUrl: "/images/quienes-original/historia.jpg",
        secondImageAlt: "Equipo de trabajo de la Asociación Aconiño",
    },
    admin: {
        title: "Equipo administrativo",
    },
    asociacionImageUrl: "/images/quienes-original/asociacion.jpg",
    asociacionImageAlt: "Asociación de usuarios Aconiño",
};

export default function QuienesSomosPage() {

    return (
        <main className="min-h-screen bg-transparent">
            <NosotrosHero data={pageData?.hero} />
            <NosotrosIntro data={pageData?.identidad} />
            <NosotrosMission data={pageData?.mision} />
            <NosotrosVision data={pageData?.vision} />
            <NosotrosHistory data={pageData?.historia} />
            <NosotrosFundadores data={pageData?.fundadores} />
            <NosotrosSemillas data={pageData?.semillas} />
            <NosotrosJuntaPhoto data={pageData?.junta} />
            <NosotrosJuntaRoles data={pageData?.junta?.roles} />
            <NosotrosEquipo data={pageData?.equipo} />
            <NosotrosAdmin data={pageData?.admin} />
            <div id="asociacion-usuarios" className="scroll-mt-32">
                <AsociacionIntro imageUrl={pageData?.asociacionImageUrl} imageAlt={pageData?.asociacionImageAlt} />
                <AsociacionBanner />
                <AsociacionDetails />
            </div>
        </main>
    );
}
