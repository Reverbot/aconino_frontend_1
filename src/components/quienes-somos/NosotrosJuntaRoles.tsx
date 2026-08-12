"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "@/compat/motion";
import { FaUserTie, FaChevronDown } from "react-icons/fa";

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
    { 
        position: "PRESIDENTE", 
        people: [
            { name: "Germán Camilo Lleras Echeverry", description: "Lidera la junta directiva y representa legalmente a la asociación." }
        ]
    },
    { 
        position: "VICEPRESIDENTE", 
        people: [
            { name: "Norma Inés Orjuela Deep", description: "Apoya al presidente en sus funciones y asume la dirección en su ausencia." }
        ]
    },
    { 
        position: "SECRETARIA", 
        people: [
            { name: "Myriam Lilia Barrera Castillo", description: "Gestiona la documentación oficial y comunicación institucional." }
        ]
    },
    { 
        position: "VOCAL", 
        people: [
            { name: "Laureano González Barbosa", description: "Representa a los asociados y vela por el cumplimiento de los estatutos." },
            { name: "Jose Ignacio Leiva González", description: "Aporta experiencia en áreas estratégicas." },
            { name: "Juan Carlos Andrade Flórez", description: "Colabora en la supervisión de proyectos y programas." }
        ]
    },
];

// Orden de los cargos de la junta (los no listados van al final)
const POSITION_ORDER = ["PRESIDENTE", "VICEPRESIDENTE", "SECRETARIA", "VOCAL"];

function rolePriority(position: string): number {
    const idx = POSITION_ORDER.indexOf((position || "").trim().toUpperCase());
    return idx === -1 ? POSITION_ORDER.length : idx;
}

function normalizeRole(role: JuntaRoleData): { position: string; people: JuntaPersonData[] } {
    if (role.people && Array.isArray(role.people) && role.people.length > 0) {
        return {
            position: role.position || "",
            people: role.people
        };
    }
    
    if (role.name) {
        return {
            position: role.position || "",
            people: [{ name: role.name, description: role.description }]
        };
    }
    
    return {
        position: role.position || "",
        people: []
    };
}

function PersonCard({ person, isExpanded, onToggle }: { person: JuntaPersonData; isExpanded: boolean; onToggle: () => void }) {
    if (!person.name) return null;
    
    return (
        <motion.div 
            whileTap={{ scale: 0.98 }}
            className={`group cursor-pointer py-3 px-3 -mx-3 rounded-xl transition-all duration-300 ${isExpanded ? 'bg-white/5' : 'hover:bg-white/[0.03]'}`} 
            onClick={onToggle}
        >
            <div className="flex items-center justify-between gap-4">
                <h5 className={`font-extrabold text-base md:text-xl transition-colors duration-300 ${isExpanded ? 'text-accent' : 'text-white'}`}>
                    {person.name}
                </h5>
                {person.description && (
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isExpanded ? 'bg-accent border-accent text-primary rotate-180' : 'border-white/20 text-white/40 group-hover:border-accent group-hover:text-accent'}`}>
                        <FaChevronDown className="text-[10px]" />
                    </div>
                )}
            </div>
            <AnimatePresence>
                {isExpanded && person.description && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed border-t border-white/5 pt-3 font-medium italic">
                            &ldquo;{person.description}&rdquo;
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function RoleCard({ role, expandedPerson, onTogglePerson }: { 
    role: { position: string; people: JuntaPersonData[] };
    expandedPerson: string | null;
    onTogglePerson: (id: string) => void;
}) {
    if (!role.position) return null;
    
    const people = role.people || [];
    
    return (
        <motion.div 
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="group mb-10 md:mb-12 last:mb-0"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent transition-colors duration-300">
                    <FaUserTie className="text-accent group-hover:text-primary text-xs md:text-sm" />
                </div>
                <h4 className="text-accent font-black text-[10px] md:text-sm tracking-[0.2em] uppercase">
                    {role.position}
                </h4>
            </div>
            <div className="pl-6 md:pl-11 border-l border-white/10 group-hover:border-accent/30 transition-colors duration-500 space-y-2">
                {people.map((person, personIdx) => {
                    const personId = `${role.position}-${personIdx}`;
                    return (
                        <PersonCard 
                            key={personIdx}
                            person={person}
                            isExpanded={expandedPerson === personId}
                            onToggle={() => onTogglePerson(personId)}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
}

export default function NosotrosJuntaRoles({ data }: Props) {
    const roles = data && data.length > 0 ? data : defaultRoles;
    
    const normalizedRoles = useMemo(() => {
        return roles
            .map(role => normalizeRole(role))
            .sort((a, b) => rolePriority(a.position) - rolePriority(b.position));
    }, [roles]);
    
    const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

    const togglePerson = (id: string) => {
        setExpandedPerson(expandedPerson === id ? null : id);
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
    };

    const allRoles = [...normalizedRoles];
    const midPoint = Math.ceil(allRoles.length / 2);
    const leftColumn = allRoles.slice(0, midPoint);
    const rightColumn = allRoles.slice(midPoint);

    return (
        <section className="bg-primary relative overflow-hidden py-20 md:py-28">
            <div className="absolute inset-0 opacity-[0.05] bg-white/10 mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
                >
                    <div className="flex flex-col gap-8">
                        {leftColumn.map((role, idx) => {
                            if (!role) return null;
                            return (
                                <RoleCard 
                                    key={idx} 
                                    role={role}
                                    expandedPerson={expandedPerson}
                                    onTogglePerson={togglePerson}
                                />
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-8">
                        {rightColumn.map((role, idx) => {
                            if (!role) return null;
                            return (
                                <RoleCard 
                                    key={idx + midPoint} 
                                    role={role}
                                    expandedPerson={expandedPerson}
                                    onTogglePerson={togglePerson}
                                />
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
