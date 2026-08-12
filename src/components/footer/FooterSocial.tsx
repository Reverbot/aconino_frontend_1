import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

interface FooterLink {
  label?: string;
  url?: string;
}

interface FooterSocialProps {
  socialLinks: FooterLink[];
}


export default function FooterSocial({ socialLinks }: FooterSocialProps) {
  const renderSocialIcon = (url?: string) => {
    if (!url) return <FaFacebook className="w-5 h-5" />;
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('facebook')) return <FaFacebook className="w-5 h-5" />;
    if (lowerUrl.includes('instagram')) return <FaInstagram className="w-5 h-5" />;
    if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return <FaTwitter className="w-5 h-5" />;
    if (lowerUrl.includes('linkedin')) return <FaLinkedin className="w-5 h-5" />;
    if (lowerUrl.includes('youtube')) return <FaYoutube className="w-5 h-5" />;
    return <FaFacebook className="w-5 h-5" />; 
  };

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <h4 className="text-white font-black text-xs tracking-[0.2em] uppercase mb-5">
        Síguenos
      </h4>
      <div className="flex gap-4 items-center justify-center md:justify-start">
        {socialLinks.map((social, idx) => (
          <a 
            key={social.label || social.url || `social-${idx}`} 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:-translate-y-1 shrink-0 hover:bg-accent hover:border-accent hover:text-primary transition-all duration-300 shadow-sm hover:shadow-accent/40"
            aria-label={social.label}
          >
            {renderSocialIcon(social.url)}
          </a>
        ))}
      </div>
    </div>
  );
}
