import Footer from './Footer';

const settings = {
  phoneNumber: '(601) 650 8473',
  mobilePhone: '313 391 0760',
  email: 'asistentenorte@aconino.org',
  address: 'Calle 127 B No. 45-28 – Barrio Prado',
  appDownloadUrl: 'https://play.google.com/store/apps/details?id=com.aconinoapp',
  socialLinks: [
    { label: 'Facebook', url: 'https://web.facebook.com/AsociacionAconino/' },
    { label: 'Instagram', url: 'https://www.instagram.com/aconinoacn/' },
    { label: 'YouTube', url: 'https://www.youtube.com/@asociacionaconino1526' },
  ],
};

const documentosLegales = [
  { _id: 'transparencia', titulo: 'Transparencia', categoria: 'transparencia', archivoUrl: '/transparencia', orden: 1 },
  { _id: 'privacidad', titulo: 'Protección de datos', categoria: 'proteccion_datos', archivoUrl: '/privacidad', orden: 2 },
  { _id: 'esal', titulo: 'Permanencia ESAL', categoria: 'esal', archivoUrl: '/permanencia-esal', orden: 3 },
];

export default function SiteFooter() {
  return <Footer settings={settings} documentosLegales={documentosLegales} />;
}
