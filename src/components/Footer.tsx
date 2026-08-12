import React from "react";
import FooterHeader from "./footer/FooterHeader";
import FooterNav from "./footer/FooterNav";
import FooterContact from "./footer/FooterContact";
import FooterApps from "./footer/FooterApps";
import FooterBottom from "./footer/FooterBottom";

interface FooterLink {
  label?: string;
  url?: string;
  href?: string;
}

interface DocumentoLegal {
  _id: string;
  titulo: string;
  categoria: string;
  archivoUrl?: string;
  enlaceExterno?: string;
  descripcion?: string;
  orden: number;
}

interface FooterProps {
  settings?: {
    phoneNumber?: string;
    mobilePhone?: string;
    email?: string;
    address?: string;
    socialLinks?: FooterLink[];
    footerLinks?: FooterLink[];
    legalLinks?: FooterLink[];
    appDownloadUrl?: string;
    controlEntity?: string;
    footerInfo?: {
      copyright?: string;
      designBy?: string;
      controlEntity?: string;
    };
  };
  documentosLegales?: DocumentoLegal[];
}

export default function Footer({ settings, documentosLegales }: FooterProps) {
  const defaultPhone = "(601) 650 8473";
  const defaultMobile = "313 391 0760";
  const defaultEmail = "apoyoinclusion@aconino.org";
    
  const defaultLinks: FooterLink[] = [
    { label: "Canales de denuncia", url: "/canales-denuncia" },
    { label: "Trabaja con nosotros", url: "/trabaja-con-nosotros" },
  ];

  const displayLinks = settings?.footerLinks?.length 
    ? settings.footerLinks 
    : defaultLinks;

  const legalLinks = settings?.legalLinks?.length ? settings.legalLinks : [];

  const socialLinks = settings?.socialLinks || [
    { url: "https://facebook.com/asociacionaconino", label: "Facebook" },
    { url: "https://instagram.com/asociacion_aconino", label: "Instagram" }
  ];

  const controlEntity = settings?.controlEntity || settings?.footerInfo?.controlEntity;

  return (
    <footer className="bg-primary text-gray-300 mt-auto pt-24 md:pt-32 pb-0 font-sans relative overflow-hidden border-t border-white/5">
      {/* Enhanced Background Glow for depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-6">
          <div className="space-y-8">
            <FooterHeader />
          </div>

          <FooterNav links={displayLinks} documentosLegales={documentosLegales} />

          <FooterContact
            address={settings?.address}
            phone={settings?.phoneNumber || defaultPhone}
            mobile={settings?.mobilePhone || defaultMobile}
            email={settings?.email || defaultEmail}
          />

          <FooterApps
            appDownloadUrl={settings?.appDownloadUrl}
            socialLinks={socialLinks}
            controlEntity={controlEntity}
          />
        </div>

        <FooterBottom legalLinks={legalLinks} />
      </div>
    </footer>
  );
}
