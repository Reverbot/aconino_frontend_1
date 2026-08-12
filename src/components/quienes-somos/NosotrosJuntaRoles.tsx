import { FaChevronDown, FaUserTie } from "react-icons/fa";

interface JuntaPersonData {
  name?: string;
  description?: string;
}

interface JuntaRoleData {
  position?: string;
  name?: string;
  description?: string;
  people?: JuntaPersonData[];
}

interface Props {
  data?: JuntaRoleData[] | null;
}

const defaultRoles: JuntaRoleData[] = [
  { position: "PRESIDENTE", people: [{ name: "Germán Camilo Lleras Echeverry", description: "Lidera la junta directiva y representa legalmente a la asociación." }] },
  { position: "VICEPRESIDENTE", people: [{ name: "Norma Inés Orjuela Deep", description: "Apoya al presidente en sus funciones y asume la dirección en su ausencia." }] },
  { position: "SECRETARIA", people: [{ name: "Myriam Lilia Barrera Castillo", description: "Gestiona la documentación oficial y comunicación institucional." }] },
  { position: "VOCAL", people: [
    { name: "Laureano González Barbosa", description: "Representa a los asociados y vela por el cumplimiento de los estatutos." },
    { name: "Jose Ignacio Leiva González", description: "Aporta experiencia en áreas estratégicas." },
    { name: "Juan Carlos Andrade Flórez", description: "Colabora en la supervisión de proyectos y programas." },
  ] },
];

const POSITION_ORDER = ["PRESIDENTE", "VICEPRESIDENTE", "SECRETARIA", "VOCAL"];

function normalizeRole(role: JuntaRoleData) {
  if (role.people?.length) return { position: role.position || "", people: role.people };
  if (role.name) return { position: role.position || "", people: [{ name: role.name, description: role.description }] };
  return { position: role.position || "", people: [] };
}

function PersonCard({ person }: { person: JuntaPersonData }) {
  if (!person.name) return null;

  return (
    <details className="group/person rounded-xl transition-all duration-300 open:bg-white/5">
      <summary className="cursor-pointer list-none py-3 px-3 -mx-3 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <h5 className="font-extrabold text-base md:text-xl text-white group-open/person:text-accent">{person.name}</h5>
        {person.description && <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/40 group-hover/person:border-accent group-hover/person:text-accent group-open/person:bg-accent group-open/person:border-accent group-open/person:text-primary group-open/person:rotate-180 transition-all"><FaChevronDown className="text-[10px]" /></span>}
      </summary>
      {person.description && <p className="text-gray-400 text-sm md:text-base mt-1 leading-relaxed border-t border-white/5 pt-3 px-3 font-medium italic">&ldquo;{person.description}&rdquo;</p>}
    </details>
  );
}

function RoleCard({ role }: { role: { position: string; people: JuntaPersonData[] } }) {
  if (!role.position) return null;

  return (
    <div className="group mb-10 md:mb-12 last:mb-0">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent transition-colors duration-300"><FaUserTie className="text-accent group-hover:text-primary text-xs md:text-sm" /></div>
        <h4 className="text-accent font-black text-[10px] md:text-sm tracking-[0.2em] uppercase">{role.position}</h4>
      </div>
      <div className="pl-6 md:pl-11 border-l border-white/10 group-hover:border-accent/30 transition-colors duration-500 space-y-2">
        {role.people.map((person, index) => <PersonCard key={`${role.position}-${index}`} person={person} />)}
      </div>
    </div>
  );
}

export default function NosotrosJuntaRoles({ data }: Props) {
  const roles = (data?.length ? data : defaultRoles)
    .map(normalizeRole)
    .sort((a, b) => {
      const aIndex = POSITION_ORDER.indexOf(a.position.trim().toUpperCase());
      const bIndex = POSITION_ORDER.indexOf(b.position.trim().toUpperCase());
      return (aIndex === -1 ? POSITION_ORDER.length : aIndex) - (bIndex === -1 ? POSITION_ORDER.length : bIndex);
    });
  const midpoint = Math.ceil(roles.length / 2);

  return (
    <section className="bg-primary relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 opacity-[0.05] bg-white/10 mix-blend-overlay" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="flex flex-col gap-8">{roles.slice(0, midpoint).map((role) => <RoleCard key={role.position} role={role} />)}</div>
        <div className="flex flex-col gap-8">{roles.slice(midpoint).map((role) => <RoleCard key={role.position} role={role} />)}</div>
      </div>
    </section>
  );
}
