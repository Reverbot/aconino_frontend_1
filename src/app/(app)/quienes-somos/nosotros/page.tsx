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

export default function QuienesSomosPage() {
    const pageData: QuienesSomosData = {};

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
