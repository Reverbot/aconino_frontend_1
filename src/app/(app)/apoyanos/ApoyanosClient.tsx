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
