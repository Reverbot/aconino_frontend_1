import type { AnchorHTMLAttributes, ReactNode } from 'react';

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | URL;
  children?: ReactNode;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
};

export default function Link({ href, children, replace: _replace, scroll: _scroll, prefetch: _prefetch, ...props }: LinkProps) {
  return <a href={typeof href === 'string' ? href : href.toString()} {...props}>{children}</a>;
}
