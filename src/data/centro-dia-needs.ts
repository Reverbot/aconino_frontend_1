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
        { id: 't2', name: 'Espejo grande', description: 'Espejo para terapia visual', unitPrice: 450000, unit: 'und', quantityNeeded: 4, quantityDonated: 1, type: 'equipment' },
        { id: 't3', name: 'Silla de terapia', description: 'Silla ergonómica de terapia', unitPrice: 280000, unit: 'und', quantityNeeded: 12, quantityDonated: 3, type: 'furniture' },
        { id: 't4', name: 'Televisor 55"', description: 'TV para ejercicios', unitPrice: 1200000, unit: 'und', quantityNeeded: 2, quantityDonated: 0, type: 'equipment' },
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
        { id: 'd1', name: 'Cama articulada', description: 'Cama médica articulada', unitPrice: 3500000, unit: 'und', quantityNeeded: 8, quantityDonated: 2, type: 'furniture' },
        { id: 'd2', name: 'Colchón viscoelástico', description: 'Colchón antiescaras', unitPrice: 450000, unit: 'und', quantityNeeded: 10, quantityDonated: 2, type: 'furniture' },
        { id: 'd3', name: 'Armario', description: 'Armario de madera', unitPrice: 800000, unit: 'und', quantityNeeded: 6, quantityDonated: 0, type: 'furniture' },
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
        { id: 'k1', name: 'Estufa industrial', description: 'Estufa de 4 puestos', unitPrice: 1800000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
        { id: 'k2', name: 'Refrigerador', description: 'Refrigerador industrial', unitPrice: 2500000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
        { id: 'k3', name: 'Mesón de cocina', description: 'Mesón en acero inoxidable', unitPrice: 1200000, unit: 'und', quantityNeeded: 2, quantityDonated: 1, type: 'furniture' },
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
        { id: 'm1', name: 'Televisor 65"', description: 'Televisor Smart TV', unitPrice: 1800000, unit: 'und', quantityNeeded: 2, quantityDonated: 0, type: 'equipment' },
        { id: 'm2', name: 'Proyector', description: 'Proyector de video', unitPrice: 1500000, unit: 'und', quantityNeeded: 1, quantityDonated: 0, type: 'equipment' },
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
        { id: 'a1', name: 'Escritorio', description: 'Escritorio de oficina', unitPrice: 650000, unit: 'und', quantityNeeded: 4, quantityDonated: 1, type: 'furniture' },
        { id: 'a2', name: 'Computador', description: 'Computador de escritorio', unitPrice: 1500000, unit: 'und', quantityNeeded: 3, quantityDonated: 0, type: 'equipment' },
      ]
    }
  ]
};