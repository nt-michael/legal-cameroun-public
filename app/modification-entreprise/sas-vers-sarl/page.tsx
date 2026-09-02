import { Metadata } from 'next';
import SasVersSarlContent from './SasVersSarlContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/modification-entreprise/sas-vers-sarl', {
    fr: {
      title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
      description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
      keywords: ['transformation SAS en SARL cameroun', 'convertir SAS SARL', 'changement forme juridique PME', 'gestion société cameroun', 'OHADA'],
      openGraph: {
        title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
        description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Transformation SAS en SARL au Cameroun | Cadre Plus Structuré',
        description: 'Transformez votre SAS en SARL au Cameroun pour un cadre plus structuré, une gestion simplifiée et une protection sociale adaptée. Formalités OHADA complètes.',
      },
    },
    en: {
      title: 'Convert SAS to SARL in Cameroon | Legal Cameroun',
      description: 'Convert your SAS to a SARL in Cameroon. Full legal support for the transformation.',
      keywords: ['SAS to SARL conversion cameroon', 'convert SAS SARL', 'change legal form SME', 'company management cameroon', 'OHADA'],
      openGraph: {
        title: 'Convert SAS to SARL in Cameroon | Legal Cameroun',
        description: 'Convert your SAS to a SARL in Cameroon. Full legal support for the transformation.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Convert SAS to SARL in Cameroon | Legal Cameroun',
        description: 'Convert your SAS to a SARL in Cameroon. Full legal support for the transformation.',
      },
    },
  });
}

export default function SasVersSarlPage() {
  return <SasVersSarlContent />;
}
