import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';

const fiche = getFicheBySlug('immatriculation-avec-atom');

export const metadata: Metadata = {
  title: 'Immatriculation Fiscale avec ATOM | Legal Cameroun',
  description:
    'Guide complet pour s\'enregistrer et déclarer via le système ATOM de la DGI Cameroun. Disponible en PDF, PPT et version anglaise.',
  keywords: [
    'ATOM cameroun',
    'immatriculation fiscale cameroun',
    'DGI cameroun',
    'déclaration impôts cameroun',
    'système électronique DGI',
  ],
  openGraph: {
    title: 'Immatriculation Fiscale avec ATOM',
    description:
      'Maîtrisez le nouveau système électronique de la DGI – étape par étape.',
    type: 'article',
    url: 'https://legalcameroun.com/fiches-pratiques/immatriculation-avec-atom',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immatriculation Fiscale avec ATOM | Legal Cameroun',
    description: "Guide complet pour s'enregistrer et déclarer via le système ATOM de la DGI Cameroun. Disponible en PDF, PPT et version anglaise.",
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/fiches-pratiques/immatriculation-avec-atom',
      'en': 'https://legalcameroun.com/fiches-pratiques/immatriculation-avec-atom',
      'x-default': 'https://legalcameroun.com/fiches-pratiques/immatriculation-avec-atom',
    },
  },
};

export default function ImmatriculationAtomPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}
