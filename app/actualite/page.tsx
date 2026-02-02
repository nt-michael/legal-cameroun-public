import { Metadata } from 'next';
import ActualiteHero from '@/components/actualite/ActualiteHero';
import ActualiteGrid from '@/components/actualite/ActualiteGrid';

export const metadata: Metadata = {
  title: 'Actualité Juridique & Fiscale au Cameroun - Legal Cameroun',
  description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Restez informé des évolutions juridiques et fiscales avec nos experts.',
  keywords: ['actualité juridique Cameroun', 'fiscalité Cameroun', 'droit des affaires', 'loi de finances', 'CNPS', 'DGI'],
};

export default function ActualitePage() {
  return (
    <>
      <ActualiteHero />
      <ActualiteGrid />
    </>
  );
}
