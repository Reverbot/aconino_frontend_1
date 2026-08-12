"use client";

import React from "react";
import { motion } from "@/compat/motion";
import Link from "next/link";
import { CurtainReveal, GradientOverlay, ParticleMorph, GoldenTypewriter } from "@/components/animations";
import HeroBackground from "../hero/HeroBackground";

export interface HeroBaseProps {
  /** Main heading text or node */
  title?: string | React.ReactNode;
  /** Subheading or tagline above the title */
  subtitle?: string | React.ReactNode;
  /** Paragraph text below the title */
  description?: string | React.ReactNode;
  /** URL for background image */
  backgroundImage?: string;
  /** URL for background video (MP4) */
  backgroundVideo?: string;
  /** Poster image URL for video background */
  videoPoster?: string;
  /** Type of background to render */
  backgroundType?: 'image' | 'video' | 'gradient';
  /** Opacity of the dark overlay (0-100) */
  overlayOpacity?: number;
  /** Whether to show the curtain reveal animation */
  showCurtain?: boolean;
  /** Tailwind color class for the curtain */
  curtainColor?: string;
  /** Whether to show background particles */
  showParticles?: boolean;
  /** Whether particles should be subtle (smaller, less density) */
  particlesSubtle?: boolean;
  /** Whether to use the GoldenTypewriter effect for the title */
  useTypewriter?: boolean;
  /** Additional props for GoldenTypewriter */
  typewriterProps?: {
    delay?: number;
    speed?: number;
    loop?: boolean;
    waitDuration?: number;
  };
  /** Call to action button configuration */
  cta?: {
    text: string;
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
  };
  /** Breadcrumb navigation items */
  breadcrumbs?: Array<{ label: string; href: string }>;
  /** Height class for the section */
  height?: string;
  /** Additional classes for the section element */
  className?: string;
  /** Additional classes for the content container */
  containerClassName?: string;
  /** Additional classes for the title */
  titleClassName?: string;
  /** Additional classes for the subtitle */
  subtitleClassName?: string;
  /** Additional classes for the description */
  descriptionClassName?: string;
  /** Width class for accent lines around subtitle (e.g. "w-16") */
  accentLineWidth?: string;
  /** Horizontal alignment of the content block */
  horizontalAlign?: 'left' | 'center' | 'right';
  /** Vertical alignment of the content block within the hero */
  verticalAlign?: 'top' | 'center' | 'bottom';
  /** Extra content to render (e.g. floating icons) */
  children?: React.ReactNode;
  /** Custom overlay elements */
  customOverlay?: React.ReactNode;
  /** Whether to show the default background if no image/video is provided */
  showDefaultBackground?: boolean;
}

