import Link from "next/link";
import Image from "next/image";

export default function FooterHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <Link href="/" className="mb-6 inline-block group">
        <div className="bg-white/95 p-2 md:p-3 rounded-2xl shadow-xl group-hover:scale-105 active:scale-[0.97] transition-all duration-300">
          <Image 
            src="/images/logo_aconino.png" 
            alt="Aconiño Logo" 
            width={160} 
            height={160}
            className="w-16 md:w-32 h-auto"
          />
        </div>
      </Link>
      <div className="w-full text-center mt-4">
        <h4 className="text-accent/80 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-1">
          App Aconiño
        </h4>
        <h4 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase">
          ¡Próximamente!
        </h4>
      </div>
    </div>
  );
}
