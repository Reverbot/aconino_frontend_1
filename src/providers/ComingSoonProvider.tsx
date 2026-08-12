"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";

interface ComingSoonContextType {
  showComingSoon: boolean;
  setShowComingSoon: (show: boolean) => void;
  targetYear: number;
  setTargetYear: (year: number) => void;
  message: string;
  setMessage: (message: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(undefined);

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [targetYear, setTargetYear] = useState(2027);
  const [message, setMessage] = useState("Centro Día para Adultos");

  const value = useMemo(() => ({
    showComingSoon, 
    setShowComingSoon, 
    targetYear, 
    setTargetYear,
    message,
    setMessage
  }), [showComingSoon, targetYear, message]);

  return (
    <ComingSoonContext.Provider value={value}>
      {children}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (context === undefined) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return context;
}