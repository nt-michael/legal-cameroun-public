import { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contactez Legal Cameroun | Experts Juridiques au Cameroun',
  description:
    "Contactez nos experts pour vos besoins juridiques et fiscaux au Cameroun. Création d'entreprise, modification de statuts, dissolution. Réponse sous 48h garantie.",
  keywords: [
    'contact legal cameroun',
    'avocat douala',
    'juriste cameroun',
    'création entreprise cameroun',
    'conseil OHADA',
    'expert juridique',
  ],
  openGraph: {
    title: 'Contactez Legal Cameroun | Experts Juridiques au Cameroun',
    description:
      "Contactez nos experts pour vos besoins juridiques et fiscaux au Cameroun. Création d'entreprise, modification de statuts, dissolution. Réponse sous 48h garantie.",
    type: 'website',
    url: 'https://legalcameroun.com/contact',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactez Legal Cameroun | Experts Juridiques au Cameroun',
    description:
      "Contactez nos experts pour vos besoins juridiques et fiscaux au Cameroun. Création d'entreprise, modification de statuts, dissolution. Réponse sous 48h garantie.",
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
