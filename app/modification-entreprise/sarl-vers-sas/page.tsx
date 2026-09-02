import { Metadata } from 'next';
import SarlVersSasContent from './SarlVersSasContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/modification-entreprise/sarl-vers-sas', {
    fr: {
      title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
      description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
      keywords: ['transformation SARL en SAS cameroun', 'convertir SARL SAS', 'changement forme juridique cameroun', 'ouverture capital investisseurs', 'OHADA'],
      openGraph: {
        title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
        description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Transformation SARL en SAS au Cameroun | Gagnez en Flexibilité',
        description: 'Transformez votre SARL en SAS au Cameroun pour lever des fonds et accueillir des investisseurs. Accompagnement juridique complet, formalités OHADA prises en charge.',
      },
    },
    en: {
      title: 'Convert SARL to SAS in Cameroon | Legal Cameroun',
      description: 'Convert your SARL to an SAS in Cameroon. Full legal support for the transformation.',
      keywords: ['SARL to SAS conversion cameroon', 'convert SARL SAS', 'change legal form cameroon', 'investor capital cameroon', 'OHADA'],
      openGraph: {
        title: 'Convert SARL to SAS in Cameroon | Legal Cameroun',
        description: 'Convert your SARL to an SAS in Cameroon. Full legal support for the transformation.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Convert SARL to SAS in Cameroon | Legal Cameroun',
        description: 'Convert your SARL to an SAS in Cameroon. Full legal support for the transformation.',
      },
    },
  });
}

export default function SarlVersSasPage() {
  return <SarlVersSasContent />;
}
