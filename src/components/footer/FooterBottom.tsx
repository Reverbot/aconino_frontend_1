import React from "react";
import Link from "next/link";

interface FooterLink {
  label?: string;
  url?: string;
  href?: string;
}

interface FooterBottomProps {
  legalLinks: FooterLink[];
}

const currentYear = new Date().getFullYear();

export default function FooterBottom({ legalLinks }: FooterBottomProps) {
  return (
    <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
      <p className="text-xs text-gray-500 text-center lg:text-left font-medium tracking-wide mb-4">
        © {currentYear} Asociación Aconiño. Todos los derechos reservados.
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-xs font-medium tracking-wide text-gray-500">
        <Link href="/politica-privacidad" className="hover:text-white hover:underline underline-offset-4 decoration-accent transition-all">Política de Privacidad</Link>
        <span className="hidden md:inline text-white/20">|</span>
        <Link href="/terminos-condiciones" className="hover:text-white hover:underline underline-offset-4 decoration-accent transition-all">Términos y Condiciones</Link>
        
        {legalLinks.map((link, idx) => (
           <React.Fragment key={`legal-${idx}`}>
             <span className="hidden md:inline text-white/20">|</span>
             <Link href={link.url || link.href || "#"} className="hover:text-white hover:underline underline-offset-4 decoration-accent transition-all">{link.label}</Link>
           </React.Fragment>
        ))}
      </div>
    </div>
  );
}