export default function HeroBase({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  videoPoster,
  backgroundType = 'image',
  overlayOpacity = 30,
  showCurtain = false,
  curtainColor = "bg-secondary",
  showParticles = false,
  particlesSubtle = false,
  useTypewriter = false,
  typewriterProps = {},
  cta,
  breadcrumbs,
  height = "min-h-[600px] md:min-h-[700px]",
  className = "",
  containerClassName = "max-w-6xl mx-auto px-4 md:px-8",
  accentLineWidth = "w-8 md:w-16",
  titleClassName = "",
  subtitleClassName = "",
  descriptionClassName = "",
  horizontalAlign = 'center',
  verticalAlign = 'center',
  children,
  customOverlay,
  showDefaultBackground = true,
}: HeroBaseProps) {
  const isGradient = backgroundType === 'gradient';

  // Alignment helpers (defaults preserve the original centered layout)
  const vAlignClass = { top: 'items-start', center: 'items-center', bottom: 'items-end' }[verticalAlign];
  const hAlignClass = { left: 'items-start text-left', center: 'items-center text-center', right: 'items-end text-right' }[horizontalAlign];
  const titleAlignClass = { left: 'mr-auto ml-0', center: 'mx-auto', right: 'ml-auto mr-0' }[horizontalAlign];
  const subtitleJustifyClass = { left: 'justify-start', center: 'justify-center', right: 'justify-end' }[horizontalAlign];

  return (
    <section 
      className={`relative w-full flex ${vAlignClass} justify-center overflow-hidden py-24 ${height} ${className}`}
    >
      {/* 1. Curtain Reveal */}
      {showCurtain && <CurtainReveal color={curtainColor} />}

      {/* 2. Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Abstract Background for Gradients */}
        {isGradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary">
             <div className="absolute top-1/4 -left-10 w-40 h-40 md:-left-20 md:w-80 md:h-80 bg-accent/15 rounded-full blur-[60px] md:blur-[100px]" />
             <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-secondary/30 rounded-full blur-[80px] md:blur-[120px]" />
             <div className="absolute top-1/2 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/5 rounded-full blur-[50px] md:blur-[80px]" />
          </div>
        )}

        {/* Video or Image Background */}
        {!isGradient && (
          <HeroBackground
            backgroundType={backgroundType === 'video' ? 'video' : 'image'}
            videoUrl={backgroundVideo}
            imageUrl={backgroundImage}
            posterPlaceholder={videoPoster}
            defaultImage={showDefaultBackground ? "/images/hero-background-blue.png" : undefined}
          />
        )}
        
        {/* Common Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/80 z-10" 
          style={{ opacity: overlayOpacity > 0 ? overlayOpacity / 100 : 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent z-10" />
        
        {/* Custom Overlays (Gradients, Particles, etc.) */}
        {customOverlay || (
          <GradientOverlay 
            from="from-primary/80" 
            via="via-secondary/50" 
            to="to-primary/80" 
            className="opacity-60 z-10" 
          />
        )}
        
        {showParticles && <ParticleMorph subtle={particlesSubtle} />}
      </div>

      {/* 3. Content Layer */}
      <div className={`relative z-20 w-full flex flex-col ${hAlignClass} mt-12 md:mt-0 ${containerClassName}`}>
        
        {/* Subtitle / Label as Pill Badge */}
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className={`mb-6 inline-flex items-center gap-2 bg-accent/15 border border-accent/30 backdrop-blur-sm rounded-full px-4 py-1.5 self-start ${subtitleJustifyClass === 'justify-center' ? 'self-center mx-auto' : ''} ${subtitleJustifyClass === 'justify-end' ? 'self-end ml-auto' : ''} ${subtitleClassName}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-accent font-bold text-xs tracking-widest uppercase">
              {subtitle}
            </span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.div
          initial={!useTypewriter ? { opacity: 0, y: 30 } : {}}
          animate={!useTypewriter ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full"
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight ${titleAlignClass} ${titleClassName}`}
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            {useTypewriter && typeof title === 'string' ? (
              <GoldenTypewriter
                text={title}
                delay={0.6}
                speed={0.1}
                loop={true}
                waitDuration={4000}
                {...typewriterProps}
              />
            ) : title}
          </h1>
        </motion.div>

        {/* Description Text */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.19, 1, 0.22, 1] }}
            className={`mt-5 text-base md:text-lg text-white/80 max-w-xl font-medium leading-relaxed drop-shadow-lg ${descriptionClassName}`}
          >
            {description}
          </motion.p>
        )}

        {/* CTA Button */}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className="mt-10"
          >
            {cta.link ? (
              <Link
                href={cta.link}
                className={`inline-flex items-center gap-3 bg-accent text-primary px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-lg md:text-xl tracking-widest shadow-2xl hover:scale-105 hover:bg-yellow-400 active:scale-[0.97] active:shadow-lg transition-all duration-200 uppercase ${cta.className || ""}`}
              >
                {cta.icon}
                {cta.text}
              </Link>
            ) : (
              <button
                onClick={cta.onClick}
                className={`inline-flex items-center gap-3 bg-accent text-primary px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-lg md:text-xl tracking-widest shadow-2xl hover:scale-105 hover:bg-yellow-400 active:scale-[0.97] active:shadow-lg transition-all duration-200 uppercase ${cta.className || ""}`}
              >
                {cta.icon}
                {cta.text}
              </button>
            )}
          </motion.div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <Link 
                  href={bc.href} 
                  className={`hover:text-white transition-colors ${idx === breadcrumbs.length - 1 ? 'text-accent font-semibold' : ''}`}
                >
                  {bc.label}
                </Link>
              </React.Fragment>
            ))}
          </motion.div>
        )}

        {/* Extra children */}
        {children}
      </div>
    </section>
  );
}
