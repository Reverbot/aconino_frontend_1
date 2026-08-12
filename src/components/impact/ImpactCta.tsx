import { FaWhatsapp } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/573133910760";

interface ImpactCtaProps {
  ctaButtonText?: string;
}

export default function ImpactCta({ ctaButtonText }: ImpactCtaProps) {
  return (
    <div className="flex justify-center px-4 mt-12 md:mt-16">
      <div className="relative flex justify-center group">
        <div className="absolute -top-14 whitespace-nowrap bg-primary text-accent px-5 py-2.5 rounded-full shadow-[0_10px_25px_rgba(12,32,112,0.3)] pointer-events-none flex items-center gap-2 z-50 border-2 border-primary/90 opacity-0 translate-y-3 scale-90 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:scale-100">
          <Sparkles className="w-4 h-4" />
          <span className="font-bold text-sm uppercase tracking-widest">¿Quieres donar?</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45 -z-10" />
        </div>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-accent text-primary rounded-full shadow-[0_10px_30px_rgba(248,183,25,0.4)] transition-all border-4 border-accent hover:bg-primary hover:text-accent hover:scale-105 active:scale-[0.97] group z-10"
          aria-label={ctaButtonText || "Escríbenos por WhatsApp"}
        >
          <span className="absolute inset-0 bg-accent rounded-full -z-10 animate-pulse opacity-30" />
          <FaWhatsapp className="text-4xl md:text-5xl drop-shadow-md" />
        </a>
      </div>
    </div>
  );
}
