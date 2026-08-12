import { NavItem } from "../types/header";

export const DEFAULT_NAV_LINKS: NavItem[] = [
  { name: "Inicio", href: "/" },
  {
    name: "Quiénes somos",
    href: "/quienes-somos/nosotros",
    hasDropdown: true,
    subLinks: [
      { name: "Nuestra Identidad", href: "/quienes-somos/nosotros" },
      { name: "Aspiración Estratégica", href: "/quienes-somos/nosotros#mision" },
      { name: "Historia", href: "/quienes-somos/nosotros#historia" },
      { name: "Fundadores", href: "/quienes-somos/nosotros#fundadores" },
      { name: "Junta Directiva", href: "/quienes-somos/nosotros#junta-directiva" },
      { name: "Equipo De Trabajo", href: "/quienes-somos/nosotros#equipo-de-trabajo" },
      { name: "Asociación De Usuarios", href: "/quienes-somos/nosotros#asociacion-usuarios" },
    ]
  },
  {
    name: "Programas",
    href: "/programas",
    hasDropdown: true,
    subLinks: [
      { name: "Enfoque Terapéutico", href: "/programas#modelo" },
      { name: "Metodología de Trabajo", href: "/programas#metodologia" },
      { name: "Objetivos por Área", href: "/programas#objetivos" },
      { name: "Atención Temprana 0-3 Años", href: "/programas#atencion-temprana" },
      { name: "Atención a Niños y Jóvenes 3-18 Años", href: "/programas#atencion-ninos-jovenes" },
      { name: "Apoyo al Aprendizaje", href: "/programas#apoyo-aprendizaje" },
      { name: "Protocolo Intensivo Pediasuit", href: "/programas#pediasuit" },
    ]
  },
  { name: "Apóyanos", href: "/apoyanos" },
  {
    name: "Cursos",
    href: "/cursos",
    hasDropdown: true,
    subLinks: [
      { name: "Curso GMS Trust", href: "/cursos#gms-trust-movimientos-generales" },
      { name: "Curso Básico PediaSuit", href: "/cursos#curso-basico-pediasuit" },
      { name: "Curso Introductorio Caracas", href: "/cursos#curso-introductorio-neurodesarrollo-caracas" },
      { name: "Evaluación e Interacción Terapéutica", href: "/cursos#evaluacion-interaccion-terapeutica-bebes" },
      { name: "Curso Introductorio Lima", href: "/cursos#curso-introductorio-neurodesarrollo-lima" },
      { name: "Curso Introductorio Bogotá", href: "/cursos#curso-introductorio-neurodesarrollo-bogota" },
    ]
  },
  { name: "App", href: "/app" },
  { name: "Blog", href: "/blog" },
  { name: "Contáctanos", href: "/contacto" },
];
