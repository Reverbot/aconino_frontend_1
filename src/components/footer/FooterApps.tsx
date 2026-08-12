import Image from "next/image";
import FooterSocial from "./FooterSocial";

interface FooterAppsProps {
  appDownloadUrl?: string;
  controlEntity?: string;
  socialLinks?: FooterLink[];
}

interface FooterLink {
  label?: string;
  url?: string;
}

export default function FooterApps({ socialLinks }: FooterAppsProps) {
  
  return (
    <div className="flex flex-col items-center md:items-start w-full gap-12">
      {/* App Buttons Section */}
      <div className="w-full flex flex-col items-center md:items-start">
        <FooterSocial socialLinks={socialLinks ?? []} />
      </div>

      {/* Vigilancia Section */}
      <div className="w-full flex flex-col items-center md:items-start">
        <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-6 opacity-70">
          Vigilancia
        </h4>
        <div className="relative group inline-block w-fit">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative p-3 md:p-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 flex justify-center items-center hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
            <Image 
              src="/images/vigilado-supersalud-1.png" 
              alt="Vigilado Supersalud" 
              width={180} 
              height={60} 
              className="h-[32px] md:h-[40px] w-auto object-contain brightness-90 group-hover:brightness-100 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
