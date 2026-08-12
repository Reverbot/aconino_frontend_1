import ContactHero from "@/components/contact/ContactHero";
import ContactBranches from "@/components/contact/ContactBranches";
import ContactForm from "@/components/contact/ContactForm";
import ContactMaps from "@/components/contact/ContactMaps";

export const metadata = {
    title: "Contáctanos - Asociación Aconiño",
    description:
        "Ponte en contacto con la Asociación Aconiño. Contamos con dos sedes en Bogotá para brindarte la mejor atención posible.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <ContactHero />
            <ContactBranches />
            <ContactForm />
            <ContactMaps />
        </main>
    );
}
