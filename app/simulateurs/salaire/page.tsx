import { Metadata } from 'next';
import SimulateurPageTemplate from '@/components/simulateurs/SimulateurPageTemplate';
import SalaireSimulator from '@/components/simulateurs/SalaireSimulator';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/simulateurs/salaire', {
    fr: {
      title: 'Simulateur Salaire Cameroun | CNPS, IRPP, Coût Employeur 2024 — Legal Cameroun',
      description: 'Calculez le salaire net et le coût total employeur au Cameroun. Cotisations CNPS, IRPP, TDL, RAV et FNE. Conforme au CGI 2024 et barèmes CNPS.',
      keywords: ['simulateur salaire cameroun', 'salaire net cameroun', 'CNPS 2024', 'IRPP cameroun', 'coût employeur', 'charges sociales cameroun'],
      openGraph: {
        title: 'Simulateur Salaire Cameroun | CNPS, IRPP, Coût Employeur 2024 — Legal Cameroun',
        description: 'Calculez le salaire net et le coût total employeur au Cameroun. Cotisations CNPS, IRPP, TDL, RAV et FNE. Conforme au CGI 2024 et barèmes CNPS.',
        type: 'website',
        url: 'https://legalcameroun.com/simulateurs/salaire',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Simulateur Salaire Cameroun | CNPS, IRPP, Coût Employeur 2024 — Legal Cameroun',
        description: 'Calculez le salaire net et le coût total employeur au Cameroun. Cotisations CNPS, IRPP, TDL, RAV et FNE. Conforme au CGI 2024 et barèmes CNPS.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/simulateurs/salaire',
          'en': 'https://legalcameroun.com/simulateurs/salaire',
          'x-default': 'https://legalcameroun.com/simulateurs/salaire',
        },
      },
    },
    en: {
      title: 'Salary Simulator Cameroon | Legal Cameroun',
      description: 'Calculate your net salary or gross cost in Cameroon. Free simulator for employees and employers.',
      keywords: ['salary simulator cameroon', 'net salary cameroon', 'CNPS 2024', 'income tax cameroon', 'employer cost', 'social charges cameroon'],
      openGraph: {
        title: 'Salary Simulator Cameroon | Legal Cameroun',
        description: 'Calculate your net salary or gross cost in Cameroon. Free simulator for employees and employers.',
        type: 'website',
        url: 'https://legalcameroun.com/simulateurs/salaire',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Salary Simulator Cameroon | Legal Cameroun',
        description: 'Calculate your net salary or gross cost in Cameroon. Free simulator for employees and employers.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/simulateurs/salaire',
          'en': 'https://legalcameroun.com/simulateurs/salaire',
          'x-default': 'https://legalcameroun.com/simulateurs/salaire',
        },
      },
    },
  });
}

export default function SalairePage() {
  return (
    <SimulateurPageTemplate
      title={{ fr: "Simulateur Impôt sur Salaire", en: "Salary Tax Simulator" }}
      shortTitle={{ fr: "Salaire", en: "Salary" }}
      description={{ fr: "Calculez le salaire net à percevoir et le coût total employeur incluant toutes les cotisations et impôts.", en: "Calculate the net salary to receive and the total employer cost including all contributions and taxes." }}
    >
      <SalaireSimulator />
    </SimulateurPageTemplate>
  );
}
