export interface ImpactStat {
  label: string;
  value: string;
}

export interface ImpactStory {
  name: string;
  quote: string;
  image?: { url?: string } | string | number | null;
}

export interface ImpactVideo {
  _key?: string;
  name?: string;
  text?: string;
  videoUrl?: string;
  posterUrl?: string;
}

export interface ImpactSectionProps {
  title?: string | null;
  description?: string | null;
  stats?: ImpactStat[] | null;
  stories?: ImpactStory[] | null;
  videos?: ImpactVideo[] | null;
  ctaButtonText?: string | null;
}

export interface ProcessedStat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessedStory {
  id: number;
  name: string;
  story: string;
  img: string;
}
