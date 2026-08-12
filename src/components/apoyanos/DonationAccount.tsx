"use client";

import { useState } from "react";
import { FaRegCopy, FaCheck, FaUniversity } from "react-icons/fa";

const DONATION_ACCOUNT = {
  banco: "Bancolombia",
  tipo: "Cuenta de ahorros",
  numero: "69900010357",
  titular: "Asociación Centro de Atención para Niños TR",
};

export default function DonationAccount() {
  const [copied, setCopied] = useState(false);
  const hasData = Boolean(DONATION_ACCOUNT.numero);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DONATION_ACCOUNT.numero);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // portapapeles no disponible
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 md:p-8 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-4">
          <FaUniversity className="text-accent text-xl" />
        </div>

        <h4 className="text-white font-black text-lg md:text-3xl mb-1">Dona por transferencia</h4>

        {hasData ? (
          <>
            <p className="text-white/70 text-sm mb-4">
              {[DONATION_ACCOUNT.banco, DONATION_ACCOUNT.tipo].filter(Boolean).join(" · ")}
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-3 bg-accent text-primary font-black tracking-wide px-6 py-3 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
            >
              <span>{DONATION_ACCOUNT.numero}</span>
              {copied ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
            </button>
            {copied && <p className="text-accent text-xs font-bold mt-2">¡Copiado!</p>}
            <p className="text-xl text-white/50 mt-3">A nombre de {DONATION_ACCOUNT.titular}</p>
          </>
        ) : (
          <p className="text-xl text-white/60">Datos de la cuenta próximamente</p>
        )}
      </div>
    </div>
  );
}
