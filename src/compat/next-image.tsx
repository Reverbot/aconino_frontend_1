import type { CSSProperties, ImgHTMLAttributes } from 'react';

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
  sizes?: string;
};

export default function Image({ src, alt = '', fill = false, priority = false, unoptimized: _unoptimized, quality: _quality, sizes: _sizes, style, ...props }: ImageProps) {
  const fillStyle: CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
    : {};

  return <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} style={{ ...fillStyle, ...style }} {...props} />;
}
