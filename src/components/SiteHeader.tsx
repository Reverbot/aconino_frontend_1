import Header from './header/Header';
import { DonationProvider } from '../providers/DonationProvider';
const navLinks = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Quiénes somos',
    href: '/quienes-somos/nosotros',
    hasDropdown: true,
    subLinks: [
      { name: 'Nuestra Historia', href: '/quienes-somos/nosotros#historia' },
      { name: 'Misión y Visión', href: '/quienes-somos/nosotros#mision' },
    ],
  },
  {
    name: 'Programas',
    href: '/programas',
    hasDropdown: true,
    subLinks: [
      { name: 'Atención Temprana', href: '/programas#atencion-temprana' },
      { name: 'PediaSuit', href: '/programas#pediasuit' },
      { name: 'Apoyo al Aprendizaje', href: '/programas#apoyo-aprendizaje' },
      { name: 'Neurodesarrollo', href: '/programas#atencion-ninos-jovenes' },
    ],
  },
  { name: 'Apóyanos', href: '/apoyanos' },
  { name: 'Cursos', href: '/cursos' },
  { name: 'Contáctanos', href: '/contacto' },
];

const settings = {
  phoneNumber: '(601) 650 8473',
  mobilePhone: '313 391 0760',
  email: 'asistentenorte@aconino.org',
  address: 'Calle 127 B No. 45-28 – Barrio Prado',
  headerCTA: 'DONAR AHORA',
};

export default function SiteHeader() {
  return (
    <DonationProvider>
      <Header navData={navLinks} settings={settings} />
    </DonationProvider>
  );
}
