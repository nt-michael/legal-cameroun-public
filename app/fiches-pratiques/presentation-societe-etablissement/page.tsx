import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';
import { createPageMetadata } from '@/lib/seo-utils';

const fiche = getFicheBySlug('presentation-societe-etablissement');

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/fiches-pratiques/presentation-societe-etablissement', {
    fr: {
      title: 'Société ou Établissement : Comment Choisir ? | Legal Cameroun',
      description:
        "Définitions claires, avantages et inconvénients de la société vs l'établissement au Cameroun. Guide pour faire le bon choix dès le départ.",
      keywords: [
        'société cameroun',
        'établissement cameroun',
        'succursale cameroun',
        'créer entreprise cameroun',
        'différence société établissement',
      ],
      openGraph: {
        title: "Société ou Établissement : Ce qu'il faut savoir pour choisir",
        description:
          'Définitions claires, avantages, inconvénients – pour lancer votre activité sans regret.',
        type: 'article',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Société ou Établissement : Comment Choisir ? | Legal Cameroun',
        description: "Définitions claires, avantages et inconvénients de la société vs l'établissement au Cameroun. Guide pour faire le bon choix dès le départ.",
      },
    },
    en: {
      title: 'Company vs Branch Office | Legal Cameroun',
      description: 'Understand the difference between a company and a branch office in Cameroon.',
      keywords: [
        'company cameroon',
        'branch office cameroon',
        'subsidiary cameroon',
        'start business cameroon',
        'company vs branch difference',
      ],
      openGraph: {
        title: 'Company vs Branch Office: What You Need to Know',
        description: 'Clear definitions, advantages and disadvantages – to launch your business without regret.',
        type: 'article',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Company vs Branch Office | Legal Cameroun',
        description: 'Understand the difference between a company and a branch office in Cameroon.',
      },
    },
  });
}

export default function PresentationSocieteEtablissementPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}
