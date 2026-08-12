import { useEffect, useState } from 'react';

export function usePathname() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
}

export function useRouter() {
  return {
    push: (href: string) => window.location.assign(href),
    replace: (href: string) => window.location.replace(href),
    back: () => window.history.back(),
    refresh: () => window.location.reload(),
  };
}

export function notFound(): never {
  throw new Error('Page not found');
}
