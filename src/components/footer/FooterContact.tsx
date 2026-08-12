import { FaPhoneAlt, FaMobileAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface FooterContactProps {
  address?: string;
  phone?: string;
  mobile?: string;
  email?: string;
}

export default function FooterContact({ address, phone, mobile, email }: FooterContactProps) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left w-full h-full">
      <h4 className="text-accent/80 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-5">Contacto</h4>
      <ul className="space-y-3 text-sm text-gray-400 w-full flex flex-col items-center md:items-start pl-2">
        <li className="flex items-start gap-4 rounded-xl hover:bg-white/5 transition-colors group w-full md:w-auto">
          <div className="mt-1 text-accent/80 group-hover:text-white group-hover:scale-110 transition-all shrink-0"><FaMapMarkerAlt size={16} /></div>
          <span className="leading-tight pt-1 text-left">{address || "Sede Norte, Bogotá"}</span>
        </li>
        <li className="flex items-center gap-4 rounded-xl hover:bg-white/5 transition-colors group w-full md:w-auto">
          <div className="text-accent/80 group-hover:text-white group-hover:scale-110 transition-all shrink-0"><FaPhoneAlt size={16} /></div>
          <a href={`tel:${phone}`} className="hover:text-white active:scale-[0.98] transition-colors text-left">
            {phone}
          </a>
        </li>
        <li className="flex items-center gap-4 rounded-xl hover:bg-white/5 transition-colors group w-full md:w-auto">
          <div className="text-accent/80 group-hover:text-white group-hover:scale-110 transition-all shrink-0"><FaMobileAlt size={16} /></div>
          <a href={`tel:${mobile}`} className="hover:text-white active:scale-[0.98] transition-colors text-left">
            {mobile}
          </a>
        </li>
        <li className="flex items-center gap-4 rounded-xl hover:bg-white/5 transition-colors group w-full md:w-auto">
          <div className="text-accent/80 group-hover:text-white group-hover:scale-110 transition-all shrink-0"><FaEnvelope size={16} /></div>
          <a href={`mailto:${email}`} className="hover:text-white active:scale-[0.98] transition-colors break-all text-sm md:text-[15px] text-left">
            {email}
          </a>
        </li>
      </ul>
    </div>
  );
}
