"use client";

import { motion, AnimatePresence } from "@/compat/motion";
import { FaTimes, FaCheckCircle, FaMoneyBillWave, FaBoxOpen, FaDesktop, FaChair, FaHandHoldingMedical, FaBed, FaUtensils, FaTv, FaBriefcase } from "react-icons/fa";
import { CenterZone, DonationType } from "@/types/centro-dia";
import { useDonation } from "@/providers/DonationProvider";
import { formatCurrency } from "@/lib/format";

interface ZoneDetailModalProps {
  zone: CenterZone | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<DonationType, React.ElementType> = {
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

const iconMap: Record<string, React.ElementType> = {
  'FaHandHoldingMedical': FaHandHoldingMedical, 'FaBed': FaBed, 'FaUtensils': FaUtensils, 'FaTv': FaTv, 'FaBriefcase': FaBriefcase,
};

export default function ZoneDetailModal({ zone, isOpen, onClose }: ZoneDetailModalProps) {
  const { openDonationWidget } = useDonation();

  if (!zone) return null;

  const IconComponent = iconMap[zone.icon] || FaBriefcase;
  const percentage = (zone.totalRaised / zone.totalNeeded) * 100;

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
                      {!isComplete && <button                       onClick={() => openDonationWidget()} className="mt-3 w-full py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-secondary">Donar {need.unit} de {need.name}</button>}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <button                       onClick={() => openDonationWidget()} className="w-full py-4 bg-accent text-primary rounded-xl font-bold text-lg hover:bg-yellow-400">Donar a esta zona</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
