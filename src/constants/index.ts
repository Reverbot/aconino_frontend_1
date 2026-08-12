export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const ANIMATION = {
  MOBILE_MENU_DELAY_MS: 100,
  SCROLL_THRESHOLD_DEFAULT: 50,
  GLASS_BLUR_DIVISOR: 10,
  GLASS_BLUR_MAX: 20,
} as const;

export const PAGINATION = {
  POSTS_PER_PAGE: 9,
  RECENT_POSTS_LIMIT: 5,
  LATEST_POSTS_LIMIT: 12,
} as const;

export const DONATION_CATEGORIES = {
  GENERAL: 'general',
  CENTRO_DIA: 'centro-dia',
  PADRES: 'padres',
  PATROCINADORES: 'patrocinadores',
} as const;
