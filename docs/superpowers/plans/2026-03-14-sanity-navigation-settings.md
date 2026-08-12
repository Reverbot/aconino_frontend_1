# Navigation & Settings Sanity Integration Plan

> **For agentic workers:** Use superpowers:subagent-driven-development to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable editors to control navigation menu and footer content from Sanity CMS instead of hardcoded values.

**Architecture:** Create a new `navigation` schema in Sanity, update existing `settings` schema, add queries, and connect frontend components to fetch from Sanity.

**Tech Stack:** Next.js 14 (App Router), Sanity CMS, TypeScript

---

## Task 1: Add Navigation Schema to Sanity

**Files:**
- Create: `src/sanity/schemaTypes/navigation.ts`
- Modify: `src/sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create navigation schema**

```typescript
// src/sanity/schemaTypes/navigation.ts
import { defineType, defineField } from 'sanity'
import { NavigationIcon } from '@sanity/icons'

export default defineType({
  name: 'navigation',
  title: 'Navegación del Sitio',
  type: 'document',
  icon: NavigationIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Main Navigation'
    }),
    defineField({
      name: 'navItems',
      title: 'Elementos de Navegación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Etiqueta', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
            defineField({ 
              name: 'hasDropdown', 
              title: 'Tiene Submenú', 
              type: 'boolean',
              initialValue: false 
            }),
            defineField({
              name: 'subLinks',
              title: 'Subenlaces',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Etiqueta', type: 'string' },
                    { name: 'href', title: 'URL', type: 'string' }
                  ]
                }
              ]
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón CTA del Header',
      type: 'object',
      fields: [
        { name: 'label', title: 'Etiqueta', type: 'string', description: 'Ej: PAGO EN LÍNEA' },
        { name: 'href', title: 'URL', type: 'string' }
      ]
    })
  ]
})
```

- [ ] **Step 2: Update index.ts to include navigation**

```typescript
// src/sanity/schemaTypes/index.ts - agregar import y agregar al array
import navigation from './navigation'
// ... existing imports

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, page, settings, home, navigation],
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sanity/schemaTypes/navigation.ts src/sanity/schemaTypes/index.ts
git commit -m "feat: add navigation schema to Sanity"
```

---

## Task 2: Update Settings Schema with Complete Footer/Header Fields

**Files:**
- Modify: `src/sanity/schemaTypes/settings.ts`

- [ ] **Step 1: Add missing fields to settings schema**

Add these fields to the existing settings.ts (they should already exist based on previous review, verify and add if missing):

```typescript
// Add to existing fields array in settings.ts
defineField({
  name: 'legalLinks',
  title: 'Enlaces Legales (Footer)',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'label', title: 'Etiqueta', type: 'string' },
        { name: 'url', title: 'URL', type: 'string' }
      ]
    }
  ]
}),
defineField({
  name: 'appDownloadUrl',
  title: 'URL de Descarga App (Google Play)',
  type: 'url',
  description: 'Enlace disponible en Google Play para la App'
}),
defineField({
  name: 'controlEntity',
  title: 'Entidad de Control',
  type: 'string',
  description: 'Ej: Vigilado por la Superintendencia de Salud (Supersalud)'
}),
```

- [ ] **Step 2: Commit**

```bash
git add src/sanity/schemaTypes/settings.ts
git commit -m "feat: add legal links and app download to settings schema"
```

---

## Task 3: Add Queries for Navigation and Settings

**Files:**
- Modify: `src/sanity/lib/queries.ts`

- [ ] **Step 1: Add NAVIGATION_QUERY and update SETTINGS_QUERY**

```typescript
// src/sanity/lib/queries.ts - add these queries

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation"][0] {
    title,
    navItems[] {
      label,
      href,
      hasDropdown,
      subLinks[] {
        label,
        href
      }
    },
    ctaButton {
      label,
      href
    }
  }
