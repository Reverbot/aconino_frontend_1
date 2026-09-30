export const blogCategories = [
  { title: 'Neurodesarrollo', slug: 'neurodesarrollo' },
  { title: 'Inclusión', slug: 'inclusion' },
  { title: 'Familias', slug: 'familias' },
];

export function formatBlogDate(date: string, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Date(date).toLocaleDateString('es-ES', { timeZone: 'UTC', ...options });
}

export function isBlogPostPublished(publishedAt: Date, now = new Date()) {
  const publishDate = publishedAt.toISOString().slice(0, 10);
  const todayParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const today = ['year', 'month', 'day']
    .map((part) => todayParts.find(({ type }) => type === part)?.value ?? '')
    .join('-');

  return publishDate <= today;
}
