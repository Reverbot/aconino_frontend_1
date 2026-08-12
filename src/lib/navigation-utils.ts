import { NavItem, StaticNavItem } from "../types/header";
import { DEFAULT_NAV_LINKS } from "../constants/navigation";

// Enlaces que no se muestran en la navegación pública.
const HIDDEN_HREFS = ["/app", "/blog"];

// Items a los que se les quita el desplegable (quedan como enlace simple)
const NO_DROPDOWN_NAMES = ["cursos"];

// Renombres de etiquetas para mantener la navegación pública consistente.
const LABEL_RENAMES: Record<string, string> = {
  "Modelo de Intervención": "Enfoque Terapéutico",
  "Nuestros Pilares": "Metodología de Trabajo",
};
const renameLabel = (name: string) => LABEL_RENAMES[name.trim()] || name;

export const mapNavigationData = (navData?: StaticNavItem[]): NavItem[] => {
  const links: NavItem[] = (!navData || navData.length === 0)
    ? DEFAULT_NAV_LINKS
    : navData
        .map((item: StaticNavItem) => ({
          name: renameLabel((item.label || item.name || item.title || "").trim()),
          href: item.href || "#",
          hasDropdown: !!item.hasDropdown,
          subLinks: item.subLinks?.map((sub) => ({
            name: renameLabel((sub.label || sub.name || sub.title || "Link").trim()),
            href: sub.href || "#"
          })).filter(sub => !/^-+$/.test(sub.name))
        }))
        .filter((link: NavItem) => link.name !== "");

  return links
    .filter((link) => !HIDDEN_HREFS.includes(link.href || ""))
    .map((link) =>
      NO_DROPDOWN_NAMES.includes((link.name || "").toLowerCase().trim())
        ? { ...link, hasDropdown: false, subLinks: undefined, href: link.href && link.href !== "#" ? link.href : "/cursos" }
        : link
    );
};