`)

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0] {
    title,
    "logoUrl": logo.asset->url,
    phoneNumber,
    mobilePhone,
    email,
    address,
    socialLinks,
    footerLinks,
    legalLinks,
    appDownloadUrl,
    controlEntity,
    headerCTA,
    footerInfo {
      appDownload,
      controlEntity,
      copyright,
      designBy
    }
  }
`)
```

- [ ] **Step 2: Commit**

```bash
git add src/sanity/lib/queries.ts
git commit -m "feat: add navigation query to Sanity queries"
```

---

## Task 4: Update Layout to Fetch Settings and Navigation from Sanity

**Files:**
- Modify: `src/app/(app)/layout.tsx`

- [ ] **Step 1: Update layout to fetch settings and nav**

```typescript
// src/app/(app)/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { DonationProvider } from "../../providers/DonationProvider";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY, NAVIGATION_QUERY } from "@/sanity/lib/queries";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: "Asociación Aconiño | Apoyando la inclusión",
    description: "35 años apoyando la inclusión y mejorando la calidad de vida.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Fetch settings and navigation from Sanity
    const [settings, navigation] = await Promise.all([
        client.fetch(SETTINGS_QUERY),
        client.fetch(NAVIGATION_QUERY)
    ]);
    
    return (
        <html lang="es" className={`${manrope.variable}`}>
            <body className="antialiased min-h-screen flex flex-col font-sans bg-white text-primary">
                <DonationProvider>
                    <Header 
                        navData={navigation?.navItems} 
                        ctaLabel={navigation?.ctaButton?.label}
                        ctaHref={navigation?.ctaButton?.href}
                        settings={settings}
                    />
                    <main className="flex-1 w-full relative">
                        {children}
                    </main>
                    <Footer settings={settings} />
                </DonationProvider>
            </body>
        </html>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(app\)/layout.tsx
git commit -m "feat: fetch settings and navigation from Sanity in layout"
```

---

## Task 5: Update Header Component to Accept Sanity Data

**Files:**
- Modify: `src/components/header/Header.tsx`

- [ ] **Step 1: Update Header props interface and logic**

```typescript
// src/components/header/Header.tsx

interface HeaderProps {
  navData?: any[];
  ctaLabel?: string;
  ctaHref?: string;
  settings?: any;
}

export default function Header({ navData, ctaLabel, ctaHref, settings }: HeaderProps) {
  const { isScrolled, mobileMenu, isRevealed } = useHeader();

  // Use Sanity data if available, otherwise fallback to defaults
  const defaultLinks = [
    { name: "Inicio", href: "/" },
    {
      name: "Quiénes somos",
      href: "/quienes-somos/nosotros",
      hasDropdown: true,
      subLinks: [
        { name: "Nosotros", href: "/quienes-somos/nosotros" },
        { name: "Misión", href: "/quienes-somos/nosotros#mision" },
        { name: "Visión", href: "/quienes-somos/nosotros#vision" },
        { name: "Historia", href: "/quienes-somos/nosotros#historia" },
        { name: "Fundadores", href: "/quienes-somos/nosotros#fundadores" },
        { name: "Junta Directiva", href: "/quienes-somos/nosotros#junta-directiva" },
        { name: "Equipo De Trabajo", href: "/quienes-somos/nosotros#equipo-de-trabajo" },
        { name: "Asociación De Usuarios", href: "/quienes-somos/asociacion-de-usuarios" },
      ]
    },
    {
      name: "Programas",
      href: "/programas",
      hasDropdown: true,
      subLinks: [
        { name: "Atención Temprana 0-3 Años", href: "/programas#atencion-temprana" },
        { name: "Atención A Niños Y Jóvenes 3-18 Años", href: "/programas#atencion-ninos-jovenes" },
        { name: "Apoyo A Dificultades En El Aprendizaje", href: "/programas#apoyo-aprendizaje" },
        { name: "Protocolo Intensivo Pediasuit", href: "/programas#pediasuit" },
      ]
    },
    { name: "Apóyanos", href: "/apoyanos" },
    {
      name: "Cursos",
      href: "/cursos",
      hasDropdown: true,
      subLinks: [
        { name: "Curso Introductorio NDT", href: "/cursos/curso-introductorio-ndt" },
        { name: "Curso Avanzado NDT", href: "/cursos/curso-avanzado-ndt" },
        { name: "Certificación Pediasuit", href: "/cursos/certificacion-pediasuit" },
      ]
    },
    { name: "App", href: "/app" },
    { name: "Blog", href: "/blog" },
    { name: "Contáctanos", href: "/contacto" },
  ];

  // Map Sanity navItems to expected format
  const mappedNavData = navData?.map((item: any) => ({
    name: item.label,
    href: item.href,
    hasDropdown: item.hasDropdown,
    subLinks: item.subLinks?.map((sub: any) => ({
      name: sub.label,
      href: sub.href
    }))
  })) || [];

  const links = mappedNavData.length > 0 ? mappedNavData : defaultLinks;
  
  // Use CTA from props or fall back to default
  const headerCTALabel = ctaLabel || settings?.headerCTA || "PAGO EN LÍNEA";
  const headerCTAHref = ctaHref || "/apoyanos";
```

- [ ] **Step 2: Pass CTA props to CTAButton component**

Find `<CTAButton />` in the render and update:
```tsx
<CTAButton label={headerCTALabel} href={headerCTAHref} />
```

- [ ] **Step 3: Update CTAButton to accept props**

```typescript
// src/components/header/components/CTAButton.tsx
interface CTAButtonProps {
  label?: string;
  href?: string;
}

export default function CTAButton({ label = "PAGO EN LÍNEA", href = "/apoyanos" }: CTAButtonProps) {
  // ... existing code, use label and href props
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/header/Header.tsx src/components/header/components/CTAButton.tsx
git commit -m "feat: update Header to accept Sanity navigation data"
```

---

## Task 6: Update Footer Component to Accept Sanity Data

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer to accept settings prop**

```typescript
// src/components/Footer.tsx
import Link from "next/link";
import { FaPhoneAlt, FaMobileAlt, FaEnvelope } from "react-icons/fa";

interface FooterProps {
  settings?: {
    phoneNumber?: string;
    mobilePhone?: string;
    email?: string;
    address?: string;
    socialLinks?: any[];
    legalLinks?: any[];
    appDownloadUrl?: string;
    controlEntity?: string;
    footerInfo?: {
      copyright?: string;
      designBy?: string;
    };
  };
}

export default function Footer({ settings }: FooterProps) {
  const defaultPhone = "(601) 650 8473";
  const defaultMobile = "313 391 0760";
  const defaultEmail = "apoyoinclusion@aconino.org";
  
  return (
        <footer className="bg-primary text-white mt-auto py-16">
            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Aconiño Logo/Info */}
                    <div className="flex flex-col">
                        <div className="border-b border-white/20 pb-8 mb-8">
                            <div className="flex font-bold text-4xl tracking-tighter text-white leading-none mb-2">
                                a<span className="text-accent">c</span>n
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 pr-4">
                            {settings?.footerInfo?.copyright || "Somos una entidad privada sin ánimo de lucro, creada en 1990."}
                        </p>
                    </div>

                    {/* Column 2: Links - Use Sanity legalLinks if available */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Enlaces de interés</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            {(settings?.legalLinks?.length > 0 ? settings.legalLinks : [
                                { label: "Canales de denuncia", url: "/canales-denuncia" },
                                { label: "Trabaja con nosotros", url: "/trabaja-con-nosotros" },
                                { label: "Permanencia ESAL", url: "/permanencia-esal" },
                                { label: "Transparencia", url: "/transparencia" }
                            ]).map((link: any, idx: number) => (
                                <li key={idx}>
                                    <Link href={link.url || link.href || "#"} className="hover:text-accent transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contáctanos</h4>
                        <div className="text-xs text-gray-400 mb-4 tracking-wider uppercase">Sede Norte</div>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-accent" />
                                <span>{settings?.phoneNumber || defaultPhone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMobileAlt className="text-accent" />
                                <span>{settings?.mobilePhone || defaultMobile}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Write to us & App */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Escríbenos</h4>
                        <div className="text-xs text-gray-400 mb-4 tracking-wider uppercase">Correo Electrónico</div>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-accent" />
                                <a href={`mailto:${settings?.email || defaultEmail}`} className="hover:text-accent transition-colors">
                                    {settings?.email || defaultEmail}
                                </a>
                            </li>
                        </ul>

                        {/* Get it on Google Play */}
                        <div className="mt-8">
                            {settings?.appDownloadUrl && (
                                <a href={settings.appDownloadUrl} target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12" />
                                </a>
                            )}
                        </div>
                        
                        {/* Control Entity */}
                        {settings?.controlEntity && (
                            <div className="mt-4 text-xs text-gray-400">
                                {settings.controlEntity}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </footer>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: update Footer to accept Sanity settings data"
```

---

## Task 5: Verify Implementation

**Files:**
- Run: Development server and Sanity Studio

- [ ] **Step 1: Verify Sanity Studio has new schemas**

Run: `npm run dev`
Navigate to: http://localhost:3000/studio

Expected: 
- See "Navegación del Sitio" in Sanity sidebar
- See updated Settings with legal links fields

- [ ] **Step 2: Verify frontend fetches data correctly**

Navigate to: http://localhost:3000

Expected:
- Navigation menu works
- Footer shows data from Sanity (if populated)
- Falls back to defaults if Sanity data is empty

- [ ] **Step 3: Commit final changes**

```bash
git add .
git commit -m "feat: complete Sanity navigation and settings integration"
```

---

## Summary

After completing this plan:
1. ✅ Editors can manage navigation menu from Sanity Studio
2. ✅ Editors can manage CTA button in header from Sanity  
3. ✅ Editors can manage footer links, contact info, app download from Sanity
4. ✅ Frontend falls back to defaults if Sanity data is empty
5. ✅ All content is editable from CMS as requested
