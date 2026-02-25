import { Metadata } from 'next';
import SasVersSarlContent from './SasVersSarlContent';

export const metadata: Metadata = {
  title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
  description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
  keywords: ['transformation SAS en SARL cameroun', 'convertir SAS SARL', 'changement forme juridique PME', 'gestion société cameroun', 'OHADA'],
  openGraph: {
    title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
    description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
    type: 'website',
    url: 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
    description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
      'en': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
      'x-default': 'https://legalcameroun.com/modification-entreprise/sas-vers-sarl',
    },
  },
};

export default function SasVersSarlPage() {
  return <SasVersSarlContent />;
}
