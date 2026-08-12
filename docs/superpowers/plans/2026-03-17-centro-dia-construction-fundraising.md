# Centro Día - Página de Construcción Implementation Plan

**Goal:** Rediseñar la página de Apoyanos para campaña de construcción del nuevo Centro Día para adultos, atrayendo donaciones monetarias y en especie (materiales, equipos, muebles) de donors nacionales e internacionales.

**Architecture:** Página con diseño Blueprint/Plano arquitectónico interactivo que muestra el progreso de construcción por zonas del centro. Cada zona es clickeable y muestra necesidades específicas con opciones de donación.

**Tech Stack:** Next.js 14, Framer Motion, Tailwind CSS, React Icons

---

## Estructura de Archivos

### Archivos a Crear:
- `src/components/apoyanos/CentroDiaHero.tsx` - Hero con tema construcción
- `src/components/apoyanos/ConstructionProgress.tsx` - Barra de progreso general
- `src/components/apoyanos/BlueprintMap.tsx` - Mapa interactivo del centro
- `src/components/apoyanos/ZoneDetailModal.tsx` - Modal detallado por zona
- `src/components/apoyanos/DonationCatalog.tsx` - Catálogo de donaciones
- `src/components/apoyanos/DonationImpact.tsx` - Impacto de donaciones
- `src/types/centro-dia.ts` - Tipos para datos del centro
- `src/data/centro-dia-needs.ts` - Datos de necesidades del centro

### Archivos a Modificar:
- `src/app/(app)/apoyanos/page.tsx`

---

## Chunk 1: Configuración Inicial

### Task 1: Crear tipos y datos

**Files:**
- Create: `src/types/centro-dia.ts`
- Create: `src/data/centro-dia-needs.ts`

```typescript
// src/types/centro-dia.ts
export type DonationType = 'monetary' | 'material' | 'equipment' | 'furniture';

export interface NeedItem {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  unit: string;
  quantityNeeded: number;
  quantityDonated: number;
  type: DonationType;
}

export interface CenterZone {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalNeeded: number;
  totalRaised: number;
  needs: NeedItem[];
}

export interface ConstructionProgress {
  goal: number;
  raised: number;
  donors: number;
  zones: CenterZone[];
}
```

```typescript
// src/data/centro-dia-needs.ts
import { ConstructionProgress } from '@/types/centro-dia';

export const initialProgress: ConstructionProgress = {
  goal: 500000000,
  raised: 45000000,
  donors: 127,
  zones: [
    {
      id: 'area-therapy',
      name: 'Sala de Terapia',
      description: 'Espacio especializado para neurorehabilitación',
      icon: 'FaHandHoldingMedical',
      totalNeeded: 80000000,
      totalRaised: 15000000,
      needs: [
        { id: 't1', name: 'Piso flotante', description: 'Piso laminado', unitPrice: 85000, unit: 'm²', quantityNeeded: 120, quantityDonated: 45, type: 'material' },
        { id: 't2', name: 'Espejo grande', unitPrice: 450000, unit: 'und', quantityNeeded: 4, quantityDonated: 1, type: 'equipment' },
        { id: 't3', name: 'Silla de terapia', unitPrice: 280000, unit: 'und', quantityNeeded: 12, quantityDonated: 3, type: 'furniture' },
        { id: 't4', name: 'Televisor 55"', unitPrice: 1200000, unit: 'und', quantityNeeded: 2, quantityDonated: 0, type: 'equipment' },
      ]
    },
    {
      id: 'area-dormitory',
      name: 'Dormitorios',
      description: 'Habitaciones para descanso',
      icon: 'FaBed',
      totalNeeded: 120000000,
      totalRaised: 8000000,
      needs: [
        { id: 'd1', name: 'Cama articulada', unitPrice: 3500000, unit: 'und', quantityNeeded: 8, quantityDonated: 2, type: 'furniture' },
        { id: 'd2', name: 'Colchón viscoelástico', unitPrice: 450000, unit: 'und', quantityNeeded: 10, quantityDonated: 2, type: 'furniture' },
        { id: 'd3', name: 'Armario', unitPrice: 800000, unit: 'und', quantityNeeded: 6, quantityDonated: 0, type: 'furniture' },
      ]
    },
    {
      id: 'area-kitchen',
      name: 'Cocina Comunal',
      description: 'Cocina para alimentos',
      icon: 'FaUtensils',
      totalNeeded: 45000000,
      totalRaised: 12000000,
      needs: [
        { id: 'k1', name: 'Estufa industrial', unitPrice: 1800000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
        { id: 'k2', name: 'Refrigerador', unitPrice: 2500000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
        { id: 'k3', name: 'Mesón de cocina', unitPrice: 1200000, unit: 'und', quantityNeeded: 2, quantityDonated: 1, type: 'furniture' },
      ]
    },
    {
      id: 'area-multimedia',
      name: 'Sala Multiuso',
      description: 'Actividades y reuniones',
      icon: 'FaTv',
      totalNeeded: 60000000,
      totalRaised: 5000000,
      needs: [
        { id: 'm1', name: 'Televisor 65"', unitPrice: 1800000, unit: 'und', quantityNeeded: 2, quantityDonated: 0, type: 'equipment' },
        { id: 'm2', name: 'Proyector', unitPrice: 1500000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
      ]
    },
    {
      id: 'area-admin',
      name: 'Zona Administrativa',
      description: 'Oficinas y recepción',
      icon: 'FaBriefcase',
      totalNeeded: 35000000,
      totalRaised: 5000000,
      needs: [
        { id: 'a1', name: 'Escritorio', unitPrice: 650000, unit: 'und', quantityNeeded: 4, quantityDonated: 1, type: 'furniture' },
        { id: 'a2', name: 'Computador', unitPrice: 1500000, unit: 'und', quantityNeeded: 3, quantityDonated: 0, type: 'equipment' },
      ]
    }
  ]
};
```

