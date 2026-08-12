"use client";

import { useEffect } from 'react';
import ComingSoonOverlay from '@/components/apoyanos/ComingSoonOverlay';
import { useComingSoon } from '@/providers/ComingSoonProvider';

export default function ApoyanosClient() {
    const { setShowComingSoon } = useComingSoon();

    useEffect(() => {
        setShowComingSoon(true);
        return () => setShowComingSoon(false);
    }, [setShowComingSoon]);

    // Render the Coming Soon content directly inline — NOT via portal —
    // to avoid hydration mismatches and z-index conflicts in production.
    // The page content (CentroDiaHero, DonationCatalog, etc.) is intentionally
    // not rendered while the Coming Soon state is active.
    return (
        <main className="min-h-screen">
            <ComingSoonOverlay
                show={true}
                targetYear={2027}
                targetMonth={8}
                message="Centro Día para Adultos"
            />
        </main>
    );
}
