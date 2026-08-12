import AsociacionIntro from './asociacion-usuarios/AsociacionIntro';
import AsociacionBanner from './asociacion-usuarios/AsociacionBanner';
import AsociacionDetails from './asociacion-usuarios/AsociacionDetails';

export default function OriginalAsociacionUsuariosPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <AsociacionIntro />
      <AsociacionBanner />
      <AsociacionDetails />
    </main>
  );
}
