"use client";

import { useState } from 'react';
import CentroDiaHero from '@/components/apoyanos/CentroDiaHero';
import ConstructionProgress from '@/components/apoyanos/ConstructionProgress';
import BlueprintMap from '@/components/apoyanos/BlueprintMap';
import ZoneDetailModal from '@/components/apoyanos/ZoneDetailModal';
import DonationCatalog from '@/components/apoyanos/DonationCatalog';
import DonationImpact from '@/components/apoyanos/DonationImpact';
import FAQ from '@/components/apoyanos/FAQ';
import FinalCTA from '@/components/apoyanos/FinalCTA';
import ImpactCta from '@/components/impact/ImpactCta';
import { initialProgress } from '@/data/centro-dia-needs';
import { CenterZone } from '@/types/centro-dia';

export default function ApoyanosPageClient() {
    const [selectedZone, setSelectedZone] = useState<CenterZone | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleZoneClick = (zone: CenterZone) => {
        setSelectedZone(zone);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <CentroDiaHero />
            <ConstructionProgress 
                goal={initialProgress.goal}
                raised={initialProgress.raised}
                donors={initialProgress.donors}
            />
            <BlueprintMap 
                zones={initialProgress.zones}
                onZoneClick={handleZoneClick}
            />
            <DonationCatalog />
            <DonationImpact />
            <FAQ />
            <FinalCTA />

            {/* Botón de donar por WhatsApp (igual al del inicio) */}
            <div className="bg-white pb-16 md:pb-24">
                <ImpactCta />
            </div>

            <ZoneDetailModal 
                zone={selectedZone}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
