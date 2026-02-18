import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact | Legal Cameroun - RODEC Conseils',
  description:
    'Contactez Legal Cameroun pour vos besoins juridiques au Cameroun. Création d\'entreprise, modifications statutaires, dissolution. Réponse sous 48h garantie.',
  keywords: [
    'contact legal cameroun',
    'avocat douala',
    'juriste cameroun',
    'création entreprise cameroun contact',
    'OHADA conseil',
    'RODEC Conseils',
  ],
  openGraph: {
    title: 'Contactez-nous | Legal Cameroun',
    description:
      'Parlons de votre projet. Que ce soit pour une création d\'entreprise, une modification de statuts ou une question juridique, nous vous répondons sous 48h.',
    type: 'website',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/contact',
      'en': 'https://legalcameroun.com/contact',
      'x-default': 'https://legalcameroun.com/contact',
    },
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
