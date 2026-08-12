import { FaHardHat, FaStethoscope, FaTruck, FaUtensils } from "react-icons/fa";
import { IconType } from "react-icons";

export const MIN_DONATION_AMOUNT = 5000;

export interface DonationItem {
  value: number;
  label: string;
  impactLabel: string;
  icon: IconType;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  image: string;
  progress: {
    target: number;
    current: number;
    unit: string;
  };
  impactMultiplier: number;
  impactUnit: string;
  items: DonationItem[];
}

export const DONATION_OPTIONS: DonationCategory[] = [
  {
    id: 'construction',
    title: 'Construye el Centro',
    description: 'Ayúdanos a terminar el nuevo Centro Día para adultos con discapacidad.',
    color: 'from-primary to-secondary',
    image: '/images/hero-background-blue.png',
    progress: { target: 100, current: 65, unit: 'bultos' },
    impactMultiplier: 85000,
    impactUnit: 'm² de piso',
    items: [
      { value: 85000, label: '$85.000', impactLabel: '1 m² de piso', icon: FaHardHat },
      { value: 150000, label: '$150.000', impactLabel: '2 bultos de cemento', icon: FaHardHat },
      { value: 500000, label: '$500.000', impactLabel: 'Kit de materiales básicos', icon: FaHardHat },
    ]
  },
  {
    id: 'padrino',
    title: 'Plan Padrino',
    description: 'Apoya directamente el tratamiento y bienestar de nuestros niños.',
    color: 'from-secondary to-accent',
    image: '/images/hero-background-blue.png',
    progress: { target: 50, current: 12, unit: 'padrinos' },
    impactMultiplier: 20000,
    impactUnit: 'sesiones de transporte',
    items: [
      { value: 20000, label: '$20.000', impactLabel: '1 sesión de transporte', icon: FaTruck },
      { value: 50000, label: '$50.000', impactLabel: 'Kit nutricional semanal', icon: FaUtensils },
      { value: 100000, label: '$100.000', impactLabel: '1 sesión de fisioterapia', icon: FaStethoscope },
    ]
  }
];
