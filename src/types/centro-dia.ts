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