---

## Chunk 2: Componentes Visuales

### Task 2: CentroDiaHero

**Files:**
- Create: `src/components/apoyanos/CentroDiaHero.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { FaHardHat, FaHandsHelping, FaGlobeAmericas } from "react-icons/fa";
import { useDonation } from "@/providers/DonationProvider";

export default function CentroDiaHero() {
  const { openDonationWidget } = useDonation();

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/40 rounded-full px-6 py-2 mb-6">
          <FaHardHat className="text-accent" />
          <span className="text-accent font-bold text-sm uppercase tracking-wider">Nueva Construcción</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6">
          Construyendo <span className="text-accent">Esperanza</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-medium">
          El nuevo Centro Día para Adultos
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto">
          Un espacio dedicado a la neurorehabilitación y cuidado integral de adultos. ¡Ayúdanos a hacer realidad este sueño!
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20">
            <FaGlobeAmericas className="text-accent" />
            <span className="text-white font-medium">Bogotá, Colombia</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 border border-white/20">
            <FaHandsHelping className="text-accent" />
            <span className="text-white font-medium">Donaciones Nacionales e Internacionales</span>
          </div>
        </motion.div>

        <motion.button onClick={openDonationWidget} className="inline-flex items-center justify-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-black text-lg tracking-widest shadow-2xl hover:scale-105 hover:bg-yellow-400 transition-all duration-300 uppercase">
          <FaHandsHelping />
          Donar Ahora
        </motion.button>
      </div>
    </section>
  );
}
```

### Task 3: ConstructionProgress

**Files:**
- Create: `src/components/apoyanos/ConstructionProgress.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { FaChartLine, FaUsers, FaCheckCircle } from "react-icons/fa";
import CountUp from "react-countup";

interface ConstructionProgressProps {
  goal: number;
  raised: number;
  donors: number;
}

export default function ConstructionProgress({ goal, raised, donors }: ConstructionProgressProps) {
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <section className="py-16 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Progreso de la Construcción</h2>
            <p className="text-white/70">Juntos estamos construyendo un futuro mejor</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-white/70 text-sm uppercase tracking-wider mb-1">Total Recaudado</p>
                <p className="text-4xl md:text-5xl font-black text-accent"><CountUp end={raised} duration={2} prefix="$" separator="." decimals={0} /></p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm uppercase tracking-wider mb-1">Meta</p>
                <p className="text-2xl md:text-3xl font-bold text-white"><CountUp end={goal} duration={2} prefix="$" separator="." decimals={0} /></p>
              </div>
            </div>

            <div className="h-6 bg-black/30 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-accent via-yellow-400 to-accent rounded-full relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>

            <div className="flex justify-between mt-3">
              <span className="text-white/70 text-sm">{percentage.toFixed(1)}% completado</span>
              <span className="text-white/70 text-sm">Faltan <CountUp end={goal - raised} duration={2} prefix="$" separator="." /></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <FaChartLine className="text-3xl text-accent mx-auto mb-3" />
              <p className="text-3xl font-black text-white"><CountUp end={percentage} duration={2} suffix="%" decimals={1} /></p>
              <p className="text-white/70 text-sm">del objetivo</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <FaUsers className="text-3xl text-accent mx-auto mb-3" />
              <p className="text-3xl font-black text-white"><CountUp end={donors} duration={2} separator="." /></p>
              <p className="text-white/70 text-sm">donantes</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 col-span-2 md:col-span-1">
              <FaCheckCircle className="text-3xl text-accent mx-auto mb-3" />
              <p className="text-3xl font-black text-white">5</p>
              <p className="text-white/70 text-sm">zonas en progreso</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Chunk 3: Mapa Interactivo y Modal

### Task 4: BlueprintMap

**Files:**
- Create: `src/components/apoyanos/BlueprintMap.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { FaHandHoldingMedical, FaBed, FaUtensils, FaTv, FaBriefcase, FaChevronRight } from "react-icons/fa";
import { CenterZone } from "@/types/centro-dia";

