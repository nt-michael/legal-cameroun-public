import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, etablissementPricingTiers } from '@/lib/creation-data';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/creation-entreprise/etablissement', {
    fr: {
      title: 'Créer un Établissement commercial au Cameroun | Legal Cameroun',
      description: 'Exercez seul votre activité commerciale au Cameroun : immatriculation au RCCM, sans statuts ni capital minimum. Nos juristes s\'occupent des formalités.',
      keywords: ['établissement commercial cameroun', 'commerçant individuel cameroun', 'immatriculation RCCM', 'entreprise individuelle OHADA'],
      openGraph: {
        title: 'Créer un Établissement commercial au Cameroun | Legal Cameroun',
        description: 'Exercez seul votre activité commerciale au Cameroun : immatriculation au RCCM, sans statuts ni capital minimum. Nos juristes s\'occupent des formalités.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Créer un Établissement commercial au Cameroun | Legal Cameroun',
        description: 'Exercez seul votre activité commerciale au Cameroun : immatriculation au RCCM, sans statuts ni capital minimum. Nos juristes s\'occupent des formalités.',
      },
    },
    en: {
      title: 'Create a Commercial Establishment in Cameroon | Legal Cameroun',
      description: 'Run your commercial activity alone in Cameroon: RCCM registration, no articles of association and no minimum capital. Our legal experts handle the formalities.',
      keywords: ['commercial establishment cameroon', 'sole trader cameroon', 'RCCM registration', 'OHADA sole proprietorship'],
      openGraph: {
        title: 'Create a Commercial Establishment in Cameroon | Legal Cameroun',
        description: 'Run your commercial activity alone in Cameroon: RCCM registration, no articles of association and no minimum capital. Our legal experts handle the formalities.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Create a Commercial Establishment in Cameroon | Legal Cameroun',
        description: 'Run your commercial activity alone in Cameroon: RCCM registration, no articles of association and no minimum capital. Our legal experts handle the formalities.',
      },
    },
  });
}

export default function EtablissementPage() {
  return (
    <SubpageLayout
      data={subpagesData.etablissement}
      pricingTiers={etablissementPricingTiers}
    />
  );
}
