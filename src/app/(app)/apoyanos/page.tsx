import { Metadata } from 'next';
import ApoyanosClient from './ApoyanosClient';

export const metadata: Metadata = {
    title: "Construye el Centro Día | Apóyanos - Aconiño",
    description: "Ayúdanos a construir el nuevo Centro Día para adultos con discapacidad. Dona dinero, materiales, equipos o muebles. Bogotá, Colombia.",
};

export default function ApoyanosPage() {
    return <ApoyanosClient />;
}