interface BlueprintMapProps {
  zones: CenterZone[];
  onZoneClick: (zone: CenterZone) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'FaHandHoldingMedical': FaHandHoldingMedical,
  'FaBed': FaBed,
  'FaUtensils': FaUtensils,
  'FaTv': FaTv,
  'FaBriefcase': FaBriefcase,
};

export default function BlueprintMap({ zones, onZoneClick }: BlueprintMapProps) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explora el Centro Día</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Haz clic en cada zona para ver las necesidades específicas</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200 p-8 md:p-12 border-2 border-primary/10">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0c2070 1px, transparent 1px), linear-gradient(90deg, #0c2070 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <div className="relative z-10">
            <div className="border-4 border-primary/30 rounded-2xl p-6 md:p-8 bg-primary/5">
              <h3 className="text-center text-primary font-bold text-lg mb-6 uppercase tracking-widest">Plano del Centro Día - Adultos</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {zones.map((zone, index) => {
                  const IconComponent = iconMap[zone.icon] || FaBriefcase;
                  const percentage = (zone.totalRaised / zone.totalNeeded) * 100;
                  
                  return (
                    <motion.button key={zone.id} onClick={() => onZoneClick(zone)} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02 }} className="group bg-white border-2 border-gray-200 rounded-xl p-4 text-left hover:border-accent hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <IconComponent className="text-primary group-hover:text-accent" />
                        </div>
                        <h4 className="font-bold text-primary text-sm">{zone.name}</h4>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${Math.min(percentage, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{percentage.toFixed(0)}%</span>
                        <span className="flex items-center gap-1 group-hover:text-accent">Ver más <FaChevronRight className="text-xs" /></span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Task 5: ZoneDetailModal

**Files:**
- Create: `src/components/apoyanos/ZoneDetailModal.tsx`

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaMoneyBillWave, FaBoxOpen, FaDesktop, FaChair, FaHandHoldingMedical, FaBed, FaUtensils, FaTv, FaBriefcase } from "react-icons/fa";
import { CenterZone, DonationType } from "@/types/centro-dia";
import { useDonation } from "@/providers/DonationProvider";

interface ZoneDetailModalProps {
  zone: CenterZone | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<DonationType, React.ComponentType<any>> = {
  monetary: FaMoneyBillWave,
  material: FaBoxOpen,
  equipment: FaDesktop,
  furniture: FaChair,
};

const typeLabels: Record<DonationType, string> = {
  monetary: 'Dinero',
  material: 'Materiales',
  equipment: 'Equipos',
  furniture: 'Muebles',
};

const iconMap: Record<string, React.ComponentType<any>> = {
  'FaHandHoldingMedical': FaHandHoldingMedical, 'FaBed': FaBed, 'FaUtensils': FaUtensils, 'FaTv': FaTv, 'FaBriefcase': FaBriefcase,
};

export default function ZoneDetailModal({ zone, isOpen, onClose }: ZoneDetailModalProps) {
  const { openDonationWidget } = useDonation();

  if (!zone) return null;

  const IconComponent = iconMap[zone.icon] || FaBriefcase;
  const percentage = (zone.totalRaised / zone.totalNeeded) * 100;

  const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-4 md:inset-10 bg-white rounded-3xl z-50 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center"><IconComponent className="text-2xl" /></div>
                <div>
                  <h2 className="text-2xl font-bold">{zone.name}</h2>
                  <p className="text-white/80 text-sm">{zone.description}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"><FaTimes /></button>
            </div>

            <div className="p-6 bg-gray-50 border-b">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-primary">Progreso de la zona</span>
                <span className="text-sm text-gray-600">{formatCurrency(zone.totalRaised)} / {formatCurrency(zone.totalNeeded)}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(percentage, 100)}%` }} className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="font-bold text-lg text-primary mb-4">Necesidades de esta zona</h3>
              <div className="space-y-3">
                {zone.needs.map((need) => {
                  const TypeIcon = typeIcons[need.type];
                  const donatedPercentage = (need.quantityDonated / need.quantityNeeded) * 100;
                  const isComplete = need.quantityDonated >= need.quantityNeeded;
                  
                  return (
                    <motion.div key={need.id} layout className={`bg-white border rounded-xl p-4 ${isComplete ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-accent'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete ? 'bg-green-100' : 'bg-gray-100'}`}>
                            {isComplete ? <FaCheckCircle className="text-green-600" /> : <TypeIcon className="text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{need.name}</h4>
                            <p className="text-sm text-gray-500">{need.description}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{typeLabels[need.type]}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{need.quantityDonated} / {need.quantityNeeded} {need.unit}</span>
                          <span className="font-bold text-primary">{formatCurrency(need.unitPrice)}/{need.unit}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-accent'}`} style={{ width: `${Math.min(donatedPercentage, 100)}%` }} />
                        </div>
                      </div>
                      {!isComplete && <button onClick={openDonationWidget} className="mt-3 w-full py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-secondary">Donar {need.unit} de {need.name}</button>}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <button onClick={openDonationWidget} className="w-full py-4 bg-accent text-primary rounded-xl font-bold text-lg hover:bg-yellow-400">Donar a esta zona</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

---

## Chunk 4: Catálogo y Impacto

### Task 6: DonationCatalog

**Files:**
- Create: `src/components/apoyanos/DonationCatalog.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { FaMoneyBillWave, FaBoxOpen, FaDesktop, FaChair, FaHeart, FaGlobe } from "react-icons/fa";
import { useDonation } from "@/providers/DonationProvider";

const categories = [
  { id: 'monetary', title: 'Donaciones Monetarias', description: 'Tu aporte ayuda a comprar materiales y pagar mano de obra', icon: FaMoneyBillWave, color: 'from-green-500 to-emerald-600', items: [{ name: '1 m² de piso', price: 85000 }, { name: 'Kit de materiales básicos', price: 500000 }, { name: 'Donación libre', price: 0 }] },
  { id: 'materials', title: 'Materiales de Construcción', description: 'Done materiales directamente', icon: FaBoxOpen, color: 'from-orange-500 to-red-600', items: [{ name: 'Bulto de cemento', price: 65000 }, { name: 'Ladrillo (100 und)', price: 180000 }, { name: 'Pintura (galón)', price: 95000 }] },
  { id: 'equipment', title: 'Equipos Electrónicos', description: 'Televisores, computadores, equipos', icon: FaDesktop, color: 'from-blue-500 to-indigo-600', items: [{ name: 'Televisor 55"', price: 1200000 }, { name: 'Computador', price: 1500000 }, { name: 'Proyector', price: 1500000 }] },
  { id: 'furniture', title: 'Muebles y Equipamiento', description: 'Sillas, mesas, camas, armarios', icon: FaChair, color: 'from-purple-500 to-pink-600', items: [{ name: 'Silla ergonómica', price: 280000 }, { name: 'Escritorio', price: 650000 }, { name: 'Cama articulada', price: 3500000 }] }
];

export default function DonationCatalog() {
  const { openDonationWidget } = useDonation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¿Cómo Puedes Ayudar?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Elige cómo contribuir. Aceptamos donaciones monetarias, materiales, equipos y muebles.</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-lg shadow-gray-200 overflow-hidden">
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <IconComponent className="text-3xl mb-3" />
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
                <div className="p-4 border-b border-gray-100"><p className="text-sm text-gray-600">{category.description}</p></div>
                <div className="p-4 space-y-2">
                  {category.items.slice(0, 3).map((item, i) => (
                    <button key={i} onClick={openDonationWidget} className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-bold text-primary">${item.price.toLocaleString('es-CO')}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 pt-0">
                  <button onClick={openDonationWidget} className={`w-full py-2 bg-gradient-to-r ${category.color} text-white rounded-lg font-medium text-sm`}><FaHeart className="inline mr-2" /> Ver más</button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-secondary to-primary rounded-3xl p-8 md:p-12 text-white text-center">
          <FaGlobe className="text-4xl mx-auto mb-4 text-accent" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Estás fuera de Colombia?</h3>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">Aceptamos donaciones internacionales. Contamos con cuentas bancarias internacionales.</p>
          <button onClick={openDonationWidget} className="px-8 py-3 bg-accent text-primary rounded-full font-bold hover:bg-yellow-400">Donar desde el Exterior</button>
        </motion.div>
      </div>
    </section>
  );
}
```

### Task 7: DonationImpact

**Files:**
- Create: `src/components/apoyanos/DonationImpact.tsx`

```tsx
"use client";

import { motion } from "framer-motion";
import { FaUsers, FaHome, FaHeart, FaAward } from "react-icons/fa";

const impacts = [
  { icon: FaUsers, value: '150+', label: 'Adultos beneficiados', description: 'Familias con acceso a neurorehabilitación' },
  { icon: FaHome, value: '1', label: 'Nuevo Centro Día', description: 'Espacio dedicado al cuidado integral' },
  { icon: FaHeart, value: '100%', label: 'Sin costo para pacientes', description: 'Gracias a donors como tú' },
  { icon: FaAward, value: '25', label: 'Años de experiencia', description: 'Trayectoria en neurorehabilitación' }
];

export default function DonationImpact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">El Impacto de Tu Donación</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Cada aporte suma para construir un lugar donde los adultos con discapacidad recibirán la atención que merecen.</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"><impact.icon className="text-3xl text-accent" /></div>
              <p className="text-4xl font-black text-primary mb-2">{impact.value}</p>
              <p className="font-bold text-gray-800 mb-2">{impact.label}</p>
              <p className="text-sm text-gray-500">{impact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
          <FaAward className="text-4xl text-accent mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium text-gray-700 mb-6 max-w-3xl mx-auto">"Construir este Centro Día es más que levantar paredes. Es crear un hogar donde cada adulto encontrará dignidad, cuidado y la oportunidad de vivir plenamente."</blockquote>
          <cite className="text-gray-500">— Equipo Aconiño, 25 años de trayectoria</cite>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Chunk 5: Página Principal

### Task 8: Actualizar página de Apoyanos

**Files:**
- Modify: `src/app/(app)/apoyanos/page.tsx`

```tsx
import { useState } from 'react';
import CentroDiaHero from '@/components/apoyanos/CentroDiaHero';
import ConstructionProgress from '@/components/apoyanos/ConstructionProgress';
import BlueprintMap from '@/components/apoyanos/BlueprintMap';
import ZoneDetailModal from '@/components/apoyanos/ZoneDetailModal';
import DonationCatalog from '@/components/apoyanos/DonationCatalog';
import DonationImpact from '@/components/apoyanos/DonationImpact';
import FAQ from '@/components/apoyanos/FAQ';
import FinalCTA from '@/components/apoyanos/FinalCTA';
import { initialProgress } from '@/data/centro-dia-needs';
import { CenterZone } from '@/types/centro-dia';

export const metadata = {
    title: "Construye el Centro Día | Apóyanos - Aconiño",
    description: "Ayúdanos a construir el nuevo Centro Día para adultos con discapacidad. Dona dinero, materiales, equipos o muebles. Bogotá, Colombia.",
};

export default function ApoyanosPage() {
    const [selectedZone, setSelectedZone] = useState<CenterZone | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleZoneClick = (zone: CenterZone) => {
        setSelectedZone(zone);
        setIsModalOpen(true);
    };

    return (
        <main className="min-h-screen bg-white">
            <CentroDiaHero />
            <ConstructionProgress goal={initialProgress.goal} raised={initialProgress.raised} donors={initialProgress.donors} />
            <BlueprintMap zones={initialProgress.zones} onZoneClick={handleZoneClick} />
            <DonationCatalog />
            <DonationImpact />
            <FAQ />
            <FinalCTA />
            <ZoneDetailModal zone={selectedZone} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
```

---

## Orden de Ejecución

1. Task 1: Crear tipos y datos
2. Task 2: CentroDiaHero
3. Task 3: ConstructionProgress
4. Task 4: BlueprintMap
5. Task 5: ZoneDetailModal
6. Task 6: DonationCatalog
7. Task 7: DonationImpact
8. Task 8: Página principal

**Verificación final:**
```bash
npm run build
npm run lint
```
