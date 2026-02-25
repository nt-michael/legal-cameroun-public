import { Metadata } from 'next';
import SarlVersSasContent from './SarlVersSasContent';

export const metadata: Metadata = {
  title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
  description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
  keywords: ['transformation SARL en SAS cameroun', 'convertir SARL SAS', 'changement forme juridique cameroun', 'ouverture capital investisseurs', 'OHADA'],
  openGraph: {
    title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
    description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
    type: 'website',
    url: 'https://legalcameroun.com/modification-entreprise/sarl-vers-sas',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
    description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/modification-entreprise/sarl-vers-sas',
      'en': 'https://legalcameroun.com/modification-entreprise/sarl-vers-sas',
      'x-default': 'https://legalcameroun.com/modification-entreprise/sarl-vers-sas',
    },
  },
};

export default function SarlVersSasPage() {
  return <SarlVersSasContent />;
}
